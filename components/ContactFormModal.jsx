import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { products } from '../lib/data/products';
import { getProductPrice } from '../lib/utils/productPrice';
import Link from 'next/link';

function ContactFormModal({
  show,
  onClose,
  selectedProduct,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  CompanyName,
  setCompanyName,
  message,
  setMessage,
  isSubmitting,
  
  handleSubmit,
}) {
  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close and prevent body scroll
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [show, onClose]);

  if (!show || !selectedProduct) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          <FaTimes size={24} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Contact Us
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              You are inquiring about: <span className="font-semibold text-blue-600">{selectedProduct.name}</span>
            </p>
          </div>

          {/* Loading Indicator */}
          {isSubmitting && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700 font-medium">Submitting your message...</span>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <label htmlFor="name" className="text-sm font-semibold text-gray-800 w-full sm:w-32 mb-1 sm:mb-0">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <label htmlFor="CompanyName" className="text-sm font-semibold text-gray-800 w-full sm:w-32 mb-1 sm:mb-0">
                Company Name
              </label>
              <input
                type="text"
                id="CompanyName"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter company name"
                value={CompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <label htmlFor="email" className="text-sm font-semibold text-gray-800 w-full sm:w-32 mb-1 sm:mb-0">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-800 w-full sm:w-32 mb-1 sm:mb-0">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start mb-4">
              <label htmlFor="message" className="text-sm font-semibold text-gray-800 w-full sm:w-32 mb-1 sm:mb-0 sm:pt-3">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows="5"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 resize-none"
                placeholder="Please describe your requirements or questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </div>
          </form>

          {/* Related Products Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Related Products</h4>
            <div className="max-h-80 overflow-y-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {products
                  .filter(product => 
                    product.category === selectedProduct.category && 
                    product.id !== selectedProduct.id
                  )
                  .slice(0, 12)
                  .map((product) => {
                    const { price, cycle } = getProductPrice(product);
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="block bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-blue-300 transition-all duration-200"
                        onClick={onClose}
                      >
                        <div className="text-center">
                          <img 
                            src={product.img} 
                            alt={product.name} 
                            className="w-12 h-12 object-contain mx-auto mb-2"
                            onError={(e) => {
                              e.target.src = '/images/product-placeholder.png';
                            }}
                          />
                          <h5 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                            {product.name}
                          </h5>
                          <p className="text-xs text-blue-600 font-bold">
                            {price !== null ? `₹${price.toLocaleString()}` : 'Contact for pricing'}
                            {price !== null && cycle && (
                              <span className="text-xs text-gray-500 ml-1">
                                {cycle === '/month' ? '/mo' :
                                 cycle === '/year' ? '/yr' :
                                 cycle === '/3 years' ? '/3yr' :
                                 cycle === '/one-time' ? '' : ''}
                              </span>
                            )}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              {products.filter(product => 
                product.category === selectedProduct.category && 
                product.id !== selectedProduct.id
              ).length === 0 && (
                <p className="text-gray-500 text-center py-4">No related products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactFormModal;