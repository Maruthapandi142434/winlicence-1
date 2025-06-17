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
    ];
  },
};