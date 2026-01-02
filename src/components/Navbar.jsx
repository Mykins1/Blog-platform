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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
    const navbarHeight = 70;
    const hideThreshold = 60;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < lastScrollY) {
            setNavbarTop(0);
          } else if (currentScrollY <= hideThreshold) {
            setNavbarTop(0);
          } else if (
            currentScrollY > lastScrollY &&
            currentScrollY > hideThreshold
          ) {
            setNavbarTop(-navbarHeight);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`nav fixed md:static w-full md:w-full md:h-full flex flex-col md:flex-col items-center md:items-start border-b md:border-none ${themeClasses.border} ${themeClasses.background} px-4 py-2 md:py-4 z-[101]`}
        style={{
          top: `${navbarTop}px`,
        }}
      >
        {/* Mobile Top Bar */}
        <div className="w-full md:hidden flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt=""
              className="w-8 h-8 rounded-full object-cover border-none cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
          <h1 className={`${themeClasses.text} text-xl font-bold`}>Socia</h1>
          <NavLink
            to="/search"
            className={`p-1 rounded-full ${themeClasses.icon}`}
          >
            <MagnifyingGlass
              size={24}
              weight={location.pathname === "/search" ? "fill" : "bold"}
            />
          </NavLink>
        </div>

        {/* Desktop Sidebar content */}
        <div
          className={`${themeClasses.background} hidden md:flex md:flex-col md:items-start md:w-full md:h-full md:gap-6 pb-7`}
        >
          <NavLink
            className={`${themeClasses.text} hidden px-4 md:block text-2xl font-bold`}
            to="/"
          >
            Socia
          </NavLink>

          <div className="flex flex-col justify-between w-full flex-grow">
            <div>
              <nav className="flex flex-col gap-2 w-full mt-2">
                <NavLink
                  to={`/profile/${encodeURIComponent("Mykel Akinsade")}`}
                  onClick={() => setMenuOpen(true)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-4 rounded-lg text-xl font-bold transition ${
                      isActive
                        ? "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-100"
                        : themeClasses.hover
                    }`
                  }
                >
                  <User size={22} weight="bold" />
                  <span>Profile</span>
                </NavLink>

                <NavLink
                  to="/bookmarks"
                  onClick={() => setMenuOpen(true)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-4 rounded-lg text-xl font-bold transition ${
                      isActive
                        ? "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-100"
                        : themeClasses.hover
                    }`
                  }
                >
                  <BookmarkSimple size={22} weight="bold" />
                  <span>Bookmarks</span>
                </NavLink>

                <NavLink
                  to="/settings"
                  onClick={() => setMenuOpen(true)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-4 rounded-lg text-xl font-bold transition ${
                      isActive
                        ? "bg-sky-100 dark:bg-sky-900  dark:text-sky-100"
                        : themeClasses.hover
                    }`
                  }
                >
                  <Gear size={22} weight="bold" />
                  <span className="relative">
                    Settings
                    <span className="absolute top-0 right-0 h-2 w-2 -mt-0 -mr-4 rounded-full bg-red-500"></span>
                  </span>
                </NavLink>
              </nav>
            </div>
            <div className="px-4">
              <NavLink
                to="/addpost"
                className={`flex items-center justify-center gap-2 py-3 px-6  rounded-full font-medium transition ${themeClasses.button}`}
              >
                <Plus size={20} weight="bold" />
                <span className="font-bold text-md">Post</span>
              </NavLink>
            </div>

            <div className="flex items-start flex-col w-full">
              {/* User Profile Section - at bottom with dropdown menu */}
              <div className="relative w-full px-4">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center shrink-1 gap-2 w-full relative z-50" // Added z-50
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/5.jpg"
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover border-none"
                  />
                  <div className="flex flex-col items-start">
                    <span
                      className={`font-semibold text-lg ${themeClasses.text} cursor-pointer hover:opacity-70`}
                    >
                      Mykel Akinsade
                    </span>
                    <span className={`${themeClasses.span} text-sm`}>
                      @mykins1
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className={`absolute bottom-full mb-2 w-full left-1/2 transform -translate-x-1/2 ${themeClasses.background} border ${themeClasses.border} rounded-lg shadow-lg z-[51]`} // Changed to z-[51]
                    onClick={(e) => e.stopPropagation()}
                  >
                    <NavLink
                      to="/sign"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-4 text-lg whitespace-nowrap ${
                          isActive ? "" : `${themeClasses.hover}`
                        } ${themeClasses.active}`
                      }
                    >
                      <SignOut size={20} weight="bold" />
                      <span className="font-medium">Logout</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for Desktop User Menu */}
        {userMenuOpen && (
          <div
            className="fixed inset-0 z-[49] cursor-default"
            onClick={() => setUserMenuOpen(false)}
          />
        )}

        {/* Overlay for Mobile Sidebar */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[101] md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sliding Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-[70vw] max-w-md z-[102] md:hidden ${
            themeClasses.background
          } ${themeClasses.text} transform transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="p-4">
            <div className="flex flex-col items-center px-3 mb-4">
              <div className="flex items-center shrink-1 gap-2 w-full">
                <img
                  src="https://randomuser.me/api/portraits/men/5.jpg"
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border-none"
                />
                <div className="flex flex-col items-start">
                  <span
                    className={`font-semibold text-lg ${themeClasses.text}`}
                  >
                    Mykel Akinsade
                  </span>
                  <span className={`${themeClasses.span} text-sm`}>
                    @mykins1
                  </span>
                </div>
              </div>
            </div>
            <hr className={`block md:hidden  ${themeClasses.border} w-full`} />

            <nav className="flex flex-col gap-2 w-full ">
              <NavLink
                to={`/profile/${encodeURIComponent("Mykel Akinsade")}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded-lg text-lg ${
                    isActive ? "" : themeClasses.hover
                  } ${themeClasses.active}`
                }
              >
                <User size={22} weight="bold" />
                <span className="font-medium">Profile</span>
              </NavLink>

              <NavLink
                to="/bookmarks"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded-lg text-lg ${
                    isActive ? "" : themeClasses.hover
                  } ${themeClasses.active}`
                }
              >
                <BookmarkSimple size={22} weight="bold" />
                <span className="font-medium">Bookmarks</span>
              </NavLink>

              <NavLink
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded-lg text-lg ${
                    isActive ? "" : themeClasses.hover
                  } ${themeClasses.active}`
                }
              >
                <Gear size={22} weight="bold" />
                <span className="relative font-medium">
                  Settings
                  <span className="absolute top-0 right-0 h-2 w-2 -mt-0 -mr-4 rounded-full bg-red-500"></span>
                </span>
              </NavLink>
              <hr className={`block md:hidden ${themeClasses.border} w-full`} />

              <NavLink
                to="/sign"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 text-lg ${
                    isActive ? "" : `${themeClasses.hover} `
                  } ${themeClasses.active}`
                }
              >
                <SignOut size={22} weight="bold" />
                <span className="font-medium">Logout</span>
              </NavLink>
            </nav>
          </div>
        </aside>
      </header>

      <BottomNav menuOpen={menuOpen} navbarTop={navbarTop} />
    </>
  );
}

export const BottomNav = ({ menuOpen, navbarTop }) => {
  const location = useLocation();
  const { themeClasses } = useTheme();

  return (
    <div
      className={`fixed ${themeClasses.text}left-0 w-full ${
        themeClasses.background
      } border-t  ${themeClasses.border} ${
        menuOpen ? "z-[99]" : "z-50"
      } md:hidden flex justify-evenly items-center shadow pointer-events-${
        menuOpen ? "none" : "auto"
      } opacity-${menuOpen ? "50" : "100"} transition-all duration-300`}
      style={{
        bottom: navbarTop === 0 ? 0 : "-70px",
      }}
    >
      <NavLink
        to="/"
        className={`flex flex-col items-center w-full  rounded-r-md transition ${
          location.pathname === "/" ? themeClasses.current : ""
        }`}
      >
        <House
          size={28}
          className={`${themeClasses.icon}`}
          weight={location.pathname === "/" ? "fill" : "bold"}
        />
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
    </div>
  );
};
