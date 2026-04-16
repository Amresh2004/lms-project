import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // ✅ ADD THESE FIELDS
  rollNumber: String,
  phone: String,
  course: String,
  year: String,
  semester: String,
  address: String,

  status: {
    type: String,
    default: "Active"
  }
});

export default mongoose.model("Student", studentSchema);