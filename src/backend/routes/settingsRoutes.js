import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

// GET settings
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE / UPDATE settings
router.post("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (settings) {
      await Settings.updateOne({}, req.body);
    } else {
      await Settings.create(req.body);
    }

    res.json({ message: "Settings saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;