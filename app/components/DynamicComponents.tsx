'use client';

import dynamic from 'next/dynamic';

const PriceCalculator = dynamic(() => import('./PriceCalculator'), {
  loading: () => <div className="w-full h-[600px] bg-black/50 animate-pulse rounded-lg"></div>,
  ssr: false,
});

const PartyCards = dynamic(() => import('./PartyCards'), {
  loading: () => <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg"></div>,
});

const VideoSection = dynamic(() => import('./VideoSection'), {
  loading: () => <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg"></div>,
});

const GoogleReviews = dynamic(() => import('./GoogleReviews'), {
  loading: () => <div className="w-full h-[200px] bg-black/50 animate-pulse rounded-lg"></div>,
});

export { PriceCalculator, PartyCards, VideoSection, GoogleReviews };
