
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  userId: String,
  course: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);

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
