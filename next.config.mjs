/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          net: false,
          dns: false,
          fs: false,
          tls: false,
          child_process: false,
        };
  
        config.externals = ['node:url']; // Add node:url to the externals list
      }
  
      return config;
    },
  };
  
  export default nextConfig;