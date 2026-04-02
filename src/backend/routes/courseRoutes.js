import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// ✅ GET COURSE BY CODE
router.get("/:code", async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;