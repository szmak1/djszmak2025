import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';
import TextSection from '@/app/components/TextSection';
import FAQ from '@/app/components/FAQ';
import PriceCalculator from '@/app/components/PriceCalculator';
import GoogleReviews from '@/app/components/GoogleReviews';
import VideoWithText from '@/app/components/VideoWithText';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'DJ till födelsedagsfest med ljud, ljus & LEDGOLV i Skåne | Malmö | Helsingborg',
  description:
    'Boka DJ till födelsedagsfest enkelt i Skåne. Erfaren DJ som fyller dansgolvet. Professionell DJ-underhållning med ljud, ljus & LEDGOLV för er födelsedagsfest. Skapa en magisk stämning med vårt interaktiva LED-golv.',
  keywords:
    'DJ födelsedagsfest, DJ Skåne, DJ Malmö, DJ Helsingborg, födelsedagsfest DJ, professionell DJ födelsedag, DJ-underhållning födelsedag, DJ med LEDGOLV, DJ med ljud och ljus, DJ som fyller dansgolvet, DJ till födelsedag i Skåne, DJ till födelsedag med ljud och ljus, LEDGOLV födelsedag, LED-golv till födelsedag, interaktivt LED-golv födelsedag',
  openGraph: {
    title: 'DJ till födelsedagsfest med ljud, ljus & LEDGOLV i Skåne | Malmö | Helsingborg',
    description:
      'Boka DJ till födelsedagsfest enkelt i Skåne. Erfaren DJ som fyller dansgolvet. Skapa en magisk stämning med vårt interaktiva LED-golv.',
    images: [
      {
        url: '/images/födelsedagsfest.webp',
        width: 1200,
        height: 630,
        alt: 'DJ till födelsedagsfest i Skåne med ljud, ljus & LEDGOLV',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ till födelsedagsfest med ljud, ljus & LEDGOLV i Skåne | Malmö | Helsingborg',
    description:
      'Boka DJ till födelsedagsfest enkelt i Skåne. Erfaren DJ som fyller dansgolvet. Skapa en magisk stämning med vårt interaktiva LED-golv.',
    images: ['/images/födelsedagsfest.webp'],
  },
  alternates: {
    canonical: 'https://djszmak.se/fodelsedagsfest',
  },
};

const birthdayStepDescriptions = {
  step1: {
    title: 'Välj Extra DJ-timmar',
    description: 'Lägg till fler timmar DJ för att förlänga er födelsedagsfest',
  },
  step2: {
    title: 'Välj Extra Tjänster',
    description: 'Lägg till extra tjänster för att göra er födelsedagsfest ännu mer speciell',
  },
  step3: {
    title: 'Beräkna Avstånd',
    description: 'Ange festplatsens adress för att beräkna avstånd från Malmö',
  },
  step4: {
    title: 'Kontaktinformation',
    description: 'Fyll i dina uppgifter för att skicka din förfrågan',
  },
};

export default function Födelsedagsfest() {
  const faqItems = [
    {
      question: 'Extra speltid, går det att lösa?',
      answer:
        'Önskar ni fler speltimmar än vad det ingår i DJ paketet tillkommer det 500kr per ny påbörjad timme.',
    },
    {
      question: 'Går det att önska musik under kvällen?',
      answer:
        'Under festens gång kan jag ta emot önskade låtar från gästerna. Har jag inte låten så kan jag ladda ner den på plats och sedan mixar jag in den när det passar bra.',
    },
    {
      question: 'Vi vill ha speciella låtar, går det?',
      answer:
        'Innan festen kan ni skicka över en spellista via Spotify/Youtube med låtar ni vill ha. Detta främst för att jag ska få en uppfattning om vad för slags låtar ni gillar.',
    },
    {
      question: 'Hur bokar jag DJ i Skåne?',
      answer: [
        'DJ Skåne till födelsedagsfest kan bokas på 3 olika sätt:',
        '• Via prisberäknaren på djszmak.se, här finns formulär och prisberäkning.',
        '• Via kontaktformuläret djszmak.se/kontakt',
        '• Via mejl till info@djszmak.se',
        '• Via telefon till 070-88 290 77',
        'Efter att ni skickat in förfrågan får ni en offert/förslag baserat på informationen ni angett i kontaktformuläret via mejl. Det är viktigt att ni verkligen läser igenom denna offert/förslag. Känns allt ok kan ni lägga en deposition på 20% av det totala beloppet för att bekräfta bokningen. Resterande belopp faktureras via vår företag LED Dance Floor AB efter spelningen.',
      ],
    },
    {
      question: 'Förskott/Deposition',
      answer:
        'Förskottet på 1000kr är ej återbetalningsbar. Detta är ett skydd för både mig och er. Blir djszmak sjuk eller kan inte vara eran DJ så betalas depositionen tillbaka. Om denna deposition inte är betald är ni inte bokade till 100%. Inga tider "hålls så länge" utan en deposition behövs för att ni ska vara säkra på att det valda datumet är bokad för er.',
    },
    {
      question: 'Transport - och resekostnad',
      answer:
        'Transport och resekostnad som tillkommer vid körning utanför Malmö stad. 25kr per mil till den önskade destinationen inom Skåne.',
    },
  ];

  return (
    <div>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'DJ Service Malmö - Födelsedagsfest',
            description:
              'Professionella DJ-tjänster för födelsedagsfester i Malmö och hela Skåne. Vi erbjuder skräddarsydda DJ-paket med ljud, ljus och LED-golv för alla typer av födelsedagsfester. Boka din DJ för födelsedagsfesten idag!',
            provider: {
              '@type': 'Organization',
              name: 'DJ Service Malmö',
              areaServed: 'Malmö och hela Skåne',
              url: 'https://djszmak.se',
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'DJ till Födelsedagsfest',
                price: '6500',
                priceCurrency: 'SEK',
                description:
                  'Perfekt för er födelsedagsfest med professionell DJ-tjänst. Inkluderar 4 timmars speltid, professionell utrustning och skräddarsydd spellista.',
                availability: 'https://schema.org/InStock',
              },
            ],
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Inkluderade timmar',
                value: '4 timmar',
              },
              {
                '@type': 'PropertyValue',
                name: 'Extra timme',
                value: '500 kr/tim',
              },
              {
                '@type': 'PropertyValue',
                name: 'Inkluderade tjänster',
                value: 'Professionell DJ-utrustning, Skräddarsydd spellista, Ljud och ljus',
              },
              {
                '@type': 'PropertyValue',
                name: 'LED-golv',
                value: 'Tillgängligt som tillägg',
              },
            ],
            areaServed: {
              '@type': 'City',
              name: 'Malmö',
              containedInPlace: {
                '@type': 'State',
                name: 'Skåne',
              },
            },
            serviceType: 'DJ-tjänst för födelsedagsfester',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'DJ-tillbehör för födelsedagsfester',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Ljudsystem',
                    price: '1500',
                    priceCurrency: 'SEK',
                    description:
                      'Professionellt ljudsystem för upp till 150 personer. Inkluderar Yamaha-ljudsystem med front-högtalare och subwoofers.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Discoljus',
                    price: '1000',
                    priceCurrency: 'SEK',
                    description:
                      'LED-Discoljus som går i takt med musik. DJ styr ljuset live för bästa effekt.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'LED-golv',
                    price: '10000',
                    priceCurrency: 'SEK',
                    description:
                      'Interaktivt LED-golv som skapar en magisk stämning på dansgolvet. Går i takt med musik och kan anpassas efter festens tema.',
                  },
                },
              ],
            },
            inLanguage: 'sv-SE',
            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4.9',
                bestRating: '5',
                worstRating: '1',
              },
              author: {
                '@type': 'Person',
                name: 'Tidigare kunder',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '50',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
      <HeroVideo
        title="DJ TILL FÖDELSEDAGSFEST MED LJUD, LJUS & LEDGOLV"
        subtitle="Vill du ha en erfaren och lyhörd DJ till födelsedagsfest? Jag vet vad som krävs för en lyckad fest och ett fullt dansgolv. Boka DJ till födelsedagsfesten i Skåne & säkra festen 🥳"
        buttonText="Boka DJ för Födelsedag"
        buttonLink="/kontakt"
        videoSrc="/videos/fodelsedagsfest.mp4"
      />
      <Divider />
      <TextWithImage
        title="DJ till födelsedagsfest i Skåne med känsla för dansgolvet"
        description="Musik handlar om tajming och känsla. Under festen läser jag av dina gäster på dansgolvet för att kunna göra den sista finjusteringen av musikmixen.

Om du inte har en specifik spellista på din födelsedagsfest är det smart att blanda nytt och gammalt så att alla gäster kan vara med och dansa under hela festen. Jag har bra koll på vilken musik som fungerar och vad som får gästerna att dansa och ha roligt hela kvällen 💃🏻🕺"
        imageSrc="/images/födelsedagsfest.webp"
        imageAlt="DJ till födelsedagsfest i Skåne med känsla för dansgolvet"
        imagePosition="right"
      />

      <TextWithImage
        title="BRA DJ med ljud, ljus som sätter fart på födelsedagsfesten"
        description="Om du vill få den bästa festupplevelsen räcker det inte med att ha den bästa DJ:n och musikmixen. Det krävs även att man har rätt förutsättningar i form av bra ljud om man verkligen vill att det skall hända något."
        imageSrc="/images/IMG_1370.webp"
        imageAlt="DJ med professionellt ljud och ljus till födelsedagsfest"
        imagePosition="left"
      />
      <TextSection
        title="Musik"
        description="Alla tycker om musik i någon form, men vilken musik går just dina gäster igång på? Jag spelar på alla typer av födelsedagsfester i Skåne. 20-, 30-, 40- och 50-årsfester. Ett bra tips när du planerar din fest är att utgå från ett spellista som ni skickar till mig, detta kommer hjälpa mig med att veta er smak. Skicka in din förfrågan till mig och berätta mer om din födelsedagsfest, så får du en offert inom 24h."
      />
      <VideoWithText
        title="LEDGOLV till födelsedagsfesten"
        description="Ge din födelsedagsfest en riktig wow-faktor med vårt nya LED-golv. Gästerna får dansa på ett hav av ljus, och du får minnen som verkligen lyser upp festen. Vi anpassar storlek, färger och effekter efter just ditt tema – och självklart hjälper vi till med både leverans och montering, så du kan fokusera på att fira din dag."
        videoSrc="/videos/LEDGolv.mp4"
        buttonText="Läs mer"
        buttonLink="/ledgolv"
      />
      <PriceCalculator defaultPartyType="birthday" stepDescriptions={birthdayStepDescriptions} />
      <FAQ faqItems={faqItems} />
      <GoogleReviews />
    </div>
  );
}
