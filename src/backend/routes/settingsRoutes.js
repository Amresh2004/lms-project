import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/", async (req, res) => {
  try {
    const updated = await Settings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;