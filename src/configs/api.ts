const dev = process.env.NODE_ENV !== 'production';

export const args = {
  host: dev ? 'http://localhost:3000' : process.env.NODE_ENV,
  port: process.env.PORT,
  api_key: process.env.API_KEY,
  base_url: process.env.BASE_URL,
  language: process.env.DEFAULT_LANG
}