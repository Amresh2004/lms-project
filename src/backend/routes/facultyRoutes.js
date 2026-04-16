// FACULTY LOGIN
import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();


// ================= ADD FACULTY =================
router.post("/add", async (req, res) => {
  try {
    const {
      fullName,
      gender,
      email,
      phone,
      password,
      currentAddress,
      permanentAddress,
      qualification,
      experience,
      department,
      teacherId,
      joiningDate
    } = req.body;

    // check already exists
    const exists = await Faculty.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const newFaculty = new Faculty({
      fullName,
      gender,
      email,
      phone,
      password,
      currentAddress,
      permanentAddress,
      qualification,
      experience,
      department,
      teacherId,
      joiningDate
    });

    await newFaculty.save();

    res.status(201).json({ message: "Faculty Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding faculty" });
  }
});


// ================= FACULTY LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if (faculty.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.status(200).json({
      message: "Login Success",
      faculty
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET ALL FACULTY =================
router.get("/all", async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ _id: -1 });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ message: "Error fetching faculty" });
  }
});
// ================= UPDATE FACULTY (NEW) =================
router.put("/update/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Faculty Updated Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update error" });
  }
});
// ================= DELETE FACULTY (NEW) =================
router.delete("/delete/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
});


// ⭐ EXPORT ROUTER
export default router;