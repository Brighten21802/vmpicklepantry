/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // One canonical host: send www.vmpicklepantry.com to vmpicklepantry.com (308, keeps path and query).
      // Matches only the www hostname, so preview and .vercel.app addresses are unaffected.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.vmpicklepantry.com' }],
        destination: 'https://vmpicklepantry.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
