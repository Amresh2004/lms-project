import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Assignment",
    required:true
  },
  studentName:{
    type:String,
    required:true
  },
  answerPdf:{
    type:String,
    required:true
  },
  marks:{
    type:Number,
    default:0
  },
  status:{
    type:String,
    default:"Pending"
  }
},{timestamps:true});

export default mongoose.model("Submission",submissionSchema);