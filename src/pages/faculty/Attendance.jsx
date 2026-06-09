import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
const [selectedCourse, setSelectedCourse] = useState("");
const [recordYear, setRecordYear] = useState("");
const [recordCourse, setRecordCourse] = useState("");
const [recordDate, setRecordDate] = useState("");

  const API = "http://localhost:5000/api/attendance";

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students/all"
      );

      console.log("Students Data:", res.data);

      setStudents(res.data || []);
    } catch (err) {
      console.log("Student Fetch Error:", err);
    }
  };

  // ================= FETCH ATTENDANCE =================
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(API);
      setRecords(res.data || []);
    } catch (err) {
      console.log("Attendance Fetch Error:", err);
    }
  };

  // ================= HANDLE STATUS =================
  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // ================= SAVE ATTENDANCE =================
  const saveAttendance = async () => {
    if (!subject.trim()) {
      alert("Please enter subject");
      return;
    }

    if (!date) {
      alert("Please select date");
      return;
    }

    try {
      const attendanceData = filteredStudents.map((student) => ({
        studentId: student._id,
        subject,
        date,
        status: attendance[student._id] || "Present",
      }));

      await axios.post(`${API}/bulk`, {
        records: attendanceData,
      });

      alert("Attendance Saved Successfully ✅");

      setAttendance({});
      setSubject("");
      setDate("");

      fetchAttendance();
    } catch (err) {
      console.log("Save Error:", err);
      alert("Error saving attendance");
    }
  };
const filteredStudents = students.filter(
  (student) =>
    student.year === selectedYear &&
    student.course === selectedCourse
);

const courses = [
  ...new Set(
    students
      .filter((student) => student.year === selectedYear)
      .map((student) => student.course)
  ),
];
const filteredRecords = records.filter((record) => {
  const yearMatch =
    !recordYear ||
    record.studentId?.year === recordYear;

  const courseMatch =
    !recordCourse ||
    record.studentId?.course === recordCourse;

  const dateMatch =
    !recordDate ||
    record.date === recordDate;

  return yearMatch && courseMatch && dateMatch;
});
  return (
    
    <div className="container-fluid">

      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Attendance Management</h3>
        <p className="text-muted">
          Mark attendance for all students
        </p>
      </div>
      <div className="card shadow-sm p-4 mb-4">
  <h5 className="fw-bold mb-3">Select Year</h5>

  <div className="d-flex gap-2 flex-wrap mb-3">
    {["First Year", "Second Year", "Third Year"].map((year) => (
      <button
        key={year}
        type="button"
        className={`btn ${
          selectedYear === year
            ? "btn-primary"
            : "btn-outline-primary"
        }`}
        onClick={() => {
          setSelectedYear(year);
          setSelectedCourse("");
        }}
      >
        {year}
      </button>
    ))}
  </div>

  {selectedYear && (
    <>
      <h5 className="fw-bold mb-3">Select Course</h5>

      <div className="d-flex gap-2 flex-wrap">
        {courses.map((course) => (
          <button
            key={course}
            type="button"
            className={`btn ${
              selectedCourse === course
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setSelectedCourse(course)}
          >
            {course}
          </button>
        ))}
      </div>
    </>
  )}
</div>

      {/* Subject & Date */}
      <div className="card shadow-sm p-4 mb-4">
        <div className="row g-3">

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-success w-100"
              onClick={saveAttendance}
            >
              Save Attendance
            </button>
          </div>

        </div>
      </div>

      {/* Student Attendance */}
{selectedYear && selectedCourse && (
<div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">
          Mark Student Attendance
        </h5>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">

            <thead className="table-light">
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

             {!selectedYear || !selectedCourse ? (
  <tr>
    <td colSpan="5" className="text-center">
      Please Select Year And Course
    </td>
  </tr>
) : filteredStudents.length === 0 ? (
  <tr>
    <td colSpan="5" className="text-center">
      No Students Found
    </td>
  </tr>
) : (
  filteredStudents.map((student) => (
                  <tr key={student._id}>

                    <td>{student.rollNo || "-"}</td>

                    <td>
                      {student.fullName ||
                        student.name ||
                        student.studentName ||
                        "No Name"}
                    </td>

                    <td>{student.course || "-"}</td>

                    <td>{student.year || "-"}</td>

                    <td>
                      <select
                        className="form-select"
                        value={
                          attendance[student._id] ||
                          "Present"
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            student._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Present">
                          Present
                        </option>

                        <option value="Absent">
                          Absent
                        </option>
                      </select>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>
)}
<div className="row mb-3">

  <div className="col-md-4">
    <select
      className="form-select"
      value={recordYear}
      onChange={(e) => {
        setRecordYear(e.target.value);
        setRecordCourse("");
      }}
    >
      <option value="">Select Year</option>
      <option value="First Year">First Year</option>
      <option value="Second Year">Second Year</option>
      <option value="Third Year">Third Year</option>
    </select>
  </div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={recordCourse}
      onChange={(e) => setRecordCourse(e.target.value)}
    >
      <option value="">Select Course</option>

      {[
        ...new Set(
          records
            .filter(
              (r) =>
                !recordYear ||
                r.studentId?.year === recordYear
            )
            .map((r) => r.studentId?.course)
        ),
      ].map((course) => (
        <option key={course} value={course}>
          {course}
        </option>
      ))}
    </select>
  </div>

  <div className="col-md-4">
    <input
      type="date"
      className="form-control"
      value={recordDate}
      onChange={(e) => setRecordDate(e.target.value)}
    />
  </div>

</div>
      {/* Attendance History */}
      <div className="card shadow-sm p-4">

        <h5 className="fw-bold mb-3">
          Attendance Records
        </h5>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">

            <thead className="table-light">
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No Records Found
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record._id}>

                    <td>
                      {record.studentId?.fullName ||
                        record.studentId?.name ||
                        "N/A"}
                    </td>

                    <td>{record.subject}</td>

                    <td>{record.date}</td>

                    <td>
                      <span
                        className={`badge ${
                          record.status === "Present"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Attendance;