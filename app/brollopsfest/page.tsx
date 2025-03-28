import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';
import { Metadata } from 'next';
import Link from 'next/link';
import TextSection from '@/app/components/TextSection';
import FAQ from '@/app/components/FAQ';
import GoogleReviews from '@/app/components/GoogleReviews';
import PriceCalculator from '@/app/components/PriceCalculator';

export const metadata: Metadata = {
  title: 'DJ till Bröllopsfest | Professionell DJ-underhållning i Skåne',
  description:
    'Boka en erfaren DJ för er bröllopsfest i Skåne. Med många års erfarenhet skapar jag den perfekta stämningen för er speciella dag. Professionell DJ-entertainment som får alla att dansa.',
  keywords:
    'DJ bröllopsfest, bröllops DJ Skåne, DJ till bröllop, bröllopsfest DJ, professionell DJ bröllop, DJ-underhållning bröllop',
  openGraph: {
    title: 'DJ till Bröllopsfest | Professionell DJ-underhållning i Skåne',
    description:
      'Boka en erfaren DJ för er bröllopsfest i Skåne. Med många års erfarenhet skapar jag den perfekta stämningen för er speciella dag.',
    images: [
      {
        url: '/images/bröllopsfest.webp',
        width: 1200,
        height: 630,
        alt: 'DJ till bröllopsfest i Skåne',
      },
    ],
  },
};

const faqItems = [
  {
    question: 'Extra speltid, går det att lösa?',
    answer:
      'Önskar ni fler speltimmar än vad det ingår i DJ paketet tillkommer det 1000kr per ny påbörjad timme.',
  },
  {
    question: 'Går det att önska musik under kvällen?',
    answer:
      'Under festens gång kan jag ta emot önskade låtar från gästerna. Har jag inte låten så kan jag ladda ner den på plats och sedan mixar jag in den när det passar bra.',
  },
  {
    question: 'Vi vill ha speciella låtar, går det?',
    answer:
      'Innan bröllopsfesten kan ni skicka över en spellista via Spotify/Youtube med låtar ni vill ha. Detta främst för att jag ska få en uppfattning om vad för slags låtar ni gillar.',
  },
  {
    question: 'Hur bokar jag DJ i Skåne?',
    answer: [
      'DJ Skåne till bröllopsfest kan bokas på 3 olika sätt:',
      'Via formuläret djszmak.se/kontakt',
      'Via mejl till info@djszmak.se',
      'Via telefon till 070-88 290 77',
      'Efter att ni skickat in förfrågan så får ni en offert/förslag av informationen ni har angett i kontakt formuläret via mejl. Det är viktigt att ni verkligen läser igenom denna offert/förslag som ni får. Känns allt ok kan ni därefter lägga en deposition på 1000kr för att din fest ska bli 100% bokad. Resterande belopp faktureras via Frilans Finans efter spelningen. Ni behöver även signera en uppdragsoffert från Frilans Finans som jag skickar till er.',
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
  {
    question: 'När kommer och monteras utrustningen?',
    answer:
      'Samma dag som spelningen äger rum. Tiden anpassas efter dina/era önskemål. Att rigga hela DJ utrustningen tar ca 2 timmar. Detta betyder att jag behöver få tillgång till lokalen minst 2 timmar innan spelning. Önskar ni att DJ utrustningen ska riggas tidigare än 2 timmar innan utsatt påbörjad spelning tillkommer det en kostnad på 500kr + extra milersättning. DJ utrustning lämnas ej över natten utan kan bara lämnas på plats under samma dag som spelningen äger rum på.',
  },
  {
    question: 'När monteras utrustningen ner och hämtas?',
    answer:
      'När spelningen är slut monteras all utrustning ner och jag tar även med mig all utrustning hem direkt.',
  },
  {
    question: 'Går det att lösa extra utrustning som inte finns med?',
    answer:
      'Absolut går det! Skicka bara med det i er förfrågan så får ni priset inkl extra utrustning. Det går självklar bra att även lägga till det i efterhand.',
  },
];

const weddingStepDescriptions = {
  step1: {
    title: 'Välj Extra DJ-timmar',
    description: 'Lägg till fler timmar DJ för att förlänga er bröllopsfest',
  },
  step2: {
    title: 'Välj Extra Tjänster',
    description: 'Lägg till extra tjänster för att göra er bröllopsfest ännu mer speciell',
  },
  step3: {
    title: 'Beräkna Avstånd',
    description: 'Ange bröllopslokalens adress för att beräkna avstånd från Malmö',
  },
  step4: {
    title: 'Kontaktinformation',
    description: 'Fyll i era uppgifter för att skicka er förfrågan',
  },
};

export default function Bröllopsfest() {
  return (
    <div>
      <HeroVideo
        title="DJ i Skåne till bröllopsfest med ljud, ljus & LedGolv"
        subtitle="Boka mig som DJ och säkra festen! 🎉"
        buttonText="Boka DJ för Bröllop"
        buttonLink="/kontakt"
        videoSrc="/videos/brollopsfest.mp4"
      />
      <Divider />
      <TextSection
        title="Lång erfarenhet som DJ Skåne och stor kompetens säkrar DJ till bröllop"
        description="Jag har många års erfarenhet som bröllops DJ i Skåne. Under åren har jag haft äran att få vara med och skapa stämning för bröllopsparet och gästerna under bröllopets viktigaste timmar – festen. Jag kommer att med all min kompetens och skicklighet rocka ditt bröllop och fylla dansgolvet. Tillsammans med er skapar vi minnen som varar en livstid."
      />
      <TextWithImage
        title="Bröllops DJ Skåne med respekt för schemat"
        description="Ett bröllop med tillhörande fest är ofta en välplanerad tillställning. Planering, schema, hålltider och tajming måste klaffa, och det är något jag har full respekt för. Därför stämmer jag alltid av i god tid vad som gäller, hur önskemålen ser ut och framför allt – vilken musik vill ni dansa ut er stora dag till. Tillsammans med er skräddarsyr vi er bröllopsfest till ett oförglömligt minne – både för er och för gästerna."
        imageSrc="/images/bröllopsfest.webp"
        imageAlt="DJ med respekt för bröllopsschema"
        imagePosition="right"
      />
      <TextWithImage
        title="Massivt musikbibliotek till er bröllopsfest"
        description={
          <>
            Under åren har jag samlat på mig en gedigen mängd musik, för alla smaker och syften.
            Dessutom mixar jag musiken för att ert dansgolv på bröllopet aldrig ska vara något annat
            än fullt. Det är ni och era gäster som är i fokus och givetvis anpassar jag festmusiken
            efter er, oavsett ålder, smak och stil. En sak kan ni vara säkra på – alla kommer dansa!
            💃🏽🕺
            <br />
            <br />
            Här är en Spotify lista med top 50 populära vals/första dans låtar:{' '}
            <Link
              href="https://open.spotify.com/playlist/7i9b5URpfidwpWVvzm8pvn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 underline"
            >
              Till spellistan
            </Link>
          </>
        }
        imageSrc="/images/brollopdjmalmo.webp"
        imageAlt="DJ med musikbibliotek för bröllopsfest"
        imagePosition="left"
      />
      <TextWithImage
        title="Skapa ett magiskt bröllop"
        description="Ge er första dans en riktig wow-faktor med vårt nya LED-golv. Gästerna får dansa på ett hav av ljus, och ni får minnen som verkligen lyser upp bröllopsfesten. Vi anpassar storlek, färger och effekter efter just ert tema – och självklart hjälper vi till med både leverans och montering, så ni kan fokusera på att fira kärleken."
        imageSrc="/images/BILD1568.webp"
        imageAlt="LED-golv för bröllopsfest"
        imagePosition="right"
      />
      <PriceCalculator defaultPartyType="wedding" stepDescriptions={weddingStepDescriptions} />
      <FAQ faqItems={faqItems} />
      <GoogleReviews />
    </div>
  );
}
