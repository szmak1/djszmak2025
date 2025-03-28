import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';

export default function Nattklubbsgig() {
  return (
    <div>
      <HeroVideo
        title="Professionell DJ för Nattklubbsgig"
        subtitle="Ta med den perfekta stämningen till er nattklubb med professionell DJ"
        buttonText="Boka DJ för Nattklubb"
        buttonLink="/kontakt"
        videoSrc="/videos/nattklubbsgig.mp4"
      />
      <Divider />
      <TextWithImage
        title="DJ till nattklubb"
        description="Professionell DJ-entertainment för nattklubbar som vill leverera bästa dansupplevelsen. Vi skapar rätt stämning för din nattklubb med musik som får alla att dansa."
        imageSrc="/images/nattklubbsgig.webp"
        imageAlt="DJ till nattklubb"
        imagePosition="right"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
    </div>
  );
}
