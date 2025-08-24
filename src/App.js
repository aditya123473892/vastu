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
import { AuthProvider } from "./services/authcontext"; // Import from your auth file
import ProtectedRoute from "./services/protectedroutes"; // Import your protected route component
import Login from "./Pages/Login";
import SecretUpload from "./Pages/Secretupload";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/people" element={<People />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/gallery/:title" element={<ImageDetail />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/secret"
            element={
              <ProtectedRoute>
                <SecretUpload />
              </ProtectedRoute>
            }
          />

          <Route path="/view-project/:id" element={<ViewProject />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
