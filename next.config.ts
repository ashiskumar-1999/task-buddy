import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'], // Add supported locales
    defaultLocale: 'en', // Set the default locale
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // Add Google's domain here
  },
};

export default nextConfig;
