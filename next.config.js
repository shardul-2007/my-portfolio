/** @type {import('next').NextConfig} */
const isVercel = Boolean(process.env.VERCEL);
const isProd = process.env.NODE_ENV === 'production';
const basePath = isVercel || process.env.NO_BASE_PATH === 'true' ? '' : (isProd ? '/my-portfolio' : '');

const nextConfig = {
  ...(isVercel ? {} : { output: 'export' }),
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  optimizeFonts: false,
};
module.exports = nextConfig;
