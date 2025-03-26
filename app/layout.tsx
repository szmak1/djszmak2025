import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Layout from './components/layout/Layout';
import Header from './components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://djszmak.se'),
  title: 'DJ Szmak - DJ i Skåne',
  description:
    'Boka DJ Szmak för din fest i Skåne! Med över 10 års erfarenhet som DJ i Malmö och hela Skåne, kan jag garantera en fantastisk kväll med perfekt musikmix för ditt event.',
  keywords: 'nyckelord1, nyckelord2, nyckelord3',
  robots: 'index, follow',
  openGraph: {
    title: 'DJ Szmak - DJ i Skåne',
    description:
      'Boka DJ Szmak för din fest i Skåne! Med över 10 års erfarenhet som DJ i Malmö och hela Skåne, kan jag garantera en fantastisk kväll med perfekt musikmix för ditt event.',
    url: 'https://djszmak.se',
    siteName: 'DJ Szmak',
    locale: 'sv_SE',
    type: 'website',
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
