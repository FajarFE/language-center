import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      'images.pexels.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'placeimg.com',
      'plus.unsplash.com',
      'source.unsplash.com',
    ],
  },
} satisfies NextConfig;

module.exports = withNextIntl(nextConfig);
