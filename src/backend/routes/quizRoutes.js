import express from "express";
import Quiz from "../models/Quiz.js";
import QuizSubmission from "../models/QuizSubmission.js";

const router = express.Router();


// 🔥 CREATE QUIZ (FACULTY)
router.post("/create", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();

    res.json({ success: true, message: "Quiz Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 GET QUIZ (STUDENT VIEW)
router.get("/student", async (req, res) => {
  try {
    const { course, year } = req.query;

    const quizzes = await Quiz.find({ course, year });

    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 ADMIN VIEW ALL QUIZ
router.get("/all", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});


// 🔥 SUBMIT QUIZ
router.post("/submit", async (req, res) => {
  try {
    const { answers, quizId, studentId, studentName } = req.body;

    let score = 0;

    answers.forEach((a) => {
      if (a.selected === a.correct) score++;
    });

    const submission = new QuizSubmission({
      quizId,
      studentId,
      studentName,
      answers,
      score,
    });

    await submission.save();

    res.json({
      success: true,
      message: "Quiz Submitted",
      score
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;