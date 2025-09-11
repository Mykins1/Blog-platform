import { useTheme } from "../context/ThemeContext.js";
import { Sun, Moon, Laptop } from "phosphor-react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-4 button-group">
      <div className="relative inline-flex items-center rounded-full p-1 bg-gray-200 dark:bg-gray-700 transition-colors duration-500">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
            ${
              theme === "light"
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-600 dark:text-gray-400"
            }`}
        >
          <Sun className="w-5 h-5 mr-2" />
          Light
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
            ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
        >
          <Moon className="w-5 h-5 mr-2" />
          Dark
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
            ${
              theme === "system"
                ? "bg-gray-500 text-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
        >
          <Laptop className="w-5 h-5 mr-2" />
          System
        </button>
      </div>
    </div>
  );
}
