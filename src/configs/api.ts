const dev = process.env.NODE_ENV !== 'production';

export const args = {
  host: dev ? 'http://localhost:3000' : `http://${process.env.VERCEL_URL}`,
  api_key: process.env.API_KEY,
  base_url: process.env.BASE_URL,
  language: process.env.DEFAULT_LANG
}