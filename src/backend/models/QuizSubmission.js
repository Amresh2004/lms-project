import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  quizId: String,

  answers: [
    {
      question: String,
      selected: String,
      correct: String,
    }
  ],

  score: Number,
  status: {
    type: String,
    default: "Submitted"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("QuizSubmission", submissionSchema);