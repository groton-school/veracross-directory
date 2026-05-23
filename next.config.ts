import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.veracross.com https://res.cloudinary.com/veracross/image/upload/v1590100679/default.png;
    media-src 'self' blob: data: https://*.amazonaws.com/data.namedrop.io/otu/audio/;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors https://portals.veracross.com https://composer.veracross.com;
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  cacheComponents: true,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
