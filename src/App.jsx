import { Routes, Route, useLocation } from "react-router-dom";
import Navbar, { BottomNav } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignPage";
import Profile from "./pages/Profile";
import { useTheme } from "./components/Theme-provider";

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/sign" || location.pathname.startsWith("/profile/");
  const isProfilePage = location.pathname.startsWith("/profile/");
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen bg-white text-gray-900 ${
        theme === "dark" ? "dark" : ""
      }`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "auto",
      }}
    >
      {!hideNavbar && <Navbar />}

      <div
        className={`body md:items-center md:justify-evenly max-w-auto mx-auto md:mx-0 p-3 ${
          isProfilePage ? "pt-8" : "md:pt-19 pt-19"
        }`}
        style={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:author" element={<Profile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sign" element={<SignIn />} />
        </Routes>
      </div>

      {/* <Footer /> */}
      <BottomNav />
    </div>
  );
}

export default AppContent;
