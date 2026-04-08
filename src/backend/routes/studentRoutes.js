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

// ✅ STUDENT DASHBOARD (REAL DATA)
router.get("/dashboard", async (req, res) => {
  try {
    const { id } = req.query;

    // ✅ find student
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // 🔥 SAMPLE DATA (replace later with real collections)
    const stats = {
      courses: 4,
      assignments: 2,
      attendance: 88,
      grade: "A",
    };

    // 📈 attendance trend
    const lineChart = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      data: [75, 80, 85, 87, 88],
    };

    // 📊 course progress
    const barChart = {
      labels: ["C", "DS", "DBMS", "OS"],
      data: [75, 60, 80, 70],
    };

    res.json({
      success: true,
      stats,
      lineChart,
      barChart,
    });

  } catch (error) {
    console.log("DASHBOARD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// ADD student
// ADD student
router.post("/", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // ✅ FIXED VALIDATION
    if (!name || !email || !password || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = new Student({
      name,
      email,
      password, // ✅ added
      course,
      status: "Active",
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

// LOGIN student
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // find student
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // check password
    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // success
    res.json({
      message: "Login successful",
      student,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET STUDENT PROFILE (by ID)
router.get("/profile/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});


// ✅ UPDATE STUDENT PROFILE
router.put("/profile/update/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// FORGOT PASSWORD (RESET)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // update password
    student.password = newPassword;
    await student.save();

    res.json({ message: "Password updated successfully ✅" });

  } catch (err) {
    console.log("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});




export default router;

