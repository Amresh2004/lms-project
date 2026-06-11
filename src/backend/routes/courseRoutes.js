import express from "express";
import Department from "../models/Department.js";
import Year from "../models/Year.js";
import Semester from "../models/Semester.js";
import Subject from "../models/Subject.js";

const router = express.Router();

// ================= DEPARTMENTS =================

router.get("/departments", async (req, res) => {
  try {
    const data = await Department.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments" });
  }
});

// Full course creation — dept + years + semesters + subjects in one shot
router.post("/departments/add-full", async (req, res) => {
  try {
    const { name, years } = req.body;
    // years = [
    //   { name: "FY", semesters: [
    //     { name: "Semester 1", subjects: ["Math", "Physics"] },
    //     { name: "Semester 2", subjects: ["Chemistry"] }
    //   ]},
    //   ...
    // ]

    // 1. Create Department
    const department = new Department({ name });
    await department.save();

    // 2. Create Years, Semesters, Subjects
    for (const yearData of years) {
      const year = new Year({
        name: yearData.name,
        departmentId: department._id,
      });
      await year.save();

      for (const semData of yearData.semesters) {
        const semester = new Semester({
          name: semData.name,
          yearId: year._id,
        });
        await semester.save();

        for (const subName of semData.subjects) {
          if (subName.trim()) {
            const subject = new Subject({
              name: subName.trim(),
              semester: semester._id,
            });
            await subject.save();
          }
        }
      }
    }

    res.json({ success: true, message: "Course created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cascade delete department → years → semesters → subjects
router.delete("/departments/:id", async (req, res) => {
  try {
    const deptId = req.params.id;

    // 1. Find all years
    const years = await Year.find({ departmentId: deptId });

    for (const year of years) {
      // 2. Find all semesters for this year
      const semesters = await Semester.find({ yearId: year._id });

      for (const sem of semesters) {
        // 3. Delete all subjects in this semester
        await Subject.deleteMany({ semester: sem._id });
      }

      // 4. Delete all semesters in this year
      await Semester.deleteMany({ yearId: year._id });
    }

    // 5. Delete all years
    await Year.deleteMany({ departmentId: deptId });

    // 6. Delete the department
    await Department.findByIdAndDelete(deptId);

    res.json({ success: true, message: "Department and all data deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= YEARS =================

router.get("/years/:departmentId", async (req, res) => {
  try {
    const data = await Year.find({ departmentId: req.params.departmentId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching years" });
  }
});

// ================= SEMESTERS =================

router.get("/semesters/:yearId", async (req, res) => {
  try {
    const data = await Semester.find({ yearId: req.params.yearId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching semesters" });
  }
});

// ================= SUBJECTS =================

router.post("/subjects/add", async (req, res) => {
  try {
    const { name, semesterId } = req.body;
    const subject = new Subject({ name, semester: semesterId });
    await subject.save();
    res.json({ success: true, message: "Subject added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error adding subject" });
  }
});

router.get("/subjects/:semId", async (req, res) => {
  try {
    const subjects = await Subject.find({ semester: req.params.semId });
    res.json(subjects);
  } catch (err) {
    res.status(500).json([]);
  }
});

router.put("/subjects/:id", async (req, res) => {
  try {
    await Subject.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.delete("/subjects/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;