import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { products } from '../lib/data/products';
import { getCustomizationOptions, getBillingOptions } from '../lib/data/getCustomizationOptions';
import Head from 'next/head';
import CategorySidebar from '../components/CategorySidebar';

const DropdownSelect = ({ label, value, options, onChange, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label className="text-lg font-medium text-gray-800 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

function CheckoutPage() {
  const router = useRouter();
  const { slug, type, cores, billing, quantity } = router.query;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLicenseType, setSelectedLicenseType] = useState(type || '');
  const [selectedCore, setSelectedCore] = useState(cores || '');
  const [billingCycle, setBillingCycle] = useState(billing || '');
  const [qty, setQty] = useState(quantity ? parseInt(quantity) : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  useEffect(() => {
    if (slug) {
      const product = products.find(p => p.slug === slug);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [slug]);

  // Check login status on mount
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  const customizationOptions = useMemo(() => getCustomizationOptions(selectedProduct), [selectedProduct]);
  const billingOptions = useMemo(() => {
    if (!selectedProduct) return {};
    return getBillingOptions(selectedProduct, selectedLicenseType, selectedCore, qty);
  }, [selectedProduct, selectedLicenseType, selectedCore, qty]);

  const billingOptionItems = useMemo(() => {
    if (!billingOptions) return [];
    return Object.entries(billingOptions)
      .filter(([key]) => key !== 'oneTime' && key !== 'calculatedCores' && key !== 'calculatedLicenses' && key !== 'requiredLicenses')
      .map(([cycle, price]) => {
        let cycleLabel = cycle.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        let cycleDuration = '';
        if (cycle.includes('Monthly')) cycleDuration = '/month';
        else if (cycle.includes('YearlyBilling')) cycleDuration = '/year';
        else if (cycle.includes('ThreeYearsBilling')) cycleDuration = '/3 years';
        return { label: `${cycleLabel}`, value: cycle, price, duration: cycleDuration };
      });
  }, [billingOptions]);

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    if (billingCycle) return billingOptions[billingCycle] || 0;
    return billingOptions.oneTime || 0;
  }, [selectedProduct, billingOptions, billingCycle]);

  const handleLicenseTypeSelect = (e) => {
    setSelectedLicenseType(e.target.value);
    setSelectedCore('');
    setBillingCycle('');
  };
  const handleCoreChange = (e) => {
    setSelectedCore(e.target.value);
  };
  const handleBillingSelect = (e) => {
    setBillingCycle(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQty(Math.max(1, parseInt(e.target.value) || 1));
  };

  // Order submission for logged-in user
  const handleOrderConfirm = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        subject: `Order for ${selectedProduct.name}`,
        product: selectedProduct.name,
        billing: billingCycle || 'oneTime',
        quantity: qty,
        total: totalPrice,
        licenseType: selectedLicenseType,
        cores: selectedCore,
        productId: selectedProduct.id
      };
      const response = await fetch('/api/initiateorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to submit order');
      alert('Order submitted successfully! We will contact you shortly.');
      router.push('/dashboard');
    } catch (error) {
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowOrderConfirm(false);
    }
  };

  if (!selectedProduct) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div>
      <Head>
        <title>Checkout - {selectedProduct.name} {selectedProduct.category}</title>
        <meta name="description" content={`Checkout - ${selectedProduct.name} ${selectedProduct.category}`} />
        <meta property="og:title" content={`Checkout - ${selectedProduct.name} ${selectedProduct.category}`} />
        <meta property="og:description" content={`Checkout - ${selectedProduct.name} ${selectedProduct.category} package with license type, cores, and billing options.`} />
        <meta property="og:url" content={`https://winlicense.in/product/${selectedProduct.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={selectedProduct.img} />
        <meta property="og:image:alt" content={selectedProduct.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Checkout - ${selectedProduct.name} ${selectedProduct.category}`} />
        <meta name="twitter:description" content={`Checkout - ${selectedProduct.name} ${selectedProduct.category} package with license type, cores, and billing options.`} />
        <meta name="twitter:image" content={selectedProduct.img} />
        <meta name="twitter:image:alt" content={selectedProduct.name} />
      </Head>
      {/* Banner Hero Section and Breadcrumbs */}
      <section className="com-banner-sec">
        <div className="container">
          <div className="row">
            <h1 className="home-head-1">CHECKOUT</h1>
          </div>
        </div>
      </section>
      <div className="about-section">
        <div className="about-header">
          <p>
            <a href="/" className="hover:text-white-600">Home</a>
            <i className="fa-solid fa-angles-right mx-2"></i>
            <a href="/product" className="hover:text-white-600">Products</a>
            <i className="fa-solid fa-angles-right mx-2"></i>
            <span className="text-white">Checkout</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <CategorySidebar />
        <div className="flex-1 w-full lg:w-4/5 product-page-block bg-gray-50">
          <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow">
            {/* Back Arrow */}
            <button
              onClick={() => router.back()}
              className="back-button mb-4 p-2 rounded-full hover:bg-gray-100 flex items-center"
              aria-label="Go back"
            >
              <i className="fa-solid fa-arrow-left text-gray-600 mr-2"></i> Back
            </button>
            <h2 className="text-2xl font-bold mb-6">Configure Your Package</h2>
            <div className="bg-blue-50 rounded-md p-4 mb-6">
              <p className="text-sm md:text-base">
                Selected: <span className="font-medium">{selectedProduct.name}</span>
              </p>
            </div>
            {selectedProduct.pricingModel === 'core-based' && customizationOptions.licenseTypes && (
              <DropdownSelect
                label="License Type"
                value={selectedLicenseType}
                options={customizationOptions.licenseTypes}
                onChange={handleLicenseTypeSelect}
              />
            )}
            {selectedLicenseType && (
              <div className="mb-4">
                <label className="text-lg font-medium text-gray-800 mb-1">Core Configuration</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min={customizationOptions.minCores || 2}
                    step={customizationOptions.coreIncrement || 2}
                    max={customizationOptions.maxCores || 10000000}
                    value={selectedCore || ''}
                    onChange={handleCoreChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-800">Cores</span>
                </div>
              </div>
            )}
            {(customizationOptions.hasBillingOptions || selectedLicenseType === 'Licensed') && billingOptionItems.length > 0 && (
              <DropdownSelect
                label="Billing Option"
                value={billingCycle}
                options={billingOptionItems}
                onChange={handleBillingSelect}
              />
            )}
            <div className="mb-4">
              <label className="font-medium text-xl">Quantity:</label>
              <input
                type="number"
                min={customizationOptions.minQuantity || 1}
                max={customizationOptions.maxQuantity || 10000000}
                value={qty}
                onChange={handleQuantityChange}
                className="w-20 p-2 border rounded-md text-center ml-2"
              />
            </div>
            <div className="pt-4 border-t border-gray-200 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Price:</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{totalPrice.toLocaleString()}
                  {billingCycle && (
                    <span className="text-sm text-gray-500 ml-1">
                      {billingOptionItems.find(opt => opt.value === billingCycle)?.duration || ''}
                    </span>
                  )}
                </span>
              </div>
            </div>
            {/* If user is logged in, show only confirm order button, else show login/register modal */}
            {user ? (
              <div className="mb-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md disabled:opacity-50 mt-4"
                  onClick={() => setShowOrderConfirm(true)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Order'}
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login or Register to Continue
                </button>
              </div>
            )}
            {/* Order confirmation modal */}
            {showOrderConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-lg font-bold mb-4">Confirm Your Order</h2>
                  <p>Are you sure you want to place this order?</p>
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleOrderConfirm}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm'}
                    </button>
                    <button
                      onClick={() => setShowOrderConfirm(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Login/Register modal */}
            {showLoginModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h2 className="text-lg font-bold mb-4 text-center">Please Login or Register</h2>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => window.location.href = '/register'}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 