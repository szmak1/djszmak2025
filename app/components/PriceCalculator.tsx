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
  FaCalendarAlt,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PriceSyncService } from '../lib/priceSync';
import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// Custom style for date input calendar - Monday first day
const calendarStyles = `
  :root {
    color-scheme: dark;
  }
  
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
  
  /* Make Monday first day in date picker */
  input[type="date"] {
    text-transform: uppercase; /* Force specific date format */
  }
  
  /* Set first day of week to Monday in Firefox */
  @supports (-moz-appearance:none) {
    input[type="date"] {
      -moz-locale: "sv-SE";
    }
  }
`;

interface OfferDataForFirebase {
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
  offerNumber?: number;
  createdAt?: any;
  status?: string;
  isBooked?: boolean;
  needsRecommendation?: boolean;
  originalDateBooked?: boolean;
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

interface DistanceInfo {
  address: string;
  distance: number;
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
    step0: { title: string; description: string };
    step1: { title: string; description: string };
    step2: { title: string; description: string };
    step3: { title: string; description: string };
    step4: { title: string; description: string };
  };
}

// Custom Calendar component that starts with Monday
const MondayFirstCalendar = ({
  selectedDate,
  setSelectedDate,
  minDate,
}: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  minDate: string;
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    return selectedDate ? new Date(selectedDate).getMonth() : new Date().getMonth();
  });

  const [currentYear, setCurrentYear] = useState(() => {
    return selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear();
  });

  const daysOfWeek = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];
  const monthNames = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  // Function to get days in month (accounting for leap years)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the day of week index where Monday is 0
  const getMondayBasedDayIndex = (date: Date) => {
    const sundayBasedIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    return sundayBasedIndex === 0 ? 6 : sundayBasedIndex - 1; // Transform to 0 = Monday, 6 = Sunday
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const startingDayIndex = getMondayBasedDayIndex(firstDayOfMonth);

    // Get minimum date values
    const minDateObj = minDate ? new Date(minDate) : new Date();
    minDateObj.setHours(0, 0, 0, 0);

    const days = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0);

      const isSelected = selectedDate === formatDate(date);
      const isDisabled = date < minDateObj;
      const formattedDate = formatDate(date);

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => setSelectedDate(formattedDate)}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors
            ${isSelected ? 'bg-[#00ff97] text-black font-bold' : 'text-white hover:bg-[#00ff97]/20'}
            ${isDisabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Handle next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if previous month should be disabled (if min date is in current month)
  const isPrevMonthDisabled = () => {
    if (!minDate) return false;

    const minDateObj = new Date(minDate);
    return minDateObj.getFullYear() === currentYear && minDateObj.getMonth() === currentMonth;
  };

  return (
    <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={isPrevMonthDisabled()}
          className={`p-2 rounded-full ${
            isPrevMonthDisabled()
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-[#00ff97]/20'
          }`}
        >
          <FaChevronLeft />
        </button>
        <h3 className="text-white font-medium">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-2 rounded-full text-white hover:bg-[#00ff97]/20"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-[#00ff97]/20 text-center">
          <p className="text-[#00ff97]">
            {new Date(selectedDate).toLocaleDateString('sv-SE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default function PriceCalculator({
  defaultPartyType,
  stepDescriptions,
}: PriceCalculatorProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedParty, setSelectedParty] = useState<string>(defaultPartyType || '');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [expandedAddon, setExpandedAddon] = useState<string | null>(null);
  const [extraHours, setExtraHours] = useState(0);
  const [distanceInfo, setDistanceInfo] = useState<DistanceInfo>({
    address: '',
    distance: 0,
    pricePerKm: 100,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: '',
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isDateAvailable, setIsDateAvailable] = useState<boolean>(true);
  const [isCheckingDate, setIsCheckingDate] = useState<boolean>(false);
  const [dateCheckError, setDateCheckError] = useState<string>('');
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [wantRecommendation, setWantRecommendation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [partyTypes, setPartyTypes] = useState<PartyType[]>(defaultPartyTypes);
  const [addons, setAddons] = useState<Addon[]>(defaultAddons);
  const [transportConfig, setTransportConfig] = useState(defaultTransportConfig);

  const formRef = useRef<HTMLFormElement>(null);

  const stepKeys = ['step0', 'step1', 'step2', 'step3', 'step4'] as const;

  const steps = stepDescriptions || {
    step0: {
      title: 'Välj Datum',
      description: 'Kontrollera tillgänglighet för din fest',
    },
    step1: {
      title: 'Välj Festtyp',
      description: 'Välj den typ av fest du planerar',
    },
    step2: {
      title: 'Välj Extra Tjänster',
      description: 'Anpassa din upplevelse med tilläggstjänster',
    },
    step3: {
      title: 'Beräkna Transport',
      description: 'Ange adress för att beräkna transportkostnad',
    },
    step4: {
      title: 'Kontaktinfo',
      description: 'Fyll i dina uppgifter och skicka din förfrågan',
    },
  };

  useEffect(() => {
    if (currentStep > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentStep]);

  useEffect(() => {
    const priceSync = PriceSyncService.getInstance();

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

    return () => {
      priceSync.stopListening();
    };
  }, [transportConfig.fixedFee, transportConfig.ledFloorExtra]);

  // Load all booked dates when component mounts
  useEffect(() => {
    const loadBookedDates = async () => {
      try {
        const offersRef = collection(db, 'offers');
        const bookedQuery = query(
          offersRef,
          where('status', '==', 'accepted'),
          where('isBooked', '==', true)
        );

        const querySnapshot = await getDocs(bookedQuery);
        const dates: string[] = [];

        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.customerInfo?.date) {
            dates.push(data.customerInfo.date);
          }
        });

        setBookedDates(dates);
      } catch (error) {
        console.error('Error loading booked dates:', error);
      }
    };

    loadBookedDates();
  }, []);

  const checkDateAvailability = async (date: string) => {
    if (!date) return;

    setIsCheckingDate(true);
    setDateCheckError('');

    try {
      // First check against already loaded dates for immediate feedback
      if (bookedDates.includes(date)) {
        setIsDateAvailable(false);
        setIsCheckingDate(false);
        return;
      }

      // Then double-check with Firebase for the most up-to-date information
      const offersRef = collection(db, 'offers');
      const q = query(
        offersRef,
        where('customerInfo.date', '==', date),
        where('status', '==', 'accepted'),
        where('isBooked', '==', true)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsDateAvailable(false);
      } else {
        setIsDateAvailable(true);
      }
    } catch (error) {
      console.error('Error checking date availability:', error);
      setDateCheckError('Det gick inte att kontrollera datumet. Försök igen senare.');
    } finally {
      setIsCheckingDate(false);
    }
  };

  // Update formData when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
      checkDateAvailability(selectedDate);
    }
  }, [selectedDate]);

  const calculateTotal = () => {
    let total = 0;

    const party = partyTypes.find(p => p.id === selectedParty);
    if (party) {
      total += party.basePrice;
      total += extraHours * party.extraHourRate;
    }

    // Add distance-based transport cost only if not in Malmö
    if (!formData.location.toLowerCase().includes('malmö')) {
      const distanceInMil = Math.round(distanceInfo.distance / 10);
      const transportCost = distanceInMil * transportConfig.pricePerKm;
      total += transportCost;
    }

    // Add LED floor fixed fee if LED floor is selected, regardless of location
    if (selectedAddons.includes('ledfloor') && distanceInfo.distance > 0) {
      total += transportConfig.fixedFee;
    }

    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });

    return total;
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!selectedDate) {
        setError('Vänligen välj ett datum för din fest');
        return;
      }
      if (!isDateAvailable) {
        setError('Det valda datumet är redan bokat. Vänligen välj ett annat datum.');
        return;
      }
    }
    if (currentStep === 1 && !selectedParty) {
      setError('Välj en festtyp för att fortsätta');
      return;
    }
    if (currentStep === 3) {
      if (!formData.location.trim()) {
        setError('Vänligen ange en adress för att beräkna avståndet');
        return;
      }
      if (distanceInfo.distance <= 0 && formData.location.trim()) {
        setError('Du måste klicka på "Beräkna Transportkostnad" innan du går vidare.');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
    setError('');
  };

  const handlePartySelect = (party: string) => {
    setSelectedParty(party);
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(prev => prev.filter(id => id !== addonId));
      if (expandedAddon === addonId) {
        setExpandedAddon(null);
      }
    } else {
      setSelectedAddons(prev => [...prev, addonId]);
    }
  };

  const handleExtraHoursChange = (hours: number) => {
    const party = partyTypes.find(p => p.id === selectedParty);
    const maxHours = party ? 10 - party.includedHours : 3;
    const newHours = Math.min(Math.max(0, hours), maxHours);
    if (newHours !== extraHours) {
      setExtraHours(newHours);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'location') {
      setDistanceInfo(prev => ({ ...prev, distance: 0, address: '' }));
      setError('');
    }
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location.trim()) {
      setError('Vänligen ange en adress.');
      return;
    }
    setError('');
    try {
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: formData.location }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to calculate distance');
      const distanceInKm = Math.round(data.distance / 1000);
      setDistanceInfo(prev => ({ ...prev, distance: distanceInKm, address: formData.location }));
    } catch (error: any) {
      console.error('Error calculating distance:', error);
      setError(`Kunde inte beräkna avståndet: ${error.message}. Kontrollera adressen.`);
      setDistanceInfo(prev => ({ ...prev, distance: 0, address: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setSubmitError('');

    const formName = formRef.current?.getAttribute('name');
    if (!formName) {
      setSubmitError('Form configuration error. Missing form name.');
      setIsSubmitting(false);
      return;
    }

    let savedOfferId: string | null = null;
    let savedOfferNumber: number | null = null;

    try {
      const addonPrices: { [key: string]: number } = {};
      selectedAddons.forEach(addonId => {
        const addon = addons.find(a => a.id === addonId);
        if (addon) addonPrices[addonId] = addon.price;
      });

      const selectedPartyType = partyTypes.find(p => p.id === selectedParty);
      if (!selectedPartyType) throw new Error('Selected party type not found');

      const partyName = selectedPartyType.name;
      const partyBasePrice = selectedPartyType.basePrice;
      const partyExtraHourRate = selectedPartyType.extraHourRate;
      const includedHours = selectedPartyType.includedHours;
      const addonNames = selectedAddons
        .map(id => addons.find(a => a.id === id)?.name || '')
        .join(', ');

      const distanceInMil = Math.round(distanceInfo.distance / 10);
      const perMileCost = distanceInMil * transportConfig.pricePerKm;
      const fixedFeeComponent =
        selectedAddons.includes('ledfloor') && distanceInfo.distance > 0
          ? transportConfig.fixedFee
          : 0;
      const calculatedTransportCost = perMileCost + fixedFeeComponent;
      const finalTotalPrice = calculateTotal();

      console.log('Preparing to save offer to Firebase...');
      const counterRef = doc(db, 'metadata', 'offerCounter');
      const newOfferRef = doc(collection(db, 'offers'));

      const offerDataForFirebase: Omit<
        OfferDataForFirebase,
        'offerNumber' | 'createdAt' | 'status'
      > = {
        partyType: selectedParty,
        addons: selectedAddons,
        addonPrices,
        extraHours,
        distance: distanceInfo.distance,
        transportCost: calculatedTransportCost,
        totalPrice: finalTotalPrice,
        customerInfo: { ...formData },
        source: 'djszmak',
        type: 'dj',
        website: 'djszmak.se',
        partyBasePrice,
        partyExtraHourRate,
        includedHours,
        ...(fixedFeeComponent > 0 && { ledFloorTransportFee: fixedFeeComponent }),
        ...(wantRecommendation && { needsRecommendation: true, originalDateBooked: true }),
      };

      savedOfferNumber = await runTransaction(db, async transaction => {
        const counterDoc = await transaction.get(counterRef);
        const currentNumber = counterDoc.exists() ? counterDoc.data().count || 0 : 0;
        const newOfferNumber = currentNumber + 1;

        transaction.set(newOfferRef, {
          ...offerDataForFirebase,
          offerNumber: newOfferNumber,
          createdAt: serverTimestamp(),
          status: 'pending',
        });
        transaction.set(counterRef, { count: newOfferNumber }, { merge: !counterDoc.exists() });
        return newOfferNumber;
      });

      savedOfferId = newOfferRef.id;
      console.log(`Firebase save successful! Offer #${savedOfferNumber}, ID: ${savedOfferId}`);

      console.log('Preparing to submit data to Netlify...');
      const formDataToSubmit = new URLSearchParams();
      formDataToSubmit.append('form-name', formName);
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('date', formData.date);
      formDataToSubmit.append('location', formData.location);
      formDataToSubmit.append('message', formData.message);
      formDataToSubmit.append('partyType', partyName);
      formDataToSubmit.append('addons', addonNames);
      formDataToSubmit.append('extraHours', extraHours.toString());
      formDataToSubmit.append('distance', Math.round(distanceInfo.distance).toString());
      formDataToSubmit.append('totalPrice', finalTotalPrice.toString());
      formDataToSubmit.append('transportCost', calculatedTransportCost.toString());
      if (wantRecommendation) {
        formDataToSubmit.append('needsRecommendation', 'true');
        formDataToSubmit.append('originalDateBooked', 'true');
      }
      if (fixedFeeComponent > 0) {
        formDataToSubmit.append('ledFloorTransportFee', fixedFeeComponent.toString());
      }

      if (savedOfferId) {
        formDataToSubmit.append('firebaseOfferId', savedOfferId);
      }
      if (savedOfferNumber !== null) {
        formDataToSubmit.append('offerNumber', savedOfferNumber.toString());
      }

      const honeypotName = formRef.current?.getAttribute('data-netlify-honeypot');
      if (honeypotName) {
        formDataToSubmit.append(honeypotName, '');
      }

      const response = await fetch(formRef.current?.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataToSubmit.toString(),
      });

      if (response.ok) {
        console.log('Netlify submission successful.');
        router.push('/thanks');
      } else {
        console.error('Netlify submission failed:', response.status, response.statusText);
        const responseBody = await response.text();
        console.error('Netlify response body:', responseBody);
        setSubmitError(
          `Offerten sparades (ID: ${savedOfferId}) men kunde inte skickas till Netlify. Försök kontakta oss manuellt.`
        );
      }
    } catch (error) {
      console.error('Error during submit process (Firebase or Netlify):', error);
      setSubmitError(
        `Ett fel uppstod: ${
          error instanceof Error ? error.message : String(error)
        }. Försök igen senare.`
      );
      if (savedOfferId) {
        setSubmitError(
          `Ett fel uppstod efter att offerten sparats (ID: ${savedOfferId}): ${
            error instanceof Error ? error.message : String(error)
          }. Kontakta oss.`
        );
      }
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
    <div id="pricecalculator" className="w-full py-8 md:py-12 pt-16 md:pt-24">
      <style dangerouslySetInnerHTML={{ __html: calendarStyles }} />
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
        <h2 className="font-heading text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-center mb-4 md:mb-6">
          Skapa Ditt DJ-paket
        </h2>
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <p className="text-base md:text-xl text-gray-300 mb-4">
            Få en skräddarsydd offert för din fest genom att fylla i formuläret nedan. Vi erbjuder
            professionella DJ-tjänster för alla typer av evenemang.
          </p>
          <div className="mt-6 md:mt-8 text-gray-300 text-sm md:text-base mb-8">
            <p className="mb-1 md:mb-2">✓ Få svar inom 24 timmar</p>
            <p className="mb-1 md:mb-2">✓ Gratis offert</p>
            <p className="mb-1 md:mb-2">✓ Inga bindande avtal</p>
            <p className="mb-1 md:mb-2">✓ Skräddarsydda paket för ditt evenemang</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6 text-gray-400">
            {stepKeys.map((stepKey, idx) => {
              const isActive = currentStep === idx;
              const isLast = idx === 4;
              return (
                <div
                  key={stepKey}
                  className={
                    `bg-black/50 border border-[#00ff97]/20 p-2 md:p-4 rounded-lg ` +
                    (isActive
                      ? 'bg-gradient-to-r from-[#00ff97] to-[#00daa8] text-black font-bold' // active step
                      : 'text-gray-400')
                  }
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(90deg, #00ff97 0%, #00daa8 100%)',
                          color: '#0a0a0a',
                        }
                      : {}
                  }
                >
                  <div
                    className={
                      `bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text ` +
                      (isActive ? 'text-black' : 'text-transparent') +
                      ' text-base md:text-2xl mb-1'
                    }
                  >
                    {idx + 1}
                  </div>
                  <p
                    className={
                      `font-semibold ` +
                      (isActive ? 'text-black' : 'text-white') +
                      ' text-xs md:text-base ' +
                      (isLast ? 'break-words md:text-sm lg:text-base' : '')
                    }
                    style={
                      isLast ? { wordBreak: 'break-word', fontSize: 'clamp(12px,2vw,18px)' } : {}
                    }
                  >
                    {steps[stepKey]?.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stepper progress bar: only show for steps > 0 */}
        {currentStep > 0 && (
          <div
            className={`${
              currentStep > 0
                ? 'fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm py-2 md:py-4'
                : 'mb-12'
            }`}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center">
                {[0, 1, 2, 3, 4].map(step => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-base ${
                        currentStep >= step
                          ? 'bg-gradient-to-r from-[#00ff97] to-[#007ed4] text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {step + 1}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-6 md:w-20 h-1 mx-1 md:mx-2 ${
                          currentStep > step
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
        )}

        <div
          className={`${
            currentStep > 0 ? 'fixed inset-0 z-40 bg-black pt-16 md:pt-20 overflow-hidden' : ''
          }`}
        >
          <div className={`${currentStep > 0 ? 'h-full flex flex-col' : ''}`}>
            <div
              className={`${
                currentStep > 0
                  ? 'fixed top-12 md:top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm py-1 md:py-2'
                  : ''
              }`}
            >
              <div className="container mx-auto px-4">
                {/* Step headers for steps 1-4 only */}
                {currentStep > 0 && (
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
                )}
              </div>
            </div>

            <div
              className={`${
                currentStep > 0 ? 'flex-1 overflow-y-auto pt-14 md:pt-24 pb-20 md:pb-24' : ''
              }`}
            >
              <div className="container mx-auto px-2 md:px-4">
                <div className={`rounded-lg ${currentStep > 0 ? 'animate-fade-in' : ''}`}>
                  {currentStep === 0 && (
                    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
                      <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
                        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
                          <div className="text-center mb-4 md:mb-6">
                            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                                Välj datum för din fest
                              </span>
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base mt-2">
                              Kontrollera tillgänglighet för önskat datum
                            </p>
                          </div>

                          <div className="w-full max-w-md">
                            <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                <span className="flex items-center gap-2 text-lg md:text-xl text-white font-semibold">
                                  <FaCalendarAlt className="text-[#00ff97]" />
                                  Välj datum
                                </span>
                              </div>

                              <MondayFirstCalendar
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                minDate={new Date().toISOString().split('T')[0]}
                              />

                              {selectedDate && (
                                <div
                                  className={`mt-4 p-4 rounded-lg ${
                                    isCheckingDate
                                      ? 'bg-gray-800/50 border border-gray-700'
                                      : isDateAvailable
                                      ? 'bg-green-900/20 border border-green-800'
                                      : 'bg-red-900/20 border border-red-800'
                                  }`}
                                >
                                  {isCheckingDate ? (
                                    <div className="flex items-center justify-center">
                                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00ff97]"></div>
                                      <span className="ml-2 text-gray-300">
                                        Kontrollerar tillgänglighet...
                                      </span>
                                    </div>
                                  ) : isDateAvailable ? (
                                    <div className="flex items-center text-green-400">
                                      <FaCheckCircle className="mr-2" />
                                      <span>Datumet är tillgängligt!</span>
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      <div className="flex items-center text-red-400">
                                        <FaExclamationTriangle className="mr-2 shrink-0" />
                                        <span>DJ Szmak är redan bokad detta datum.</span>
                                      </div>
                                      <div className="bg-black/40 p-3 rounded border border-[#00ff97]/20">
                                        <p className="text-white mb-2">
                                          Behöver du en DJ till detta datum?
                                        </p>
                                        <p className="text-sm text-gray-300 mb-3">
                                          DJ Szmak kan rekommendera en av sina samarbetspartners
                                          från ett nätverk av professionella DJs i Skåne.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          <button
                                            onClick={() => {
                                              setIsDateAvailable(true);
                                              setWantRecommendation(true);
                                              setError('');
                                            }}
                                            className="px-3 py-2 bg-[#00ff97]/20 text-[#00ff97] rounded-lg hover:bg-[#00ff97]/30 text-sm font-medium"
                                          >
                                            Ja, jag vill ha en rekommendation
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {dateCheckError && (
                                <div className="mt-2 text-red-500 text-sm">{dateCheckError}</div>
                              )}
                            </div>

                            {error && (
                              <div className="mt-4 text-red-500 text-sm md:text-base text-center">
                                {error}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                                {formData.location.toLowerCase().includes('malmö') ? (
                                  <div>
                                    <div className="space-y-2 mb-3">
                                      <div className="flex justify-between items-center text-sm text-gray-300">
                                        <span>Inom Malmö stad:</span>
                                        <span className="font-medium text-[#00ff97]">
                                          0 kr transport
                                        </span>
                                      </div>
                                    </div>
                                    {selectedAddons.includes('ledfloor') && (
                                      <div className="border-t border-[#00ff97]/10 pt-3">
                                        <div className="flex justify-between items-center text-white">
                                          <span className="flex items-center gap-2 font-semibold">
                                            LED-golv transportavgift:
                                          </span>
                                          <span className="font-bold text-lg">
                                            {transportConfig.fixedFee.toLocaleString('sv-SE')} kr
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <>
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

                                    {selectedAddons.includes('ledfloor') && (
                                      <div className="border-t border-[#00ff97]/10 pt-3 mb-3">
                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                          <span>LED-golv transportavgift</span>
                                          <span className="font-medium text-white">
                                            {transportConfig.fixedFee.toLocaleString('sv-SE')} kr
                                          </span>
                                        </div>
                                      </div>
                                    )}

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
                                  </>
                                )}

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

                  {currentStep === 3 && (
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
                          <div className="mt-4 flex justify-center">
                            <button
                              type="submit"
                              form="price-calculator-form"
                              onClick={handleSubmit}
                              disabled={
                                isSubmitting ||
                                !formData.name ||
                                !formData.email ||
                                !formData.phone ||
                                !formData.date ||
                                !formData.location
                              }
                              className="px-8 md:px-10 py-3 md:py-4 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? 'Skickar...' : 'Skicka Förfrågan'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`${
                currentStep > 0
                  ? 'fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm py-4 md:py-8'
                  : 'mt-12'
              }`}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-8 md:gap-12">
                  {(currentStep > 0 || selectedDate) && (
                    <button
                      onClick={() => {
                        if (currentStep === 0) {
                          setSelectedDate('');
                          setIsDateAvailable(true);
                        } else if (currentStep === 1 && selectedParty) {
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
                  {currentStep > 0 && selectedParty && (
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
                  {currentStep < 4 && (
                    <button
                      onClick={handleNext}
                      disabled={
                        currentStep === 0 && (!selectedDate || !isDateAvailable || isCheckingDate)
                      }
                      className="px-8 md:px-10 py-3 md:py-4 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {currentStep === 0 && isCheckingDate ? 'Kontrollerar...' : 'Nästa'}
                    </button>
                  )}
                  {currentStep === 4 && (
                    <button
                      type="submit"
                      form="price-calculator-form"
                      onClick={handleSubmit}
                      disabled={
                        isSubmitting ||
                        !formData.name ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.date ||
                        !formData.location
                      }
                      className="px-8 md:px-10 py-3 md:py-4 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] text-sm md:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Skickar...' : 'Skicka Förfrågan'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
