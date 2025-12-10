import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const namePrefix = searchParams.get('namePrefix');

  if (!namePrefix) {
    return NextResponse.json({ data: [] }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || process.env.RAPIDAPI_KEY;
  const apiHost = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || process.env.RAPIDAPI_HOST || 'wft-geo-db.p.rapidapi.com';
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const options = {
        method: "GET",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        params: {
          minPopulation: "1000000",
          namePrefix: namePrefix,
        },
        headers: {
          "X-RapidAPI-Key":
            apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      };
       const response = await axios.request(options);

    if (response.status!=200) {
        const errorData = await response.data.catch(() => ({}));
        console.error("RapidAPI Error:", response.status, errorData);
        return NextResponse.json({ error: 'Failed to fetch cities' }, { status: response.status });
    }

    const data = await response.data;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
