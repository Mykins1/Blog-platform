
import { useTheme } from "../context/ThemeContext.js";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-4 button-group">
      <button
        onClick={() => setTheme("light")}
        className={`theme-button ${theme === "light" ? "active" : ""}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`theme-button ${theme === "dark" ? "active" : ""}`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`theme-button ${theme === "system" ? "active" : ""}`}
      >
        System
      </button>
    </div>
  );
};
