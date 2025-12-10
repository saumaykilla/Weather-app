export const kelvinToCelsius = (c: number) => c.toFixed(1);
export const kelvinToFahrenheit = (c: number) => ((c * 9) / 5 + 32).toFixed(1);

export const getTemperatureIcon = (tempC: number) => {
  if (tempC > 25) return "fa-solid fa-sun text-yellow-500"; // Hot
  if (tempC < 10) return "fa-solid fa-snowflake text-blue-400"; // Cold
  return "fa-solid fa-temperature-half text-orange-400"; // Moderate
};

export const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return "fa-solid fa-sun";
    case "clouds":
      return "fa-solid fa-cloud";
    case "rain":
    case "drizzle":
      return "fa-solid fa-cloud-showers-heavy";
    case "thunderstorm":
      return "fa-solid fa-cloud-bolt";
    case "snow":
      return "fa-solid fa-snowflake";
    case "mist":
    case "fog":
    case "haze":
      return "fa-solid fa-smog";
    default:
      return "fa-solid fa-cloud-sun";
  }
};
