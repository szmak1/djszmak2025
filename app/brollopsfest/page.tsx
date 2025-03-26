import HeroVideo from '@/app/components/HeroVideo';
import TextWithImage from '@/app/components/TextWithImage';
import Divider from '@/app/components/Divider';

export default function Bröllopsfest() {
  return (
    <div>
      <HeroVideo />
      <Divider />
      <TextWithImage
        title="DJ till bröllopsfest"
        description="Skapa en oförglömlig bröllopsfest med professionell DJ-entertainment som får alla att dansa. Vi anpassar musiken efter era önskemål och skapar rätt stämning för er stora dag."
        imageSrc="/images/bröllopsfest.webp"
        imageAlt="DJ till bröllopsfest"
        imagePosition="right"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
    </div>
  );
}
