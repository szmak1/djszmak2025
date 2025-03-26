import HeroVideo from '@/app/components/HeroVideo'
import TextWithImage from '@/app/components/TextWithImage'
import Divider from '@/app/components/Divider'

export default function Foretagsfest() {
  return (
    <div>
      <HeroVideo />
      <Divider />
      <TextWithImage
        title="DJ till företagsfest"
        description="Uppgradera din företagsfest med professionell DJ som skapar rätt stämning för alla. Vi anpassar musiken efter era önskemål och skapar en minnesvärd kväll för hela teamet."
        imageSrc="/images/foretagsfest.webp"
        imageAlt="DJ till företagsfest"
        imagePosition="right"
        buttonText="Boka DJ"
        buttonLink="/kontakt"
      />
    </div>
  )
}