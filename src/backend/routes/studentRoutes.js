import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD student
// ADD student
router.post("/", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // ✅ FIXED VALIDATION
    if (!name || !email || !password || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = new Student({
      name,
      email,
      password, // ✅ added
      course,
      status: "Active",
    });

    await student.save();

    res.status(201).json({ message: "Student added successfully" });

  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
// UPDATE student
router.put("/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Student updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN student
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // find student
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // check password
    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // success
    res.json({
      message: "Login successful",
      student,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

