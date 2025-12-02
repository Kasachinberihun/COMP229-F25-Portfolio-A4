
// src/api.js
import axios from "axios";

// ✅ Use your deployed backend URL directly
// If Render gives you a slightly different URL, update it here:
const BASE_URL = "https://portfolio-backend-a4.onrender.com";

// Create API instance
export const api = axios.create({
  // Final base URL will be: https://portfolio-backend-a4.onrender.com/api
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // ok to keep true
});

// Attach token to headers automatically (used after login)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

