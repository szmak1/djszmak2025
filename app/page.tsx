import HeroVideo from './components/HeroVideo';
import TextWithImage from './components/TextWithImage';
import Divider from '@/app/components/Divider';
import FAQ from './components/FAQ';
import TextSection from './components/TextSection';
import VideoWithText from './components/VideoWithText';
import Link from 'next/link';
import {
  PriceCalculator,
  PartyCards,
  VideoSection,
  GoogleReviews,
} from './components/DynamicComponents';

const faqItems = [
  // priceCalculator
  {
    question: 'Hur fungerar prisberäknaren?',
    answer:
      'Prisberäknaren är en praktisk funktion som hjälper dig att uppskatta kostnaden för att hyra DJ Szmak till ditt evenemang. Genom att fylla i nödvändiga uppgifter, såsom festtyp, antal gäster och önskemål, kan du få en ungefärlig uppskattning av vad det kommer att kosta att hyra mig till ditt evenemang.',
  },
  {
    question: 'Går det att boka DJ Szmak som DJ i Skåne?',
    answer: 'DJ Szmak har hela Skåne som arbetsområde.',
  },
  {
    question: 'Hur bokar jag DJ Szmak?',
    answer: [
      'DJ Szmak kan bokas på olika sätt:',
      '• Via formuläret på <a href="/kontakt" class="text-[#00ff97] hover:text-[#00daa8] underline transition-colors">djszmak.se/kontakt</a> eller via prisberäknaren på denna sida.',
      '• Via mejl till <a href="mailto:info@djszmak.se" class="text-[#00ff97] hover:text-[#00daa8] underline transition-colors">info@djszmak.se</a>',
      '• Via telefon till <a href="tel:+46708829077" class="text-[#00ff97] hover:text-[#00daa8] underline transition-colors">070-88 290 77</a>',
      'Efter att ni skickat in förfrågan får ni en offert/förslag baserat på informationen ni angett i kontaktformuläret via mejl. Det är viktigt att ni verkligen läser igenom denna offert/förslag. Känns allt ok kan ni lägga en deposition på 20% av det totala beloppet för att bekräfta bokningen. Resterande belopp faktureras via vår företag LED Dance Floor AB efter spelningen.',
    ],
  },
  {
    question: 'Transport - och resekostnad för DJ i skåne?',
    answer:
      'Transport och resekostnad tillkommer vid körning utanför Malmö stad. 100kr per mil till den önskade destinationen inom Skåne.',
  },
  {
    question: 'När ska man boka?',
    answer:
      'Viktigt att boka så snart ni vet datumet för festen annars är risken stor att jag redan är bokad. Jag rekommenderar minst 3-6 månader innan fest datumet.',
  },
];

export default function Home() {
  return (
    <div>
      <HeroVideo
        title={
          <>
            <span className="text-white">DJ i Malmö & Skåne med</span>{' '}
            <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
              <strong>LJUD</strong>
            </span>
            ,{' '}
            <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
              <strong>LJUS</strong>
            </span>{' '}
            &{' '}
            <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
              <strong>LEDGOLV</strong>
            </span>
          </>
        }
        subtitle={
          <>
            <span className="sr-only">Hyr en proffsig DJ med ljud, ljus och ledgolv till</span>
            <span className="font-semibold">
              Hyr en erfaren DJ med professionell utrustning till
            </span>{' '}
            <Link
              href="/brollopsfest"
              className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent hover:from-[#00ff97] hover:to-[#00daa8] transition-all duration-300 font-medium hover:drop-shadow-[0_0_8px_rgba(0,255,151,0.3)] focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              aria-label="Hyr DJ till bröllop i Malmö och Skåne"
            >
              bröllop
            </Link>
            ,{' '}
            <Link
              href="/fodelsedagsfest"
              className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent hover:from-[#00ff97] hover:to-[#00daa8] transition-all duration-300 font-medium hover:drop-shadow-[0_0_8px_rgba(0,255,151,0.3)] focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              aria-label="Hyr DJ till födelsedagsfest i Malmö och Skåne"
            >
              födelsedagsfest
            </Link>
            ,{' '}
            <Link
              href="/studentfest"
              className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent hover:from-[#00ff97] hover:to-[#00daa8] transition-all duration-300 font-medium hover:drop-shadow-[0_0_8px_rgba(0,255,151,0.3)] focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              aria-label="Hyr DJ till studentfest i Malmö och Skåne"
            >
              studentfest
            </Link>
            ,{' '}
            <Link
              href="/foretagsfest"
              className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent hover:from-[#00ff97] hover:to-[#00daa8] transition-all duration-300 font-medium hover:drop-shadow-[0_0_8px_rgba(0,255,151,0.3)] focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              aria-label="Hyr DJ till företagsfest i Malmö och Skåne"
            >
              företagsfest
            </Link>{' '}
            och{' '}
            <Link
              href="/nattklubbsgig"
              className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent hover:from-[#00ff97] hover:to-[#00daa8] transition-all duration-300 font-medium hover:drop-shadow-[0_0_8px_rgba(0,255,151,0.3)] focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
              aria-label="Hyr DJ till nattklubb i Malmö och Skåne"
            >
              nattklubb
            </Link>{' '}
            i <strong>Malmö</strong> och <strong>Skåne</strong>. Vi erbjuder{' '}
            <strong>proffsig DJ-service</strong> med <strong>kvalitetsutrustning</strong> för alla
            typer av evenemang.
          </>
        }
        buttonText="Boka ditt event nu"
        buttonLink="#pricecalculator"
        videoSrc="/videos/main-dj.mp4"
      />
      <Divider />
      <PartyCards />
      {/* About David Szmak section */}
      <TextWithImage
        title="Musiken är festens puls. DJ:n dess hjärta."
        description={
          <>
            <p className="mb-2">
              Jag heter David Szmak – professionell DJ i Malmö och Skåne, med många års erfarenhet
              från både Sverige och internationella scener.
            </p>
            <p className="mb-2">
              För mig handlar DJ-yrket om mer än bara musik. Det handlar om att läsa av rummet,
              känna energin och bygga upp festen med rätt låt vid rätt tillfälle. Med
              fingertoppskänsla för både gäster och dansgolv skapar jag stämningar som människor
              minns – oavsett om det är en bröllopsfest i Skåne, en födelsedagsfest i Malmö eller en
              exklusiv företagskväll.
            </p>
            <p className="mb-2">
              När du bokar mig får du inte bara en DJ – du får en trygg stämningsskapare, som vet
              hur man höjer pulsen.
            </p>
            <p>Boka mig som DJ i Skåne och säkra festen!</p>
          </>
        }
        imageSrc="/images/IMG_1370.webp"
        imageAlt="David Szmak - DJ i Malmö och Skåne"
        imagePosition="right"
      />

      {/* Video with Text Section */}
      <VideoWithText
        title="DJ Skåne för alla syften"
        description={
          <>
            <p className="mb-2">
              Alla DJ:s har olika sätt att jobba på. Någon tar många önskemål från publiken, andra
              inga alls. Jag har många olika sätt att arbeta på – och jag anpassar alltid dem till
              festen. Är det bröllop är det viktigt att vara familjär, men är det klubbspelning
              krävs eventuellt en fastare hand. Jag utvärderar alltid varje låtval i varje stund för
              att kunna fatta ett så bra beslut som möjligt. Genre, tempo, dynamik, volym – allt
              måste klaffa!
            </p>
            <p className="mb-2">Vissa kallar det överambition – jag kallar det professionalitet.</p>
            <p>Nu kan du hyra den professionaliteten!</p>
          </>
        }
        videoSrc="/videos/ledgolv-dans.mp4"
        buttonText="Kontakta mig"
        buttonLink="/contact"
      />

      {/* Prepared DJ Section */}
      <TextWithImage
        title="En förberedd DJ är en bra DJ"
        description={`Jag vill ofta ha en uppfattning om vem min publik är innan evenemanget för att kunna prestera på en hög nivå. Så innan varje uppdrag ser jag alltid till att vi känner och förstår varandra. Vad har ni för önskemål? Vem är era gäster? Vart vill ni ta festen?

Allt detta och lite till, hjälper jag er med.

Tveka inte att ta kontakt med mig med frågor eller förfrågningar!`}
        imageSrc="/images/stdjszmak.webp"
        imageAlt="David Szmak - Förberedd DJ"
        imagePosition="right"
        imagePositionY="top"
      />

      <VideoSection
        videoHeading="LEDGOLV"
        videoTitle="Upplev magin med LEDGOLV"
        videoDescription="Transformera ditt dansgolv till en spektakulär ljusshow! Vårt LEDGOLV skapar en unik atmosfär som får dina gäster att dansa på ett hav av ljus. Perfekt för bröllop, företagsfester och alla andra tillställningar där du vill skapa något extra speciellt."
      />
      {/* DJ Understanding Section */}
      <TextSection
        title="DJ i Skåne som skapar oförglömliga fester"
        description={
          <>
            <p className="font-sans text-lg leading-relaxed mb-2">
              Att hyra DJ handlar inte bara om musik – det handlar om att skapa känsla, bygga
              stämning och förvandla ett rum till ett minne för livet. Jag är en erfaren DJ baserad
              i Malmö och spelar över hela Skåne, specialiserad på bröllop, studentfester och
              födelsedagsfester.
            </p>
            <p className="font-sans text-lg leading-relaxed mb-2">
              Med ett öra för detaljer och fingertoppskänsla för publikens energi anpassar jag varje
              spellista efter just er fest. Jag läser av dansgolvet, märker kroppsspråket, ser när
              det är dags att öka tempot – eller sakta ner för att bygga upp något större. I början
              väljer jag ofta lugnare, stämningsfulla låtar som får gästerna att landa, mingla och
              känna sig bekväma. Sedan bygger jag upp intensiteten med taktfullt utvalda spår –
              tills dansgolvet lyfter.
            </p>
            <p className="font-sans text-lg leading-relaxed">
              Varje fest är unik – och det ska musiken också vara. Oavsett om det är ett elegant
              bröllop på Österlen, en födelsedagsfest i centrala Malmö eller en studentfest i Lund,
              så levererar jag en musikalisk upplevelse som känns både lyxig och skräddarsydd.
            </p>
          </>
        }
      />
      <PriceCalculator />
      <FAQ faqItems={faqItems} defaultOpen={0} />
      <GoogleReviews />
    </div>
  );
}
