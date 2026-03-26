import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  collegeName: String,
  notifications: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false },
  password: String,
});

export default mongoose.model("Settings", settingsSchema);