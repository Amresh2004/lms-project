import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  message: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Activity", activitySchema);