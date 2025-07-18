import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Konfigurasi webpack untuk mengatasi error 'fs' module not found
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Jangan coba resolve modul 'fs' di sisi klien (browser)
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

export default nextConfig;
