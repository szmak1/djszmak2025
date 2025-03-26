import HeroVideo from './components/HeroVideo';
import TextWithImage from './components/TextWithImage';
import Divider from '@/app/components/Divider';
import PartyCards from './components/PartyCards';
import FAQ from './components/FAQ';
import VideoSection from './components/VideoSection';
import GoogleReviews from './components/GoogleReviews';
import PriceCalculator from './components/PriceCalculator';
import InstagramFeed from './components/InstagramFeed';

export default function Home() {
  return (
    <div>
      <HeroVideo />
      <Divider />
      <PartyCards />
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
      <InstagramFeed />
    </div>
  );
}
