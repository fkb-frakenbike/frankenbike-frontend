/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.watchOptions = {
      poll: 100, // check for changes every 100ms
      aggregateTimeout: 300, // wait 300ms after change before rebuilding
    };
    return config;
  },
  images: {
    domains: ['media.franken-bike.com', 'localhost'],
  },
};

module.exports = nextConfig;
