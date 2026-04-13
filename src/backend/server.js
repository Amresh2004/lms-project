
console.log("🚀 SERVER FILE RUNNING FROM:", process.cwd());

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import materialsRoutes from "./routes/materialsRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

// ⭐ NEW ASSIGNMENT ROUTES ADD केले
import assignmentRoutes from "./routes/assignmentRoutes.js";

import submissionRoutes from "./routes/submissionRoutes.js";

import gradeRoutes from "./routes/gradeRoutes.js";


dotenv.config();
const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================
// ✅ MIDDLEWARE
// =============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⭐ STATIC UPLOADS (single time only)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =============================
// ✅ ROUTES
// =============================
app.use("/api/settings", settingsRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/course", courseRoutes);

// ⭐ LMS ASSIGNMENT SYSTEM ROUTES
app.use("/api/assignments", assignmentRoutes);

app.use("/api/submissions", submissionRoutes);

app.use("/api/grades", gradeRoutes);


// =============================
// ✅ ROOT CHECK
// =============================
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server running 🚀" });
});

// =============================
// ❌ GLOBAL ERROR HANDLER
// =============================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =============================
// 🚀 START SERVER
// =============================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});