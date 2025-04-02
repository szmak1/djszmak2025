<<<<<<< HEAD
import React from 'react';
import { Metadata } from 'next';
import HeroVideo from '../components/HeroVideo';
import TextSection from '../components/TextSection';
=======
import { Metadata } from 'next';
import HeroVideo from '@/app/components/HeroVideo';
import TextSection from '@/app/components/TextSection';
>>>>>>> contact-page-refactor

export const metadata: Metadata = {
  title: 'Integritetspolicy | DJ Service Malmö',
  description:
    'Läs vår integritetspolicy för att förstå hur vi hanterar och skyddar dina personuppgifter. Vi tar din integritet på allvar och följer GDPR.',
  keywords: 'integritetspolicy, GDPR, personuppgifter, dataskydd, DJ Service Malmö',
};

export default function Integritetspolicy() {
  return (
    <main className="min-h-screen bg-black">
      <HeroVideo
        title="Integritetspolicy"
        subtitle="Vi tar din integritet på allvar"
        buttonText="Kontakta oss"
        buttonLink="/kontakt"
        videoSrc="/videos/hero.mp4"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <TextSection
            title="Hantering av personuppgifter"
            description="På DJ Service Malmö tar vi din integritet på allvar. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter enligt GDPR (General Data Protection Regulation).

            Vi samlar in personuppgifter när du:
            • Kontaktar oss via vår hemsida
            • Bokar våra tjänster
            • Prenumererar på vårt nyhetsbrev
            • Interagerar med oss på sociala medier

            De personuppgifter vi samlar in kan inkludera:
            • Namn och kontaktinformation (e-post, telefon)
            • Adress och platsinformation
            • Eventuella önskemål och preferenser
            • Betalningsinformation
            • Kommunikationshistorik"
          />

          <TextSection
            title="Hur vi använder dina uppgifter"
            description="Vi använder dina personuppgifter för att:
            • Hantera bokningar och betalningar
            • Skicka bekräftelser och uppdateringar
            • Förbättra våra tjänster
            • Skicka relevant marknadsföring (med ditt samtycke)
            • Följa lagliga skyldigheter
            • Hantera eventuella klagomål eller frågor

            Vi delar aldrig dina personuppgifter med tredjeparter utan ditt samtycke, förutom när det är nödvändigt för att:
            • Uppfylla lagliga skyldigheter
            • Leverera våra tjänster
            • Skydda våra rättigheter"
          />

          <TextSection
            title="Dina rättigheter"
            description="Enligt GDPR har du följande rättigheter:
            • Tillgång till dina personuppgifter
            • Rätt att få felaktiga uppgifter rättade
            • Rätt att begära radering av dina uppgifter
            • Rätt att begränsa behandling av dina uppgifter
            • Rätt att ta med dina uppgifter
            • Rätt att invända mot behandling
            • Rätt att återkalla samtycke

            För att utöva dina rättigheter, kontakta oss via e-post eller telefon."
          />

          <TextSection
            title="Säkerhet och lagring"
            description="Vi implementerar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot obehörig åtkomst, ändring, avslöjande eller förstörelse.

            Vi lagrar dina personuppgifter endast så länge som det är nödvändigt för att:
            • Uppfylla våra avtalsförpliktelser
            • Följa lagliga skyldigheter
            • Skydda våra legitima intressen"
          />

          <TextSection
            title="Cookies och spårning"
            description="Vi använder cookies och liknande teknologier för att:
            • Förbättra din användarupplevelse
            • Analysera trafik och användning
            • Komma ihåg dina preferenser
            • Skicka relevant innehåll

            Du kan kontrollera cookie-inställningar i din webbläsare. Observera att vissa funktioner på vår hemsida kanske inte fungerar optimalt om du inaktiverar cookies."
          />

          <TextSection
            title="Uppdateringar av integritetspolicyn"
            description="Vi kan uppdatera denna integritetspolicy för att reflektera ändringar i vår praxis eller lagstiftning. Vi meddelar dig om eventuella väsentliga ändringar via e-post eller på vår hemsida.

            Senast uppdaterad: 2024"
          />

          <TextSection
            title="Kontakt"
            description="Om du har frågor om vår integritetspolicy eller hur vi hanterar dina personuppgifter, tveka inte att kontakta oss:

            E-post: info@djszmak.se
            Telefon: 070-123 45 67"
          />
        </div>
      </div>
    </main>
  );
}
