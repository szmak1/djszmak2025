import { NextResponse } from 'next/server';

interface GoogleReview {
  rating: number;
  text: string;
  time: string;
  author_name: string;
  profile_photo_url: string;
  relative_time_description: string;
}

interface GooglePlacesResponse {
  result: {
    reviews: GoogleReview[];
  };
}

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = (await response.json()) as GooglePlacesResponse;

    if (!data.result?.reviews) {
      return NextResponse.json({ reviews: [] });
    }

    const reviews = data.result.reviews.map((review: GoogleReview) => ({
      rating: review.rating,
      text: review.text,
      time: review.time,
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      relative_time_description: review.relative_time_description,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
