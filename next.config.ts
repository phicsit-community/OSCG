/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "github-contributions-api.deno.dev",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
