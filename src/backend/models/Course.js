const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  teacher: String, // faculty id
  students: [String], // array of student ids
});

module.exports = mongoose.model("Course", courseSchema);