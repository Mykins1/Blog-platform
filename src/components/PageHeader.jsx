import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

export default function Header({title}) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the history stack
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="flex active:bg-gray-200 rounded-md px-2 hover:bg-gray-100">
          <ArrowLeft
            size={25}
            onClick={handleGoBack}
            className="text-black cursor-pointer"
          />
        </div>
        <h2 className="flex text-xl font-medium">{title}</h2>
        <div className="w-1/9"></div>
      </div>
    </div>
  );
}
