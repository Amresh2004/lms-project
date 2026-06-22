import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    courseInterested: {
      type: String,
      required: true,
    },

    yearOfAdmission: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Interested",
        "Not Interested",
        "Converted",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Enquiry",
  enquirySchema
);