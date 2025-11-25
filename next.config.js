/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // removeConsole: true,
  },
  async redirects() {
    return [
      {
        source: "/talks",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
