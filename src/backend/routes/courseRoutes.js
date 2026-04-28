import express from "express";
import Department from "../models/Department.js";
import Year from "../models/Year.js";
import Semester from "../models/Semester.js";
import Subject from "../models/Subject.js";

const router = express.Router();

// Departments
router.get("/departments", async (req, res) => {
  try {
    console.log("Departments API called");
    const data = await Department.find();

    if (data.length === 0) {
      return res.json({ message: "No departments found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments" });
  }
});

// Years
router.get("/years/:departmentId", async (req, res) => {
  try {
    const data = await Year.find({
      departmentId: req.params.departmentId,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching years" });
  }
});

// Semesters
router.get("/semesters/:yearId", async (req, res) => {
  try {
    const data = await Semester.find({
      yearId: req.params.yearId,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching semesters" });
  }
});

// Subjects
router.get("/subjects/:semesterId", async (req, res) => {
  try {
    const subjects = await Subject.find({
      semesterId: req.params.semesterId,
    });

    res.json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;