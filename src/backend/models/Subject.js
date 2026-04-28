import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
  },
});

export default mongoose.model("Subject", subjectSchema);