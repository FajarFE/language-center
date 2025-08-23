import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'baggystudio.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/booking'],
        disallow: [
          '/*.json$',
          '/*.xml$',
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/api/', '/admin/'] },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
    host: 'baggystudio.com',
  };
}
