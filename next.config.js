const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    host: process.env.HOST,
    api_key: process.env.API_KEY,
    default_lang: process.env.DEFAULT_LANG,
    base_url: process.env.BASE_URL,
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    host: process.env.HOST
  }
}
