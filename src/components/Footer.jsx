import { useTheme } from "../context/ThemeContext";
const Footer = () => {
      const { themeClasses } = useTheme();
  
  return (
    <footer className="flex flex-col items-center justify-center gap-5 pb-2">
      <span className={`${themeClasses.text} flex items-center text-sm font-bold`}>
        © 2025 Mykel.
      </span>
    </footer>
  );
};

export default Footer;
