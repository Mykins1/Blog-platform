// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Initial state check: local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const themeClasses =
    theme === "dark"
      ? {
          background: " bg-zinc-900",
          container: "bg-zinc-800/90 backdrop-blur-lg border-zinc-700",
          text: "text-zinc-100",
          icon: "text-zinc-200",
          hover: "bg-zinc-800",
          span: "text-gray-400",
          lapItem: "bg-zinc-700/40 border-zinc-600",
        }
      : {
          background: "bg-white",
          container: "bg-gray-100/80 backdrop-blur-lg border-gray-300",
          text: "text-black",
          icon: "text-black",
          hover: "bg-gray-100",
          span: "text-gray-600",
          lapItem: "bg-gray-100/50 border-gray-200",
        };

  useEffect(() => {
    // 2. Apply theme class to the document for styling
    const root = document.documentElement;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleSystemThemeChange = (e) => {
        root.className = e.matches ? "dark" : "light";
      };

      root.className = mediaQuery.matches ? "dark" : "light";
      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    } else {
      root.className = theme;
    }

    // 3. Save the theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 4. Provide the state, the setter function, and the class object
  const value = { theme, setTheme, themeClasses };

  // 🔹 Pure JS (no JSX)
  return React.createElement(ThemeContext.Provider, { value: value }, children);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
