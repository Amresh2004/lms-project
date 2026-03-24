import express from "express";
import auth from "../middleware/authMiddleware.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let data = {};

    // 🔥 ROLE BASED DASHBOARD
    if (req.user.role === "admin") {
      data.totalStudents = await Student.countDocuments();
      data.totalCourses = await Course.countDocuments();

      data.students = await Student.find().sort({ createdAt: -1 });
    }

    else if (req.user.role === "faculty") {
      data.courses = await Course.find({
        teacher: req.user.id,
      });

      data.students = await Student.find({
        courseTeacher: req.user.id,
      });
    }

    else if (req.user.role === "student") {
      data.profile = await Student.findOne({
        userId: req.user.id,
      });

      data.courses = await Course.find({
        students: req.user.id,
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;