import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    // Simple check (for now)
    if (user.password !== password) {
      return res.json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};