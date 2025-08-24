import type { Metadata } from 'next';
import { Bricolage_Grotesque, Urbanist } from 'next/font/google';
import './globals.css';
import { LayoutMain } from '@/components/general';
import { getLocale, getMessages } from 'next-intl/server'; // <-- Impor fungsi server
import { NextIntlClientProvider } from 'next-intl';
import TargetCursor from '@/components/TargetCursor/TargetCursor';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

const geistSans = Urbanist({
  variable: '--font-urbanist-sans',
  subsets: ['latin'],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
});

export const fontSans = Urbanist({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const fontMono = Bricolage_Grotesque({
  variable: '--font-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isID = locale === 'id';
  const baseUrl = new URL('https://languagecenter.com');
  const titleDefault = isID ? 'Pusat Bahasa' : 'Language Center';
  const titleTemplate = isID
    ? '%s | Kuasai dunia melalui pelatihan bahasa & les privat.'
    : '%s | Master the world through language training & private lessons.';

  const description = isID
    ? 'Pusat bahasa utama Anda untuk kelas intensif, bimbingan privat, dan persiapan tes bersertifikat untuk komunikasi global.'
    : 'Your premier language center for intensive classes, tailored private tutoring, and certified test preparation for global communication.';

  const ogTitle = isID
    ? 'Pusat Bahasa - Komunikasi Global Dimulai Di Sini'
    : 'Language Center - Global Communication Starts Here';

  const ogDescription = isID
    ? 'Kuasai dunia melalui pelatihan bahasa, les privat, dan pendalaman budaya.'
    : 'Master the world through language training, private lessons, and cultural immersion.';

  const keywords = [
    'Language Course',
    'Private Tutor',
    'English Class',
    'Mandarin Class',
    'TOEFL Preparation',
    'IELTS Preparation',
    isID ? 'Kursus Bahasa' : 'Study Abroad',
    isID ? 'Les Privat' : 'Conversation Class',
  ];

  return {
    metadataBase: baseUrl,
    title: { default: titleDefault, template: titleTemplate },
    description: description,
    keywords: keywords,
    icons: '/favicon.ico',
    authors: [{ name: 'Language Center Team', url: baseUrl.href }],
    creator: 'Language Center Team',
    publisher: 'Language Center Team',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: isID ? 'id_ID' : 'en_US',
      url: baseUrl.href,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: '/pop-up-EM-EMP-1.webp',
          width: 1200,
          height: 630,
          alt: isID
            ? 'Iklan kursus bahasa dari Language Center.'
            : 'Advertisement for language courses by Language Center.',
        },
      ],
      siteName: titleDefault,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ['/favicon.ico'],
    },
    alternates: {
      canonical: baseUrl.href,
    },
    other: {
      'theme-color': '#0056b3',
      'msapplication-TileColor': '#0056b3',
    },
    verification: {
      google: 'oMuhV9DyiqqhFfeQxEuD1erXA9y2MpvMC6O_C15_WvE',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <Head>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
        />
      </Head>
      <body
        className={`${geistSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastContainer />
          <TargetCursor spinDuration={2} hideDefaultCursor={true} />
          <LayoutMain>{children}</LayoutMain>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
