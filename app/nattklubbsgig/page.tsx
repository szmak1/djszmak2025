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
  title: 'DJ till Nattklubb i Skåne | Professionell DJ med Internationell Erfarenhet',
  description:
    'Boka erfaren DJ till nattklubb i Skåne. Med erfarenhet från Pacha, Spanien, USA och Tyskland. Professionell DJ som skapar perfekt stämning och får dansgolvet att explodera.',
  keywords:
    'DJ nattklubb, DJ Skåne, nattklubbsgig, DJ Pacha, DJ Spanien, DJ Malmö, DJ bokning nattklubb',
  openGraph: {
    title: 'DJ till Nattklubb i Skåne | Professionell DJ med Internationell Erfarenhet',
    description:
      'Boka erfaren DJ till nattklubb i Skåne. Med erfarenhet från Pacha, Spanien, USA och Tyskland. Professionell DJ som skapar perfekt stämning och får dansgolvet att explodera.',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: '/images/nattklubbsgig.webp',
        width: 1200,
        height: 630,
        alt: 'DJ till Nattklubb i Skåne med internationell erfarenhet',
      },
    ],
  },
};

export default function Nattklubbsgig() {
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
      question: 'Hur långt i förväg bör jag boka DJ till nattklubben?',
      answer:
        'För nattklubbar rekommenderar jag att boka minst 1-2 månader i förväg, särskilt för helger och speciella event. Populära datum bokas ofta upp tidigt, så var ute i god tid för att säkra ditt önskade datum.',
    },
    {
      question: 'Vad kostar det att förlänga DJ-tiden under kvällen?',
      answer:
        'Extra speltid kostar 800 kr per timme för nattklubbar. Det är bäst att boka extra tid i förväg, men det går även att förlänga under kvällen om möjlighet finns. Grundpaketet inkluderar 4 timmars speltid.',
    },
    {
      question: 'Kan vi skicka önskelista med låtar innan eventet?',
      answer:
        'Absolut! Jag uppmuntrar er att skicka en spellista med era favoritlåtar innan eventet. Det hjälper mig att planera musiken och säkerställa att era önskemål spelas. Under kvällen tar jag självklart också emot önskemål från gästerna.',
    },
    {
      question: 'Hur fungerar LED-golvet på nattklubben?',
      answer:
        'LED-golvet är perfekt för nattklubbar! Det kan visa coola effekter som går i takt med musiken, skapa olika mönster och färger som matchar stämningen. Vi anpassar mönster och färger efter era önskemål. Installation och programmering ingår i priset.',
    },
    {
      question: 'Vilken utrustning ingår i DJ-paketet för nattklubbar?',
      answer:
        'I grundpaketet ingår professionell DJ-utrustning anpassad för nattklubbar. Detta inkluderar mixerbord, högtalarsystem lämpligt för upp till 200 personer, och grundläggande ljuseffekter. Extra utrustning som LED-golv, rökmaskin eller större ljudsystem kan läggas till.',
    },
    {
      question: 'Hur fungerar betalningen?',
      answer:
        'Efter bokning får ni en offert och ett bokningsavtal. För nattklubbar sker betalning via faktura med 30 dagars betalningsvillkor. Ingen förskottsbetalning krävs. Fakturan skickas efter genomfört event.',
    },
  ];

  return (
    <div>
      <HeroVideo
        title="DJ till Nattklubb i Skåne | Erfaren från Pacha & Internationella Scener"
        subtitle="Med erfarenhet från Pacha, Spanien, USA och Tyskland skapar jag perfekt stämning på dansgolvet"
        buttonText="Boka DJ för Nattklubb"
        buttonLink="/kontakt"
        videoSrc="/videos/nattklubbsgig.mp4"
      />
      <Divider />
      <TextWithImage
        title="DJ som gör stor skillnad och anpassar musiken efter dansgolvet!"
        description="Med erfarenhet från både Spanien, USA och Sverige har jag byggt upp en gedigen DJ-erfarenhet. Jag är lyhörd som DJ och kommer läsa av stämningen på din klubb eller event. Tillsammans med gästerna håller jag trycket uppe på dansgolvet hela kvällen och skapar minnen som varar länge. En bra klubb-DJ måste förstå dynamik, variation och tajming, och att allt detta är det som avgör skillnaden mellan ett tomt eller fullt dansgolv.

Och vilken klubb vill inte ha ett fullt dansgolv?

I have also played in germany 

In spain I also played in Pacha a famous club"
        imageSrc="/images/nattklubbsgig.webp"
        imageAlt="DJ till nattklubb med internationell erfarenhet från Pacha och andra kända klubbar"
        imagePosition="right"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
      <TextWithImage
        title="Internationell DJ-erfarenhet som gör skillnad"
        description="Min resa som DJ har tagit mig till några av världens mest kända klubbar och scener. Från Pacha i Spanien till exklusiva klubbar i USA och Tyskland har jag byggt upp en unik förmåga att skapa den perfekta stämningen. Denna internationella erfarenhet ger mig en bred musikrepertoar och en djup förståelse för olika kulturer och musikstilar.

Jag kombinerar denna globala kunskap med en lyhördhet för lokala trender och preferenser, vilket gör mig till en mångsidig DJ som kan anpassa mig till varje specifik klubb och publik. Oavsett om det är en intim lounge eller en stor nattklubb, skapar jag en energifylld atmosfär som får gästerna att komma tillbaka."
        imageSrc="/images/nattklubbsgig.webp"
        imageAlt="DJ med internationell erfarenhet från kända klubbar"
        imagePosition="left"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
      <VideoWithText
        title="LEDGOLV till Nattklubb i Skåne"
        description="Ta din nattklubb till nästa nivå med vårt spektakulära LED-dansgolv! Perfekt för att skapa en unik och minnesvärd upplevelse som får gästerna att prata om. LED-golvet blir en naturlig samlingspunkt och skapar en magisk atmosfär som förstärker musiken och stämningen.

Föreställ dig ett dansgolv som pulserar i takt med musiken, visar coola mönster och kan anpassas med olika färger och effekter. Vårt LED-golv kan programmeras för att matcha din klubbss identitet eller skapa olika teman för olika kvällar. Vi tar hand om allt det tekniska - leverans, installation och programmering ingår."
        videoSrc="/videos/LEDGolv.mp4"
        buttonText="Läs mer"
        buttonLink="/ledgolv"
      />
      <TextSection
        title="Skapa den Perfekta Nattklubbsupplevelsen i Skåne"
        description="Din nattklubb förtjänar en DJ som kan leverera mer än bara musik. Med min internationella erfarenhet från världens mest kända klubbar, kombinerad med en djup förståelse för lokala trender, skapar jag en unik upplevelse som får gästerna att komma tillbaka.

Från energifyllda danskvällar till exklusiva lounge-event, jag anpassar musiken och stämningen för att matcha din klubbss identitet. Med professionell utrustning och möjlighet till LED-golv kan vi ta upplevelsen till nästa nivå. Boka tidigt för att säkra ditt datum - särskilt under helger går datumen snabbt åt. Kontakta mig redan idag för en skräddarsydd offert till din nattklubb i Skåne."
      />

      <PriceCalculator defaultPartyType="club" stepDescriptions={stepDescriptions} />

      <FAQ faqItems={faqItems} defaultOpen={0} />

      <GoogleReviews />
    </div>
  );
}
