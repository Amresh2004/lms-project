const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const Student = require("../models/Student");
const Course = require("../models/Course");

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

module.exports = router;