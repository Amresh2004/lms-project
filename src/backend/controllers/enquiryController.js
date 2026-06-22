import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEnquiryStatus = async (
  req,
  res
) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Enquiry Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};