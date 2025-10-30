import Header from "../components/PageHeader";
import ThemeButton from "../components/ThemeButton";

export default function Settings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" />
      <div className="flex flex-col items-center justify-center py-5 w-full">
        <div className="flex items-end mb-2 gap-2">
          <h2 className="font-medium ">Theme</h2>
          <div className="relative inline-block bg-zinc-400/60 p-1 rounded-lg text-xs font-medium text-white">
            <span>NEW</span>
            <span className="absolute top-0 right-0 h-2 w-2 -mt-1 -mr-1 rounded-full bg-red-500"></span>
          </div>
        </div>
        <ThemeButton />
      </div>
      
    </div>
  );
}
