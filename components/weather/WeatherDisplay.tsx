
import React from "react";
import { motion } from "framer-motion";
import {
  getTemperatureIcon,
  getWeatherIcon,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from "@/lib/weather-data";
import { WeatherData } from "@/types/weather";

interface WeatherDisplayProps {
  weatherData: WeatherData | null; // Using any for simplicity as data structure is complex
  cityName: string;
  isDarkMode: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  cityName,
  isDarkMode,
}) => {
  if (!weatherData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`mt-6 p-4 rounded-lg shadow-inner border
                  ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
    >
      <h2
        className={`text-2xl font-semibold mb-3
                      ${isDarkMode ? "text-gray-50" : "text-gray-800"}`}
      >
        Weather in {cityName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <i
            className={`${getWeatherIcon(
              weatherData.weather[0].main
            )} text-xl ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}
          ></i>
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Condition: {weatherData.weather[0].description}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <i
            className={`${getTemperatureIcon(
              weatherData.main.temp
            )} text-xl`}
          ></i>
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Temperature: {kelvinToCelsius(weatherData.main.temp)}°C /{" "}
            {kelvinToFahrenheit(weatherData.main.temp)}°F
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <i
            className={`fa-solid fa-thermometer-half text-xl ${
              isDarkMode ? "text-purple-300" : "text-purple-600"
            }`}
          ></i>
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Feels like: {kelvinToCelsius(weatherData.main.feels_like)}
            °C
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <i
            className={`fa-solid fa-droplet text-xl ${
              isDarkMode ? "text-green-300" : "text-green-600"
            }`}
          ></i>
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Humidity: {weatherData.main.humidity}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <i
            className={`fa-solid fa-wind text-xl ${
              isDarkMode ? "text-cyan-300" : "text-cyan-600"
            }`}
          ></i>
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Wind Speed: {weatherData.wind.speed} m/s
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <i
            className={`fa-solid fa-cloud text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          ></i>
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Clouds: {weatherData.clouds.all}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;
