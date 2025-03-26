'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FaGlassCheers,
  FaBirthdayCake,
  FaGraduationCap,
  FaBriefcase,
  FaMusic,
  FaMicrophone,
  FaLightbulb,
  FaSmog,
  FaSnowflake,
  FaSquare,
} from 'react-icons/fa';

interface PartyType {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  icon: any;
  extraHourRate: number;
  includedHours: number;
  baseFeatures: string[];
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  features: string[];
  excludedFeatures?: string[];
}

// Add new interface for distance calculation
interface DistanceInfo {
  address: string;
  distance: number; // in kilometers
  pricePerKm: number;
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
    baseFeatures: ['Professionell DJ utrustning', 'Skräddarsydd spellista', 'Planeringsmöte ingår'],
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
      'Ljudsystem (upp till 150 pers)',
      'Professionell ljudteknik',
      'Optimal ljudkvalitet',
    ],
  },
  {
    id: 'lights',
    name: 'Discoljus',
    description: 'LED-Discoljus',
    price: 1500,
    icon: FaLightbulb,
    features: [
      'LED-Discoljus (i takt med rytm)',
      'Professionell ljusdesign',
      'Skräddarsydd ljusshow',
    ],
  },
  {
    id: 'wireless-mic',
    name: 'Trådlös Mikrofon',
    description: 'Perfekt för tal och karaoke',
    price: 500,
    icon: FaMicrophone,
    features: ['Trådlös mikrofon', 'Hög ljudkvalitet', 'Enkel att använda'],
  },
  {
    id: 'smoke',
    name: 'Rökmaskin',
    description: 'Skapa atmosfär med rök',
    price: 800,
    icon: FaSmog,
    features: ['Professionell rökmaskin', 'Säker att använda', 'Skapar fantastisk atmosfär'],
  },
  {
    id: 'dry-ice',
    name: 'Dry Ice Maskin',
    description: 'Spektakulär effekt med torris',
    price: 1200,
    icon: FaSnowflake,
    features: ['Dry ice effekt', 'Professionell utrustning', 'Imponerande visuell effekt'],
  },
  {
    id: 'ledfloor',
    name: 'LED-golv',
    description: 'Interaktivt LED-golv',
    price: 10000,
    icon: FaSquare,
    features: [
      'LedGolv till dansgolvet',
      'LED-Ljus golv (i takt med rytm)',
      'upp till 24m2',
      'Planeringsmöte ingår',
    ],
    excludedFeatures: ['Ingår ej DJ', 'Ingår ej LJUD', 'Ingår ej disco ljus'],
  },
];

export default function PriceCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedParty, setSelectedParty] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [extraHours, setExtraHours] = useState(0);
  const [distanceInfo, setDistanceInfo] = useState<DistanceInfo>({
    address: '',
    distance: 0,
    pricePerKm: 100, // Price per 10 km (mil)
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: '',
  });
  const [error, setError] = useState('');

  const calculateTotal = () => {
    let total = 0;

    // Add base price for selected party type
    const party = partyTypes.find(p => p.id === selectedParty);
    if (party) {
      total += party.basePrice;
      // Add extra hours cost
      total += extraHours * party.extraHourRate;
    }

    // Add distance cost (per 10 km)
    const distanceInMil = Math.round(distanceInfo.distance / 10);
    total += distanceInMil * distanceInfo.pricePerKm;

    // Add addon prices
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });

    return total;
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedParty) {
      setError('Välj en festtyp för att fortsätta');
      return;
    }
    if (currentStep === 2) {
      if (!formData.location.trim()) {
        setError('Vänligen ange en stad för att beräkna avståndet');
        return;
      }
      if (!distanceInfo.address) {
        setError('Vänligen ange en giltig stad');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
    setError('');
  };

  const handlePartySelect = (partyId: string) => {
    setSelectedParty(prev => (prev === partyId ? '' : partyId));
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleExtraHoursChange = (hours: number) => {
    // Limit extra hours to 3 (total 7 hours) since 4 hours are included
    setExtraHours(Math.min(Math.max(0, hours), 3));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!distanceInfo.address.trim()) return;

    try {
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: distanceInfo.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate distance');
      }

      // Convert distance from meters to kilometers
      const distanceInKm = data.distance / 1000;
      setDistanceInfo(prev => ({
        ...prev,
        distance: distanceInKm,
      }));
    } catch (error) {
      console.error('Error calculating distance:', error);
      alert('Kunde inte beräkna avståndet. Kontrollera adressen och försök igen.');
    }
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location.trim()) return;

    try {
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination: formData.location }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate distance');
      }

      // Convert distance from meters to kilometers
      const distanceInKm = data.distance / 1000;
      setDistanceInfo(prev => ({
        ...prev,
        distance: distanceInKm,
        address: formData.location,
      }));
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error calculating distance:', error);
      setError('Kunde inte beräkna avståndet. Kontrollera att staden är korrekt och försök igen.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const getSelectedFeatures = () => {
    const features = new Set<string>();
    const excludedFeatures = new Set<string>();

    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        addon.features.forEach(feature => features.add(feature));
        addon.excludedFeatures?.forEach(feature => excludedFeatures.add(feature));
      }
    });

    return { features: Array.from(features), excludedFeatures: Array.from(excludedFeatures) };
  };

  const { features, excludedFeatures } = getSelectedFeatures();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading text-white text-center mb-12">
          Skapa Ditt DJ-paket
        </h2>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      currentStep >= step ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 rounded-lg p-8">
          {/* Price Summary and Step Title in same row */}
          <div className="flex justify-between items-center mb-8">
            <div>
              {currentStep === 1 && (
                <>
                  <h3 className="text-2xl font-semibold text-white mb-2">Välj Festtyp</h3>
                  <p className="text-gray-400">Välj en festtyp för att fortsätta</p>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h3 className="text-2xl font-semibold text-white mb-2">Beräkna Avstånd</h3>
                  <p className="text-gray-400">Ange adress för att beräkna avstånd från Malmö</p>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <h3 className="text-2xl font-semibold text-white mb-2">Välj Extra Tjänster</h3>
                  <p className="text-gray-400">
                    Lägg till extra tjänster för att förbättra din fest
                  </p>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <h3 className="text-2xl font-semibold text-white mb-2">Kontaktinformation</h3>
                  <p className="text-gray-400">
                    Fyll i dina uppgifter för att skicka din förfrågan
                  </p>
                </>
              )}
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold text-white mb-2">Totalt Pris</h3>
              <div className="text-3xl font-bold text-blue-500">
                {calculateTotal().toLocaleString('sv-SE')} kr
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partyTypes.map(party => {
                  const Icon = party.icon;
                  const isSelected = selectedParty === party.id;
                  const isVisible = !selectedParty || isSelected;

                  if (!isVisible) return null;

                  return (
                    <div
                      key={party.id}
                      className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="text-right">
                          <h4 className="text-xl font-semibold text-white">{party.name}</h4>
                          <p className="text-gray-400 text-sm">{party.description}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-500 mb-2">
                        {party.basePrice.toLocaleString('sv-SE')} kr
                        {extraHours > 0 && (
                          <span className="text-lg text-gray-400 ml-2">
                            + {extraHours * party.extraHourRate} kr
                          </span>
                        )}
                      </div>
                      {isSelected ? (
                        <div className="mt-4">
                          <div className="text-sm text-green-500 mb-2 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {party.includedHours + extraHours} timmar DJ ({party.includedHours}{' '}
                            timmar ingår + {extraHours} extra timmar)
                          </div>
                          <ul className="space-y-1.5 mb-4">
                            {party.baseFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center text-green-500 text-sm">
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
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
                          <div className="text-sm text-gray-400 mb-4">
                            Extra DJ speltid per timme:{' '}
                            {party.extraHourRate.toLocaleString('sv-SE')} kr
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-300">Extra DJ speltid:</span>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  handleExtraHoursChange(extraHours - 1);
                                }}
                                className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"
                              >
                                -
                              </button>
                              <span className="text-white font-semibold">{extraHours}</span>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  handleExtraHoursChange(extraHours + 1);
                                }}
                                className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-green-500">
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Vald
                            </div>
                            <button
                              onClick={() => handlePartySelect(party.id)}
                              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                            >
                              Avbryt
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => handlePartySelect(party.id)}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                          >
                            Välj
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleLocationSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">
                    Festplats Adress
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="Ange fullständig adress"
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {distanceInfo.distance > 0 && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-green-500 mb-2">
                      Avstånd från Malmö: {distanceInfo.distance.toFixed(1)} km
                    </div>
                    <div className="text-gray-400">
                      Resekostnad:{' '}
                      {Math.round(distanceInfo.distance / 10) * distanceInfo.pricePerKm} kr
                      <span className="text-sm ml-2">
                        ({Math.round(distanceInfo.distance / 10)} mil)
                      </span>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Beräkna Avstånd
                </button>
              </form>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {addons.map(addon => {
                  const Icon = addon.icon;
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      className={`bg-gray-800 rounded-lg p-6 transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="text-right">
                          <h4 className="text-xl font-semibold text-white">{addon.name}</h4>
                          <p className="text-gray-400 text-sm">{addon.description}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-500 mb-4">
                        {addon.price.toLocaleString('sv-SE')} kr
                      </div>
                      {isSelected ? (
                        <>
                          <div className="mt-4">
                            <ul className="space-y-2">
                              {addon.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-green-500 text-sm"
                                >
                                  <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
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
                            <div className="flex items-center text-green-500 mt-4">
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Vald
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => toggleAddon(addon.id)}
                              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                            >
                              Avbryt
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => toggleAddon(addon.id)}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                          >
                            Välj
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">Namn</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">E-post</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">Datum</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">Plats</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">
                    Meddelande
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Tillbaka
              </button>
            )}
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ml-auto"
              >
                Nästa
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ml-auto"
              >
                Skicka Förfrågan
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
