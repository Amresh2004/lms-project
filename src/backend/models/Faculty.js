import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subject: String,
  status: {
    type: String,
    default: "Active"
  }
});

export default mongoose.model("Faculty", facultySchema);