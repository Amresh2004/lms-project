import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  course: String,
  status: {
    type: String,
    default: "Active"
  }
});

export default mongoose.model("Student", studentSchema);