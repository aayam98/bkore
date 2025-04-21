module.exports = {
  images: {
    domains: [
      'media.graphcms.com',
      'shopify.com',
      'cdn.shopify.com',
      'media.graphassets.com',
      'cms.bodykore.com',
      'homegym.bodykore.com',
      'www.fitnesssled.com',
      'www.bodykore.com',
      'beta.bodykore.com',
      'timepayment.com',
      'example.com',
      's3-alpha-sig.figma.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/webp', 'image/avif'], // Added AVIF for better compression
    minimumCacheTTL: 604800, // Add caching for optimized images (in seconds)
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'content-type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemaps/:sitemap*',
        headers: [
          {
            key: 'content-type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Add caching headers for static assets
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Add caching headers for images
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/product-category/smart-sled/smart-sled-pro',
        destination: '/product/smart-sled-pro',
        permanent: true,
      },
      {
        source: '/product-category/smart-sled',
        destination: '/smartsledpro',
        permanent: true,
      },
      {
        source: '/product-category/functional-training',
        destination: '/product-category/functional-training-equipment',
        permanent: true,
      },
      {
        source: '/my-account',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/product-category/accessories/squat-box',
        destination: '/squatBox',
        permanent: false,
      },
      {
        source: '/product-category/accessories/squat-box-pro',
        destination: '/squat-box-pro',
        permanent: false,
      },
      {
        source: '/product-category/weights/olympic-plates',
        destination: '/product-category/weights/storage-racks',
        permanent: true,
      },
    ];
  },
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true, // Use SWC for minification (faster than Terser)
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  // experimental: {
  //   // Enable modern optimizations if your Next.js version supports them
  //   scrollRestoration: true,
  //   optimizeCss: true, // CSS optimization
  //   optimizeServerReact: true,
  // },
  // poweredByHeader: false,
  // trailingSlash: false,
  // Increase Static Generation performance
  // staticPageGenerationTimeout: 180,
  // Enable gzip compression
  compress: true,
};