import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
}) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored || defaultTheme;
    } catch (e) {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      // ignore storage/access errors in some environments
    }
  }, [theme, storageKey]);

  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Provide a fallback to avoid crashes when used outside provider
    return { theme: "light", setTheme: () => {} };
  }
  return ctx;
}

export default ThemeProvider;
