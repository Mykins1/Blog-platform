import Header from "../components/PageHeader";
import ThemeToggle from "../components/ThemeToggle";

export default function Settings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" />
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center ">
        Coming soon...
      </div>
    </div>
  );
}
