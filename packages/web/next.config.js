/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    APP_CONFIG: process.env.APP_CONFIG,
    APP_API_URL: process.env.APP_API_URL,
    APP_WEB_URL: process.env.APP_WEB_URL,
    AUTH_TOKEN_KEY: process.env.AUTH_TOKEN_KEY,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    MEDIUM_API_KEY: process.env.MEDIUM_API_KEY,
    GOOGLE_ANALYTICS_MEASUREMENT_ID: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
    ENVERUS_GDS_TOKEN: process.env.ENVERUS_GDS_TOKEN,
    CARBON_PATH_TOKEN_ADDRESS: process.env.CARBON_PATH_TOKEN_ADDRESS,
    CARBON_PATH_NFT_ADDRESS: process.env.CARBON_PATH_NFT_ADDRESS,
    CARBON_PATH_ADMIN_ADDRESS: process.env.CARBON_PATH_ADMIN_ADDRESS,
    DRONE_DEPLOY_API_KEY: process.env.DRONE_DEPLOY_API_KEY,
    CELO_BLOCKSCOUT_URL: process.env.CELO_BLOCKSCOUT_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    }
    return config
  },
  optimizeFonts: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; preload; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
