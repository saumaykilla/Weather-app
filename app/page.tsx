"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import WeatherForm from "../components/weather/WeatherForm";
import WeatherDisplay from "../components/weather/WeatherDisplay";
import ThemeToggle from "../components/weather/ThemeToggle";
import { useDarkMode } from "../hooks/use-dark-mode";
import { WeatherData } from "@/types/weather";


const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const fetchWeather = async (cityName: string) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setSearchedCity(cityName);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather');
      }

      const data = await response.json();
      setWeatherData(data);

    } catch (err:unknown) {
      console.error("Weather fetching error:", err);
      setError(
        `Failed to fetch weather for ${cityName}. ${
          (err as Error).message || "Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 flex flex-col items-center justify-center transition-colors duration-300
                  ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-100"
                      : "bg-gray-100 text-gray-900"
                  }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-6 rounded-lg shadow-xl border
                    ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1
            className={`text-3xl font-bold text-center
                        ${isDarkMode ? "text-gray-50" : "text-gray-800"}`}
          >
            Weather Forecast
          </h1>
          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

        <WeatherForm
          onSearch={fetchWeather}
          loading={loading}
          isDarkMode={isDarkMode}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-md text-sm border
                        ${
                          isDarkMode
                            ? "bg-red-900 text-red-200 border-red-700"
                            : "bg-red-100 text-red-700 border-red-300"
                        }`}
          >
            <i
              className={`fa-solid fa-circle-exclamation mr-2 ${
                isDarkMode ? "text-red-300" : "text-red-500"
              }`}
            ></i>{" "}
            {error}
          </motion.div>
        )}

        <WeatherDisplay
          weatherData={weatherData}
          cityName={searchedCity}
          isDarkMode={isDarkMode}
        />
      </motion.div>
    </div>
  );
};

export default WeatherForecast;
