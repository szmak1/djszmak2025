import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';

export default function Studentfest() {
  return (
    <div>
      <HeroVideo
        title="Perfekt DJ för Er Studentfest"
        subtitle="Skapa en legendarisk studentfest med professionell DJ-underhållning"
        buttonText="Boka DJ för Studentfest"
        buttonLink="/kontakt"
        videoSrc="/videos/studentfest.mp4"
      />
      <Divider />
      <TextWithImage
        title="DJ till studentfest"
        description="Gör din studentfest till en legendarisk kväll med bästa musiken och energin. Vi vet exakt vad som behövs för att skapa en oförglömlig studentfest som alla kommer att prata om."
        imageSrc="/images/studentfest.webp"
        imageAlt="DJ till studentfest"
        imagePosition="right"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
    </div>
  );
}
