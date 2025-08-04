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
      {/* Hide scrollbar for Webkit browsers */}
      <style>
        {`
          .max-h-screen::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Router>
        <Navbar />
        <div className=" md:flex md:items-center md:justify-evenly max-w-auto mx-auto md:mx-0 p-3 pt-19">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </div>
        <Footer />
        <BottomNav />
      </Router>
    </div>
  );
}

export default App;
