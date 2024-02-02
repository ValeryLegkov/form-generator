/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment to remove strict mode
  // reactStrictMode: false,
  experimental: {
    swcPlugins: [["@effector/swc-plugin", {}]]
  },
};

export default nextConfig;
