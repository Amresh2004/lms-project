console.log("🔥 Attendance Routes Loaded");
import express from "express";
import Attendance from "../models/Attendance.js";
import { getStudentAttendance } from "../controllers/attendanceController.js";

const router = express.Router();


// // ✅ GET STUDENT ATTENDANCE
// router.get("/student/:id", getStudentAttendance);

router.get("/student/:id", async (req, res) => {
  try {
    const data = await Attendance.find({ studentId: req.params.id })
      .populate("studentId", "name email");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL RECORDS
router.get("/", async (req, res) => {
    try {
        const data = await Attendance.find()
            .populate("studentId", "name email");

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching" });
    }
});

// ✅ ADD RECORD
router.post("/add", async (req, res) => {
    try {
        const { studentId, subject, date, status } = req.body;

        // ❗ prevent duplicate
        const exists = await Attendance.findOne({
            studentId,
            subject,
            date
        });

        if (exists) {
            return res.status(400).json({ message: "Already marked ❗" });
        }

        const record = new Attendance({
            studentId,
            subject,
            date,
            status
        });

        await record.save();

        res.json({ message: "Attendance added ✅" });

    } catch (err) {
        res.status(500).json({ message: "Error" });
    }
});


// ✅ UPDATE RECORD
router.put("/update/:id", async (req, res) => {
    try {
        const { name, date, status } = req.body;

        await Attendance.findByIdAndUpdate(req.params.id, {
            name,
            date,
            status
        });

        res.json({ message: "Updated ✅" });
    } catch (err) {
        res.status(500).json({ message: "Update error" });
    }
});


// ✅ DELETE RECORD
router.delete("/delete/:id", async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete error" });
    }
});

export default router;