import { db } from '@/lib/firebase';
import { collection, doc, onSnapshot, setDoc, getDocs, DocumentData } from 'firebase/firestore';

interface PriceSyncConfig {
  onUpdate: (data: {
    partyTypes?: Record<string, DocumentData>;
    addons?: Record<string, DocumentData>;
    transport?: DocumentData;
  }) => void;
  onError: (error: Error) => void;
}

export class PriceSyncService {
  private static instance: PriceSyncService;
  private unsubscribe: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): PriceSyncService {
    if (!PriceSyncService.instance) {
      PriceSyncService.instance = new PriceSyncService();
    }
    return PriceSyncService.instance;
  }

  public startListening(config: PriceSyncConfig) {
    // Stop any existing listeners
    this.stopListening();

    try {
      // Listen to the document containing the party types map
      const unsubscribePartyTypes = onSnapshot(
        doc(db, 'config', 'prices_djszmak'),
        doc => {
          const data = doc.data();
          if (data && data.partyTypes) {
            config.onUpdate({ partyTypes: data.partyTypes });
          }
        },
        error => {
          console.error('Error listening to party types:', error);
          config.onError(error);
        }
      );

      const unsubscribeAddons = onSnapshot(
        collection(db, 'config', 'prices_djszmak', 'addons'),
        snapshot => {
          this.handleAddonsUpdate(snapshot, config);
        },
        error => {
          console.error('Error listening to addons:', error);
          config.onError(error);
        }
      );

      const unsubscribeTransport = onSnapshot(
        collection(db, 'config', 'prices_djszmak', 'transport'),
        snapshot => {
          this.handleTransportUpdate(snapshot, config);
        },
        error => {
          console.error('Error listening to transport:', error);
          config.onError(error);
        }
      );

      // Store unsubscribe functions
      this.unsubscribe = () => {
        unsubscribePartyTypes();
        unsubscribeAddons();
        unsubscribeTransport();
      };
    } catch (error) {
      console.error('Error setting up listeners:', error);
      config.onError(error as Error);
    }
  }

  public stopListening() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  private handlePartyTypesUpdate(snapshot: any, config: PriceSyncConfig) {
    const partyTypes: Record<string, DocumentData> = {};
    snapshot.forEach((doc: any) => {
      const data = doc.data();
      // Log the raw data to debug
      console.log('Raw party type data:', doc.id, data);
      partyTypes[doc.id] = {
        basePrice: data.basePrice,
        extraHourRate: data.extraHourRate,
        includedHours: data.includedHours,
      };
    });
    console.log('Processed party types:', partyTypes);
    config.onUpdate({ partyTypes });
  }

  private handleAddonsUpdate(snapshot: any, config: PriceSyncConfig) {
    const addons: Record<string, DocumentData> = {};
    snapshot.forEach((doc: any) => {
      addons[doc.id] = doc.data();
    });
    config.onUpdate({ addons });
  }

  private handleTransportUpdate(snapshot: any, config: PriceSyncConfig) {
    if (!snapshot.empty) {
      const transport = snapshot.docs[0].data();
      config.onUpdate({ transport });
    }
  }

  public async syncPricesToWebsite() {
    try {
      // Get current prices from Quotemind
      const partyTypesSnapshot = await getDocs(
        collection(db, 'config', 'prices_djszmak', 'partyTypes')
      );
      const addonsSnapshot = await getDocs(collection(db, 'config', 'prices_djszmak', 'addons'));
      const transportSnapshot = await getDocs(
        collection(db, 'config', 'prices_djszmak', 'transport')
      );

      // Convert to website format
      const websitePartyTypes = partyTypesSnapshot.docs.map(doc => ({
        name: doc.id,
        basePrice: doc.data().basePrice,
        extraHourRate: doc.data().extraHourRate,
        includedHours: doc.data().includedHours,
        features: [], // You might want to preserve features
      }));

      const websiteAddons = addonsSnapshot.docs.map(doc => ({
        name: doc.id,
        price: doc.data().price,
        description: '', // You might want to preserve descriptions
      }));

      const transportData = transportSnapshot.docs[0]?.data() || {};

      // Update website prices
      await setDoc(doc(db, 'website-prices', 'djszmak'), {
        partyTypes: websitePartyTypes,
        addons: websiteAddons,
        transport: {
          basePrice: 0,
          maxDistance: transportData.maximumDistance,
          minDistance: 0,
          pricePerKm: transportData.pricePerKm,
        },
      });

      return true;
    } catch (error) {
      console.error('Error syncing prices:', error);
      throw error;
    }
  }
}
