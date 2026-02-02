/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/tretmani-lica',
        destination: '/',
        permanent: false,
      },
      {
        source: '/tretmani-tela',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

