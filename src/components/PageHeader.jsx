import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { useTheme } from "../context/ThemeContext.js";

export default function Header({ title }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/"); // This navigates back one step in the history stack
  };
  const { themeClasses } = useTheme();

  return (
    <header>
      <div className="flex items-center justify-between w-full">
        <button
          aria-label="Go back"
          onClick={handleGoBack}
          className={`flex ${themeClasses.text} ${themeClasses.hover} ${themeClasses.active} rounded-full p-2 `}
        >
          <ArrowLeft size={25} className=" cursor-pointer" />
        </button>
        <h1 className="flex text-xl font-medium md:ml-7">{title}</h1>
        <div className="w-1/9" aria-hidden />
      </div>
    </header>
  );
}
