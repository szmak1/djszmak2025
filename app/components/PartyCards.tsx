import PartyCard from './PartyCard';

const parties = [
  {
    title: 'BRÖLLOPSFEST',
    description:
      'Skapa en oförglömlig bröllopsfest med professionell DJ-entertainment som får alla att dansa.',
    imageSrc: '/images/bröllopsfest.webp',
    link: '/brollopsfest',
  },
  {
    title: 'FÖDELSEDAGSFEST',
    description: 'Fira din födelsedag med perfekt musik och en fest som ingen vill missa.',
    imageSrc: '/images/födelsedagsfest.webp',
    link: '/fodelsedagsfest',
  },
  {
    title: 'FÖRETAGSFEST',
    description:
      'Uppgradera din företagsfest med professionell DJ som skapar rätt stämning för alla.',
    imageSrc: '/images/foretagsfest.webp',
    link: '/foretagsfest',
  },
  {
    title: 'STUDENTFEST',
    description: 'Gör din studentfest till en legendarisk kväll med bästa musiken och energin.',
    imageSrc: '/images/studentfest.webp',
    link: '/studentfest',
  },
  {
    title: 'NATTKLUBBS GIG',
    description:
      'Professionell DJ-entertainment för nattklubbar som vill leverera bästa dansupplevelsen.',
    imageSrc: '/images/nattklubbsgig.webp',
    link: '/nattklubbsgig',
  },
  {
    title: 'LEDGOLV',
    description:
      'Hyr LEDGOLV i Malmö och Skåne. Sätt dansgolvet i centrum och låt gästerna dansa på ett hav av ljus! Boka ditt LEDgolv idag och gör din fest oförglömlig!',
    imageSrc: '/images/ledgolv.webp',
    link: '/ledgolv',
  },
];

export default function PartyCards() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] relative top-[-100px] z-[100]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
        {/* Title and Description */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent mb-4 max-w-2xl mx-auto">
            Välj din fest, vilken du än vill ha i Malmö/Skåne
          </h2>
          <p className="font-sans text-lg text-white/90 max-w-2xl mx-auto">
            Oavsett om du ska ha en bröllopsfest, födelsedagsfest eller företagsfest så har vi rätt
            DJ-entertainment för just din fest.
          </p>
        </div>

        {/* Party Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {parties.map(party => (
            <PartyCard
              key={party.title}
              title={party.title}
              description={party.description}
              imageSrc={party.imageSrc}
              link={party.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
