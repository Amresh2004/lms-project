import express from "express";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// ================= REPORT API =================
router.get("/analytics", async (req, res) => {
  try {
    // ✅ Total Students
    const totalStudents = await Student.countDocuments();

    // ✅ Course-wise students (PIE CHART)
    const courses = await Course.find();

    const courseStats = await Promise.all(
      courses.map(async (c) => {
        const count = await Student.countDocuments({
          course: c.name, // ⚠️ make sure student has course field
        });

        return {
          name: c.name,
          value: count,
        };
      })
    );

    // ✅ Monthly Assignments (BAR CHART)
    const submissions = await Assignment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          submissions: { $sum: 1 },
        },
      },
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    const barData = months.map((m, i) => {
      const found = submissions.find((s) => s._id === i + 1);
      return {
        month: m,
        submissions: found ? found.submissions : 0,
      };
    });

    // ✅ Extra stats
    const participation = 89; // optional
    const completion = 87;

    res.json({
      success: true,
      totalStudents,
      courseStats,
      barData,
      participation,
      completion,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

export default router;