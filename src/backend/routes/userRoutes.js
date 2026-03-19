import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, course, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      course,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.json({ message: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 STATIC ADMIN LOGIN
    if (email === "admin@atsscollege.edu" && password === "admin123") {
      return res.json({
        message: "Login successful",
        user: {
          name: "Admin",
          email: "admin@atsscollege.edu",
          role: "Admin"
        }
      });
    }

    // ❌ If wrong credentials
    return res.status(400).json({
      message: "Invalid admin credentials"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;