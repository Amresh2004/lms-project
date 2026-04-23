import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: String,
  subject: String,
  faculty: String,
  course: String,
  year: String,

  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Quiz", quizSchema);