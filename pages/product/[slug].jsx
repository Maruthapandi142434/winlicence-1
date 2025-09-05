import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { products, categories } from '../../lib/data/products';
import { getCustomizationOptions, getBillingOptions } from '../../lib/data/getCustomizationOptions';
import { getProductPrice } from '../../lib/utils/productPrice';
import { contactProduct } from '../../lib/api';
import Link from 'next/link';
import CategorySidebar from '../../components/CategorySidebar';
// import MetaTags from "../../components/MetaTags"; // Removed to prevent conflicts
import Head from 'next/head';
import { organizations, productPageSchema } from "../../lib/data/schema";
import ContactFormModal from '../../components/ContactFormModal';
import { getDisplaySettings } from '../../lib/config/displayConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DropdownSelect = ({ label, value, options, onChange, className = "" }) => {
  return (
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
};

function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedLicenseType, setSelectedLicenseType] = useState('');
  const [selectedCore, setSelectedCore] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showFeaturesPopup, setShowFeaturesPopup] = useState(false);
  const [currentFeatures, setCurrentFeatures] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [renderedProductSchema, setRenderedProductSchema] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedProductForContact, setSelectedProductForContact] = useState(null);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  
  // Get display settings
  const displaySettings = getDisplaySettings('/product/[slug]');

  const formatIndianPrice = (number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number).replace('₹', '₹');
  };

  const toggleFeatures = (productId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  useEffect(() => {
    if (slug) {
      const product = products.find(p => p.slug === slug);
      if (product) {
        setSelectedProduct(product);
        setShowConfiguration(false);
        setSelectedPackage(null);
        setBillingCycle('');
        setQuantity(1);

        if (product.pricingModel === 'core-based') {
          const options = getCustomizationOptions(product);
          if (options?.licenseTypes?.length > 0) {
            const defaultLicenseType = options.licenseTypes[0].value;
            setSelectedLicenseType(defaultLicenseType);
            if (product.license?.minCores) {
              const defaultCore = product.license.minCores.toString();
              setSelectedCore(defaultCore);

              const initialBillingOptions = getBillingOptions(product, defaultLicenseType, defaultCore, 1);
              if (initialBillingOptions && Object.keys(initialBillingOptions).length > 0) {
                const firstOptionKey = Object.keys(initialBillingOptions).find(key => key !== 'oneTime') || Object.keys(initialBillingOptions)[0];
                setBillingCycle(firstOptionKey);
              }
            }
          }
        } else {
          setSelectedLicenseType('');
          setSelectedCore('');
        }

      } else {
        router.push('/404');
      }
      setIsLoading(false);
    }
  }, [slug, router]);

  const customizationOptions = useMemo(() => 
    getCustomizationOptions(selectedProduct), 
    [selectedProduct]
  );

  const quantityLabel = customizationOptions?.quantityLabel || "Quantity";

  const billingOptions = useMemo(() => {
    if (!showConfiguration && selectedProduct?.pricingModel === 'fixed' && selectedProduct.packages?.length > 0) {
      const firstPackage = selectedProduct.packages[0];
      const result = {};
      if (firstPackage.billingOptions) {
        for (const [key, value] of Object.entries(firstPackage.billingOptions)) {
          result[key] = value * quantity;
        }
      }
      if (firstPackage.oneTime) {
        result.oneTime = firstPackage.oneTime * quantity;
      }
      return result;
    } else if (!showConfiguration && selectedProduct?.pricingModel === 'core-based') {
      if (selectedLicenseType && selectedCore) {
        return getBillingOptions(selectedProduct, selectedLicenseType, selectedCore, quantity);
      }
      return {};
    }

    return getBillingOptions(selectedProduct, selectedLicenseType, selectedCore, quantity);
  }, [selectedProduct, selectedLicenseType, selectedCore, quantity, showConfiguration]);

  useEffect(() => {
    if (showConfiguration || selectedProduct?.pricingModel === 'fixed') {
      if (billingOptions && Object.keys(billingOptions).length > 0 && !billingCycle) {
        const firstOption = selectedLicenseType === 'Licensed' 
          ? Object.keys(billingOptions).find(key => key !== 'oneTime') 
          : Object.keys(billingOptions)[0];
        setBillingCycle(firstOption);
      }
    }
    else if (!showConfiguration && selectedProduct?.pricingModel === 'core-based') {
      if (billingOptions && Object.keys(billingOptions).length > 0 && !billingCycle) {
        const firstOption = Object.keys(billingOptions).find(key => key !== 'oneTime') || Object.keys(billingOptions)[0];
        setBillingCycle(firstOption);
      }
    }
  }, [billingOptions, billingCycle, selectedLicenseType, showConfiguration, selectedProduct]);

  const billingOptionItems = useMemo(() => {
    if (!billingOptions) return [];
    
    return Object.entries(billingOptions)
      .filter(([key]) => 
        key !== 'oneTime' && 
        key !== 'calculatedCores' && 
        key !== 'calculatedLicenses' &&
        key !== 'requiredLicenses'
      )
      .map(([cycle, price]) => {
        let cycleLabel = cycle.replace(/([A-Z])/g, ' $1')
                             .replace(/^./, str => str.toUpperCase());
        let cycleDuration = '';
        
        if (cycle.includes('Monthly')) {
          cycleDuration = '/month';
        } else if (cycle.includes('YearlyBilling')) {
          cycleDuration = '/year';
        } else if (cycle.includes('ThreeYearsBilling')) {
          cycleDuration = '/3 years';
        }
        
        return {
          label: `${cycleLabel}`,
          value: cycle,
          price: price,
          duration: cycleDuration
        };
      });
  }, [billingOptions]);

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    
    if (showConfiguration) {
      return billingCycle ? (billingOptions[billingCycle] || 0) : (billingOptions.oneTime || 0);
    }

    if (selectedProduct.pricingModel === 'core-based') {
      let currentLicenseType = selectedLicenseType;
      let currentCore = selectedCore;

      if (!currentLicenseType && customizationOptions?.licenseTypes?.length > 0) {
        currentLicenseType = customizationOptions.licenseTypes[0].value;
      }
      if (!currentCore && selectedProduct.license?.minCores) {
        currentCore = selectedProduct.license.minCores.toString();
      }

      if (currentLicenseType && currentCore) {
        const licenseTypeData = selectedProduct.licenseTypes[currentLicenseType];
        if (!licenseTypeData) return 0;

        const minCores = selectedProduct.license?.minCores || 2;
        const coresPerLicense = selectedProduct.license?.coresPerLicense || 2;
        const coreIncrement = selectedProduct.license?.coreIncrement || 2;

        let calculatedCores = parseInt(currentCore) || minCores;
        calculatedCores = Math.max(minCores, Math.min(selectedProduct.license?.maxCores || 10000000, calculatedCores));
        calculatedCores = Math.round(calculatedCores / coreIncrement) * coreIncrement;

        const licensesNeeded = Math.ceil(calculatedCores / coresPerLicense);

        if (licenseTypeData.billingOptions?.yearlyCommitMonthlyBilling) {
          return licenseTypeData.billingOptions.yearlyCommitMonthlyBilling * licensesNeeded;
        } else if (Object.keys(licenseTypeData.billingOptions || {}).length > 0) {
          return Object.values(licenseTypeData.billingOptions)[0] * licensesNeeded;
        } else if (currentLicenseType === 'Perpetual' && licenseTypeData.basePricePer2Cores) {
          return licenseTypeData.basePricePer2Cores * licensesNeeded;
        }
      }
      return 0;
    }
    
    if (selectedProduct.pricingModel === 'fixed') {
      if (selectedProduct.packages?.length > 0) {
        const firstPackage = selectedProduct.packages[0];
        if (firstPackage.billingOptions?.yearlyCommitMonthlyBilling) {
          return firstPackage.billingOptions.yearlyCommitMonthlyBilling * quantity;
        } else if (Object.keys(firstPackage.billingOptions || {}).length > 0) {
          return Object.values(firstPackage.billingOptions)[0] * quantity;
        } else if (firstPackage.oneTime) {
          return firstPackage.oneTime * quantity;
        }
      }
      return 0;
    }
    
    return 0;
  }, [selectedProduct, selectedLicenseType, selectedCore, billingCycle, quantity, showConfiguration, customizationOptions, billingOptions]);

  const handleLicenseTypeSelect = (e) => {
    setSelectedLicenseType(e.target.value);
    if (e.target.value === 'Perpetual' && selectedProduct?.license?.minCores) {
      setSelectedCore(selectedProduct.license.minCores.toString());
    } else {
      setSelectedCore('');
    }
    setBillingCycle('');
  };

  const handleCoreChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      setSelectedCore('');
      return;
    }
    
    if (!/^\d*$/.test(value)) return;
    
    setSelectedCore(value);
  };

  const handleCoreBlur = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      const min = customizationOptions?.minCores || 2;
      setSelectedCore(min.toString());
      return;
    }
    
    const numValue = parseInt(value) || 0;
    const min = customizationOptions?.minCores || 2;
    const max = customizationOptions?.maxCores || 10000000;
    const coreIncrement = customizationOptions?.coreIncrement || 2;
    
    let clampedValue = Math.max(min, Math.min(max, numValue));
    clampedValue = Math.round(clampedValue / coreIncrement) * coreIncrement;
    
    setSelectedCore(clampedValue.toString());
  };

  const handleBillingSelect = (e) => {
    setBillingCycle(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
      return;
    }

    const parsedValue = parseInt(value, 10);
    const min = customizationOptions?.minQuantity || 1;
    const max = customizationOptions?.maxQuantity || 10000000;

    if (!isNaN(parsedValue)) {
      setQuantity(Math.max(min, Math.min(max, parsedValue)));
    } else if (value === '') {
      setQuantity('');
    }
  };

  const handleProceedToCheckout = async () => {
    // Check login status
    const res = await fetch('/api/auth/check');
    if (res.ok) {
      setShowOrderConfirm(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleViewFeatures = (features) => {
    setCurrentFeatures(features || []);
    setShowFeaturesPopup(true);
  };

  const handleBuyNow = (pkg) => {
    // Gather configuration
    const query = {
      slug: selectedProduct.slug,
      type: selectedLicenseType,
      cores: selectedCore,
      billing: billingCycle,
      quantity: quantity
    };
    // If pkg is provided, use its type and billing options if available
    if (pkg) {
      query.type = selectedLicenseType || '';
      query.cores = selectedCore || '';
      if (pkg.billingOptions) {
        const firstBilling = Object.keys(pkg.billingOptions)[0];
        if (firstBilling) query.billing = firstBilling;
      }
    }
    // Remove undefined or empty values
    Object.keys(query).forEach(key => (query[key] === undefined || query[key] === '') && delete query[key]);
    const params = new URLSearchParams(query).toString();
    router.push(`/checkout?${params}`);
  };

  const handleBack = () => {
    setSelectedPackage(null);
    setSelectedLicenseType('');
    setSelectedCore('');
    setBillingCycle('');
    setQuantity(1);
    setShowConfiguration(false);
  };

  const renderCoreSelection = () => {
    if (!customizationOptions?.licenseTypes?.length) {
      return (
        <div className="mb-4 p-3 bg-yellow-50 rounded-md">
          <p className="text-yellow-800">No license options available for this product</p>
        </div>
      );
    }
    
    const isLicensed = selectedLicenseType === 'Licensed';
    const calculatedLicenses = billingOptions.calculatedLicenses || 0;
    const calculatedCores = billingOptions.calculatedCores || 0;
    const maxCores = customizationOptions?.maxCores || 10000000;

    const handleContactUsClick = (product) => {
      setSelectedProductForContact(product);
      setShowContactForm(true);
    };
    
    return (
      <div>
        <DropdownSelect
          label="License Type"
          value={selectedLicenseType}
          options={customizationOptions.licenseTypes}
          onChange={handleLicenseTypeSelect}
        />
        
        {selectedLicenseType && (
          <div className="mb-4">
            <label className="text-lg font-medium text-gray-800 mb-1">Core Configuration</label>
            <div className="flex items-center">
              <input
                type="number"
                onBlur={handleCoreBlur}
                min={2}
                step="2"
                max={maxCores}
                value={selectedCore || ''}
                onChange={handleCoreChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="ml-2 text-gray-800">Cores</span>
            </div>
          </div>
        )}
        
        {selectedLicenseType && selectedCore && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-800 text-sm">
              {isLicensed ? (
                <>
                  <span className="font-medium">{calculatedLicenses} Licenses</span> ({calculatedCores} Cores)
                </>
              ) : (
                <>
                  <span className="font-medium">{calculatedCores} Cores</span> (Perpetual License)
                </>
              )}
            </p>
          </div>
        )}
      </div>
    );
  };


  const renderBillingOptions = () => {
    const hasBillingOptions = customizationOptions?.hasBillingOptions;
    const isLicensed = selectedLicenseType === 'Licensed';
    
    if (!hasBillingOptions && !isLicensed && !billingOptions.oneTime) return null;
    
    return (
      <div>
        {(hasBillingOptions || isLicensed) && billingOptionItems.length > 0 && (
          <DropdownSelect
            label="Billing Option"
            value={billingCycle}
            options={billingOptionItems}
            onChange={handleBillingSelect}
          />
        )}
        
        {!hasBillingOptions && !isLicensed && billingOptions.oneTime && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-800 font-medium">
              One-time license purchase
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderQuantityAndTotal = () => {
    const minQuantity = customizationOptions?.minQuantity || 1;
    const maxQuantity = customizationOptions?.maxQuantity || 10000000;
    const isCoreBased = customizationOptions?.isCoreBased;
    const calculatedQuantity = billingOptions.calculatedLicenses || 1;
    
    return (
      <div className="py-4 px-2 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium text-xl">{quantityLabel}:</label>
          {isCoreBased ? (
            <input
              type="number"
              value={calculatedQuantity}
              readOnly
              className="w-20 p-2 border rounded-md text-center bg-gray-100"
            />
          ) : (
            <input
              type="number"
              min={minQuantity}
              max={maxQuantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 p-2 border rounded-md text-center"
            />
          )}
        </div>
        <div className='flex mb-1'>
          <div className='col'><span className='text-sm text-gray-700'>Min: {minQuantity}</span></div>
          <div className='col text-right'><span className='text-sm text-gray-700'>Max: {maxQuantity}</span></div>
        </div>
        <div className="pt-4 border-t border-gray-200">
  <div className="flex justify-between items-center">
    <span className="font-medium">Total Price:</span>
     <span className="text-xl font-bold text-blue-600">
            {formatIndianPrice(totalPrice)}
            {billingCycle && (
              <span className="text-sm text-gray-500 ml-1">
                {billingOptionItems.find(opt => opt.value === billingCycle)?.duration || ''}
              </span>
            )}
          </span>
  </div>
</div>
        
        <button
          onClick={handleProceedToCheckout}
          disabled={!totalPrice}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md disabled:opacity-50"
          data-product-id={selectedProduct.productId}
          data-product-name={selectedProduct.productName}
          data-product-price={formatIndianPrice(totalPrice)}
          data-product-term={(billingOptionItems.find(opt => opt.value === billingCycle)?.duration || 'one time').replace(/^\//, '')}
        >
          Proceed to Checkout
        </button>
      </div>
    );
  };

  const renderProductDetails = () => {
    const isExpanded = selectedProduct ? expandedProducts[selectedProduct.id] : false;

    if (selectedProduct.pricingModel === 'fixed' && selectedProduct.packages?.length > 0) {
      return (
        <div className="grid">
          {selectedProduct.packages.map((pkg) => (
            <div key={pkg.type} className="bg-white ">
              <div className="row">
                <div className='col-md-6 align-content-center bg-gray-100 bo  rounded'>
                <img 
                    src={selectedProduct.productimg || selectedProduct.img} 
                    alt={selectedProduct.name} 
                    className="w-[75%] object-contain m-auto hover:scale-105 transition-all duration-300"
                  />
                </div>

              <div className="col-md-6">
                <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left mb-4">
                  <img 
                    src={selectedProduct.img || selectedProduct.img} 
                    alt={selectedProduct.name} 
                    className="w-16 h-16 object-contain mr-4 mb-4 md:mb-0"
                  />
                  <div className='flex-1'>
                    <h2 className="text-2xl font-semibold text-black mb-2 text-left">
                      {selectedProduct.name} - {pkg.type}
                    </h2>
                    <p className="text-gray-800 text-lg mb-4 text-left">{selectedProduct.description}</p>
                  </div>
                </div>
                <div className="mb-4 border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h3>
                  <ul className="space-y-2">
                    {selectedProduct.features?.slice(0, isExpanded ? selectedProduct.features.length : 3).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-check text-green-500 mr-2 mt-1"></i>
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedProduct.features?.length > 3 && (
                    <button 
                      onClick={() => toggleFeatures(selectedProduct.id)}
                      className="text-blue-600 text-sm mt-2 hover:underline focus:outline-none"
                    >
                      {isExpanded ? 'Show less' : `+ ${selectedProduct.features.length - 3} more features`}
                    </button>
                  )}
                </div>
                <div className="ml-auto md:ml-0 mt-4 border-t pt-4">
                  {pkg.billingOptions ? (
                    <p className="text-xl font-bold text-blue-600">
                      {formatIndianPrice(Object.values(pkg.billingOptions)[0])}
                      <span className="text-sm text-gray-500 ml-1">
                        {(() => {
                          const key = Object.keys(pkg.billingOptions)[0] || '';
                          if (key.includes('Monthly')) return '/month';
                          if (key.includes('YearlyBilling')) return '/year';
                          if (key.includes('ThreeYearsBilling')) return '/3 years';
                          return '';
                        })()}
                      </span>
                    </p>
                  ) : pkg.oneTime ? (
                     <p className="text-xl font-bold text-blue-600">
                       {formatIndianPrice(pkg.oneTime)}
                       <span className="text-sm text-gray-500 ml-1">/one-time</span>
                     </p>
                  ) : (
                    <p className="text-xl font-bold text-blue-600">
                      Contact for pricing
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">{customizationOptions.quantityLabel}:</span>
                    <input 
                      type="number" 
                      min={customizationOptions.minQuantity} 
                      max={customizationOptions.maxQuantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 p-2 border rounded text-center"
                    />
                  </div>
                  {displaySettings.showBuyNow ? (
                    pkg.billingOptions && Object.keys(pkg.billingOptions).length > 0 ? (
                      <button
                        onClick={() => handleBuyNow(pkg)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
                        data-product-id={selectedProduct.productId}
                        data-product-name={selectedProduct.productName}
                        data-product-price={formatIndianPrice(Object.values(pkg.billingOptions)[0])}
                        data-product-term={(() => {
                          const key = Object.keys(pkg.billingOptions)[0] || '';
                          if (key.includes('Monthly')) return 'month';
                          if (key.includes('YearlyBilling')) return 'year';
                          if (key.includes('ThreeYearsBilling')) return '3 years';
                          return '';
                        })()}
                      >
                        Buy Now
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBuyNow(pkg)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
                        data-product-id={selectedProduct.productId}
                        data-product-name={selectedProduct.productName}
                        data-product-price={pkg.oneTime ? formatIndianPrice(pkg.oneTime) : ''}
                        data-product-term="one time"
                      >
                        Buy Now
                      </button>
                    )
                  ) : displaySettings.showContactUs ? (
                    <button
                      onClick={() => handleContactUsClick(selectedProduct)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
                    >
                      Contact Us
                    </button>
                  ) : null}
                </div>
              </div>
              </div>
             
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="bg-white ">
          <div className="row">
            <div className='col-md-6 align-content-center bg-gray-50'>
            <img 
                src={selectedProduct.productimg || selectedProduct.img} 
                alt={selectedProduct.name} 
                className="w-[75%]  object-contain m-auto hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="col-md-6">
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left mb-4">
              <img 
                src={selectedProduct.img || selectedProduct.img} 
                alt={selectedProduct.name} 
                className="w-16 h-16 object-contain mr-4 mb-4 md:mb-0"
              />
              <div className='flex-1'>
                <h2 className="text-2xl font-semibold text-black mb-2 text-left">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-800 text-lg mb-4 text-left">{selectedProduct.description}</p>
              </div>
            </div>
            <div className="mb-4 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h3>
              <ul className="space-y-2">
                {selectedProduct.features?.slice(0, isExpanded ? selectedProduct.features.length : 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mr-2 mt-1"></i>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              {selectedProduct.features?.length > 3 && (
                <button 
                  onClick={() => toggleFeatures(selectedProduct.id)}
                  className="text-blue-600 text-sm mt-2 hover:underline focus:outline-none"
                >
                  {isExpanded ? 'Show less' : `+ ${selectedProduct.features.length - 3} more features`}
                </button>
              )}
            </div>
            <div className="ml-auto md:ml-0 mt-4 border-t pt-4">
              <p className="text-xl font-bold text-blue-600">
                {totalPrice > 0 ? formatIndianPrice(totalPrice) : 'Contact for pricing'}
                {selectedProduct.pricingModel === 'core-based' && totalPrice > 0 && billingCycle && ( 
                  <span className="text-sm text-gray-500 ml-1">
                    {billingOptionItems.find(opt => opt.value === billingCycle)?.duration || ''}
                  </span> 
                )}
              </p>
            </div>
            
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
              {displaySettings.showBuyNow ? (
                <button
                  onClick={() => handleBuyNow(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors w-full text-lg"
                  data-product-id={selectedProduct.productId}
                  data-product-name={selectedProduct.productName}
                  data-product-price={totalPrice > 0 ? formatIndianPrice(totalPrice) : 'Contact for pricing'}
                  data-product-term={(billingOptionItems.find(opt => opt.value === billingCycle)?.duration || '').replace(/^\//, '')}
                >
                  Buy Now
                </button>
              ) : displaySettings.showContactUs ? (
                <button
                  onClick={() => handleContactUsClick(selectedProduct)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors w-full text-lg"
                >
                  Contact Us
                </button>
              ) : null}
            </div>
          </div>
          </div>
          
        </div>
      );
    }
  };

  // Contact form handlers
  const handleContactUsClick = (product) => {
    setSelectedProductForContact(product);
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
    setSelectedProductForContact(null);
    // Clear form fields when closing the modal
    setName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setMessage('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    const { price, cycle } = getProductPrice(selectedProductForContact);

    const formData = {
      name,
      email,
      phone,
      company: CompanyName,
      message,
      subject: {
        title: selectedProductForContact?.name || 'N/A',
        price: price,
        description: selectedProductForContact?.description || 'N/A',
        category: selectedProductForContact?.category || 'N/A',
      },
    };

    try {
      await contactProduct(formData);
      console.log('Form submitted successfully!');
      toast.success('Your message has been sent!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseContactForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const orderData = {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        company: userDetails.company,
        subject: `Order for ${selectedProduct.name}`,
        product: selectedProduct.name,
        package: selectedPackage?.type || '',
        billing: billingCycle || 'oneTime',
        quantity: quantity,
        total: totalPrice,
        licenseType: selectedLicenseType,
        cores: selectedCore,
        productId: selectedProduct.id
      };

      const response = await fetch('/api/initiateorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      alert('Order submitted successfully! We will contact you shortly.');
      setShowPopup(false);
      
      setUserDetails({
        name: '',
        email: '',
        phone: '',
        company: '',
      });

      router.push('/dashboard');

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create schema data for the product page
  const getProductSchema = (productData, calculatedTotalPrice) => {
    // Find the product in the schema
    const schemaProduct = productPageSchema[0]?.itemListElement?.find(
      item => item.url.includes(productData?.slug)
    );

    if (schemaProduct) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        ...schemaProduct.item,
        "offers": {
          ...schemaProduct.item.offers,
          "url": `https://winlicense.in/product/${productData?.slug}`,
          "price": calculatedTotalPrice > 0 ? calculatedTotalPrice.toString() : schemaProduct.item.offers.price
        }
      };
    }

    // Fallback to dynamic schema if not found in predefined schemas
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productData?.name || "",
      "image": productData?.img || "",
      "description": productData?.description || "",
      "brand": {
        "@type": "Brand",
        "name": "microsoft"
      },
      "sku": productData?.sku || "",
      "offers": {
        "@type": "Offer",
        "url": `https://winlicense.in/product/${productData?.slug}`,
        "priceCurrency": "INR",
        "price": calculatedTotalPrice > 0 ? calculatedTotalPrice.toString() : "",
        "availability": "https://schema.org/OnlineOnly",
        "itemCondition": "https://schema.org/NewCondition"
      },
    };
  };

  // Effect to generate schema when router is ready, product data is available, and total price is calculated
  useEffect(() => {
    if (router.isReady && selectedProduct && totalPrice) {
      const schema = getProductSchema(selectedProduct, totalPrice);
      setRenderedProductSchema(schema);
    }
  }, [router.isReady, selectedProduct, totalPrice]);

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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!selectedProduct) {
    return <div className="flex justify-center items-center h-screen">Product not found</div>;
  }

  return (
    <div>
       <Head>
          <title>Buy Now {selectedProduct.category} - {selectedProduct.name || 'Product'} </title>
          <meta name="description" content={`${selectedProduct.metadescription}`} />
          <link rel="canonical" href={`https://winlicense.in/product/${selectedProduct.slug}`} />
          <meta property="og:title" content={`Configure ${selectedProduct.name}`} />
          <meta property="og:description" content={`Configure your ${selectedProduct.metadescription} package with license type, cores, and billing options.`} />
          <meta property="og:url" content={`https://winlicense.in/product/${selectedProduct.slug}`} />
          <meta property="og:type" content="product" />
          <meta property="og:image" content={selectedProduct.img} />
          <meta property="og:image:alt" content={selectedProduct.name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`Configure ${selectedProduct.name}`} />
          <meta name="twitter:description" content={`Configure your ${selectedProduct.metadescription} package with license type, cores, and billing options.`} />
          <meta name="twitter:image" content={selectedProduct.img} />
          <meta name="twitter:image:alt" content={selectedProduct.name} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizations) }}
          />
          {renderedProductSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(renderedProductSchema) }}
            />
          )}
        </Head>
      <section className="com-banner-sec">
        <div className="container">
          <div className="row">
            <div className="col-12 home-head-1">
              {selectedProduct.name.toUpperCase()}
            </div>
          </div>
        </div>
      </section>
      
      <div className="about-section">
        <div className="about-header">
          <p>
            <Link href="/" className="hover:text-white-600">Home</Link> 
            <i className="fa-solid fa-angles-right mx-2"></i> 
            <Link href="/product" className="hover:text-white-600">Products</Link> 
            <i className="fa-solid fa-angles-right mx-2"></i> 
            {selectedProduct.category && (
              <>
                <Link href={`/product?category=${categories.find(c => c.name === selectedProduct.category)?.slug || ''}`}>
                  {selectedProduct.category}
                </Link>
                <i className="fa-solid fa-angles-right mx-2"></i> 
              </>
            )}
            <span className="text-white">{selectedProduct.name}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <CategorySidebar />
        
        <div className="flex-1 w-full lg:w-4/5 product-page-block bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white block mb-12 product-page-block">

              {showConfiguration ? (
                <div className="product-config max-w-2xl mx-auto  shadow-md bg-white hover:shadow-blue-500/50">
                  <div className="customization-header flex items-center mb-6">
                    <button 
                      onClick={handleBack} 
                      className="back-button mr-4 p-2 rounded-full hover:bg-gray-100"
                    >
                      <i className="fa-solid fa-arrow-left text-gray-600"></i>
                    </button>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Configure Your Package
                    </h2>
                  </div>

                  <div className="bg-blue-50 rounded-md p-4 mb-6">
                    <p className="text-sm md:text-base">
                      Selected: <span className="font-medium">{selectedProduct.name}</span>
                      {selectedPackage?.type && (
                        <span className="font-medium"> - {selectedPackage.type}</span>
                      )}
                    </p>
                  </div>

                  {selectedProduct.pricingModel === 'core-based' && renderCoreSelection()}
                  {renderBillingOptions()}
                  {renderQuantityAndTotal()}
                </div>
              ) : (
                renderProductDetails()
              )}
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg md:text-xl font-bold mb-4">Enter Your Details</h2>
<form onSubmit={handleSubmit}>
  <div className="space-y-3 md:space-y-4">
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={userDetails.name}
      onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
      required
      disabled={isSubmitting}
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={userDetails.email}
      onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
      required
      disabled={isSubmitting}
    />
    <input
      type="tel"
      name="phone"
      placeholder="Phone"
      value={userDetails.phone}
      onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
      required
      disabled={isSubmitting}
    />
    <input
      type="text"
      name="company"
      placeholder="Company Name"
      value={userDetails.company}
      onChange={(e) => setUserDetails({ ...userDetails, company: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
      required
      disabled={isSubmitting}
    />
  </div>

  <div className="mt-4 md:mt-6 flex justify-between space-x-4">
    <button
      type="button"
      onClick={() => setShowPopup(false)}
      className="bg-gray-400 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm md:text-base transition duration-200 shadow"
      disabled={isSubmitting}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm md:text-base text-white transition duration-200 flex items-center justify-center min-w-[100px] shadow"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Submitting...
        </>
      ) : (
        'Submit'
      )}
    </button>
  </div>
</form>

              </div>
            </div>
          )}

          {showFeaturesPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Package Features</h2>
                  <button
                    onClick={() => setShowFeaturesPopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ul className="space-y-3">
                  {currentFeatures?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fa-solid fa-check text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setShowFeaturesPopup(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

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

          {showOrderConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Confirm Your Order</h2>
                <p>Are you sure you want to place this order?</p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={async () => {
                      setIsSubmitting(true);
                      try {
                        const orderData = {
                          subject: `Order for ${selectedProduct.name}`,
                          product: selectedProduct.name,
                          package: selectedPackage?.type || '',
                          billing: billingCycle || 'oneTime',
                          quantity: quantity,
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
                        setShowOrderConfirm(false);
                      } catch (error) {
                        alert('There was an error submitting your order. Please try again.');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
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

          {/* Product Description Section */}
          <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Description
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {selectedProduct.description || `${selectedProduct.name} offers advanced features that improve security, performance, and flexibility. With cutting-edge technology and robust infrastructure capabilities, this solution provides a strong foundation for your business needs while introducing innovative enhancements to adapt to your requirements.`}
                </p>
                
                {selectedProduct.longDescription && (
                  <p className="text-gray-700 text-base leading-relaxed mb-4">
                    {selectedProduct.longDescription}
                  </p>
                )}
              </div>
            </div>

            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        <span className="font-medium">{feature.split(':')[0]}:</span>
                        {feature.includes(':') ? (
                          <span className="ml-1">{feature.split(':').slice(1).join(':').trim()}</span>
                        ) : (
                          <span className="ml-1">{feature}</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.specifications && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Specifications:</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedProduct.requirements && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">System Requirements:</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {Array.isArray(selectedProduct.requirements) ? (
                      selectedProduct.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <i className="fa-solid fa-check text-blue-600 mt-1 text-sm"></i>
                          <span className="text-gray-700 text-sm">{req}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-700 text-sm">{selectedProduct.requirements}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedProduct.category && (
              <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                <p>
                  For {selectedProduct.name} hardware requirements, check out the{' '}
                  <Link href={`/product?category=${categories.find(c => c.name === selectedProduct.category)?.slug || ''}`} className="text-blue-600 hover:text-blue-800 underline">
                    component requirements
                  </Link>.
                </p>
              </div>
            )}
          </div>

          {/* Related Products Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">You May Also Like</h4>
              <p className="text-gray-600">Discover more products that might interest you</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                  .filter(product => 
                    product.category === selectedProduct.category && 
                    product.id !== selectedProduct.id
                  )
                  .slice(0, 12)
                  .map((product) => {
                    const { price, cycle } = getProductPrice(product);
                    return (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 min-h-[280px] flex flex-col"
                      >
                        <div className="text-center flex-grow">
                          <div className="mb-4">
                            <img 
                              src={product.img} 
                              alt={product.name} 
                              className="w-16 h-16 object-contain mx-auto"
                              onError={(e) => {
                                e.target.src = '/images/product-placeholder.png';
                              }}
                            />
                          </div>
                          <h5 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[48px]">
                            {product.name}
                          </h5>
                          <div className="mb-4">
                            <div className="text-center">
                              {price !== null ? (
                                <div>
                                  <span className="text-xl font-bold text-blue-600">
                                    {formatIndianPrice(price)}
                                  </span>
                                  {cycle && (
                                    <span className="text-sm text-gray-500 ml-1">
                                      {cycle === '/month' ? '/month' :
                                       cycle === '/year' ? '/year' :
                                       cycle === '/3 years' ? '/3 years' :
                                       cycle === '/one-time' ? '' : cycle}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-lg font-semibold text-gray-600">Contact for pricing</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto space-y-2">
                          <Link
                            href={`/product/${product.slug}`}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedProductForContact(product);
                              setShowContactForm(true);
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                          >
                            Contact Us
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {products.filter(product => 
                product.category === selectedProduct.category && 
                product.id !== selectedProduct.id
              ).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No related products found in this category.</p>
                  <p className="text-gray-400 text-sm mt-2">Check out our other product categories for more options.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form Modal */}
          {showContactForm && selectedProductForContact && (
            <ContactFormModal
              show={showContactForm}
              onClose={handleCloseContactForm}
              selectedProduct={selectedProductForContact}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              CompanyName={CompanyName}
              setCompanyName={setCompanyName}
              message={message}
              setMessage={setMessage}
              isSubmitting={isContactSubmitting}
              handleSubmit={handleContactSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;