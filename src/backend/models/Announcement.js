import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
  audience: String, // All Students / BCA etc
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Announcement", announcementSchema);