import express from "express";
import Announcement from "../models/Announcement.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const data = await Announcement.find().sort({ date: -1 });
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {

  const newData = await Announcement.create(req.body);
  res.json(newData);
});
// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;