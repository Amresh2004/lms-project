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