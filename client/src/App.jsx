// src/App.jsx
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

import ProjectList from "./components/project-list";
import ProjectDetails from "./components/project-details";
import ProjectCreate from "./components/project-create";
import ProjectEdit from "./components/project-edit";

// ✅ FIXED — added .jsx extension
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

import Education from "./pages/Education";
import Contact from "./pages/Contact";
import ContactAdmin from "./pages/ContactAdmin";

import { useAuth } from "./AuthContext";

function App() {
  const { user, signout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid #ddd",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/projects">Projects</Link>
          <Link to="/education">Education</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact/admin" style={{ fontSize: 12 }}>
            Contact Messages
          </Link>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              <span>Hi, {user.name || user.email}</span>
              <button onClick={signout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectList />} />

        <Route
          path="/projects/new"
          element={
            isAdmin ? <ProjectCreate /> : <Navigate to="/projects" replace />
          }
        />

        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route
          path="/projects/:id/edit"
          element={
            isAdmin ? <ProjectEdit /> : <Navigate to="/projects" replace />
          }
        />

        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/admin" element={<ContactAdmin />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>
    </div>
  );
}

export default App;
