'use client';

import Image from 'next/image';
import {
  FaGlassCheers,
  FaBirthdayCake,
  FaGraduationCap,
  FaBriefcase,
  FaMusic,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface PartyType {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  icon: IconType;
  extraHourRate: number;
  includedHours: number;
  baseFeatures: string[];
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: IconType;
  features: string[];
}

const partyTypes: PartyType[] = [
  {
    id: 'wedding',
    name: 'Bröllopsfest',
    basePrice: 7500,
    description: 'Perfekt för er stora dag',
    icon: FaGlassCheers,
    extraHourRate: 1000,
    includedHours: 4,
    baseFeatures: [
      '4 timmar DJ speltid',
      'Professionell DJ utrustning',
      'Skräddarsydd spellista',
      'Planeringsmöte ingår',
    ],
  },
  {
    id: 'birthday',
    name: 'Födelsedagsfest',
    basePrice: 6500,
    description: 'Gör dagen extra speciell',
    icon: FaBirthdayCake,
    extraHourRate: 500,
    includedHours: 4,
    baseFeatures: ['Professionell DJ utrustning', 'Skräddarsydd spellista', 'Planeringsmöte ingår'],
  },
  {
    id: 'student',
    name: 'Studentfest',
    basePrice: 6000,
    description: 'Fira studenten i stil',
    icon: FaGraduationCap,
    extraHourRate: 500,
    includedHours: 4,
    baseFeatures: ['Professionell DJ utrustning', 'Skräddarsydd spellista', 'Planeringsmöte ingår'],
  },
  {
    id: 'corporate',
    name: 'Företagsfest',
    basePrice: 7000,
    description: 'Professionell underhållning',
    icon: FaBriefcase,
    extraHourRate: 1000,
    includedHours: 4,
    baseFeatures: ['Professionell DJ utrustning', 'Skräddarsydd spellista', 'Planeringsmöte ingår'],
  },
  {
    id: 'club',
    name: 'Nattklubbsgig',
    basePrice: 5500,
    description: 'Perfekt för nattklubbsupplevelsen',
    icon: FaMusic,
    extraHourRate: 500,
    includedHours: 4,
    baseFeatures: ['Professionell DJ utrustning', 'Skräddarsydd spellista', 'Planeringsmöte ingår'],
  },
];

const addons: Addon[] = [
  {
    id: 'sound',
    name: 'Ljudsystem',
    description: 'Professionellt ljudsystem',
    price: 1500,
    icon: FaMusic,
    features: [
      'Yamaha ljudsystem',
      'Upp till 150 personer',
      '2 st front-högtalare',
      '2 st subwoofers',
    ],
  },
  {
    id: 'lights',
    name: 'Discoljus',
    description: 'LED-Discoljus',
    price: 1000,
    icon: FaMusic,
    features: ['Går i takt med musik', 'DJ styr ljuset live'],
  },
  {
    id: 'wireless-mic',
    name: 'Trådlös Mikrofon',
    description: 'Perfekt för tal och karaoke',
    price: 800,
    icon: FaMusic,
    features: ['2 st mikrofoner', 'Hög ljudkvalitet', 'Enkel att använda'],
  },
];

interface Offer {
  id: string;
  partyType: string;
  addons: string[];
  extraHours: number;
  distance: number;
  totalPrice: number;
  offerNumber: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    date: string;
    location: string;
    message: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  status: string;
}

interface OfferPreviewProps {
  offer: Offer;
}

export default function OfferPreview({ offer }: OfferPreviewProps) {
  const selectedParty = partyTypes.find(p => p.id === offer.partyType);
  const selectedAddons = addons.filter(a => offer.addons.includes(a.id));

  if (!selectedParty) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src="/logos/logo-black.svg"
            alt="DJ Szmak Logo"
            fill
            className="object-contain invert"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">DJ Szmak - Offer</h1>
        <p className="text-white">
          Skapad: {new Date(offer.createdAt.seconds * 1000).toLocaleDateString('sv-SE')}
        </p>
      </div>

      {/* Customer Info */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Kundinformation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Namn:</p>
            <p className="font-medium text-gray-900">{offer.customerInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-600">E-post:</p>
            <p className="font-medium text-gray-900">{offer.customerInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Telefon:</p>
            <p className="font-medium text-gray-900">{offer.customerInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Datum:</p>
            <p className="font-medium text-gray-900">{offer.customerInfo.date}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Plats:</p>
            <p className="font-medium text-gray-900">{offer.customerInfo.location}</p>
          </div>
        </div>
      </div>

      {/* Party Details */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Festdetaljer</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-900">{selectedParty.name}</h3>
          <p className="text-gray-600 mb-4">{selectedParty.description}</p>
          <ul className="space-y-2">
            {selectedParty.baseFeatures.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-900">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Extra Hours */}
        {offer.extraHours > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-900">Extra Speltid</h3>
            <p className="text-gray-900">
              {offer.extraHours} timmar x {selectedParty.extraHourRate} kr ={' '}
              {offer.extraHours * selectedParty.extraHourRate} kr
            </p>
          </div>
        )}

        {/* Addons */}
        {selectedAddons.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">Tillval</h3>
            <ul className="space-y-4">
              {selectedAddons.map(addon => (
                <li key={addon.id} className="border-l-4 border-[#00ff97] pl-4">
                  <h4 className="font-medium text-gray-900">{addon.name}</h4>
                  <p className="text-gray-600">{addon.description}</p>
                  <p className="font-medium text-gray-900">
                    {addon.price.toLocaleString('sv-SE')} kr
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Distance */}
      {offer.distance > 0 && (
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Transport</h2>
          <p className="text-gray-900">
            Avstånd: {offer.distance.toFixed(1)} km ({Math.round(offer.distance / 10)} mil)
          </p>
          <p className="text-gray-900">
            Transportkostnad: {Math.round(offer.distance / 10) * 100} kr
          </p>
        </div>
      )}

      {/* Total Price */}
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Totalt Pris</h2>
          <p className="text-2xl font-bold text-gray-900">
            {offer.totalPrice.toLocaleString('sv-SE')} kr
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-100 text-center text-sm text-gray-600">
        <p>Detta är en automatisk genererad offert från DJ Szmak</p>
        {offer.offerNumber && <p className="font-medium">Offer #{offer.offerNumber}</p>}
        <p>Offert-ID: {offer.id}</p>
      </div>
    </div>
  );
}
