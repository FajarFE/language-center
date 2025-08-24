import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learningenglish.com';

  const routes = ['', '/lead'];
  const locales = ['en', 'id'];

  const pages: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      pages.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  const assetFiles = [
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
    '5.jpeg',
    '6.jpeg',
    '7.jpeg',
    '8.jpeg',
    '9.jpeg',
    '10.jpeg',
    'favicon.ico',
    'file.svg',
    'globe.svg',
    'herosection.png',
    'next.svg',
    'vercel.svg',
    'window.svg',
    'wow.png',
    'Urbanist-VariableFont_wght.ttf',
  ];

  const assets: MetadataRoute.Sitemap = assetFiles.map((file) => ({
    url: `${baseUrl}/${file}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1.0,
  }));

  return [...pages, ...assets];
}
