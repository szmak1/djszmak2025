import { Metadata } from 'next';
import HeroVideo from '@/app/components/HeroVideo';
import TextSection from '@/app/components/TextSection';

export const metadata: Metadata = {
  title: 'Villkor | DJ Service Malmö',
  description:
    'Läs våra villkor för DJ-tjänster i Malmö och Skåne. Tydliga villkor för bokning, betalning och avbokning av våra tjänster.',
  keywords: 'villkor, bokningsvillkor, DJ Service Malmö, avbokningspolicy, betalningsvillkor',
};

export default function Villkor() {
  return (
    <main className="min-h-screen bg-black">
      <HeroVideo
        title="Villkor"
        subtitle="Tydliga villkor för våra tjänster"
        buttonText="Kontakta oss"
        buttonLink="/kontakt"
        videoSrc="/videos/hero.mp4"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <TextSection
            title="Allmänna villkor"
            description="Dessa villkor gäller för alla tjänster som erbjuds av DJ Service Malmö. Genom att boka våra tjänster accepterar du dessa villkor.

            • Tjänsterna erbjuds under förutsättning att tillgänglighet finns
            • Priserna är i svenska kronor och inkluderar moms
            • Vi förbehåller oss rätten att ändra priser och villkor
            • Alla priser är baspriser och kan variera beroende på specifika önskemål"
          />

          <TextSection
            title="Bokning och betalning"
            description="För att bekräfta din bokning krävs:
            • En förhandsbetalning på 2000 kr
            • Fullständig kontaktinformation
            • Bekräftelse av datum och tid
            • Godkännande av dessa villkor

            Betalningsvillkor:
            • Förhandsbetalning ska ske inom 5 arbetsdagar
            • Återstående belopp ska betalas senast 14 dagar före eventet
            • Vid sen betalning kan vi neka tjänsten
            • Vid avbokning gäller vår avbokningspolicy"
          />

          <TextSection
            title="Avbokningspolicy"
            description="Vid avbokning gäller följande villkor:
            • Avbokning mer än 30 dagar före eventet: Ingen kostnad
            • Avbokning 14-30 dagar före eventet: 50% av totalbeloppet
            • Avbokning mindre än 14 dagar före eventet: 100% av totalbeloppet
            
            Vid force majeure eller särskilda omständigheter kan undantag göras från dessa villkor."
          />

          <TextSection
            title="Tjänstens omfattning"
            description="Våra DJ-tjänster inkluderar:
            • Professionell DJ-utrustning
            • Skräddarsydd spellista
            • Planeringsmöte
            • Grundläggande ljus och ljud
            • Transport inom Skåne

            Tidsram:
            • Standardbokning inkluderar 4 timmars speltid
            • Extra timmar kan tillkomma mot extra kostnad
            • Setup och packning ingår i bokad tid"
          />

          <TextSection
            title="Kundens ansvar"
            description="Som kund ansvarar du för:
            • Att tillhandahålla tillgång till lokalen
            • Att lokalen har tillräckligt med uttag
            • Att tillhandahålla parkeringsmöjlighet
            • Att informera om eventuella särskilda önskemål
            • Att betala eventuella tillkommande kostnader"
          />

          <TextSection
            title="Försäkring och ansvar"
            description="DJ Service Malmö:
            • Är försäkrad för skador på utrustning
            • Har ansvarsförsäkring för eventuella skador
            • Följer alla relevanta säkerhetsbestämmelser
            • Har rätt att avbryta tjänsten vid osäkra förhållanden"
          />

          <TextSection
            title="Force Majeure"
            description="Vi är inte ansvariga för förseningar eller inställda tjänster orsakade av:
            • Naturkatastrofer
            • Strejker eller arbetskonflikter
            • Epidemier eller pandemier
            • Krig eller andra extraordinära omständigheter"
          />

          <TextSection
            title="Tvistelösning"
            description="Vid eventuella tvister:
            • Svensk lag ska tillämpas
            • Malmö tingsrätt ska vara domstol
            • Vi strävar efter att lösa eventuella problem i godo"
          />

          <TextSection
            title="Kontakt"
            description="För frågor om våra villkor eller tjänster, kontakta oss:

            E-post: info@djszmak.se
            Telefon: 070-123 45 67"
          />
        </div>
      </div>
    </main>
  );
}
