import "./App.css";
import Homepage from "./Pages/Home";
import Navbar from "./Components/Navbar";
import People from "./Pages/People";
import { Routes, Route } from "react-router-dom";
import Projects from "./Pages/Projects";
import AboutUs from "./Pages/AboutUs";
import ProjectDetail from "./Components/ProjectDetail";
import AdminPage from "./Pages/AdminPage";
import ImageGallery from "./Components/ImageGallery";
import ImageDetail from "./Components/ImageDetail";
import ViewProject from "./Components/ViewProject";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/people" element={<People />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/gallery/:title" element={<ImageDetail />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/view-project/:id" element={<ViewProject />} />
      </Routes>
    </div>
  );
}
