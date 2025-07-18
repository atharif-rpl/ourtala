/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
    },
    webpack: (config, { isServer }) => {
      // Hanya terapkan ini untuk build sisi klien
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback, // Pertahankan fallback yang sudah ada jika ada
          fs: false, // Mengabaikan modul 'fs'
          path: false, // Seringkali 'path' juga perlu diabaikan jika 'fs' diabaikan
          // Anda mungkin perlu menambahkan modul Node.js built-in lainnya di sini jika error serupa muncul
        }
      }
      return config
    },
  }
  
  export default nextConfig
  