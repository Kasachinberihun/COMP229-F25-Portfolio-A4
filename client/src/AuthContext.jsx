
// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api.js"; // use the shared axios instance

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // if parsing fails, clear bad data
        localStorage.removeItem("user");
      }
    }
  }, []);

  // SIGN IN FUNCTION (Login.jsx calls this)
  const signin = async (email, password) => {
    const res = await api.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    const { token, user } = res.data;

    if (token) {
      localStorage.setItem("token", token);
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    return user;
  };

  // SIGN OUT
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
