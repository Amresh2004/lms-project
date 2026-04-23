import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  course: String,
  year: String,
  rollNo: String,
  admissionDate: Date,
  address: String,
  status: {
    type: String,
    default: "Active"
  },
  courses: [
  {
    title: String,
    code: String,
    faculty: String,
    semester: String,
    progress: Number
  }
]
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);