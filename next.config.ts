import type { NextConfig } from "next";

  const cspHeader = `
      default-src 'self'; 
      style-src 'self'; 
      img-src 'self' data:; 
      connect-src 'self' https://github.com https://api.github.com https://accounts.google.com https://oauth2.googleapis.com;
      frame-src https://accounts.google.com https://github.com;
      font-src 'self' data:;
      script-src 'self' 'unsafe-inline' https://accounts.google.com https://github.com;
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
  `;

const nextConfig: NextConfig = {
  output: "standalone", 
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    authInterrupts: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
};


export default nextConfig;
