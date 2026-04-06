import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: "Error creating assignment" });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Assignment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log("FETCH ERROR:", err);
    res.status(500).json({ message: "Error fetching assignments" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: "Error deleting assignment" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Error updating assignment" });
  }
});

export default router;