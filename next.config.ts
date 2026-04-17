import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.nutech-integrasi.com",
        port: "",
        pathname: "/**", // Mengizinkan semua path gambar dari domain ini
      },
      // Jika suatu saat kamu butuh domain lain (misal dari Google atau AWS),
      // kamu tinggal menambahkannya di dalam array ini:
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
