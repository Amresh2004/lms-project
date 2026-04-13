import express from "express";
import upload from "../middleware/upload.js";
import Assignment from "../models/Assignment.js";

const router = express.Router();

router.post("/", upload.single("questionPdf"), async (req, res) => {
  const assignment = new Assignment({
    course: req.body.course,
    subject: req.body.subject,
    title: req.body.title,
    assignmentType: req.body.assignmentType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    questionPdf: req.file.filename
  });

  await assignment.save();
  res.json("Assignment Created");
});



router.get("/", async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

export default router;