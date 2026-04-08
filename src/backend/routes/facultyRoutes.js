import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();


// ✅ GET all faculty
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ ADD faculty
router.post("/", async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;

    // VALIDATION
    if (!name || !email || !password || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const faculty = new Faculty({
      name,
      email,
      password,
      subject,
      status: "Active",
    });

    await faculty.save();

    res.status(201).json({ message: "Faculty added successfully" });

  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE faculty
router.put("/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Faculty updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE faculty
router.delete("/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ LOGIN faculty
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // find faculty
    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // check password
    if (faculty.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // success
    res.json({
      message: "Login successful",
      faculty,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/test", (req, res) => {
  res.send("Faculty working ✅");
});

router.get("/dashboard", async (req, res) => {
  try {
    const { id } = req.query;

    // 🔥 Replace with real DB queries later
    const stats = {
      courses: 3,
      students: 120,
      assignments: 8,
      attendance: 90,
    };

    const lineChart = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      data: [60, 70, 80, 75, 90],
    };

    const barChart = {
      labels: ["C", "DS", "DBMS"],
      data: [75, 65, 85],
    };

    res.json({
      success: true,
      stats,
      lineChart,
      barChart,
    });

  } catch (error) {
    console.log("FACULTY DASHBOARD ERROR:", error);
    res.status(500).json({ success: false });
  }
});
export default router;