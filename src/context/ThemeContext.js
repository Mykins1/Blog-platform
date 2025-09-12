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
          background: " bg-slate-900",
          text: "text-white",
          icon: "text-gray-500",
          hover: "hover:bg-zinc-700/50",
          span: "text-gray-400",
          border: "border-gray-500",
          dot: "bg-gray-500",
          active: "active:bg-zinc-700/40",
          current: "bg-zinc-700/50",
          input: "bg-zinc-700/50",
          reaction:"text-gray-500",
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
          reaction:"",
        };

  useEffect(() => {
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

    localStorage.setItem("theme", theme);
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
