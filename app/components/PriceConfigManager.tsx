'use client';

import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
  excludedFeatures?: string[];
}

interface TransportConfig {
  maximumDistance: number;
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
    basePrice: 9000,
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

const defaultTransportConfig: TransportConfig = {
  maximumDistance: 200,
  pricePerKm: 100,
};

export default function PriceConfigManager() {
  const [partyTypes, setPartyTypes] = useState<PartyType[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [transportConfig, setTransportConfig] = useState<TransportConfig>(defaultTransportConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadConfigurations();
  }, []);

  const loadConfigurations = async () => {
    try {
      const partyTypesSnapshot = await getDocs(collection(db, 'priceConfigs', 'partyTypes'));
      const addonsSnapshot = await getDocs(collection(db, 'priceConfigs', 'addons'));
      const transportConfigDoc = await getDocs(collection(db, 'priceConfigs', 'transport'));

      if (partyTypesSnapshot.empty) {
        // Initialize with default party types
        await Promise.all(
          defaultPartyTypes.map(async partyType => {
            await addDoc(collection(db, 'priceConfigs', 'partyTypes'), partyType);
          })
        );
        setPartyTypes(defaultPartyTypes);
      } else {
        setPartyTypes(
          partyTypesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as PartyType))
        );
      }

      if (addonsSnapshot.empty) {
        // Initialize with default addons
        await Promise.all(
          defaultAddons.map(async addon => {
            await addDoc(collection(db, 'priceConfigs', 'addons'), addon);
          })
        );
        setAddons(defaultAddons);
      } else {
        setAddons(addonsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Addon)));
      }

      if (transportConfigDoc.empty) {
        // Initialize with default transport config
        await addDoc(collection(db, 'priceConfigs', 'transport'), defaultTransportConfig);
        setTransportConfig(defaultTransportConfig);
      } else {
        setTransportConfig(transportConfigDoc.docs[0].data() as TransportConfig);
      }
    } catch (err) {
      setError('Failed to load configurations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePartyType = async (id: string, updates: Partial<PartyType>) => {
    try {
      const docRef = doc(db, 'priceConfigs', 'partyTypes', id);
      await updateDoc(docRef, updates);
      setPartyTypes(prev =>
        prev.map(party => (party.id === id ? { ...party, ...updates } : party))
      );
      setSuccess('Party type updated successfully');
    } catch (err) {
      setError('Failed to update party type');
      console.error(err);
    }
  };

  const updateAddon = async (id: string, updates: Partial<Addon>) => {
    try {
      const docRef = doc(db, 'priceConfigs', 'addons', id);
      await updateDoc(docRef, updates);
      setAddons(prev => prev.map(addon => (addon.id === id ? { ...addon, ...updates } : addon)));
      setSuccess('Addon updated successfully');
    } catch (err) {
      setError('Failed to update addon');
      console.error(err);
    }
  };

  const updateTransportConfig = async (updates: Partial<TransportConfig>) => {
    try {
      const docRef = doc(db, 'priceConfigs', 'transport', 'default');
      await updateDoc(docRef, updates);
      setTransportConfig(prev => ({ ...prev, ...updates }));
      setSuccess('Transport configuration updated successfully');
    } catch (err) {
      setError('Failed to update transport configuration');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Price Configuration Manager</h1>

      {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-4">{error}</div>}

      {success && <div className="bg-green-500 text-white p-4 rounded-lg mb-4">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Party Types</h2>
          <div className="space-y-4">
            {partyTypes.map(party => (
              <div key={party.id} className="bg-black/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">{party.name}</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-gray-300">Base Price</label>
                    <input
                      type="number"
                      value={party.basePrice}
                      onChange={e =>
                        updatePartyType(party.id, { basePrice: Number(e.target.value) })
                      }
                      className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300">Extra Hour Rate</label>
                    <input
                      type="number"
                      value={party.extraHourRate}
                      onChange={e =>
                        updatePartyType(party.id, { extraHourRate: Number(e.target.value) })
                      }
                      className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300">Included Hours</label>
                    <input
                      type="number"
                      value={party.includedHours}
                      onChange={e =>
                        updatePartyType(party.id, { includedHours: Number(e.target.value) })
                      }
                      className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Addons</h2>
          <div className="space-y-4">
            {addons.map(addon => (
              <div key={addon.id} className="bg-black/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">{addon.name}</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-gray-300">Price</label>
                    <input
                      type="number"
                      value={addon.price}
                      onChange={e => updateAddon(addon.id, { price: Number(e.target.value) })}
                      className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mb-4 mt-8">Transport Configuration</h2>
          <div className="bg-black/50 p-4 rounded-lg">
            <div className="space-y-2">
              <div>
                <label className="text-gray-300">Maximum Distance (km)</label>
                <input
                  type="number"
                  value={transportConfig.maximumDistance}
                  onChange={e => updateTransportConfig({ maximumDistance: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="text-gray-300">Price per Kilometer (kr)</label>
                <input
                  type="number"
                  value={transportConfig.pricePerKm}
                  onChange={e => updateTransportConfig({ pricePerKm: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
