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
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    // ✅ Validation
    if (!name || !email || !phone || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = new Student({
      name,
      email,
      phone,
      course,
      status: "Active"
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

export default router;