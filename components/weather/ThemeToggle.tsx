
import React from "react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full shadow-lg transition-colors duration-300
              ${
                isDarkMode
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600 border border-gray-600"
                  : "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
              }`}
      aria-label="Toggle dark mode"
    >
      <i
        className={`fa-solid ${
          isDarkMode ? "fa-sun text-yellow-400" : "fa-moon text-gray-700"
        } text-xl`}
      ></i>
    </button>
  );
};

export default ThemeToggle;
