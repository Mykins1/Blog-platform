import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar, { BottomNav } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import "./App.css";
import BlogDetails from "./pages/BlogDetails";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignPage";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/sign";

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "auto",
      }}
    >
      {!hideNavbar && <Navbar />}
      <div className="body md:items-center md:justify-evenly max-w-auto mx-auto md:mx-0 p-3 md:pt-19 pt-19">
        <Routes>
          <Route path="/" element={<Home />} />  
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
