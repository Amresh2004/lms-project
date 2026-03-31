import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js"; // ✅ ADD THIS
import facultyRoutes from "./routes/facultyRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";


import announcementRoutes from "./routes/announcementRoutes.js";

console.log("Faculty Routes Loaded:", facultyRoutes);


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/settings", settingsRoutes);

// DB
connectDB();

// ✅ ADD ROUTE
app.use("/api/students", studentRoutes);
app.use("/api/faculty",facultyRoutes);
app.use("/api/announcements", announcementRoutes);



app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});