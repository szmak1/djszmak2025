'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FaGlassCheers,
  FaBirthdayCake,
  FaGraduationCap,
  FaBriefcase,
  FaMusic,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface OfferData {
  partyType: string;
  addons: string[];
  addonPrices: { [key: string]: number };
  extraHours: number;
  distance: number;
  totalPrice: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    date: string;
    location: string;
    message: string;
  };
}

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

interface OfferGeneratorProps {
  offerData: OfferData;
  onSave?: (offerId: string) => void;
}

export default function OfferGenerator({ offerData, onSave }: OfferGeneratorProps) {
  const [offerId, setOfferId] = useState<string | null>(null);
  const [offerNumber, setOfferNumber] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const selectedParty = partyTypes.find(p => p.id === offerData.partyType);
  const selectedAddons = addons.filter(a => offerData.addons.includes(a.id));

  const saveOfferToFirebase = async () => {
    if (isSaving || hasSaved) return;
    setIsSaving(true);
    setSaveError(null);

    const counterRef = doc(db, 'metadata', 'offerCounter');
    const newOfferRef = doc(collection(db, 'offers'));

    try {
      console.log('Attempting to save offer via transaction...');

      const addonPrices: { [key: string]: number } = {};
      selectedAddons.forEach(addon => {
        addonPrices[addon.id] = addon.price;
      });

      const returnedOfferNumber = await runTransaction(db, async transaction => {
        const counterDoc = await transaction.get(counterRef);
        const currentNumber = counterDoc.exists() ? counterDoc.data().count || 0 : 0;
        const newOfferNumber = currentNumber + 1;

        transaction.set(newOfferRef, {
          ...offerData,
          addonPrices,
          offerNumber: newOfferNumber,
          createdAt: serverTimestamp(),
          status: 'pending',
        });

        transaction.set(counterRef, { count: newOfferNumber }, { merge: !counterDoc.exists() });

        return newOfferNumber;
      });

      console.log(
        `Transaction successful! Offer #${returnedOfferNumber} saved. ID: ${newOfferRef.id}`
      );
      setOfferId(newOfferRef.id);
      setOfferNumber(returnedOfferNumber);
      setHasSaved(true);
      if (onSave) onSave(newOfferRef.id);

      window.location.href = '/thanks.html';
    } catch (error) {
      console.error('Error during Firestore transaction:', error);
      setSaveError('Kunde inte spara offerten (transaktionsfel). Försök igen.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (offerData && !hasSaved && !isSaving) {
      console.log('useEffect triggering saveOfferToFirebase');
      saveOfferToFirebase();
    }
  }, [offerData, hasSaved, isSaving, saveOfferToFirebase]);

  if (!selectedParty) return null;

  const formatPrice = (price: number) => price.toLocaleString('sv-SE');
  const extraHoursCost = offerData.extraHours * (selectedParty?.extraHourRate || 0);
  const transportCost = Math.round(offerData.distance / 10) * 100;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00ff97] to-[#007ed4] p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src="/images/logo.png"
            alt="DJ Szmak Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">DJ Szmak - Offer</h1>
        <p className="text-white/90">Skapad: {new Date().toLocaleDateString('sv-SE')}</p>
      </div>

      {/* Save Status */}
      {isSaving && (
        <div className="p-4 bg-yellow-50 text-center">
          <p className="text-yellow-700">Sparar offert...</p>
        </div>
      )}
      {saveError && (
        <div className="p-4 bg-red-50 text-center">
          <p className="text-red-700">{saveError}</p>
        </div>
      )}
      {hasSaved && offerId && offerNumber && !saveError && (
        <div className="p-4 bg-green-50 text-center">
          <p className="text-green-700">
            Offert #{offerNumber} sparad! ID: {offerId}
          </p>
        </div>
      )}

      {/* Customer Info */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Kundinformation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Namn:</p>
            <p className="font-medium text-gray-900">{offerData.customerInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-600">E-post:</p>
            <p className="font-medium text-gray-900">{offerData.customerInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Telefon:</p>
            <p className="font-medium text-gray-900">{offerData.customerInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Datum:</p>
            <p className="font-medium text-gray-900">{offerData.customerInfo.date}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Plats:</p>
            <p className="font-medium text-gray-900">{offerData.customerInfo.location}</p>
          </div>
          {offerData.customerInfo.message && (
            <div className="col-span-2">
              <p className="text-gray-600">Meddelande:</p>
              <p className="font-medium text-gray-900 whitespace-pre-wrap">
                {offerData.customerInfo.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Party Details */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Festdetaljer</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-900">
            {selectedParty.name} ({formatPrice(selectedParty.basePrice)} kr)
          </h3>
          <p className="text-gray-600 mb-4">{selectedParty.description}</p>
          <p className="text-sm text-gray-600 mb-2">Inkluderar:</p>
          <ul className="space-y-1 list-disc list-inside text-gray-700 pl-2 mb-4">
            {selectedParty.baseFeatures.map((feature, index) => (
              <li key={index} className="text-gray-900">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Extra Hours */}
        {offerData.extraHours > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-900">Extra Speltid</h3>
            <p className="text-gray-900">
              {offerData.extraHours} timmar á {formatPrice(selectedParty.extraHourRate)} kr =
              <span className="font-semibold"> {formatPrice(extraHoursCost)} kr</span>
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
                  <h4 className="font-medium text-gray-900">
                    {addon.name} ({formatPrice(addon.price)} kr)
                  </h4>
                  <p className="text-gray-600">{addon.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Distance */}
      {offerData.distance > 0 && (
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Transport</h2>
          <p className="text-gray-900">
            Avstånd: {offerData.distance.toFixed(1)} km ({Math.round(offerData.distance / 10)} mil á
            100 kr)
          </p>
          <p className="text-gray-900">
            Transportkostnad: <span className="font-semibold">{formatPrice(transportCost)} kr</span>
          </p>
        </div>
      )}

      {/* Total Price */}
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Totalt Pris (inkl. moms)</h2>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(offerData.totalPrice)} kr</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-100 text-center text-sm text-gray-600">
        <p>Detta är en automatisk genererad offert från DJ Szmak</p>
        {offerNumber && <p>Offer #{offerNumber}</p>}
        {offerId && <p>Offert-ID: {offerId}</p>}
      </div>
    </div>
  );
}
