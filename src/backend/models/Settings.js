import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // Profile
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },

    // System
    collegeName: { type: String, default: "" },
    academicYear: { type: String, default: "" },

    // Notifications
    emailNotif: { type: Boolean, default: true },
    assignmentNotif: { type: Boolean, default: true },

    // Appearance
    darkMode: { type: Boolean, default: false },

    // Security (optional)
    password: { type: String, default: "" }
  },
  { timestamps: true } // optional but good practice
);

export default mongoose.model("Settings", settingsSchema);