import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  code: String,
  name: String,
  type: String, // Theory / Practical

  th: Number, // Theory hours
  pr: Number, // Practical hours

  internalMarks: Number,
  externalMarks: Number,

  credits: Number,

  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
  },
});

export default mongoose.model("Subject", subjectSchema);