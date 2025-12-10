
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City name is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // 1. Get coordinates (Geocoding API)
    const geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );

    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }

    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const { lat, lon } = geoData[0];

    // 2. Get weather data (Current Weather Data API)
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!weatherResponse.ok) {
        const response = await weatherResponse.json()
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    return NextResponse.json(weatherData);

  } catch (error) {
    console.error('Weather API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
