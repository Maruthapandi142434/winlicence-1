export const getProductPrice = (product) => {
  if (!product) return { price: null, cycle: '' };

  try {
    // For core-based products
    if (product.pricingModel === 'core-based') {
      // Check for licenseTypes pricing structure
      if (product.licenseTypes) {
        const licenseType = Object.keys(product.licenseTypes)[0];
        if (licenseType) {
          const licenseData = product.licenseTypes[licenseType];
          
          // Check for billing options first
          if (licenseData?.billingOptions && Object.keys(licenseData.billingOptions).length > 0) {
            const firstBillingKey = Object.keys(licenseData.billingOptions)[0];
            const firstBillingValue = licenseData.billingOptions[firstBillingKey];
            
            let cycle = '';
            if (firstBillingKey.includes('Monthly')) {
              cycle = '/month';
            } else if (firstBillingKey.includes('threeYear')) {
              cycle = '/3 years';
            } else if (firstBillingKey.includes('yearly')) {
              cycle = '/year';
            } else {
              cycle = '/year'; // default fallback
            }
            
            return { price: firstBillingValue, cycle };
          }
          
          // Then check for base price (perpetual license)
          if (licenseData?.basePricePer2Cores) {
            return { price: licenseData.basePricePer2Cores, cycle: '/one-time' };
          }
        }
      }
    }
    
    // For fixed products with packages
    if (product.packages?.length > 0) {
      const firstPackage = product.packages[0];
      
      // Check for billing options first
      if (firstPackage?.billingOptions && Object.keys(firstPackage.billingOptions).length > 0) {
        const firstBillingKey = Object.keys(firstPackage.billingOptions)[0];
        const firstBillingValue = firstPackage.billingOptions[firstBillingKey];
        
        let cycle = '';
        if (firstBillingKey.includes('Monthly')) {
          cycle = '/month';
        } else if (firstBillingKey.includes('threeYear')) {
          cycle = '/3 years';
        } else if (firstBillingKey.includes('yearly')) {
          cycle = '/year';
        } else {
          cycle = '/year'; // default fallback
        }
        
        return { price: firstBillingValue, cycle };
      }
      
      // Then check for one-time price
      if (firstPackage?.oneTime) {
        return { price: firstPackage.oneTime, cycle: '/one-time' };
      }
    }
  } catch (error) {
    console.error('Error getting product price:', error);
  }
  
  // Default fallback for products without price info
  return { price: null, cycle: '' };
};