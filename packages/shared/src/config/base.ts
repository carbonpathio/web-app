/* eslint-disable @typescript-eslint/no-non-null-assertion */
const config = {
  debug: false,
  defaultLimit: 20,
  tokenKey: process.env.AUTH_TOKEN_KEY || 'TOKEN_KEY',
  mapboxApiKey: process.env.MAPBOX_API_KEY || '',
  mediumApiKey: process.env.MEDIUM_API_KEY || '',
  enverusApiKey: process.env.ENVERUS_GDS_TOKEN || '',
  appConfig: process.env.APP_CONFIG || 'dev',
  google: {
    measurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || '',
  },
  contract: {
    cpToken: process.env.CARBON_PATH_TOKEN_ADDRESS,
    cpNFT: process.env.CARBON_PATH_NFT_ADDRESS,
    cpAdmin: process.env.CARBON_PATH_ADMIN_ADDRESS,
  },
  urls: {
    api: process.env.APP_API_URL!,
    web: process.env.APP_WEB_URL!,
    auth: '/authentication/',
    dronedeploy: '/dronedeploy/',
    alerts: '/alerts/',
    faqs: '/faqs/',
    users: '/users/',
    tokens: '/wells/token-transaction/',
    wells: '/wells/',
  },
}

export default config
