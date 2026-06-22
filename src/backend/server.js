console.log("🚀 SERVER FILE RUNNING FROM:", process.cwd());

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import materialsRoutes from "./routes/materialsRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import reportRoutes from "./routes/reportsRoutes.js";

// OTP ROUTE
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();

const app = express();

// =============================
// FIX __dirname FOR ES MODULES
// =============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================
// MIDDLEWARE
// =============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/enquiries", enquiryRoutes);

// =============================
// STATIC FILES
// =============================
app.use(
"/uploads",
express.static(path.join(__dirname, "uploads"))
);

// =============================
// API ROUTES
// =============================
app.use("/api/settings", settingsRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/admin", adminRoutes);

// OTP ROUTES
app.use("/api/otp", otpRoutes);

app.use("/api/enquiries",enquiryRoutes);

// LMS ROUTES
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/reports", reportRoutes);

// =============================
// ROOT CHECK
// =============================
app.get("/", (req, res) => {
res.json({
success: true,
message: "Server running 🚀",
});
});

// =============================
// GLOBAL ERROR HANDLER
// =============================
app.use((err, req, res, next) => {
console.error("Global Error:", err);

res.status(500).json({
success: false,
message:
err.message || "Internal Server Error",
});
});

// =============================
// START SERVER
// =============================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
app.listen(PORT, () => {
console.log(
`🚀 Server running on port ${PORT}`
);
});
});
