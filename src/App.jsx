import { Routes, Route, useLocation } from "react-router-dom";
// import { useState } from "react";
import Navbar, { BottomNav } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import AddPost from "./pages/AddPost";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignPage";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import { useTheme } from "./context/ThemeContext.js";

export default function App() {
  const { themeClasses } = useTheme();
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/sign" ||
    location.pathname === "/addpost" ||
    location.pathname.startsWith("/profile/") ||
    location.pathname === "/bookmarks" ||
    location.pathname === "/settings";
  const hideFooter = location.pathname.startsWith("/profile/");
  const hideSearch = location.pathname !== "/";
  const isNotHomePage =
    location.pathname.startsWith("/profile/") ||
    location.pathname === "/bookmarks" ||
    location.pathname === "/settings" ||
    location.pathname === "/addpost" ||
    location.pathname === "/sign"; 
  return (
    <div
      className={`min-h-screen ${themeClasses.background} ${themeClasses.text}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "auto",
      }}
    >
      <div className="md:grid md:grid-cols-[280px_1fr_320px] md:gap-4">
        <aside
          className={`hidden md:block md:fixed md:left-0 md:top-0 md:h-screen md:w-[280px] md:border-r ${themeClasses.border}`}
          aria-label="Primary sidebar"
        >
          <Navbar />
        </aside>

        <main className="md:col-start-2" role="main">
          <div className="block md:hidden">{!hideNavbar && <Navbar />}</div>
          <section
            className={`body max-w-auto mx-auto p-4 ${
              isNotHomePage ? "" : "md:pt-4 pt-17"
            }`}
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="/profile/:author" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/sign" element={<SignIn />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </section>
        </main>

        <aside
          className={`hidden md:block md:fixed md:right-0 md:top-0 md:h-screen md:w-[320px] md:border-l ${themeClasses.border}`}
          aria-label="Secondary sidebar"
        >
          <div className="h-full p-4 overflow-y-auto">
            {!hideSearch && <SearchPage />}
          </div>
        </aside>
      </div>
      
      <div className="md:hidden">
        <BottomNav />
        {!hideFooter && <Footer />}
      </div>
    </div>
  );
}
