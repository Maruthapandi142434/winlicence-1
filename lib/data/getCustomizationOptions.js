export const getCustomizationOptions = (product) => {
  if (!product) return {};
  
  if (product.pricingModel === 'core-based') {
    if (!product.licenseTypes || typeof product.licenseTypes !== 'object') {
      return {
        licenseTypes: [],
        quantityLabel: "Quantity"
      };
    }

    const licenseTypes = [
      { label: "Subscription License", value: "Licensed" },
      { label: "Perpetual License", value: "Perpetual" }
    ].filter(lt => product.licenseTypes[lt.value]);
    
    return {
      licenseTypes,
      coresPerLicense: product.license?.coresPerLicense || 2,
      quantityLabel: "Licenses",
      minCores: product.license?.minCores || 2,
      maxCores: product.license?.maxCores || 10000000,
      coreIncrement: product.license?.coreIncrement || 2, // Changed to 1 to allow any value
      isCoreBased: true
    };
  }
  
  if (product.pricingModel === 'fixed') {
    const hasBillingOptions = product.packages?.some(pkg => pkg.billingOptions);
    const hasOneTime = product.packages?.some(pkg => pkg.oneTime);
    
    if (product.users) return { 
      quantityLabel: "Users",
      minQuantity: product.users?.min || 1,
      maxQuantity: product.users?.max || 10000000,
      hasBillingOptions,
      hasOneTime
    };
    
    if (product.device) return { 
      quantityLabel: "Devices",
      minQuantity: product.device?.min || 1,
      maxQuantity: product.device?.max || 10000000,
      hasBillingOptions,
      hasOneTime
    };
    
    if (product.license) return {
      quantityLabel: "Licenses",
      minQuantity: product.license?.min || 1,
      maxQuantity: product.license?.max || 10000000,
      hasBillingOptions,
      hasOneTime
    };
    
    return { 
      quantityLabel: "Quantity",
      minQuantity: 1,
      maxQuantity: 10000000,
      hasBillingOptions,
      hasOneTime
    };
  }
  
  return {};
};

export const getBillingOptions = (product, selectedLicenseType, selectedCore, quantity = 1, selectedPackage = null) => {
  if (!product) return {};
  
  if (product.pricingModel === 'core-based') {
    if (!selectedLicenseType || !selectedCore || !product.licenseTypes) return {};
    
    const licenseTypeData = product.licenseTypes[selectedLicenseType];
    if (!licenseTypeData) return {};
    
    // Validate and round core count
    const minCores = product.license?.minCores || 2;
    const maxCores = product.license?.maxCores || 10000000;
    const coreIncrement = product.license?.coreIncrement || 2;
    const coresPerLicense = product.license?.coresPerLicense || 2;
    
    let cores = parseInt(selectedCore) || minCores;
    cores = Math.max(minCores, Math.min(maxCores, cores));
    cores = Math.round(cores / coreIncrement) * coreIncrement;
    
    const licensesNeeded = Math.ceil(cores / coresPerLicense);
    
    const billingOptions = {};
    if (licenseTypeData.billingOptions) {
      for (const [key, price] of Object.entries(licenseTypeData.billingOptions)) {
        billingOptions[key] = price * licensesNeeded;
      }
    }
    
    const oneTimePrice = selectedLicenseType === 'Perpetual' && licenseTypeData.basePricePer2Cores ? 
      (licenseTypeData.basePricePer2Cores * licensesNeeded) : undefined;
    
    return {
      ...billingOptions,
      oneTime: oneTimePrice,
      calculatedCores: cores,
      calculatedLicenses: licensesNeeded
    };
  }
  
  if (product.pricingModel === 'fixed') {
    if (!product.packages || product.packages.length === 0) return {};
    
    const currentPackage = selectedPackage || product.packages[0];
    const result = {};
    
    if (currentPackage.billingOptions) {
      for (const [key, value] of Object.entries(currentPackage.billingOptions)) {
        result[key] = value * quantity;
      }
    }
    
    if (currentPackage.oneTime) {
      result.oneTime = currentPackage.oneTime * quantity;
    }
    
    return result;
  }
  
  return {};
};