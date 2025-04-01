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
  title: 'DJ till Studentfest i Skåne | Professionell DJ med LED-golv',
  description:
    'Boka erfaren DJ till studentfest i Skåne. Komplett paket med modern ljud- och ljusutrustning, LED-dansgolv och anpassad musik. Perfekt för examenfirande och studentskivor.',
  keywords:
    'DJ studentfest, DJ Skåne, studentfest DJ, LED-golv studentfest, examenfest DJ, studentskiva Malmö, DJ bokning student',
  openGraph: {
    title: 'DJ till Studentfest i Skåne | Professionell DJ med LED-golv',
    description:
      'Boka erfaren DJ till studentfest i Skåne. Komplett paket med modern ljud- och ljusutrustning, LED-dansgolv och anpassad musik. Perfekt för examenfirande och studentskivor.',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: '/images/studentfest.webp',
        width: 1200,
        height: 630,
        alt: 'DJ till Studentfest i Skåne med LED-golv och professionell utrustning',
      },
    ],
  },
};

export default function Studentfest() {
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
      question: 'Hur långt i förväg bör jag boka DJ till min studentfest?',
      answer:
        'För studentfester rekommenderar jag att boka minst 3-4 månader i förväg, särskilt för datum i maj och juni som är högsäsong. Populära datum bokas ofta upp tidigt, så var ute i god tid för att säkra ditt önskade datum.',
    },
    {
      question: 'Vad kostar det att förlänga DJ-tiden under studentfesten?',
      answer:
        'Extra speltid kostar 500 kr per timme för studentfester. Det är bäst att boka extra tid i förväg, men det går även att förlänga under kvällen om möjlighet finns. Grundpaketet inkluderar 4 timmars speltid.',
    },
    {
      question: 'Kan vi skicka önskelista med låtar innan festen?',
      answer:
        'Absolut! Jag uppmuntrar er att skicka en spellista med era favoritlåtar innan festen. Det hjälper mig att planera musiken och säkerställa att era önskemål spelas. Under festen tar jag självklart också emot önskemål från gästerna.',
    },
    {
      question: 'Hur fungerar LED-golvet på studentfester?',
      answer:
        'LED-golvet är perfekt för studentfester! Det kan visa personliga meddelanden, ert examensår, skoltema eller coola effekter som går i takt med musiken. Vi anpassar mönster och färger efter era önskemål. Installation och programmering ingår i priset.',
    },
    {
      question: 'Vilken utrustning ingår i DJ-paketet för studentfester?',
      answer:
        'I grundpaketet ingår professionell DJ-utrustning anpassad för studentfester. Detta inkluderar mixerbord, högtalarsystem lämpligt för upp till 150 personer, och grundläggande ljuseffekter. Extra utrustning som LED-golv, rökmaskin eller större ljudsystem kan läggas till.',
    },
    {
      question: 'Hur fungerar betalningen?',
      answer:
        'Efter bokning får ni en offert och ett bokningsavtal. För studentfester sker betalning via faktura med 30 dagars betalningsvillkor. Ingen förskottsbetalning krävs. Fakturan skickas efter genomfört event.',
    },
  ];

  return (
    <div>
      <HeroVideo
        title="DJ till Studentfest i Skåne med ljud, ljus och LedGolv"
        subtitle="Jag vet vad som krävs för att lyfta dansgolvet"
        buttonText="Boka DJ för Studentfest"
        buttonLink="/kontakt"
        videoSrc="/videos/studentfest.mp4"
      />
      <Divider />
      <TextWithImage
        title="Erfaren DJ till Studentfest i Skåne"
        description="Som DJ till studentfest i Malmö och Skåne levererar jag en energifylld fest med den bästa musiken för just er generation. Med många år av erfarenhet av studentfester vet jag exakt vilken musik som får dansgolvet att explodera.

Med professionell ljud- och ljusutrustning, samt möjlighet till LED-golv, skapar vi en festupplevelse utöver det vanliga. Oavsett om det är en mindre studentfest eller en stor studentskiva, anpassar jag musiken och utrustningen efter era önskemål och lokalens storlek.

Boka en av Skånes mest erfarna DJ:s till er studentfest och få en kväll ni sent kommer att glömma!"
        imageSrc="/images/studentfest.webp"
        imageAlt="Professionell DJ spelar på studentfest i Skåne med modern ljud- och ljusutrustning"
        imagePosition="right"
        buttonText="Boka DJ till Studentfesten"
        buttonLink="/kontakt"
      />
      <VideoWithText
        title="LEDGOLV till Studentfest & Examenfest i Skåne"
        description="Gör din student- eller examenfest helt unik med vårt spektakulära LED-dansgolv! Perfekt för dig som vill ha det där extra som får alla att minnas just din fest. LED-golvet skapar en magisk atmosfär och blir kvällens stora samtalsämne.

Föreställ dig ett dansgolv som pulserar i takt med musiken, visar coola mönster och kan visa ditt namn eller examensår. Vårt LED-golv kan anpassas med olika färger, effekter och till och med personliga hälsningar - perfekt för att göra din studentfest eller examenfest i Skåne till något alldeles extra.

Vi tar hand om allt det tekniska - leverans, installation och programmering ingår. Du behöver bara fokusera på att ha kul och fira din examen med stil!"
        videoSrc="/videos/LEDGolv.mp4"
        buttonText="Läs mer"
        buttonLink="/ledgolv"
      />
      <TextSection
        title="Skapa den Perfekta Studentfesten i Skåne"
        description="Din studentfest är en milstolpe som förtjänar att firas storslaget! Som erfaren DJ i Skåne har jag haft äran att vara en del av hundratals minnesvärda studentfester, från intima sammankomster till stora examenfiranden. Jag vet exakt vad som krävs för att skapa den perfekta atmosfären för just er fest.

Med ett omfattande musikbibliotek som täcker alla genrer och epoker, garanterar jag att musiken passar perfekt för din studentfest. Från moderna hits till klassiska partylåtar - jag läser av stämningen och anpassar musiken för att hålla dansgolvet fullt hela kvällen.

Vill ni ta er fest till nästa nivå? Mitt kompletta paket med professionellt ljud, effektfullt ljusshow och det spektakulära LED-golvet skapar en festupplevelse i världsklass. LED-golvet blir en naturlig mittpunkt och kan visa personliga meddelanden, examensår eller coola effekter som går i takt med musiken.

Boka tidigt för att säkra ditt datum - särskilt under maj och juni går datumen snabbt åt. Kontakta mig redan idag för en skräddarsydd offert till din studentfest i Skåne. Tillsammans skapar vi ett oförglömligt firande som du och dina gäster kommer att minnas för alltid!"
      />
      <PriceCalculator defaultPartyType="student" stepDescriptions={stepDescriptions} />
      <FAQ faqItems={faqItems} defaultOpen={0} />
      <GoogleReviews />
    </div>
  );
}
