import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products, categories } from '../../lib/data/products';
import { getProductPrice } from '../../lib/utils/productPrice';
import ProductSidebar from '../../components/ProductSidebar';
import MetaTags from "../../components/MetaTags";
import Head from 'next/head';
import { organizations, productPageSchema } from "../../lib/data/schema"
const PRODUCTS_PER_PAGE = 12;

function ProductsList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProducts, setExpandedProducts] = useState({});

  // Toggle function for expanding/collapsing features
  const toggleFeatures = (productId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Filter products based on search term and selected categories
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm 
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesCategories = selectedCategories.length > 0
      ? selectedCategories.includes(categories.find(c => c.name === product.category)?.slug)
      : true;
    
    return matchesSearch && matchesCategories;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1)
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryToggle = (categorySlug) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(slug => slug !== categorySlug)
        : [...prev, categorySlug]
    );
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  return (
    <div>
      <Head>
      <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( organizations ) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify( productPageSchema ) }}
            />
      </Head>
      <MetaTags />
      <section className="com-banner-sec">
        <div className="container">
          <div className="row">
            <h1 className="home-head-1">PRODUCTS</h1>
          </div>
        </div>
      </section>
      
      <div className="about-section">
        <div className="about-header">
          <p>
            <Link href="/">Home</Link> 
            <i className="fa-solid fa-angles-right mx-2"></i> 
            Products
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <ProductSidebar 
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showCategoryFilters={true}
        />
        
        <div className="flex-1 w-full product-list-sec md:p-8 bg-[#f7f9fb]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm 
                  ? `Search results for "${searchTerm}"`
                  : selectedCategories.length > 0
                    ? `${selectedCategories.map(slug => 
                        categories.find(c => c.slug === slug)?.name).join(', ')} Products`
                    : 'All Products'}
              </h2>
              <p className="text-gray-700">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchTerm('');
                  }} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => {
                    const { price, cycle } = getProductPrice(product);
                    const isExpanded = expandedProducts[product.id];
                    
                    return (
                      <div key={product.id} className="bg-[#f7f9fb] rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300">
                        <div className="p-6 flex flex-col h-full justify-around">
                          <div className="flex flex-col items-center text-center mb-2">
                            <img 
                              src={product.img} 
                              alt={product.name} 
                              className="w-16 h-16 object-contain mb-4"
                              onError={(e) => {
                                e.target.src = '/images/product-placeholder.png';
                              }}
                            />
                            <h3 className="text-2xl font-semibold text-black text-center w-full ">{product.name}</h3>
                           
<div className="pt-2 border-t border-gray-100 w-full">
                            <div className=" mb-4">
 <div>
                                <p className="text-4xl font-bold text-blue-600 mb-3 mt-2 text-center">
                                  {price !== null ? `₹${price.toLocaleString()}` : 'Contact for pricing'}
                                  {price !== null && cycle && (
                                    <span className="text-sm text-gray-700 ml-1">
                                      {cycle === '/month' ? '/month' : 
                                       cycle === '/year' ? '/year' : 
                                       cycle === '/3 years' ? '/3 years' :
                                       cycle === '/one-time' ? '/one-time' : ''}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <Link 
                                href={`/product/${product.slug}`}
                                passHref
                                legacyBehavior
                              >
                                <button className="bg-blue-600 w-full hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors w-full text-lg">
                                  Buy Now
                                </button>
                              </Link>
                            </div>
                            
                          </div>

                            <p className="text-black text-xl mb-2 w-full font-bold text-center">{product.category} - {product.Year}</p>
                          </div>
                          
                          <div className="mb-4">
                            <ul className="space-y-2">
                              {product.features?.slice(0, isExpanded ? product.features.length : 3).map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <i className="fa-solid fa-check text-green-500 mr-2 mt-1"></i>
                                  <span className="text-gray-800 text-lg">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            {product.features?.length > 3 && (
                              <button 
                                onClick={() => toggleFeatures(product.id)}
                                className="text-blue-600 text-sm mt-2 hover:underline focus:outline-none"
                              >
                                {isExpanded ? 'Show less' : `+ ${product.features.length - 3} more features`}
                              </button>
                            )}
                          </div>
                          

                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="inline-flex rounded-md shadow">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border-t border-b border-gray-300 ${
                            currentPage === page 
                              ? 'bg-blue-50 text-blue-600 font-medium' 
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;