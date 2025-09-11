import Header from "../components/PageHeader";
import ThemeButton from "../components/ThemeButton";

export default function Settings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" />
      <div className="flex flex-col items-center justify-center py-5 w-full">
        <h2 className="font-medium animate-bounce">Theme</h2>
        <ThemeButton />
      </div>
      <div className="flex flex-col items-center justify-center ">
        Coming soon...
      </div>
    </div>
  );
}
