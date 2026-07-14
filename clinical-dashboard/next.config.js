/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  ...(isDev ? {} : { output: 'standalone' }),
  images: {
    unoptimized: true,
  },
  // Enable hot reload in Docker
  ...(isDev ? {
    webpack: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      return config
    }
  } : {}),
  // Turbopack config (Next.js 16+ uses Turbopack by default)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

module.exports = nextConfig