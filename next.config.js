/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgix.cosmicjs.com' },
      { protocol: 'https', hostname: 'cdn.cosmicjs.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' }
    ]
  }
}

module.exports = nextConfig