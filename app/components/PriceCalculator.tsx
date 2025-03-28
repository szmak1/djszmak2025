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

interface PriceCalculatorProps {
  defaultPartyType?: string;
  stepDescriptions?: {
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    step4: {
      title: string;
      description: string;
    };
  };
}

export default function PriceCalculator({
  defaultPartyType,
  stepDescriptions,
}: PriceCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedParty, setSelectedParty] = useState<string>(defaultPartyType || '');
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const defaultStepDescriptions = {
    step1: {
      title: 'Välj Festtyp',
      description: 'Välj den festtyp som passar ditt evenemang bäst',
    },
    step2: {
      title: 'Välj Extra Tjänster',
      description: 'Lägg till extra tjänster för att förbättra din fest',
    },
    step3: {
      title: 'Beräkna Avstånd',
      description: 'Ange adress för att beräkna avstånd från Malmö',
    },
    step4: {
      title: 'Kontaktinformation',
      description: 'Fyll i dina uppgifter för att skicka din förfrågan',
    },
  };

  const steps = stepDescriptions || defaultStepDescriptions;

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
    if (currentStep === 3) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          partyType: selectedParty,
          addons: selectedAddons,
          extraHours,
          distance: distanceInfo.distance,
          totalPrice: calculateTotal(),
          features: getSelectedFeatures().features,
          excludedFeatures: getSelectedFeatures().excludedFeatures,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send quote request');
      }

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        location: '',
        message: '',
      });
      setSelectedParty(defaultPartyType || ''); // Reset to defaultPartyType if provided, otherwise empty
      setSelectedAddons([]);
      setExtraHours(0);
      setDistanceInfo({
        address: '',
        distance: 0,
        pricePerKm: 100,
      });
      setCurrentStep(1);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send quote request');
    } finally {
      setIsSubmitting(false);
    }
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
    <div id="pricecalculator" className="w-full py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white text-center mb-6">
          Skapa Ditt DJ-paket
        </h2>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl text-gray-300 mb-4">
            Få en skräddarsydd offert för din fest genom att fylla i formuläret nedan. Vi erbjuder
            professionella DJ-tjänster för alla typer av evenemang.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-400">
            <div className="bg-black/50 border border-[#00ff97]/20 p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-2xl mb-2">
                1
              </div>
              <p className="font-semibold text-white mb-2">{steps.step1.title}</p>
              <p className="text-sm">{steps.step1.description}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-2xl mb-2">
                2
              </div>
              <p className="font-semibold text-white mb-2">{steps.step2.title}</p>
              <p className="text-sm">{steps.step2.description}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-2xl mb-2">
                3
              </div>
              <p className="font-semibold text-white mb-2">{steps.step3.title}</p>
              <p className="text-sm">{steps.step3.description}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-2xl mb-2">
                4
              </div>
              <p className="font-semibold text-white mb-2">{steps.step4.title}</p>
              <p className="text-sm">{steps.step4.description}</p>
            </div>
          </div>
          <div className="mt-8 text-gray-300">
            <p className="mb-2">✓ Få svar inom 24 timmar</p>
            <p className="mb-2">✓ Gratis offert</p>
            <p className="mb-2">✓ Inga bindande avtal</p>
            <p>✓ Skräddarsydda paket för ditt evenemang</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-[#00ff97] to-[#007ed4] text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-[#00ff97] to-[#007ed4]'
                        : 'bg-gray-700'
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
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2">
                    Välj Festtyp
                  </h3>
                  <p className="text-gray-400">Välj en festtyp för att fortsätta</p>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2">
                    Välj Extra Tjänster
                  </h3>
                  <p className="text-gray-400">
                    Lägg till extra tjänster för att förbättra din fest
                  </p>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2">
                    Beräkna Avstånd
                  </h3>
                  <p className="text-gray-400">Ange adress för att beräkna avstånd från Malmö</p>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2">
                    Kontaktinformation
                  </h3>
                  <p className="text-gray-400">
                    Fyll i dina uppgifter för att skicka din förfrågan
                  </p>
                </>
              )}
            </div>
            <div className="text-right">
              <h3 className="text-xl font-heading font-semibold text-white mb-2">Totalt Pris</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
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
                      className={`bg-black/50 border border-[#00ff97]/20 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-[#00ff97] shadow-lg scale-105'
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg">
                          <Icon className="w-6 h-6 text-[#00ff97]" />
                        </div>
                        <div className="text-right">
                          <h4 className="text-xl font-heading font-semibold text-white">
                            {party.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{party.description}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent mb-2">
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
                            className="px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)]"
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
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {addons.map(addon => {
                  const Icon = addon.icon;
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      className={`bg-black/50 border border-[#00ff97]/20 rounded-lg p-6 transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-[#00ff97] shadow-lg scale-105' : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg">
                          <Icon className="w-6 h-6 text-[#00ff97]" />
                        </div>
                        <div className="text-right">
                          <h4 className="text-xl font-heading font-semibold text-white">
                            {addon.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{addon.description}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent mb-4">
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
                            className="px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)]"
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

          {currentStep === 3 && (
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
                    className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
                    required
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {distanceInfo.distance > 0 && (
                  <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-4">
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
                  className="w-full px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)]"
                >
                  Beräkna Avstånd
                </button>
              </form>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                {submitSuccess ? (
                  <div className="bg-[#00ff97]/10 border border-[#00ff97]/20 rounded-lg p-6 text-center">
                    <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-2xl mb-2">
                      Tack för din förfrågan!
                    </div>
                    <p className="text-gray-300">
                      Vi har skickat en bekräftelse till din e-postadress. Vi återkommer till dig
                      inom 24 timmar med en detaljerad offert.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)]"
                    >
                      Skicka en ny förfrågan
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-gray-300 mb-2 text-lg font-semibold">Namn</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-lg font-semibold">
                        E-post
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-lg font-semibold">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-lg font-semibold">
                        Datum
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-lg font-semibold">
                        Plats
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
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
                        className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00ff97]"
                        placeholder="Berätta gärna mer om din fest och eventuella önskemål..."
                      />
                    </div>
                    {submitError && <div className="text-red-500 text-center">{submitError}</div>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)] ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Skickar förfrågan...' : 'Skicka Förfrågan'}
                    </button>
                  </>
                )}
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
                className="px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)] ml-auto"
              >
                Nästa
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)] ml-auto"
              >
                Skicka Förfrågan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
