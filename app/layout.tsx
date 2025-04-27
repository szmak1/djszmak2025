import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Layout from './components/layout/Layout';
import { GoogleTagManager } from '@next/third-parties/google';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
  title: 'DJ Szmak | Professionell DJ i Malmö & Skåne',
  description:
    'Boka DJ Szmak för bröllop, företagsfester, studentfester och födelsedagsfester i Malmö och Skåne. Professionell DJ med modern utrustning och bred musikrepertoar.',
  keywords: [
    'DJ Malmö',
    'DJ Skåne',
    'Bröllopsdj',
    'Företagsfest DJ',
    'Studentfest DJ',
    'Födelsedagsfest DJ',
  ],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://djszmak.se',
    siteName: 'DJ Szmak',
    title: 'DJ Szmak | Professionell DJ i Malmö & Skåne',
    description:
      'Boka DJ Szmak för bröllop, företagsfester, studentfester och födelsedagsfester i Malmö och Skåne.',
    images: [
      {
        url: '/images/share_logoDJszmak.png',
        width: 1200,
        height: 630,
        alt: 'DJ Szmak Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ Szmak | Professionell DJ i Malmö & Skåne',
    description:
      'Boka DJ Szmak för bröllop, företagsfester, studentfester och födelsedagsfester i Malmö och Skåne.',
    images: ['/images/share_logoDJszmak.png'],
  },
  alternates: {
    canonical: 'https://djszmak.se',
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
      <Script id="google-tag-manager-head" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <body className={`${inter.className} ${montserrat.className} text-white`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Layout>{children}</Layout>
        <GoogleTagManager gtmId="GTM-PZGZJF5" />
      </body>
    </html>
  );
}
