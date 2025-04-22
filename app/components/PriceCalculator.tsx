/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
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
  FaMapMarkerAlt,
  FaRoute,
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import OfferGenerator from './OfferGenerator';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PriceSyncService } from '../lib/priceSync';
import { DocumentData } from 'firebase/firestore';

interface OfferData {
  partyType: string;
  addons: string[];
  addonPrices: { [key: string]: number };
  extraHours: number;
  distance: number;
  transportCost: number;
  ledFloorTransportFee?: number;
  totalPrice: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    date: string;
    location: string;
    message: string;
  };
  source: 'djszmak';
  type: 'dj';
  website: 'djszmak.se';
  partyBasePrice: number;
  partyExtraHourRate: number;
  includedHours: number;
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
  excludedFeatures?: string[];
}

// Add new interface for distance calculation
interface DistanceInfo {
  address: string;
  distance: number; // in kilometers
  pricePerKm: number;
}

const defaultPartyTypes: PartyType[] = [
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

const defaultAddons: Addon[] = [
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

const defaultTransportConfig = {
  maximumDistance: 200,
  pricePerKm: 100,
  fixedFee: 1200,
  ledFloorExtra: 1200,
};

interface PriceCalculatorProps {
  defaultPartyType?: string;
  stepDescriptions?: {
    step1: { title: string; description: string };
    step2: { title: string; description: string };
    step3: { title: string; description: string };
    step4: { title: string; description: string };
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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [lastSelectedPrice, setLastSelectedPrice] = useState<number | null>(null);
  const [lastSelectedPosition, setLastSelectedPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [showOffer, setShowOffer] = useState(false);
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [partyTypes, setPartyTypes] = useState<PartyType[]>(defaultPartyTypes);
  const [addons, setAddons] = useState<Addon[]>(defaultAddons);
  const [transportConfig, setTransportConfig] = useState(defaultTransportConfig);
  const [loading, setLoading] = useState(true);

  // Add a reference to the form
  const formRef = useRef<HTMLFormElement>(null);

  const steps = stepDescriptions || {
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

  useEffect(() => {
    // Initialize price sync service
    const priceSync = PriceSyncService.getInstance();

    // Start listening for price updates
    priceSync.startListening({
      onUpdate: (data: {
        partyTypes?: Record<string, DocumentData>;
        addons?: Record<string, DocumentData>;
        transport?: DocumentData;
      }) => {
        if (data.partyTypes) {
          const updatedPartyTypes = [...defaultPartyTypes];
          Object.entries(data.partyTypes).forEach(([id, typeData]) => {
            const index = updatedPartyTypes.findIndex(pt => pt.id === id);
            if (index !== -1) {
              updatedPartyTypes[index] = {
                ...updatedPartyTypes[index],
                basePrice: typeData.basePrice,
                extraHourRate: typeData.extraHourRate,
                includedHours: typeData.includedHours,
              };
            }
          });
          setPartyTypes(updatedPartyTypes);
        }

        if (data.addons) {
          const updatedAddons = [...defaultAddons];
          Object.entries(data.addons).forEach(([id, addonData]) => {
            const index = updatedAddons.findIndex(addon => addon.id === id);
            if (index !== -1) {
              updatedAddons[index] = {
                ...updatedAddons[index],
                price: addonData.price,
              };
            }
          });
          setAddons(updatedAddons);
        }

        if (data.transport) {
          setTransportConfig({
            maximumDistance: data.transport.maxDistance,
            pricePerKm: data.transport.pricePerKm,
            fixedFee: data.transport.fixedFee || transportConfig.fixedFee,
            ledFloorExtra: data.transport.ledFloorExtra || transportConfig.ledFloorExtra,
          });
          setDistanceInfo(prev => ({
            ...prev,
            pricePerKm: data.transport?.pricePerKm ?? prev.pricePerKm,
          }));
        }
      },
      onError: (error: Error) => {
        console.error('Error receiving price updates:', error);
        setError('Failed to receive price updates. Using current values.');
      },
    });

    // Cleanup on unmount
    return () => {
      priceSync.stopListening();
    };
  }, [transportConfig.fixedFee, transportConfig.ledFloorExtra]);

  const calculateTotal = () => {
    let total = 0;

    // Add base price for selected party type
    const party = partyTypes.find(p => p.id === selectedParty);
    if (party) {
      total += party.basePrice;
      // Add extra hours cost
      total += extraHours * party.extraHourRate;
    }

    // Calculate base transport cost (per mile only)
    const distanceInMil = Math.round(distanceInfo.distance / 10);
    const transportCost = distanceInMil * transportConfig.pricePerKm;

    total += transportCost;

    // Add addon prices
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });

    // Add LED floor fixed transport fee ONLY if distance is calculated
    if (selectedAddons.includes('ledfloor') && distanceInfo.distance > 0) {
      total += transportConfig.fixedFee;
    }

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

  const handlePartySelect = (party: string) => {
    setSelectedParty(party);
    const newPrice = calculateTotal();
    setLastSelectedPrice(newPrice);
    setLastSelectedPosition({ x: 0, y: 0 }); // You can update this with actual position if needed
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
    if (!distanceInfo.address) return;

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(distanceInfo.address)}`
      );
      const data = await response.json();

      if (data.distance) {
        setDistanceInfo(prev => ({
          ...prev,
          distance: data.distance,
        }));
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
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

      // Convert distance from meters to kilometers and round to nearest kilometer
      const distanceInKm = Math.round(data.distance / 1000);
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
    setError('');
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Create a map of addon prices
      const addonPrices: { [key: string]: number } = {};
      selectedAddons.forEach(addonId => {
        const addon = addons.find(a => a.id === addonId);
        if (addon) {
          addonPrices[addonId] = addon.price;
        }
      });

      // Get the selected party's base price and name
      const selectedPartyType = partyTypes.find(p => p.id === selectedParty);
      const partyBasePrice = selectedPartyType?.basePrice || 0;

      // Calculate transport cost components
      const distanceInMil = Math.round(distanceInfo.distance / 10);
      const perMileCost = distanceInMil * transportConfig.pricePerKm;
      const fixedFeeComponent =
        selectedAddons.includes('ledfloor') && distanceInfo.distance > 0
          ? transportConfig.fixedFee
          : 0;
      const calculatedTransportCost = perMileCost + fixedFeeComponent;

      // Update hidden form fields
      if (formRef.current) {
        const form = formRef.current;

        // Create or update hidden input fields
        const updateHiddenField = (name: string, value: string) => {
          const input = form.querySelector(`input[name="${name}"]`) as HTMLInputElement;
          if (input) {
            input.value = value;
          }
        };

        // Update all form fields
        updateHiddenField('partyType', selectedPartyType?.name || '');
        updateHiddenField(
          'addons',
          selectedAddons
            .map(id => {
              const addon = addons.find(a => a.id === id);
              return addon?.name || '';
            })
            .join(', ')
        );
        updateHiddenField('extraHours', extraHours.toString());
        updateHiddenField('distance', Math.round(distanceInfo.distance).toString());
        updateHiddenField('totalPrice', calculateTotal().toString());
        updateHiddenField('transportCost', calculatedTransportCost.toString());
        if (fixedFeeComponent > 0) {
          updateHiddenField('ledFloorTransportFee', fixedFeeComponent.toString());
        }

        // Submit the form
        form.submit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Ett fel uppstod när formuläret skulle skickas. Försök igen senare.');
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

  if (showOffer && offerData) {
    return <OfferGenerator offerData={offerData} />;
  }

  return (
    <div id="pricecalculator" className="w-full py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'DJ Service Malmö',
            description:
              'Professionella DJ-tjänster i Malmö. Vi erbjuder skräddarsydda DJ-paket för bröllop, födelsedagar, studentfester och företagsevent. Boka din DJ för festen idag!',
            provider: {
              '@type': 'Organization',
              name: 'DJ Service Malmö',
              areaServed: 'Malmö och omnejd',
              url: 'https://djszmak.se',
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'DJ till Bröllopsfest',
                price: '7500',
                priceCurrency: 'SEK',
                description:
                  'Perfekt för er stora dag med professionell DJ-tjänst. Inkluderar 4 timmars speltid, professionell utrustning och skräddarsydd spellista.',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'DJ till Födelsedagsfest',
                price: '6500',
                priceCurrency: 'SEK',
                description:
                  'Gör dagen extra speciell med professionell DJ-tjänst. Inkluderar 4 timmars speltid och skräddarsydd spellista.',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'DJ till Studentfest',
                price: '6000',
                priceCurrency: 'SEK',
                description:
                  'Fira studenten i stil med professionell DJ-tjänst. Inkluderar 4 timmars speltid och skräddarsydd spellista.',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'DJ till Företagsfest',
                price: '7000',
                priceCurrency: 'SEK',
                description:
                  'Professionell underhållning för företagsevent. Inkluderar 4 timmars speltid och skräddarsydd spellista.',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'DJ till Nattklubbsgig',
                price: '5500',
                priceCurrency: 'SEK',
                description:
                  'Perfekt för nattklubbsupplevelsen med professionell DJ-tjänst. Inkluderar 4 timmars speltid och skräddarsydd spellista.',
                availability: 'https://schema.org/InStock',
              },
            ],
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Inkluderade timmar',
                value: '4 timmar',
              },
              {
                '@type': 'PropertyValue',
                name: 'Extra timme',
                value: '500-1000 kr/tim',
              },
              {
                '@type': 'PropertyValue',
                name: 'Inkluderade tjänster',
                value: 'Professionell DJ-utrustning, Skräddarsydd spellista, Planeringsmöte',
              },
            ],
            areaServed: {
              '@type': 'City',
              name: 'Malmö',
              containedInPlace: {
                '@type': 'State',
                name: 'Skåne',
              },
            },
            serviceType: 'DJ-tjänst',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'DJ-tillbehör',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Ljudsystem',
                    price: '1500',
                    priceCurrency: 'SEK',
                    description:
                      'Professionellt ljudsystem för upp till 150 personer. Inkluderar Yamaha-ljudsystem med front-högtalare och subwoofers.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Discoljus',
                    price: '1000',
                    priceCurrency: 'SEK',
                    description:
                      'LED-Discoljus som går i takt med musik. DJ styr ljuset live för bästa effekt.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Trådlös Mikrofon',
                    price: '800',
                    priceCurrency: 'SEK',
                    description:
                      'Perfekt för tal och karaoke. Inkluderar 2 st mikrofoner med hög ljudkvalitet.',
                  },
                },
              ],
            },
            inLanguage: 'sv-SE',
          }),
        }}
      />
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
              <p className="font-semibold text-white text-xs md:text-base">{steps.step1.title}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                2
              </div>
              <p className="font-semibold text-white text-xs md:text-base">{steps.step2.title}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                3
              </div>
              <p className="font-semibold text-white text-xs md:text-base">{steps.step3.title}</p>
            </div>
            <div className="bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg">
              <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-base md:text-2xl mb-1">
                4
              </div>
              <p className="font-semibold text-white text-xs md:text-base">{steps.step4.title}</p>
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
                            {selectedParty ? 'Lägg till extra DJ timmar' : 'Välj Festtyp'}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-400">
                            {selectedParty
                              ? 'Välj hur många extra timmar du vill ha med DJ:n'
                              : 'Välj en festtyp för att fortsätta'}
                          </p>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <div className="w-full flex justify-center items-center">
                          <div className="text-center">
                            <h3 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight">
                              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                                Välj tillägg för festen
                              </span>
                            </h3>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <div className="w-full flex justify-center items-center">
                          <div className="text-center">
                            <h3 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight">
                              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                                Beräkna Transport
                              </span>
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base mt-2">
                              Ange adressen till din festplats för att beräkna resekostnaden från
                              Malmö
                            </p>
                          </div>
                        </div>
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
                              onClick={() => !isSelected && handlePartySelect(party.id)}
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
                                        <li key={index} className="flex items-center gap-2">
                                          <svg
                                            className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0"
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
                                          <span className="text-xs md:text-sm lg:text-base text-gray-300">
                                            {feature}
                                          </span>
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
                              } ${addon.id === 'ledfloor' ? 'relative overflow-hidden' : ''}`}
                            >
                              {addon.id === 'ledfloor' && (
                                <>
                                  <div className="absolute inset-0 z-0">
                                    <Image
                                      src="/images/ledgolv.webp"
                                      alt="LED Floor"
                                      fill
                                      className="object-cover"
                                      priority
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black/70 z-10" />
                                </>
                              )}
                              <div className="relative z-20">
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
                                          <li key={index} className="flex items-center gap-2">
                                            <svg
                                              className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0"
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
                                            <span className="text-xs md:text-sm lg:text-base text-gray-300">
                                              {feature}
                                            </span>
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
                      <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
                        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
                          <form
                            onSubmit={handleLocationSubmit}
                            className="w-full flex flex-col items-center gap-6 md:gap-8"
                          >
                            <div className="w-full max-w-md">
                              <label className="block text-gray-300 mb-2 md:mb-3 text-base md:text-lg font-semibold">
                                Festplats Adress
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                                placeholder="Ange fullständig adress"
                                className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg focus:ring-2 focus:ring-[#00ff97] text-center"
                                required
                              />
                            </div>
                            {error && (
                              <div className="text-red-500 text-sm md:text-base text-center">
                                {error}
                              </div>
                            )}
                            {distanceInfo.distance > 0 ? (
                              <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-4 w-full max-w-md">
                                <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                  <FaMapMarkerAlt className="text-[#00ff97]" />
                                  Transportkostnad
                                </h4>
                                <div className="space-y-2 mb-3">
                                  <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Enkel resa:</span>
                                    <span className="font-medium text-white">
                                      {distanceInfo.distance.toFixed(1)} km
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Tur och retur:</span>
                                    <span className="font-medium text-white">
                                      {(distanceInfo.distance * 2).toFixed(1)} km
                                    </span>
                                  </div>
                                </div>

                                <div className="border-t border-[#00ff97]/10 pt-3 mb-3">
                                  <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Rörlig avgift</span>
                                    <span className="font-medium text-white">
                                      {(
                                        Math.round(distanceInfo.distance / 10) *
                                        transportConfig.pricePerKm
                                      ).toLocaleString('sv-SE')}{' '}
                                      kr
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-400 text-right">
                                    {Math.round(distanceInfo.distance / 10)} mil ×{' '}
                                    {transportConfig.pricePerKm} kr/mil
                                  </div>
                                </div>

                                <div className="border-t border-[#00ff97]/10 pt-3">
                                  <div className="flex justify-between items-center text-white">
                                    <span className="flex items-center gap-2 font-semibold">
                                      Total transportkostnad:
                                    </span>
                                    <span className="font-bold text-lg">
                                      {(
                                        Math.round(distanceInfo.distance / 10) *
                                          transportConfig.pricePerKm +
                                        (selectedAddons.includes('ledfloor')
                                          ? transportConfig.fixedFee
                                          : 0)
                                      ).toLocaleString('sv-SE')}{' '}
                                      kr
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-4 flex justify-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDistanceInfo(prev => ({
                                        ...prev,
                                        distance: 0,
                                        address: '',
                                      }));
                                      setFormData(prev => ({
                                        ...prev,
                                        location: '',
                                      }));
                                    }}
                                    className="px-4 md:px-6 py-2 md:py-3 bg-red-500 text-[#0a0a0a] rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm md:text-base font-bold"
                                  >
                                    Ångra
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="submit"
                                className="w-full max-w-md px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#79f1a4] to-[#0e5cad] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(121,241,164,0.5)] text-base md:text-lg font-semibold"
                              >
                                Beräkna Transportkostnad
                              </button>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="h-full flex items-center justify-center">
                      <div className="max-w-2xl mx-auto px-2 md:px-4 w-full">
                        <form
                          ref={formRef}
                          onSubmit={handleSubmit}
                          className="space-y-3 md:space-y-6"
                          name="price-calculator"
                          method="POST"
                          data-netlify="true"
                          data-netlify-honeypot="bot-field"
                          action="/thanks"
                        >
                          <input type="hidden" name="form-name" value="price-calculator" />
                          <p hidden>
                            <label>
                              Don&apos;t fill this out if you&apos;re human:{' '}
                              <input name="bot-field" />
                            </label>
                          </p>
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
                          {/* Add hidden fields for the calculator data */}
                          <input type="hidden" name="partyType" />
                          <input type="hidden" name="addons" />
                          <input type="hidden" name="extraHours" />
                          <input type="hidden" name="distance" />
                          <input type="hidden" name="totalPrice" />
                          <input type="hidden" name="transportCost" />
                          <input type="hidden" name="ledFloorTransportFee" />
                          {submitError && (
                            <div className="text-red-500 text-sm md:text-base text-center">
                              {submitError}
                            </div>
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
                  ? 'fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm py-4 md:py-8'
                  : 'mt-12'
              }`}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-8 md:gap-12">
                  {(currentStep > 1 || selectedParty) && (
                    <button
                      onClick={() => {
                        if (currentStep === 1) {
                          setSelectedParty('');
                        } else {
                          setCurrentStep(prev => prev - 1);
                        }
                      }}
                      className="px-8 md:px-10 py-3 md:py-4 bg-red-500 text-[#0a0a0a] rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm md:text-base font-bold"
                    >
                      Tillbaka
                    </button>
                  )}
                  {selectedParty && (
                    <div className="text-center">
                      <h3 className="text-sm md:text-lg font-heading font-semibold text-white mb-2 md:mb-3">
                        Totalt Pris
                      </h3>
                      <div
                        className={`text-xl md:text-3xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent ${
                          priceAnimation ? 'animate-price-float' : ''
                        }`}
                      >
                        {calculateTotal().toLocaleString('sv-SE')} kr
                      </div>
                    </div>
                  )}
                  {currentStep < 4 && (currentStep > 1 || selectedParty) ? (
                    <button
                      onClick={handleNext}
                      className="px-8 md:px-10 py-3 md:py-4 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold"
                    >
                      Nästa
                    </button>
                  ) : currentStep === 4 ? (
                    <button
                      onClick={() => formRef.current?.submit()}
                      disabled={isSubmitting}
                      className="px-8 md:px-10 py-3 md:py-4 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold"
                    >
                      {isSubmitting ? 'Skickar...' : 'Skicka'}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
