import HeroVideo from '@/app/components/HeroVideo'
import TextWithImage from '@/app/components/TextWithImage'
import Divider from '@/app/components/Divider'

export default function Födelsedagsfest() {
  return (
    <div>
      <HeroVideo />
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
  )
} 