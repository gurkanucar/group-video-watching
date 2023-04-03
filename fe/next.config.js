/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_PORT: process.env.BACKEND_PORT,
    SOCKET_PORT: process.env.SOCKET_PORT,
  },
};

module.exports = nextConfig;
