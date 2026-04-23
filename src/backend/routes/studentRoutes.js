import express from "express";
import Student from "../models/Student.js";
import Activity from "../models/Activity.js";

const router = express.Router();


// ================= GET ALL STUDENTS =================
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= FILTER (COURSE + YEAR) =================
router.get("/filter", async (req, res) => {
  try {
    const { course, year } = req.query;

    const students = await Student.find({ course, year });

    res.json({
      success: true,
      students
    });

  } catch (err) {
    console.log("FILTER ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// ================= DASHBOARD (REAL DATA) =================
router.get("/dashboard", async (req, res) => {
  try {
    const { id } = req.query;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const stats = {
      courses: student.courses?.length || 0,
      assignments: 2, // later dynamic
      attendance: 85,
      grade: "A"
    };

    const activities = await Activity.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats,
      activities
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});


// ================= ADD STUDENT =================
router.post("/add", async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      courses: [] // 👈 important for my-courses
    });

    await student.save();

    await Activity.create({
      message: `${student.fullName} registered`
    });

    res.json({
      success: true,
      message: "Student added successfully"
    });

  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// ================= UPDATE =================
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({
      success: true,
      updated
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// ================= DELETE =================
router.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    await Activity.create({
      message: "Student deleted"
    });

    res.json({
      success: true,
      message: "Student deleted"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      success: true,
      student
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= PROFILE =================
router.get("/profile/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.json(student);

  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});


// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.password = newPassword;
    await student.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= ⭐ MY COURSES (IMPORTANT) =================
router.get("/my-courses/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      courses: student.courses || []
    });

  } catch (err) {
    console.log("COURSE FETCH ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// ================= ⭐ ASSIGN COURSE TO STUDENT =================
router.post("/assign-course/:id", async (req, res) => {
  try {
    const { course } = req.body;

    const student = await Student.findById(req.params.id);

    student.courses.push(course);

    await student.save();

    res.json({
      success: true,
      message: "Course assigned"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;