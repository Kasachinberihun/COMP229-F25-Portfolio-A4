import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // needed for req.cookies

dotenv.config();

// ✅ Env checks
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI; // make sure .env uses MONGO_URI

if (!mongoURI) {
  console.error("❌ ERROR: MONGO_URI is missing in your .env file");
  process.exit(1);
}

// ✅ Allowed CORS origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://kasachin-portfolio-a4.onrender.com",
];

// ✅ Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes & middleware imports
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import userRoutes from "./routes/user.js";
import educationRoutes from "./routes/education.js";
import contactRoutes from "./routes/contact.js";
import { requireAuth } from "./middlewares/auth.js";

const app = express();

// ✅ Global middleware (before routes)
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (no origin) and allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactRoutes); // singular: /api/contact

// ✅ Simple test endpoint
app.get("/api/data", (_req, res) => {
  res.json({ message: "Hello from the API! Again" });
});

// ✅ Protected test endpoint (requires Bearer token or cookie)
app.get("/api/protected/ping", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// ✅ 404 + error handlers
app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
