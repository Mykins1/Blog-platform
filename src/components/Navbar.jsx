import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  House,
  MagnifyingGlass,
  Plus,
  PlayCircle,
  Bell,
  User,
  SignOut,
  Gear,
  BookmarkSimple,
  Moon,
  Sun,
} from "phosphor-react";
import { NavLink, useLocation } from "react-router-dom";

// Navbar component - The main navigation bar for the application
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0); // State for the navbar's top position
  const [darkMode, setDarkMode] = useState(false);

  // Prevent page interaction when sidebar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup function to restore body overflow on component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Implement X app's scroll-hide logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const navbarHeight = 70; // Adjust if your navbar height changes
    const hideThreshold = 96; // 1 inch in pixels

    const handleScroll = () => {
      // Use requestAnimationFrame to optimize performance
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Only hide if scrolled more than 1 inch (96px)
          if (currentScrollY < lastScrollY) {
            setNavbarTop(0); // Show navbar flush with the top
          } else if (currentScrollY <= hideThreshold) {
            setNavbarTop(0); // Show navbar if not past threshold
          }
          // If scrolling down and past threshold, hide the navbar.
          else if (
            currentScrollY > lastScrollY &&
            currentScrollY > hideThreshold
          ) {
            setNavbarTop(-navbarHeight); // Hide the navbar by moving it up
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar always above BottomNav */}
      <div
        className="fixed w-full flex flex-col md:flex-row items-center justify-between md:p-6 px-4 py-3 bg-white shadow-md z-[101] transition-all duration-300"
        style={{
          fontFamily: "Poppins, sans-serif",
          top: `${navbarTop}px`, // Apply the dynamic top position
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full items-center justify-between gap-8 shrink-0">
          <div className="flex flex-col min-w-[120px]">
            <h1 className="text-2xl font-bold ">Socia</h1>
          </div>
          <div>
            <div className="flex gap-8 items-center min-w-[180px] justify-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 py-2 px-4 text-black rounded-md bg-gray-200 transition"
                    : "flex items-center gap-2 py-2 px-4 text-black rounded-md transition"
                }
              >
                HOME
              </NavLink>
            </div>
          </div>
        </div>

        {/* Blurred Overlay when mobile menu is open */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-gray-500 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile Layout */}
        <div className="md:hidden w-full flex items-center justify-between ">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt=""
              className="md:w-10 md:h-10 w-9 h-9 rounded-full object-cover border-none cursor-pointer"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold ">Socia</h1>
          </div>
          <div>
            {darkMode ? (
              <Sun
                size={24}
                className="text-gray-800 cursor-pointer"
                weight="fill"
                onClick={() => setDarkMode(false)}
              />
            ) : (
              <Moon
                size={24}
                className="text-gray-800 cursor-pointer"
                weight="fill"
                onClick={() => setDarkMode(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[70vw] max-w-md bg-white shadow-lg z-[102] transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden flex flex-col items-start pt-5 gap-6 px-3`}
          style={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <div className="flex items-center gap-2 w-full ">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt="User"
              className="w-11 h-11 rounded-full object-cover border-none"
            />
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg">Mykel Akinsade</span>
              <span className="text-gray-500 text-sm">@mykins1</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 w-full mt-4">
            {/* Profile link with user icon */}
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-md transition text-lg ${
                  isActive
                    ? "bg-gray-200 text-blue-600 font-semibold"
                    : "text-black hover:bg-gray-100"
                }`
              }
            >
              <User size={22} weight="bold" />
              <span className="font-medium">Profile</span>
            </NavLink>
            {/* Bookmarks link with bookmark icon */}
            <NavLink
              to="/bookmarks"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-md transition text-lg ${
                  isActive
                    ? "bg-gray-200 text-blue-600 font-semibold"
                    : "text-black hover:bg-gray-100"
                }`
              }
            >
              <BookmarkSimple size={22} weight="bold" />
              <span className="font-medium">Bookmarks</span>
            </NavLink>
            {/* Settings link with gear icon */}
            <NavLink
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-md transition text-lg ${
                  isActive
                    ? "bg-gray-200 text-blue-600 font-semibold"
                    : "text-black hover:bg-gray-100"
                }`
              }
            >
              <Gear size={22} weight="bold" />
              <span className="font-medium">Settings</span>
            </NavLink>
            {/* Logout button with sign out icon */}
            <button
              className="flex items-center gap-3 py-2 px-4 rounded-md transition text-lg text-black hover:bg-gray-100"
              onClick={() => {
                // Placeholder for logout logic
                setMenuOpen(false);
              }}
            >
              <SignOut size={22} weight="bold" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </div>
      {/* BottomNav always below Navbar and Sidebar */}
      <BottomNav menuOpen={menuOpen} navbarTop={navbarTop} />
    </>
  );
};

export default Navbar;

// --- Bottom Navigation for Mobile ---
export const BottomNav = ({ menuOpen, navbarTop }) => {
  const location = useLocation();
  return (
    <div
      className={`fixed left-0 w-full bg-white border-t border-gray-200 ${
        menuOpen ? "z-[99]" : "z-50"
      } md:hidden flex justify-evenly items-center shadow pointer-events-${
        menuOpen ? "none" : "auto"
      } opacity-${menuOpen ? "50" : "100"} transition-all duration-300`}
      style={{
        bottom: navbarTop === 0 ? 0 : "-70px", // Hide/show bottom nav in sync with top nav
      }}
    >
      <NavLink
        to="/"
        className={`flex flex-col items-center w-full gap-1 px-4 py-2 rounded-md transition ${
          location.pathname === "/"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-800"
        }`}
      >
        <House size={28} weight={location.pathname === "/" ? "fill" : "bold"} />
      </NavLink>
      <NavLink
        to="/search"
        className={`flex flex-col items-center w-full gap-1 px-4 py-2 rounded-md transition ${
          location.pathname === "/search"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-700"
        }`}
      >
        <MagnifyingGlass
          size={28}
          weight={location.pathname === "/search" ? "fill" : "bold"}
        />
      </NavLink>
      <NavLink
        to="/addpost"
        className={`flex flex-col items-center w-full gap-1 px-4 py-2 rounded-md transition ${
          location.pathname === "/addpost"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-800"
        }`}
      >
        <Plus
          size={28}
          weight={location.pathname === "/addpost" ? "bold" : "bold"}
          strokeWidth={location.pathname === "/addpost" ? 3 : 1.5}
        />
      </NavLink>
      <NavLink
        to="/shorts"
        className={`flex flex-col items-center w-full gap-1 px-4 py-2 rounded-md transition ${
          location.pathname === "/shorts"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-700"
        }`}
      >
        <PlayCircle
          size={28}
          weight={location.pathname === "/shorts" ? "fill" : "bold"}
        />
      </NavLink>
      <NavLink
        to="/notifications"
        className={`flex flex-col items-center w-full gap-1 px-4 py-2 rounded-md transition ${
          location.pathname === "/notifications"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-700"
        }`}
      >
        <Bell
          size={28}
          weight={location.pathname === "/notifications" ? "fill" : "bold"}
        />
      </NavLink>
    </div>
  );
};
