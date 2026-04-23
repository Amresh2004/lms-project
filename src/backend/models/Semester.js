import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Semester 1, Semester 2
  },
  yearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true,
  },
});

export default mongoose.model("Semester", semesterSchema);