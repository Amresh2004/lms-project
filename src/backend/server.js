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


import announcementRoutes from "./routes/announcementRoutes.js";

console.log("Faculty Routes Loaded:", facultyRoutes);



dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/settings", settingsRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/students", studentRoutes);

app.use("/api/faculty", facultyRoutes);

app.use("/api/faculty",facultyRoutes);

app.use("/api/announcements", announcementRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/course", courseRoutes);


app.get("/", (req, res) => {
  res.send({ success: true, message: "Server running" });
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});