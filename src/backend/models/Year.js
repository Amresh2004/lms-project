import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // First Year, Second Year, Third Year
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

export default mongoose.model("Year", yearSchema);