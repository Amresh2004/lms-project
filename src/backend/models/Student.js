import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // ✅ must exist
  course: String,
  status: {
    type: String,
    default: "Active"
  }
});


export default mongoose.model("Student", studentSchema);
