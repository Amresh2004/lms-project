import express from "express";
import upload from "../middleware/upload.js";
import Submission from "../models/Submission.js";

const router = express.Router();

router.get("/structured", async (req, res) => {
  try {
    const data = await Submission.find()
      .populate({
        path: "assignmentId",
        populate: {
          path: "subject",
          populate: {
            path: "semester",
            populate: {
              path: "year",
              populate: {
                path: "departmentId",
              },
            },
          },
        },
      });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
});

// ================= STUDENT SUBMIT =================
router.post("/", upload.single("answerPdf"), async (req,res)=>{
  try{
    const submission = new Submission({
      assignmentId:req.body.assignmentId,
      studentName:req.body.studentName,
      answerPdf:req.file.filename,
      marks:0,
      status:"Pending"
    });

    await submission.save();
    res.json("Assignment Submitted Successfully");

  }catch(err){
    res.status(500).json(err.message);
  }
});


// ================= FACULTY GET =================
router.get("/", async (req,res)=>{
  try{
    const data = await Submission.find()
      .populate("assignmentId")   // ⭐ MAGIC LINE
      .sort({createdAt:-1});

    res.json(data);
  }catch(err){
    res.status(500).json(err.message);
  }
});


// ================= GIVE MARKS =================
router.put("/:id/marks", async (req,res)=>{
  try{
    await Submission.findByIdAndUpdate(req.params.id,{
      marks:req.body.marks,
      status:"Checked"
    });

    res.json("Marks Updated");
  }catch(err){
    res.status(500).json(err.message);
  }
});

export default router;