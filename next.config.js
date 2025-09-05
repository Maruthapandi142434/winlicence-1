module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true, // Enable gzip compression for production

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // Security headers
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
      { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=()' },
    ];
    
    return [{ source: '/(.*)', headers: securityHeaders }];
  },

  // Redirects
  async redirects() {
    return [
      // Redirect from HTTP to HTTPS
      {
        source: '/(.*)',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://winlicense.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.winlicense.in' }],
        destination: 'https://winlicense.in/:path*',
        permanent: true,
      },
      // Specific redirects
        {
       source: '/product/category/windows-server-2025-rds-cal',
       destination: '/product/category/windows-server-2025-rds',
       permanent: true,
     },
     {
      source: '/faq.php',
      destination: '/about/faq',
      permanent: true,
    },
    {
      source: '/blog.php',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/cart.php',
      destination: '/',
      permanent: true,
    },
    {
      source: '/testimonials.php',
      destination: '/about/testimonials',
      permanent: true,
    },
    {
      source: '/products.php',
      destination: '/product',
      permanent: true,
    },
    {
      source: '/contact.php',
      destination: '/contact',
      permanent: true,
    },
    {
      source: '/index.php',
      destination: '/',
      permanent: true,
    },
    {
      source: '/clients.php',
      destination: '/clients',
      permanent: true,
    },
    {
      source: '/mission-vision.php',
      destination: '/about/mission-vision',
      permanent: true,
    },
    {
      source: '/about/product',
      destination: '/product',
      permanent: true,
    },
    {
      source: '/blog/[slug]',
      destination: '/',
      permanent: true,
    },
    {
      source: '/blog/product',
      destination: '/blog',
      permanent: true,
    },

    ];
  },
};