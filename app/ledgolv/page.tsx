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
  title: 'LEDGOLV till Fest & Event i Skåne | Dansgolv med Ljuseffekter',
  description:
    'Hyr LEDGOLV i Malmö och Skåne. Skapa en magisk atmosfär med vårt dansgolv med RGB-färger och spegeleffekt. Perfekt för bröllop, studentfester och företagsevent. Flexibla storlekar och komplett service.',
  keywords:
    'LEDGOLV, LED-golv, dansgolv, festgolv, LED dansgolv Skåne, LED-golv Malmö, dry ice maskin, festutrustning',
  openGraph: {
    title: 'LEDGOLV till Fest & Event i Skåne | Dansgolv med Ljuseffekter',
    description:
      'Hyr LEDGOLV i Malmö och Skåne. Skapa en magisk atmosfär med vårt dansgolv med RGB-färger och spegeleffekt. Perfekt för bröllop, studentfester och företagsevent.',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: '/images/ledgolv.webp',
        width: 1200,
        height: 630,
        alt: 'LEDGOLV - Dansgolv med ljuseffekter i Skåne',
      },
    ],
  },
};

export default function Ledgolv() {
  const stepDescriptions = {
    step1: {
      title: 'Välj LEDGOLV Storlek',
      description: 'Välj storlek på LED-golvet som passar din festlokal',
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
      question: 'Vilka storlekar finns LED-golvet i?',
      answer:
        'Vi erbjuder LED-golv i olika storlekar som anpassas efter din festlokal och antal gäster. Kontakta oss för att få en skräddarsydd lösning som passar just ditt event.',
    },
    {
      question: 'Hur fungerar installationen av LED-golvet?',
      answer:
        'Vi tar hand om hela processen - från leverans och installation till upphämtning. Vårt team kommer på plats och sätter upp golvet professionellt innan ditt event börjar.',
    },
    {
      question: 'Kan LED-golvet kombineras med dry ice?',
      answer:
        'Ja! Vi erbjuder dry ice-maskiner som skapar en magisk dimma över golvet. Detta ger en otrolig wow-faktor och är perfekt för första dansen eller speciella ögonblick under kvällen.',
    },
    {
      question: 'Vilka typer av event passar LED-golvet till?',
      answer:
        'LED-golvet är perfekt för alla typer av event - från intima bröllop till stora studentfester och företagsevent. Vi anpassar storlek och effekter efter ditt specifika behov.',
    },
    {
      question: 'Hur långt i förväg bör jag boka LED-golvet?',
      answer:
        'Vi rekommenderar att boka minst 2-3 månader i förväg, särskilt för helger och högsäsong. Populära datum bokas ofta upp tidigt, så var ute i god tid för att säkra ditt önskade datum.',
    },
    {
      question: 'Vilka färger och effekter kan LED-golvet visa?',
      answer:
        'Vårt LED-golv erbjuder RGB-färger och spegeleffekter som kan anpassas efter ditt tema. Vi kan programmera olika mönster och färger som matchar din fest och skapar den perfekta stämningen.',
    },
  ];

  return (
    <div>
      <HeroVideo
        title="Hyr LEDGOLV i Malmö & Skåne | Dansgolv med Ljuseffekter"
        subtitle="Professionellt LED-golv med RGB-färger och spegeleffekt. Perfekt för bröllop, studentfester och företagsevent. Komplett service med leverans och installation."
        buttonText="Boka LEDGOLV"
        buttonLink="/kontakt"
        videoSrc="/videos/LEDGolv.mp4"
      />
      <Divider />
      <TextWithImage
        title="Varför välja LEDGOLV för fest eller event?"
        description="Vårt LED-golv skapar en magisk atmosfär med RGB-färger och spegeleffekt som imponerar på dina gäster. Med flexibla storlekar anpassar vi golvet efter din festlokal och tema, oavsett om det är ett intimt bröllop eller en stor studentfest.

Vi tar hand om allt – från leverans och installation till upphämtning, så du kan fokusera på att njuta av din fest. Våra LED-golv är perfekta för alla tillfällen - bröllop, studentfester, födelsedagar, företagsevent och mer."
        imageSrc="/images/ledgolv.webp"
        imageAlt="LEDGOLV - Dansgolv med ljuseffekter"
        imagePosition="left"
      />

      <TextWithImage
        title="Dry-Ice maskin med LEDGOLV"
        description="Kombinera ditt LED-golv med en dry ice-maskin för att skapa en häftig dimma som lägger sig över golvet, och fyller dansgolvet för en otrolig wow-faktor. Dimman från dry ice-maskinen sprider sig över golvet och skapar en magisk atmosfär. Få supersnygga första dansen bilder när det ser ut som att ni dansar på upplysta moln.

Våra maskiner är lätta att hantera och passar perfekt till alla typer av event. Skapa en unik och minnesvärd upplevelse som dina gäster sent kommer att glömma!"
        imageSrc="/images/dryice.webp"
        imageAlt="LEDGOLV med dry ice effekt"
        imagePosition="right"
      />

      <VideoWithText
        title="Besök vår LEDGOLV.se för mer information"
        description="På vår dedikerade LEDGOLV.se hittar du all information om våra LED-golv, inklusive detaljerade paket, priser och exempel på tidigare event. Vi har tagit fram de mest populära storlekarna och formerna för att göra det enkelt för dig att hitta rätt lösning.

Besök LEDGOLV.se för att se alla våra paket och få en skräddarsydd offert för ditt event."
        videoSrc="/videos/LEDGolv.mp4"
        buttonText="Besök LEDGOLV.se"
        buttonLink="https://www.ledgolv.se"
      />

      <TextSection
        title="Skapa den Perfekta Festupplevelsen med LEDGOLV"
        description="Transformera ditt event med vårt spektakulära LED-golv! Med vår professionella service och expertis skapar vi en magisk atmosfär som får dina gäster att prata om festen länge efter att den är över. Från intima bröllop till stora studentfester, vårt LED-golv anpassas efter dina önskemål och skapar den perfekta stämningen.

Boka tidigt för att säkra ditt datum - särskilt under helger och högsäsong går datumen snabbt åt. Kontakta oss redan idag för en skräddarsydd offert till ditt event i Skåne."
      />

      <PriceCalculator stepDescriptions={stepDescriptions} />

      <FAQ faqItems={faqItems} defaultOpen={0} />

      <GoogleReviews />
    </div>
  );
}
