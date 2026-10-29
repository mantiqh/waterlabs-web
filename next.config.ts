import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products/curiecode',
        destination: '/solutions/charge-capture-and-coding',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
