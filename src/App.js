import "./App.css";
import Homepage from "./Pages/Home";
import Navbar from "./Components/Navbar";
import People from "./Pages/People";
import { Routes, Route } from "react-router-dom";
import Projects from "./Pages/Projects";
import AboutUs from "./Pages/AboutUs";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/people" element={<People />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/aboutus" element={<AboutUs/>} />
      </Routes>
    </div>
  );
}
