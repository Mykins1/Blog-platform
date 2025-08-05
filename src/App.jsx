import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar, { BottomNav } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shorts from "./pages/Shorts";
import Notifications from "./pages/Notification";
import Settings from "./pages/Settings";
import "./App.css";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "auto",
      }}
    >
      <Router>
        <Navbar />
        <div className=" md:flex md:items-center md:justify-evenly max-w-auto mx-auto md:mx-0 p-3 pt-19">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          
          </Routes>
        </div>
        <Footer />
        <BottomNav />
      </Router>
    </div>
  );
}

export default App;
