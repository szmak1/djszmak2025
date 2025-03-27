import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Layout from './components/layout/Layout';
import Header from './components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://djszmak.se'),
  title: 'DJ Malmö & DJ Skåne med ljud, ljus och DJ-utrustning | DJ Szmak',
  description:
    'Boka mig som DJ Malmö & DJ Skåne till födelsedagsfest, bröllopsfest, studentfest & företagsfest. Säkra festen med erfaren DJ till festen',
  keywords:
    'dj skåne, dj malmö, dj till bröllopsfest, bröllops dj, födelsedagsfest, studentfest, företagsfest',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'DJ i Malmö med ljudsystem, ljus och high-end utrustning, Boka här!',
    description:
      'Hyr DJ i Malmö till födelsedagsfest, bröllopsfest, studentfest & företagsfest. Säkra din fest och boka erfaren DJ till festen. Komplett fest - från 5000 kr.',
    url: 'https://djszmak.se',
    siteName: 'DJ Szmak',
    locale: 'sv_SE',
    type: 'website',
    images: [
      {
        url: '/images/share-logo.png',
        width: 1200,
        height: 628,
        alt: 'DJ Szmak Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ i Malmö med ljudsystem, ljus och high-end utrustning, Boka här!',
    description:
      'Hyr DJ i Malmö till födelsedagsfest, bröllopsfest, studentfest & företagsfest. Säkra din fest och boka erfaren DJ till festen.',
    images: ['/images/share-logo.png'],
  },
  alternates: {
    canonical: 'https://djszmak.se',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: 'T0HPzglHuoiCjId7rtSiC3EnGu5n2WwVXgUs_5wL_LI',
    other: {
      'facebook-domain-verification': 'gsn8e8zwttbw8yrgo23e72ssqq56bz',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${inter.className} ${montserrat.className} text-white`}>
        <Header />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
