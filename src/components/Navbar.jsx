import { useState, useEffect } from "react";
import {
  House,
  MagnifyingGlass,
  Plus,
  User,
  SignOut,
  Gear,
  BookmarkSimple,
} from "phosphor-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.js";

export default function Navbar(){
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0);
  const location = useLocation();
  const { themeClasses } = useTheme();


  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const navbarHeight = 70; // Adjust if your navbar height changes
    const hideThreshold = 60; 

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
      className={`nav fixed w-full flex flex-col md:flex-row items-center justify-between border-b  ${themeClasses.border} ${themeClasses.background}  px-4 py-2 z-[101] transition-all duration-300`}
        style={{
          top: `${navbarTop}px`, // Apply the dynamic top position
        }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full items-center justify-between gap-8 shrink-0 ">
          <div className="flex flex-col min-w-[120px]">
            <h1 className={` ${themeClasses.text} text-2xl font-bold `}>
              Socia
            </h1>
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
        <div className={`md:hidden w-full flex items-center justify-between ${themeClasses.background}`}>
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt=""
              className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover border-none cursor-pointer"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            />
          </div>
          <div>
            <h1 className={` ${themeClasses.text} text-xl font-bold `}>
              Socia
            </h1>
          </div>
          <div>
            <NavLink
              to="/search"
              className={`flex flex-col items-center w-full rounded-full p-1 transition ${
                location.pathname === "/search"
                  ? themeClasses.icon
                  : themeClasses.icon
              }`}
            >
              <MagnifyingGlass
                className=""
                size={28}
                weight={location.pathname === "/search" ? "fill" : "bold"}
              />
            </NavLink>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed px-2 top-0 left-0 h-full w-[70vw] max-w-md font ${
            themeClasses.background
          } ${themeClasses.text}  z-[102] transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden flex flex-col items-start pt-5 gap-2 `}
        >
          <div className="flex flex-col items-center px-3">
            <div className="flex items-center shrink-1  gap-2 w-full ">
              <img
                src="https://randomuser.me/api/portraits/men/5.jpg"
                alt="User"
                className="w-9 h-9 rounded-full object-cover border-none"
              />
              <div className="flex flex-col items-start">
                <span className={`font-semibold text-lg ${themeClasses.text}`}>
                  Mykel Akinsade
                </span>
                <span className={`${themeClasses.span} text-sm`}>@mykins1</span>
              </div>
            </div>
          </div>
          <hr className={`block md:hidden border-t ${themeClasses.border} w-full`} />

          <nav className="flex flex-col gap-2 w-full ">
            {/* Profile link with user icon */}
            <NavLink
              to={`/profile/${encodeURIComponent("Mykel Akinsade")}`}
              onClick={() => setMenuOpen(true)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-lg transition duration-300 ease-in-out text-lg ${
                  isActive ? "" : themeClasses.hover
                }
               ${themeClasses.active}`
              }
            >
              <User size={22} weight="bold" />
              <span className="font-medium">Profile</span>
            </NavLink>
            {/* Bookmarks link with bookmark icon */}
            <NavLink
              to="/bookmarks"
              onClick={() => setMenuOpen(true)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-lg transition duration-300 ease-in-out text-lg ${
                  isActive ? "" : themeClasses.hover
                }
                  ${themeClasses.active}`
              }
            >
              <BookmarkSimple size={22} weight="bold" />
              <span className="font-medium">Bookmarks</span>
            </NavLink>
            <hr className={`block md:hidden border-t ${themeClasses.border} w-full`} />{" "}
            {/* Settings link with gear icon */}
            <NavLink
              to="/settings"
              onClick={() => setMenuOpen(true)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-lg transition duration-300 ease-in-out text-lg ${
                  isActive ? "" : themeClasses.hover
                }
                  ${themeClasses.active}`
              }
            >
              <Gear size={22} weight="bold" />
              <span className="font-medium">Settings</span>
            </NavLink>
            <NavLink
              to="/sign"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 transition text-lg ${
                  isActive ? "" : `${themeClasses.hover} text-red-500`
                }
                  ${themeClasses.active}`
              }
            >
              <SignOut size={22} weight="bold" />
              <span className="font-medium">Logout</span>
            </NavLink>
          </nav>
        </div>
      </div>
      {/* BottomNav always below Navbar and Sidebar */}
      <BottomNav menuOpen={menuOpen} navbarTop={navbarTop} />
    </>
  );
};


// --- Bottom Navigation for Mobile ---
export const BottomNav = ({ menuOpen, navbarTop }) => {
  const location = useLocation();
    const { themeClasses } = useTheme();

  return (
    <div
      className={`fixed ${themeClasses.text}left-0 w-full ${themeClasses.background} border-t  ${themeClasses.border} ${
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
        className={`flex flex-col items-center w-full  rounded-r-md transition ${
          location.pathname === "/" ? themeClasses.current : ""
        }`}
      >
        <House size={28} className={`${themeClasses.icon}`} weight={location.pathname === "/" ? "fill" : "bold"} />
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink
        to="/addpost"
        className={`flex flex-col items-center w-full gap-1 py-2 rounded-l-md transition ${
          location.pathname === "/addpost" ? themeClasses.current : ""
        }`}
      >
        <Plus
          className={`bg-gray-200 rounded-full p-1 ${themeClasses.icon}`}
          size={28}
          weight={location.pathname === "/addpost" ? "bold" : "bold"}
          strokeWidth={location.pathname === "/addpost" ? 3 : 1.5}
        />
      </NavLink>
      {/* <NavLink
        to="/search"
        className={`flex flex-col items-center w-full rounded-md transition ${
          location.pathname === "/search"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-700"
        }`}
      >
        <ChatsCircle
          size={28}
          weight={location.pathname === "/search" ? "fill" : "bold"}
        />
        <span className="text-xs">Chats</span>
      </NavLink> */}
    </div>
  );
};
