import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    course: String,
    subject: String,
    title: String,
    assignmentType: String,
    startDate: Date,
    endDate: Date,
    questionPdf: String,
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;