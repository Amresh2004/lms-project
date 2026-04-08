import express from "express";
import Grade from "../models/Grade.js";

const router = express.Router();

// ✅ ADD GRADE (Faculty)
router.post("/add", async (req, res) => {
  try {
    const { studentId, course, marks } = req.body;

    const getGrade = (marks) => {
      if (marks >= 90) return "A+";
      if (marks >= 75) return "A";
      if (marks >= 50) return "B";
      if (marks >= 35) return "C";
      return "F";
    };

    const newGrade = new Grade({
      studentId,
      course,
      marks,
      grade: getGrade(marks)
    });

    await newGrade.save();

    res.json({ message: "Grade added ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET STUDENT GRADES
router.get("/student/:id", async (req, res) => {
  try {
    const data = await Grade.find({ studentId: req.params.id })
      .populate("studentId", "name");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL GRADES (FOR FACULTY TABLE)
router.get("/", async (req, res) => {
  try {
    const data = await Grade.find()
      .populate("studentId", "name email"); // 🔥 IMPORTANT

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE GRADE
router.put("/update/:id", async (req, res) => {
  try {
    const { course, marks } = req.body;

    const getGrade = (marks) => {
      if (marks >= 90) return "A+";
      if (marks >= 75) return "A";
      if (marks >= 50) return "B";
      if (marks >= 35) return "C";
      return "F";
    };

    const updated = await Grade.findByIdAndUpdate(
      req.params.id,
      {
        course,
        marks,
        grade: getGrade(marks)
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE GRADE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;