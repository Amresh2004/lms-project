import express from "express";
import Student from "../models/Student.js";
import Activity from "../models/Activity.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    // 🔥 latest activities
    const activities = await Activity.find()
      .sort({ time: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        students: totalStudents,
        faculty: 10,       // temp (replace later)
        courses: 5,        // temp
        assignments: 8,    // temp
      },
      activities: activities.map((a) => ({
        message: a.message,
        time: new Date(a.time).toLocaleString(),
      })),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;