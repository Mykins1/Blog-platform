import { Routes, Route, useLocation } from "react-router-dom";
// import { useState } from "react";
import Navbar, { BottomNav } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignPage";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import { useTheme } from "./context/ThemeContext.js";

export default function App() {
  const { themeClasses } = useTheme();
  // Routing logic
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/sign" ||
    location.pathname.startsWith("/profile/") ||
    location.pathname === "/bookmarks" ||
    location.pathname === "/settings";
  const hideFooter = location.pathname.startsWith("/profile/");
  const isProfilePage =
    location.pathname.startsWith("/profile/") ||
    location.pathname === "/bookmarks" ||
    location.pathname === "/settings";


  return (
    <div
      className={`min-h-screen ${themeClasses.background} ${themeClasses.text}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "auto",
      }}
    >
      {!hideNavbar && <Navbar />}
      <div
        className={`body md:items-center md:justify-evenly max-w-auto mx-auto md:mx-0 p-3 ${
          isProfilePage ? "" : "md:pt-19 pt-17"
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
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
      <BottomNav />
      {!hideFooter && <Footer />}
    </div>
  );
}
