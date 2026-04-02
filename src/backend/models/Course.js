import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: String,
  faculty: String,
  materials: [
    {
      name: String,
      size: String,
      fileUrl: String
    }
  ],
  attendance: String,
  announcements: [String]
});

export default mongoose.model("Course", courseSchema);