import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    materialType: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },
    facultyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

  },
  { timestamps: true }
);

const Materials = mongoose.model("Materials", materialSchema);

export default Materials;