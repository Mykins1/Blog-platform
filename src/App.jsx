import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar, { BottomNav } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import Settings from "./pages/Settings";
import "./App.css";
import BlogDetails from "./pages/BlogDetails";
import SearchPage from "./pages/SearchPage";

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
            <Route path="/" element={ <div>HOme test</div> } />
            <Route path="/search" element={<SearchPage />} />
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
