import { NextResponse } from 'next/server';

interface GoogleReview {
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
  rating: number;
  text?: {
    text: string;
    languageCode?: string;
  };
  originalText?: {
    text: string;
    languageCode?: string;
  };
  publishTime: string;
  relativePublishTimeDescription: string;
}

interface GooglePlacesResponse {
  rating: number;
  userRatingCount: number;
  displayName: {
    text: string;
    languageCode: string;
  };
  reviews?: GoogleReview[];
}

interface ReviewData {
  rating: number;
  text: string;
  time: string;
  author_name: string;
  profile_photo_url: string;
  relative_time_description: string;
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      console.error('Missing configuration:', {
        hasApiKey: !!apiKey,
        hasPlaceId: !!placeId,
      });
      throw new Error('Missing API key or Place ID');
    }

    const url = new URL('https://places.googleapis.com/v1/places/' + placeId);
    url.searchParams.append('fields', 'reviews,rating,userRatingCount,displayName');
    url.searchParams.append('languageCode', 'sv');

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,displayName',
        'Accept-Language': 'sv',
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Failed to fetch from Google Places API: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as GooglePlacesResponse;

    if (!data) {
      console.error('No data in API response');
      throw new Error('No data found in the API response');
    }

    // Transform and filter the reviews data (exclude 1-star reviews)
    const transformedReviews =
      data.reviews
        ?.map(review => ({
          author_name: review.authorAttribution?.displayName || 'Anonymous',
          rating: review.rating,
          text: review.text?.text || review.originalText?.text || '',
          language: review.text?.languageCode || review.originalText?.languageCode || 'en',
          time: new Date(review.publishTime).getTime() / 1000,
          relative_time_description: review.relativePublishTimeDescription,
          profile_photo_url: review.authorAttribution?.photoUri || '',
        }))
        .filter(review => review.rating > 1) // Filter out 1-star reviews
        .sort((a, b) => b.time - a.time) || []; // Sort by most recent first

    return NextResponse.json({
      reviews: transformedReviews,
      rating: data.rating,
      total_ratings: data.userRatingCount,
      name: data.displayName?.text || 'DJ Szmak',
      googleReviewsUrl: `https://www.google.com/search?client=firefox-b-d&hl=sv-SE&tbm=lcl&q=DJ+Szmak+Recensioner&rldimm=10268748638231006967#lkt=LocalPoiReviews`,
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        error: 'Failed to load reviews',
        details: error.message || 'Unknown error',
        time: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
