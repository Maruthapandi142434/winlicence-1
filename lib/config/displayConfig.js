// Configuration for controlling UI display options across the application
export const displayConfig = {
  // Global setting to show/hide Buy Now buttons
  showBuyNow: false, // Set to false to hide Buy Now buttons globally
  
  // Global setting to show Contact Us buttons instead
  showContactUs: true, // Set to true to show Contact Us buttons
  
  // Per-page overrides (optional)
  pageOverrides: {
    '/product': {
      showBuyNow: false,
      showContactUs: true
    },
    '/product/[slug]': {
      showBuyNow: false, // Hide Buy Now on individual product pages
      showContactUs: true
    },
    '/product/category/[slug]': {
      showBuyNow: false,
      showContactUs: true
    }
  }
};

// Helper function to get display settings for a specific page
export const getDisplaySettings = (pagePath = '') => {
  const override = displayConfig.pageOverrides[pagePath];
  
  return {
    showBuyNow: override?.showBuyNow ?? displayConfig.showBuyNow,
    showContactUs: override?.showContactUs ?? displayConfig.showContactUs
  };
};
