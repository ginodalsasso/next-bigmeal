import type { NextConfig } from "next";

// const cspHeader = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline';
//   style-src 'self' 'unsafe-inline';
//   img-src 'self' blob: data:;
//   font-src 'self';
//   object-src 'none';
//   base-uri 'self';
//   form-action 'self';
//   frame-ancestors 'none';
//   upgrade-insecure-requests;
// `;

const nextConfig: NextConfig = {
  output: "standalone", 
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    authInterrupts: true,
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeader.replace(/\n/g, ''),
  //         },
  //       ],
  //     },
  //   ]
  // },
};


export default nextConfig;
