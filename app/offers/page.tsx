'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import OfferPreview from '@/app/components/OfferPreview';

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

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const q = query(collection(db, 'offers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const offersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Offer[];
        setOffers(offersData);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('Kunde inte hämta offerter. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Laddar offerter...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#00ff97] text-center mb-8">
          Offertöversikt
        </h1>

        {selectedOffer ? (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedOffer(null)}
              className="mb-4 px-4 py-2 bg-[#00ff97] text-black rounded-lg hover:scale-105 transition-all duration-300"
            >
              Tillbaka till listan
            </button>
            <OfferPreview offer={selectedOffer} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map(offer => (
              <div
                key={offer.id}
                className="relative bg-black/50 border border-[#00ff97]/20 rounded-lg p-6 hover:shadow-[0_0_20px_rgba(0,255,151,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedOffer(offer)}
              >
                <span className="absolute top-2 right-2 text-xs font-bold text-[#00ff97] bg-black/70 px-2 py-1 rounded-full">
                  Offer #{offer.offerNumber}
                </span>

                <h3 className="text-xl font-semibold text-white mb-2">{offer.customerInfo.name}</h3>
                <p className="text-gray-400 mb-2">{offer.customerInfo.email}</p>
                <p className="text-gray-400 mb-2">{offer.customerInfo.phone}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#00ff97]">
                    {new Date(offer.createdAt.seconds * 1000).toLocaleDateString('sv-SE')}
                  </span>
                  <span className="text-white font-bold">
                    {offer.totalPrice.toLocaleString('sv-SE')} kr
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
