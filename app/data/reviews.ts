export interface Review {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
  time: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
  photoCount?: number;
}

export const reviews: Review[] = [
  {
    author_name: 'Niklas Rosén',
    rating: 5,
    text: 'Dj Szmak spelade på ROSÉNSSONS AW 10 maj-24. Grymt bra, seriös kille med bra tekniskt utrustning och med kanonljud. Bara att anlita!',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2023-05-10',
    reviewCount: 2,
  },
  {
    author_name: 'Maria Ohlson Andersson',
    rating: 5,
    text: 'David spelade på vår studentfest som blev väldigt lyckad! Bra musik, kände in stämningen, lyhörd, vänlig och snabb i kontakt och återkoppling! Kan varmt rekommendera.',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 1,
  },
  {
    author_name: 'Rikard Hallén',
    rating: 5,
    text: 'Väldigt lyckad spelning på min 40 års fest där temat var 80 tal och Miami Vice. David är otroligt lyhörd och extremt professionell.',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 2,
  },
  {
    author_name: 'Antonio Markovic',
    rating: 5,
    text: 'Riktigt nöjd med David! Har sett honom spela ute på klubbar i åratal och visste att han var duktig innan jag hyrde honom.',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 17,
  },
  {
    author_name: 'Kasra Lashkari',
    rating: 5,
    text: 'Duktig kille med trevligt bemötande och var väldigt flexibel efter behov!',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 2,
  },
  {
    author_name: 'Denis Skobalj',
    rating: 5,
    text: 'kontakten med David var professionell. Kan rekommendera!',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 1,
  },
  {
    author_name: 'Patrik Molina',
    rating: 5,
    text: 'David levererade hela kvällen!!! Supernöjd!!!',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 1,
  },
  {
    author_name: 'Zsolt Horvath',
    rating: 5,
    text: 'Riktig cool dj! Rekommenderas starkt.',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    reviewCount: 3,
  },
  {
    author_name: 'Lam Le Ly',
    rating: 5,
    text: 'Bästa Dj! Till bröllopfest!',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2021-01-01',
    isLocalGuide: true,
    reviewCount: 27,
    photoCount: 124,
  },
  {
    author_name: 'Magnus Åhman',
    rating: 5,
    text: 'DJ ompa ompa duns duns',
    profile_photo_url: '/images/reviewers/default-avatar.png',
    time: '2024-01-01',
    reviewCount: 15,
    photoCount: 2,
  },
];
