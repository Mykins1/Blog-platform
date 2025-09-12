// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Initial state check: local storage or system preference
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
          background: " bg-gray-900",
          text: "text-white",
          icon: "text-gray-500",
          hover: "hover:bg-zinc-700/50",
          span: "text-gray-400",
          border: "border-gray-500",
          dot: "bg-gray-500",
          active: "active:bg-zinc-700/40",
          current: "bg-zinc-700/50",
          input: "bg-zinc-700/50",
          reaction: "text-gray-500",
        }
      : {
          background: "bg-white",
          text: "text-black",
          icon: " text-zinc-900",
          hover: "hover:bg-gray-100",
          span: "text-gray-600",
          border: "border-gray-300",
          dot: "bg-gray-300",
          active: "active:bg-gray-300",
          current: "bg-gray-300",
          input: "bg-gray-100",
          reaction: "",
        };

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // This is the function that runs when the system theme changes
    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        root.className = e.matches ? "dark" : "light";
      }
    };

    // Add the listener for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Set the initial class based on the current theme state
    if (theme === "system") {
      root.className = mediaQuery.matches ? "dark" : "light";
    } else {
      root.className = theme;
    }

    localStorage.setItem("theme", theme);

    // Cleanup function to remove the listener
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const value = { theme, setTheme, themeClasses };

  return React.createElement(ThemeContext.Provider, { value: value }, children);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
