import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';
import VideoWithText from '@/app/components/VideoWithText';
import TextSection from '@/app/components/TextSection';
import PriceCalculator from '@/app/components/PriceCalculator';
import FAQ from '@/app/components/FAQ';
import GoogleReviews from '@/app/components/GoogleReviews';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DJ till Företagsfest i Skåne | Professionell DJ med LED-golv',
  description:
    'Boka erfaren DJ till företagsfest i Skåne. Komplett paket med modern ljud- och ljusutrustning, LED-dansgolv och anpassad musik. Perfekt för julfester, kickoffs och företagsjubileer.',
  keywords:
    'DJ företagsfest, DJ Skåne, företagsfest DJ, LED-golv företagsfest, julfest DJ, kickoff Malmö, DJ bokning företag',
  openGraph: {
    title: 'DJ till Företagsfest i Skåne | Professionell DJ med LED-golv',
    description:
      'Boka erfaren DJ till företagsfest i Skåne. Komplett paket med modern ljud- och ljusutrustning, LED-dansgolv och anpassad musik. Perfekt för julfester, kickoffs och företagsjubileer.',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: '/images/foretagsfest.webp',
        width: 1200,
        height: 630,
        alt: 'DJ till Företagsfest i Skåne med LED-golv och professionell utrustning',
      },
    ],
  },
};

export default function Foretagsfest() {
  const stepDescriptions = {
    step1: {
      title: 'Välj Festtyp',
      description: 'Välj en festtyp för att fortsätta',
    },
    step2: {
      title: 'Välj Extra Tjänster',
      description: 'Anpassa ditt paket med extra utrustning',
    },
    step3: {
      title: 'Beräkna Transport',
      description: 'Ange adressen till din festplats',
    },
    step4: {
      title: 'Kontaktinformation',
      description: 'Fyll i dina uppgifter för att skicka din förfrågan',
    },
  };

  const faqItems = [
    {
      question: 'Hur fungerar betalningen?',
      answer:
        'Efter bokning får ni en offert och ett bokningsavtal. För företagskunder sker betalning via faktura med 30 dagars betalningsvillkor. Ingen förskottsbetalning krävs. Fakturan skickas efter genomfört event.',
    },
    {
      question: 'Hur lång tid innan företagsfesten bör jag boka DJ?',
      answer:
        'För att säkra ditt önskade datum rekommenderar jag att boka minst 2-3 månader i förväg, särskilt för populära datum som julfester och kickoffs. Kontakta mig gärna så fort ni har ett datum bestämt.',
    },
    {
      question: 'Vad kostar det att förlänga DJ-tiden under kvällen?',
      answer:
        'Extra speltid kostar 1000 kr per påbörjad timme. Det är bäst att boka extra tid i förväg, men det går även att förlänga under kvällen om det finns möjlighet.',
    },
    {
      question: 'Kan vi önska låtar innan och under festen?',
      answer:
        'Absolut! Ni får gärna skicka en spellista med önskemål innan festen. Under eventet tar jag självklart emot önskemål från gästerna och anpassar musiken efter stämningen på dansgolvet.',
    },
    {
      question: 'Har ni erfarenhet av företagsevent?',
      answer:
        'Ja, jag har stor erfarenhet av företagsfester, kickoffs, julfester och andra företagsevenemang. Jag är van att anpassa musiken för en blandad publik och skapa en professionell men festlig atmosfär.',
    },
    {
      question: 'Ingår ljud och ljus i priset?',
      answer:
        'Grundläggande DJ-utrustning ingår i priset. För större evenemang eller specifika önskemål om ljud och ljus kan extra utrustning läggas till. Se våra tillval under "Extra Tjänster" i priskalkylatorn.',
    },
  ];

  return (
    <div>
      <HeroVideo
        title="DJ TILL FÖRETAGSFEST I Skåne med ljud, ljus & LedGolv"
        subtitle="Boka erfaren DJ och säkra företagsfesten, jag vet vad som krävs för att lyfta dansgolvet"
        buttonText="Boka DJ för Företagsfest"
        buttonLink="/kontakt"
        videoSrc="/videos/foretagsfest.mp4"
      />
      <Divider />
      <TextWithImage
        title="Erfaren DJ"
        description="En företagsfest ställer krav på en mångsidig och inkännande DJ. Utmaningen ligger i att kunna tillfredställa alla olika musiksmaker.

Ofta finns det äldre personer bland gästerna som inte är uppdaterade i dagens musik, och de yngre som tycker att gammal musik låter mossig. Detta är en utmaning som kräver en erfaren DJ.

Jag är den DJ:n!"
        imageSrc="/images/foretagsfest.webp"
        imageAlt="DJ till företagsfest"
        imagePosition="right"
      />
      <VideoWithText
        title="LEDGOLV till företagsfesten i Skåne"
        description="Ge er företagsfest en professionell touch med vårt moderna LED-dansgolv. Perfekt för att skapa en exklusiv atmosfär på kickoffen, julfesten eller företagsjubileet. LED-golvet blir en naturlig samlingspunkt och samtalsämne bland gästerna. Vi anpassar storlek, mönster och färger efter ert företags profil – allt från logotyper till företagsfärger kan integreras i upplevelsen. Leverans, installation och teknisk support ingår, så ni kan fokusera på att umgås med kollegorna."
        videoSrc="/videos/LEDGolv.mp4"
        buttonText="Läs mer"
        buttonLink="/ledgolv"
      />
      <TextSection
        title="Boka erfaren DJ till företagsfest och säkra festen"
        description="Hos mig kan du boka en lyhörd och mångsidig DJ som spelar den bästa musikmixen för alla smaker på firmafester och evenemang i Malmö och i Skåne. Jag har lång erfarenhet som DJ och får publiken att dansa och ha kul tillsammans. Skicka in din förfrågan till mig och berätta mer om din företagsfest, så får du en offert inom 24h."
      />
      <PriceCalculator defaultPartyType="corporate" stepDescriptions={stepDescriptions} />
      <FAQ faqItems={faqItems} defaultOpen={0} />
      <GoogleReviews />
    </div>
  );
}
