/** @type {import('next').NextConfig} */

// Baseline security headers. HSTS is already sent by Vercel. A Content-Security-Policy is
// intentionally not set here: the site embeds a Google map and inline structured data,
// and a CSP needs to be tested against both before it is enforced.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
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
