'use client';

import { useState, useEffect } from 'react';
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
    icon: FaLightbulb,
    features: ['Går i takt med musik', 'DJ styr ljuset live'],
  },
  {
    id: 'wireless-mic',
    name: 'Trådlös Mikrofon',
    description: 'Perfekt för tal och karaoke',
    price: 800,
    icon: FaMicrophone,
    features: ['2 st mikrofoner', 'Hög ljudkvalitet', 'Enkel att använda'],
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
    features: ['Stark effekt', 'Röken stannar på golv nivå'],
  },
  {
    id: 'ledfloor',
    name: 'LED-golv',
    description: 'Interaktivt LED-golv',
    price: 10000,
    icon: FaSquare,
    features: [
      'LedGolv till dansgolvet',
      'Går i takt med musik',
      'upp till 24m2',
      'Planeringsmöte ingår',
    ],
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
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [lastSelectedPrice, setLastSelectedPrice] = useState<number | null>(null);
  const [lastSelectedPosition, setLastSelectedPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const defaultStepDescriptions = {
    step1: {
      title: 'Välj Festtyp',
    },
    step2: {
      title: 'Välj Extra Tjänster',
    },
    step3: {
      title: 'Beräkna Transport',
    },
    step4: {
      title: 'Kontaktinformation',
    },
  };

  const steps = stepDescriptions || defaultStepDescriptions;

  useEffect(() => {
    if (currentStep > 1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentStep]);

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
    const addon = addons.find(a => a.id === addonId);
    if (addon) {
      const price = addon.price;
      const element = document.getElementById(`price-${addonId}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setLastSelectedPosition({ x: rect.left, y: rect.top });
        setLastSelectedPrice(price);
      }
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 600);
    }
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleExtraHoursChange = (hours: number) => {
    // Limit extra hours to 3 (total 7 hours) since 4 hours are included
    const newHours = Math.min(Math.max(0, hours), 3);
    if (newHours !== extraHours) {
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 600);
      setExtraHours(newHours);
    }
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
    <div id="pricecalculator" className="w-full py-16">
      <div className="container px-0">
        <h2 className="text-2xl md:text-5xl font-heading font-bold text-[#00ff97] text-center mb-4 md:mb-6">
          Skapa Ditt DJ-paket
        </h2>
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <p className="text-base md:text-xl text-gray-300 mb-4">
            Få en skräddarsydd offert för din fest genom att fylla i formuläret nedan. Vi erbjuder
            professionella DJ-tjänster för alla typer av evenemang.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 text-gray-400">
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                1
              </div>
              <p className="font-semibold text-white text-xs md:text-base mb-1">
                {steps.step1.title}
              </p>
              <p className="text-[10px] md:text-sm">{steps.step1.description}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                2
              </div>
              <p className="font-semibold text-white text-xs md:text-base mb-1">
                {steps.step2.title}
              </p>
              <p className="text-[10px] md:text-sm">{steps.step2.description}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                3
              </div>
              <p className="font-semibold text-white text-xs md:text-base mb-1">
                {steps.step3.title}
              </p>
              <p className="text-[10px] md:text-sm">{steps.step3.description}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                4
              </div>
              <p className="font-semibold text-white text-xs md:text-base mb-1">
                {steps.step4.title}
              </p>
              <p className="text-[10px] md:text-sm">{steps.step4.description}</p>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-gray-300 text-sm md:text-base">
            <p className="mb-1 md:mb-2">✓ Få svar inom 24 timmar</p>
            <p className="mb-1 md:mb-2">✓ Gratis offert</p>
            <p className="mb-1 md:mb-2">✓ Inga bindande avtal</p>
            <p className="mb-1 md:mb-2">✓ Skräddarsydda paket för ditt evenemang</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div
          className={`${
            currentStep > 1
              ? 'fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm py-2 md:py-4'
              : 'mb-12'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-base ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-[#00ff97] to-[#007ed4] text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-6 md:w-20 h-1 mx-1 md:mx-2 ${
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
        </div>

        {/* Step Content */}
        <div
          className={`${
            currentStep > 1 ? 'fixed inset-0 z-40 bg-black pt-16 md:pt-20 overflow-hidden' : ''
          }`}
        >
          <div className={`${currentStep > 1 ? 'h-full flex flex-col' : ''}`}>
            {/* Price Summary and Step Title */}
            <div
              className={`${
                currentStep > 1
                  ? 'fixed top-12 md:top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm py-1 md:py-2'
                  : ''
              }`}
            >
              <div className="container mx-auto px-4">
                <div className="flex flex-col justify-between items-start items-center gap-1 md:gap-2">
                  <div>
                    {currentStep === 1 && (
                      <>
                        <div className="text-center mb-6 md:mb-8">
                          <h3 className="text-base md:text-xl font-heading font-semibold text-white mb-1">
                            Välj Festtyp
                          </h3>
                          <p className="text-xs md:text-sm text-gray-400">
                            Välj en festtyp för att fortsätta
                          </p>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <div className="w-full flex justify-center items-center">
                          <div className="text-center">
                            <h3 className="text-sm md:text-xl font-heading font-semibold text-[#00ff97]">
                              Välj tillägg för festen
                            </h3>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <h3 className="text-base md:text-xl font-heading font-semibold text-white">
                          Beräkna Resekostnad
                        </h3>
                        <p className="text-xs text-gray-400">
                          Ange adressen till din festplats för att beräkna resekostnaden från Malmö
                        </p>
                      </>
                    )}
                    {currentStep === 4 && (
                      <>
                        <h3 className="text-base md:text-xl font-heading font-semibold text-white">
                          Kontaktinformation
                        </h3>
                        <p className="text-xs text-gray-400">
                          Fyll i dina uppgifter för att skicka din förfrågan
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div
              className={`${
                currentStep > 1 ? 'flex-1 overflow-y-auto pt-14 md:pt-24 pb-20 md:pb-24' : ''
              }`}
            >
              <div className="container mx-auto px-2 md:px-4">
                <div className={`rounded-lg ${currentStep > 1 ? 'animate-fade-in' : ''}`}>
                  {currentStep === 1 && (
                    <div>
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 justify-items-center">
                        {partyTypes.map(party => {
                          const Icon = party.icon;
                          const isSelected = selectedParty === party.id;
                          const isVisible = !selectedParty || isSelected;

                          if (!isVisible) return null;

                          return (
                            <div
                              key={party.id}
                              onClick={() => handlePartySelect(party.id)}
                              className={`bg-black/50 border border-[#00ff97]/20 rounded-lg p-3 md:p-6 transition-all duration-300 ${
                                isSelected
                                  ? 'ring-2 ring-[#00ff97] shadow-lg h-auto col-span-2 md:col-span-2 lg:col-span-3 max-w-xl w-full'
                                  : 'hover:shadow-[0_0_20px_rgba(0,255,151,0.2)] hover:-translate-y-1 cursor-pointer w-full'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2 md:mb-4">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg">
                                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#00ff97]" />
                                </div>
                                <div className="text-right">
                                  <h4 className="text-[14px] md:text-xl font-heading font-semibold text-white leading-tight">
                                    {party.name}
                                  </h4>
                                  <p className="hidden md:block text-sm text-white leading-tight">
                                    {party.description}
                                  </p>
                                </div>
                              </div>
                              {isSelected ? (
                                <>
                                  <div>
                                    <ul className="space-y-0.5">
                                      {party.baseFeatures.map((feature, index) => (
                                        <li
                                          key={index}
                                          className="flex items-center gap-1 text-[14px] md:text-xs text-gray-400"
                                        >
                                          <svg
                                            className="w-3 h-3 md:w-4 md:h-4 shrink-0 text-[#00ff97]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M20 6L9 17L4 12"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="mt-4 md:mt-6 bg-[#00ff97]/5 rounded-lg p-3 md:p-4 border border-[#00ff97]/10">
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <div className="text-[14px] md:text-base font-semibold text-white">
                                          Extra DJ Speltid
                                        </div>
                                        <div className="text-[12px] md:text-sm text-gray-400">
                                          {party.extraHourRate.toLocaleString('sv-SE')} kr/tim
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 md:gap-4">
                                        <button
                                          onClick={e => {
                                            e.stopPropagation();
                                            handleExtraHoursChange(extraHours - 1);
                                          }}
                                          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00ff97]/10 text-[#00ff97] flex items-center justify-center hover:bg-[#00ff97]/20 transition-colors duration-300"
                                        >
                                          -
                                        </button>
                                        <span className="text-white font-semibold text-[14px] md:text-base min-w-[20px] text-center">
                                          {extraHours}
                                        </span>
                                        <button
                                          onClick={e => {
                                            e.stopPropagation();
                                            handleExtraHoursChange(extraHours + 1);
                                          }}
                                          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00ff97]/10 text-[#00ff97] flex items-center justify-center hover:bg-[#00ff97]/20 transition-colors duration-300"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                    <div className="text-[12px] md:text-sm text-white">
                                      Total speltid:{' '}
                                      <span className="text-[#00ff97] font-semibold">
                                        {party.includedHours + extraHours} timmar
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 md:mt-4 flex justify-end">
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        handlePartySelect(party.id);
                                      }}
                                      className="px-4 md:px-6 py-2 md:py-2 bg-red-500 text-[#0a0a0a] rounded-lg hover:bg-red-600 transition-colors duration-300 text-[14px] md:text-base font-bold"
                                    >
                                      Ångra
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="mt-2 md:mt-4">
                                  <div className="flex items-center justify-between">
                                    <div className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                                      {party.basePrice.toLocaleString('sv-SE')} kr
                                    </div>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        handlePartySelect(party.id);
                                      }}
                                      className="px-4 md:px-6 py-2 md:py-2 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-[14px] md:text-base font-bold"
                                    >
                                      Välj
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="h-full">
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 items-start">
                        {addons.map(addon => {
                          const Icon = addon.icon;
                          const isSelected = selectedAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => !isSelected && toggleAddon(addon.id)}
                              className={`bg-black/50 border border-[#00ff97]/20 rounded-lg p-3 md:p-6 transition-all duration-300 ${
                                isSelected
                                  ? 'ring-2 ring-[#00ff97] shadow-lg h-auto'
                                  : 'hover:shadow-[0_0_20px_rgba(0,255,151,0.2)] hover:-translate-y-1 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2 md:mb-4">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg">
                                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#00ff97]" />
                                </div>
                                <div className="text-right">
                                  <h4 className="text-[14px] md:text-xl font-heading font-semibold text-white leading-tight">
                                    {addon.name}
                                  </h4>
                                  <p className="hidden md:block text-sm text-white leading-tight">
                                    {addon.description}
                                  </p>
                                </div>
                              </div>
                              {isSelected ? (
                                <>
                                  <div>
                                    <ul className="space-y-0.5">
                                      {addon.features.map((feature, index) => (
                                        <li
                                          key={index}
                                          className="flex items-center gap-1 text-[14px] md:text-xs text-gray-400"
                                        >
                                          <svg
                                            className="w-3 h-3 md:w-4 md:h-4 shrink-0 text-[#00ff97]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M20 6L9 17L4 12"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="mt-2 md:mt-4 flex justify-end">
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        toggleAddon(addon.id);
                                      }}
                                      className="px-4 md:px-6 py-2 md:py-2 bg-red-500 text-[#0a0a0a] rounded-lg hover:bg-red-600 transition-colors duration-300 text-[14px] md:text-base font-bold"
                                    >
                                      Ångra
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="mt-2 md:mt-4">
                                  <div className="flex items-center justify-between">
                                    <div className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                                      {addon.price.toLocaleString('sv-SE')} kr
                                    </div>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        toggleAddon(addon.id);
                                      }}
                                      className="px-4 md:px-6 py-2 md:py-2 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-[14px] md:text-base font-bold"
                                    >
                                      Välj
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="h-full flex items-center justify-center">
                      <div className="max-w-2xl mx-auto px-2 md:px-4 w-full">
                        <form onSubmit={handleLocationSubmit} className="space-y-4 md:space-y-6">
                          <div>
                            <label className="block text-gray-300 mb-1.5 md:mb-2 text-base md:text-lg font-semibold text-center">
                              Festplats Adress
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleFormChange}
                              placeholder="Ange fullständig adress"
                              className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97]"
                              required
                            />
                          </div>
                          {error && (
                            <div className="text-red-500 text-sm md:text-base text-center">
                              {error}
                            </div>
                          )}
                          {distanceInfo.distance > 0 && (
                            <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-3 md:p-4">
                              <div className="text-green-500 mb-1.5 md:mb-2 text-sm md:text-base text-center">
                                Avstånd från Malmö: {distanceInfo.distance.toFixed(1)} km
                              </div>
                              <div className="text-gray-400 text-sm md:text-base text-center">
                                Resekostnad:{' '}
                                {Math.round(distanceInfo.distance / 10) * distanceInfo.pricePerKm}{' '}
                                kr
                                <span className="text-xs md:text-sm ml-2">
                                  ({Math.round(distanceInfo.distance / 10)} mil)
                                </span>
                              </div>
                            </div>
                          )}
                          <button
                            type="submit"
                            className="w-full px-4 md:px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)] text-sm md:text-base font-semibold"
                          >
                            Beräkna Avstånd
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="h-full flex items-center justify-center">
                      <div className="max-w-2xl mx-auto px-2 md:px-4 w-full">
                        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
                          {submitSuccess ? (
                            <div className="bg-[#00ff97]/10 border border-[#00ff97]/20 rounded-lg p-4 md:p-6 text-center">
                              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-xl md:text-2xl mb-2">
                                Tack för din förfrågan!
                              </div>
                              <p className="text-gray-300 text-sm md:text-base">
                                Vi har skickat en bekräftelse till din e-postadress. Vi återkommer
                                till dig inom 24 timmar med en detaljerad offert.
                              </p>
                              <button
                                type="button"
                                onClick={() => setSubmitSuccess(false)}
                                className="mt-4 px-4 md:px-6 py-2 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)] text-sm md:text-base"
                              >
                                Skicka en ny förfrågan
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                                <div>
                                  <label className="block text-gray-300 mb-1.5 md:mb-2 text-sm md:text-lg font-semibold">
                                    Namn
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97]"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-300 mb-1.5 md:mb-2 text-sm md:text-lg font-semibold">
                                    E-post
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97]"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-300 mb-1.5 md:mb-2 text-sm md:text-lg font-semibold">
                                    Telefon
                                  </label>
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97]"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-300 mb-1.5 md:mb-2 text-sm md:text-lg font-semibold">
                                    Datum
                                  </label>
                                  <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleFormChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97] [color-scheme:dark]"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="mt-3 md:mt-6">
                                <label className="block text-gray-300 mb-1.5 md:mb-2 text-sm md:text-lg font-semibold">
                                  Plats
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleFormChange}
                                  className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97]"
                                  required
                                />
                              </div>
                              <div className="mt-3 md:mt-6">
                                <label className="block text-gray-300 mb-1.5 md:mb-2 text-sm md:text-lg font-semibold">
                                  Meddelande
                                </label>
                                <textarea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleFormChange}
                                  rows={3}
                                  className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:ring-2 focus:ring-[#00ff97]"
                                  placeholder="Berätta gärna mer om din fest och eventuella önskemål..."
                                />
                              </div>
                              {submitError && (
                                <div className="text-red-500 text-sm md:text-base text-center">
                                  {submitError}
                                </div>
                              )}
                            </>
                          )}
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div
              className={`${
                currentStep > 1
                  ? 'fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm py-2 md:py-4'
                  : 'mt-8'
              }`}
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 items-center">
                  <div className="flex justify-start">
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="px-4 md:px-6 py-1.5 md:py-2 bg-red-500 text-[#0a0a0a] rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm md:text-base font-bold"
                      >
                        Tillbaka
                      </button>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm md:text-lg font-heading font-semibold text-white">
                      Totalt Pris
                    </h3>
                    <div
                      className={`text-lg md:text-2xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent ${
                        priceAnimation ? 'animate-price-float' : ''
                      }`}
                    >
                      {calculateTotal().toLocaleString('sv-SE')} kr
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {currentStep < 4 ? (
                      <button
                        onClick={handleNext}
                        className="px-4 md:px-6 py-1.5 md:py-2 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold"
                      >
                        Nästa
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="px-4 md:px-6 py-1.5 md:py-2 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold"
                      >
                        Skicka Förfrågan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
