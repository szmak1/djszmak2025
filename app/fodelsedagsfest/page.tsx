import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';

export default function Födelsedagsfest() {
  return (
    <div>
      <HeroVideo
        title="Fira Födelsedagen med Perfekt Musik"
        subtitle="En oförglömlig födelsedagsfest med professionell DJ-underhållning"
        buttonText="Boka DJ för Födelsedag"
        buttonLink="/kontakt"
        videoSrc="/videos/fodelsedagsfest.mp4"
      />
      <Divider />
      <TextWithImage
        title="DJ till födelsedagsfest"
        description="Fira din födelsedag med perfekt musik och en fest som ingen vill missa. Vi skapar rätt stämning för din fest med musik som passar just dig och dina gäster."
        imageSrc="/images/födelsedagsfest.webp"
        imageAlt="DJ till födelsedagsfest"
        imagePosition="right"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
    </div>
  );
}
