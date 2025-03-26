import HeroVideo from '@/app/components/HeroVideo'
import TextWithImage from '@/app/components/TextWithImage'
import Divider from '@/app/components/Divider'

export default function Ledgolv() {
  return (
    <div>
      <HeroVideo />
      <Divider />
      <TextWithImage
        title="LEDGOLV - Dansgolv med ljuseffekter"
        description="Hyr LEDGOLV i Malmö och Skåne. Sätt dansgolvet i centrum och låt gästerna dansa på ett hav av ljus! Boka ditt LEDgolv idag och gör din fest oförglömlig! Perfekt för bröllop, företagsfester och alla andra tillställningar där du vill skapa en unik och minnesvärd upplevelse."
        imageSrc="/images/ledgolv.webp"
        imageAlt="LEDGOLV - Dansgolv med ljuseffekter"
        imagePosition="right"
        buttonText="Boka LEDGOLV"
        buttonLink="/kontakt"
      />
    </div>
  )
} 