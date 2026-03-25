import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js"; // ✅ ADD THIS
import facultyRoutes from "./routes/facultyRoutes.js";

console.log("Faculty Routes Loaded:", facultyRoutes);
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// ✅ ADD ROUTE
app.use("/api/students", studentRoutes);
app.use("/api/faculty",facultyRoutes);


app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});