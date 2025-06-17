import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products, categories } from '../../../lib/data/products';
import { getProductPrice } from '../../../lib/utils/productPrice';
import CategorySidebar from '../../../components/CategorySidebar';
import MetaTags from "../../../components/MetaTags"; // Removed to prevent conflicts
import Head from 'next/head';
import { organizations, productcategorySchema } from "../../../lib/data/schema";

const PRODUCTS_PER_PAGE = 12;

function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProducts, setExpandedProducts] = useState({});
  const [renderedCategorySchema, setRenderedCategorySchema] = useState(null);

  // Toggle function for expanding/collapsing features
  const toggleFeatures = (productId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const currentCategory = categories.find(c => c.slug === slug);
  let categoryProducts = products.filter(product => 
    currentCategory && product.category === currentCategory.name
  );

  // Get the appropriate schema based on the category slug
  const getCategorySchema = (currentSlug, currentCategoryData, prodsInCat) => {
    const schemaName = currentSlug?.replace(/-/g, '_');
    
    if (schemaName && productcategorySchema[schemaName]) {
      return productcategorySchema[schemaName][0] || {}; 
    }

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": currentCategoryData?.name || "Product Category",
      "description": currentCategoryData?.description || "Browse our collection of products",
      "url": `https://winlicense.in/product/category/${currentSlug}`,
      "numberOfItems": prodsInCat.length,
      "itemListElement": prodsInCat.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://winlicense.in/product/${product.slug}`,
        "item": {
          "@type": "Product",
          "name": product.name,
          "image": product.img,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "microsoft"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://winlicense.in/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": getProductPrice(product).price,
            "availability": "https://schema.org/OnlineOnly"
          }
        }
      }))
    };
  };

  // Effect to generate schema when router is ready and slug is available
  useEffect(() => {
    if (router.isReady && slug && currentCategory) {
      const schema = getCategorySchema(slug, currentCategory, categoryProducts);
      setRenderedCategorySchema(schema);
    }
  }, [router.isReady, slug, currentCategory, categoryProducts]);

  if (searchTerm) {
    categoryProducts = categoryProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const totalPages = Math.ceil(categoryProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = categoryProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

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

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (!currentCategory) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700">Category not found</div>
      </div>
    );
  }

  return (
    <div>
      <MetaTags />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizations) }}
        />
        {renderedCategorySchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(renderedCategorySchema) }}
          />
        )}
      </Head>
      <section className="com-banner-sec">
        <div className="container">
          <div className="row">
            <h1 className="home-head-1">{currentCategory.name.toUpperCase()}</h1>
          </div>
        </div>
      </section>
      
      <div className="about-section">
        <div className="about-header">
          <p>
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link> 
            <i className="fa-solid fa-angles-right mx-2"></i> 
            <Link href="/product" className="hover:text-white transition-colors">Products</Link> 
            <i className="fa-solid fa-angles-right mx-2"></i> 
            <span className="text-white">{currentCategory.name}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <CategorySidebar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showCategoryFilters={false}
        />
        
        <div className="flex-1 w-full product-list-sec md:p-8 bg-[#f8f9fa]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#0080ce] mb-2 text-center">{currentCategory.name}</h2>
              <p className="text-gray-600 text-center mb-4">{currentCategory.description}</p>
              {searchTerm && (
                <p className="text-gray-600 text-sm mt-2">
                  Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} matching "{searchTerm}"
                </p>
              )}
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {searchTerm
                    ? `No products found matching "${searchTerm}" in this category.`
                    : 'No products found in this category.'}
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => {
                    const { price, cycle } = getProductPrice(product);
                    const isExpanded = expandedProducts[product.id];
                    
                    return (
                      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300">
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
                            <h3 className="text-2xl font-semibold text-black text-center w-full mb-2">{product.name}</h3>
                            <div className="border-t border-gray-100 mb-4 w-full">
                              <div className="items-center mb-2">
                                <p className="text-4xl font-bold text-blue-600 mb-3 mt-2 text-center">
                                  {price !== null ? `₹${price.toLocaleString()}` : 'Contact for pricing'}
                                  {price !== null && cycle && <span className="text-sm text-gray-600 ml-1">{cycle}</span>}
                                </p>
                              </div>
                              <div>
                                <Link 
                                  href={`/product/${product.slug}`}
                                  passHref
                                  legacyBehavior
                                >
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors text-lg w-full">
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

export default CategoryPage;