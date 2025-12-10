export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  clouds: { all: number };
  wind: { speed: number; deg: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export const cities = ['London', 'New York', 'Paris', 'Tokyo', 'Sydney', 'Dubai', 'Berlin', 'Rome', 'Madrid', 'Beijing', 'Moscow'];

// Map OpenWeatherMap icons to Font Awesome classes
export const weatherIconMap: Record<string, string> = {
  '01d': 'fa-solid fa-sun',
  '01n': 'fa-solid fa-moon',
  '02d': 'fa-solid fa-cloud-sun',
  '02n': 'fa-solid fa-cloud-moon',
  '03d': 'fa-solid fa-cloud',
  '03n': 'fa-solid fa-cloud',
  '04d': 'fa-solid fa-cloud',
  '04n': 'fa-solid fa-cloud',
  '09d': 'fa-solid fa-cloud-showers-heavy',
  '09n': 'fa-solid fa-cloud-showers-heavy',
  '10d': 'fa-solid fa-cloud-rain',
  '10n': 'fa-solid fa-cloud-rain',
  '11d': 'fa-solid fa-cloud-bolt',
  '11n': 'fa-solid fa-cloud-bolt',
  '13d': 'fa-solid fa-snowflake',
  '13n': 'fa-solid fa-snowflake',
  '50d': 'fa-solid fa-smog',
  '50n': 'fa-solid fa-smog',
};

export const getFAIcon = (openWeatherIconCode: string): string => 
  weatherIconMap[openWeatherIconCode] || 'fa-solid fa-question';

// Helper function to generate dummy weather data
export const getDummyWeatherData = (city: string): ForecastData => {
  const baseDate = new Date();
  baseDate.setHours(baseDate.getHours() + 1, 0, 0, 0); // Start from next hour
  const dummyList = Array.from({ length: 5 }).map((_, i) => {
    const forecastDate = new Date(baseDate.getTime() + i * 3 * 3600 * 1000); // 3-hour intervals
    const tempOffset = (i % 2 === 0 ? 0 : 2) + Math.random() * 5 - 2.5; // Random temp variation
    const feelsLikeOffset = tempOffset * 0.9;
    const weatherConditions = [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
      { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      { id: 200, main: 'Thunderstorm', description: 'thunderstorm with light rain', icon: '11d' },
      { id: 600, main: 'Snow', description: 'light snow', icon: '13d' },
      { id: 741, main: 'Mist', description: 'mist', icon: '50d' },
    ];
    const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

    return {
      dt: Math.floor(forecastDate.getTime() / 1000),
      main: {
        temp: 280.15 + tempOffset, // Approx 7°C
        feels_like: 279.15 + feelsLikeOffset,
        temp_min: 278.15 + tempOffset - 1,
        temp_max: 282.15 + tempOffset + 1,
        pressure: 1012,
        humidity: 70,
      },
      weather: [weather],
      clouds: { all: 50 },
      wind: { speed: 4.12, deg: 230 },
      visibility: 10000,
      pop: 0.2,
      sys: { pod: forecastDate.getHours() >= 6 && forecastDate.getHours() < 18 ? 'd' : 'n' },
      dt_txt: forecastDate.toISOString().replace(/\.\d{3}Z$/, 'Z'),
    };
  });

  return {
    cod: "200",
    message: 0,
    cnt: dummyList.length,
    list: dummyList,
    city: {
      id: Math.floor(Math.random() * 1000000),
      name: city,
      coord: { lat: 51.5085, lon: -0.1257 }, // Dummy coords
      country: "GB",
      timezone: 3600,
      sunrise: 1678850626,
      sunset: 1678891547,
    }
  };
};
