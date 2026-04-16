//15
import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  fullName:String,
  gender:String,
  email:String,
  phone:String,
  password:String,
  currentAddress:String,
  permanentAddress:String,
  qualification:String,
  experience:String,
  department:String,
  teacherId:String,
  joiningDate:String
});

export default mongoose.model("Faculty", FacultySchema);