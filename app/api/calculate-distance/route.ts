/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

// Updated coordinates for Hyllie vattenparksgatan 36A, Malmö
const MALMÖ_COORDS = { lat: 55.5647, lng: 12.9778 };
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function POST(request: Request) {
  try {
    const { destination } = await request.json();

    if (!destination) {
      return NextResponse.json({ error: 'Destination address is required' }, { status: 400 });
    }

    if (!API_KEY) {
      console.error('Google Maps API key is not configured');
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    // First, get coordinates for the destination
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      destination
    )}&key=${API_KEY}`;
    console.log('Geocoding URL:', geocodeUrl);

    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK' || !geocodeData.results?.[0]) {
      console.error('Geocoding error:', geocodeData);
      return NextResponse.json(
        { error: 'Could not find coordinates for the specified destination' },
        { status: 400 }
      );
    }

    const { lat, lng } = geocodeData.results[0].geometry.location;
    console.log('Found coordinates:', { lat, lng });

    // Then calculate distance from Malmö
    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${MALMÖ_COORDS.lat},${MALMÖ_COORDS.lng}&destinations=${lat},${lng}&mode=driving&key=${API_KEY}`;
    console.log('Distance Matrix URL:', distanceUrl);

    const distanceResponse = await fetch(distanceUrl);
    const distanceData = await distanceResponse.json();

    if (distanceData.status !== 'OK') {
      console.error('Distance Matrix error:', distanceData);

      // If the API is not authorized, try a fallback calculation
      if (
        distanceData.status === 'REQUEST_DENIED' &&
        distanceData.error_message?.includes('not authorized')
      ) {
        const distance = calculateFallbackDistance(MALMÖ_COORDS, { lat, lng });
        return NextResponse.json({
          distance,
          message: 'Using approximate distance calculation',
        });
      }

      return NextResponse.json({ error: 'Could not calculate distance' }, { status: 400 });
    }

    const distance = distanceData.rows[0].elements[0].distance.value;
    return NextResponse.json({ distance });
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json({ error: 'Failed to calculate distance' }, { status: 500 });
  }
}

// Fallback function to calculate approximate distance using the Haversine formula
function calculateFallbackDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (origin.lat * Math.PI) / 180;
  const φ2 = (destination.lat * Math.PI) / 180;
  const Δφ = ((destination.lat - origin.lat) * Math.PI) / 180;
  const Δλ = ((destination.lng - origin.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Return distance in meters
  return Math.round(R * c);
}
