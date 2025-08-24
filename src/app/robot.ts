import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://learningenglish.com'; // Ganti dengan domain Anda
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/lead'],
        disallow: [
          '/*.json$',
          '/*.xml$',
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/api/'] },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}