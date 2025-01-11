import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'], // Add supported locales
    defaultLocale: 'en', // Set the default locale
  },
};

export default nextConfig;
