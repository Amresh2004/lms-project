import Attendance from "../models/Attendance.js";

export const getStudentAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({ studentId: req.params.id })
      .populate("studentId", "name");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};