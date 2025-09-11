import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { useTheme } from "../context/ThemeContext.js";


export default function Header({title}) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the history stack
  };
    const { themeClasses } = useTheme();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className={`flex ${themeClasses.text} ${themeClasses.hover} ${themeClasses.active} rounded-full p-2 `}>
          <ArrowLeft
            size={25}
            onClick={handleGoBack}
            className=" cursor-pointer"
          />
        </div>
        <h2 className="flex text-xl font-medium">{title}</h2>
        <div className="w-1/9"></div>
      </div>
    </div>
  );
}
