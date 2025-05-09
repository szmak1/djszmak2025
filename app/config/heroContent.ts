interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  videoSrc: string;
}

export const heroContent: Record<string, HeroContent> = {
  '/': {
    title: 'DJ i Malmö & Skåne med LJUD, LJUS & LEDGOLV',
    subtitle:
      'Hyr en erfaren DJ med professionell utrustning till bröllop, födelsedagsfest, studentfest, företagsfest och nattklubb i Malmö och Skåne. Vi erbjuder proffsig DJ-service med kvalitetsutrustning för alla typer av evenemang.',
    buttonText: 'Boka ditt event nu',
    buttonLink: '/kontakt',
    videoSrc: '/videos/main-dj.mp4',
  },
  '/brollopsfest': {
    title: 'Skapa Magiska Ögonblick på Er Bröllopsfest',
    subtitle: 'Låt mig vara er DJ och skapa den perfekta stämningen för er speciella dag',
    buttonText: 'Boka DJ för Bröllop',
    buttonLink: '/kontakt',
    videoSrc: '/videos/brollopsfest.mp4',
  },
  '/fodelsedagsfest': {
    title: 'Fira Födelsedagen med Perfekt Musik',
    subtitle: 'En oförglömlig födelsedagsfest med professionell DJ-underhållning',
    buttonText: 'Boka DJ för Födelsedag',
    buttonLink: '/kontakt',
    videoSrc: '/videos/fodelsedagsfest.mp4',
  },
  '/foretagsfest': {
    title: 'Professionell DJ för Er Företagsfest',
    subtitle: 'Skapa en minnesvärd företagsfest med perfekt musikmix för alla',
    buttonText: 'Boka DJ för Företagsfest',
    buttonLink: '/kontakt',
    videoSrc: '/videos/foretagsfest.mp4',
  },
  '/studentfest': {
    title: 'Perfekt DJ för Er Studentfest',
    subtitle: 'Skapa en legendarisk studentfest med professionell DJ-underhållning',
    buttonText: 'Boka DJ för Studentfest',
    buttonLink: '/kontakt',
    videoSrc: '/videos/studentfest.mp4',
  },
  '/nattklubbsgig': {
    title: 'Professionell DJ för Nattklubbsgig',
    subtitle: 'Ta med den perfekta stämningen till er nattklubb med professionell DJ',
    buttonText: 'Boka DJ för Nattklubb',
    buttonLink: '/kontakt',
    videoSrc: '/videos/nattklubbsgig.mp4',
  },
  '/ledgolv': {
    title: 'Transformera Er Dansgolv med LEDGOLV',
    subtitle: 'Skapa en spektakulär ljusshow som får era gäster att dansa på ett hav av ljus',
    buttonText: 'Boka LEDGOLV',
    buttonLink: '/kontakt',
    videoSrc: '/videos/LEDGolv.mp4',
  },
};
