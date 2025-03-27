import HeroVideo from './components/HeroVideo';
import TextWithImage from './components/TextWithImage';
import Divider from '@/app/components/Divider';
import PartyCards from './components/PartyCards';
import FAQ from './components/FAQ';
import VideoSection from './components/VideoSection';
import GoogleReviews from './components/GoogleReviews';
import PriceCalculator from './components/PriceCalculator';
import TextSection from './components/TextSection';
import VideoWithText from './components/VideoWithText';

export default function Home() {
  return (
    <div>
      <HeroVideo />
      <Divider />
      <PartyCards />
      {/* About David Szmak section */}
      <TextWithImage
        title="Musiken är festens puls. DJ:n dess hjärta."
        description="Jag heter David Szmak och är DJ i Malmö och Skåne med lång erfarenhet från både Sverige och internationellt. Som DJ vet jag att musiken är kärnan, men det är dynamiken, känslan och tajmingen som skapar den perfekta festen. Med känsla för gästerna och dansgolvet skapar vi tillsammans en stämning som blir minnesvärd för alla."
        imageSrc="/images/IMG_1370.webp"
        imageAlt="David Szmak - DJ i Malmö och Skåne"
        imagePosition="right"
      />

      {/* DJ Understanding Section */}
      <TextSection
        title="DJ i Malmö med förståelse för publiken"
        description={`Jag använder musiken för att hantera evenemangen, driver den framåt. Delar även in olika typer av låtar i olika sektioner tex. spelar långsammare, tystare låtar i början av festen. Därefter ökar jag sakta tempot som till exempel en jazzigare spår. De tyngre låtar tar jag oftast i slutet. Men som sagt detta beror alltid på hur jag läser av publiken och hur deras humör är. Med min erfarenhet och min analytiska förmåga så ser jag snabbt på deras kroppsspråk hur de reagerar.

Jag anpassar alltid musiken efter festens syfte och min publik, och genom åren har jag arbetat fram en förståelse för hur människor funkar – gamla som unga. Så oavsett om det gäller bröllop, examen, födelsedag eller företagsfest, så hjälper jag er till ett välfyllt dansgolv!`}
      />

      {/* Video with Text Section */}
      <VideoWithText
        title="DJ Skåne för alla syften"
        description={`Alla DJ:s har olika sätt att jobba på. Någon tar många önskemål från publiken, andra inga alls. Jag har många olika sätt att arbeta på – och jag anpassar alltid dem till festen. Är det bröllop är det viktigt att vara familjär, men är det klubbspelning krävs eventuellt en fastare hand. Jag utvärderar alltid varje låtval i varje stund för att kunna fatta ett så bra beslut som möjligt. Genre, tempo, dynamik, volym – allt måste klaffa!

Vissa kallar det överambition – jag kallar det professionalitet.

Nu kan du hyra den professionaliteten!`}
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

      {/* First section with djskåne1 */}
      <TextWithImage
        title="Professionell DJ-Service"
        description="Med över 10 års erfarenhet levererar vi högkvalitativ underhållning för alla typer av event. Från intima bröllop till stora företagsfester, vi anpassar musiken efter dina önskemål."
        imageSrc="/images/djskåne1.webp"
        imageAlt="DJ Skåne professionell service"
        buttonText="Läs mer om våra tjänster"
        buttonLink="/services"
      />

      {/* Second section with djskåne2 */}
      <TextWithImage
        title="Modern Utrustning"
        description="Vi använder endast den senaste tekniken och högkvalitativ ljudutrustning för att säkerställa den bästa möjliga upplevelsen för dig och dina gäster."
        imageSrc="/images/djskåne2.webp"
        imageAlt="DJ Skåne modern utrustning"
        imagePosition="right"
      />

      <VideoSection
        videoHeading="LEDGOLV"
        videoTitle="Upplev magin med LEDGOLV"
        videoDescription="Transformera ditt dansgolv till en spektakulär ljusshow! Vårt LEDGOLV skapar en unik atmosfär som får dina gäster att dansa på ett hav av ljus. Perfekt för bröllop, företagsfester och alla andra tillställningar där du vill skapa något extra speciellt."
      />

      <PriceCalculator />
      <FAQ />
      <GoogleReviews />
    </div>
  );
}
