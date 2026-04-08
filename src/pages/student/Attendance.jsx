import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [records, setRecords] = useState([]);

  const studentId = localStorage.getItem("studentId"); // logged-in student
  console.log("Student ID:", studentId); 

  const API = "http://localhost:5000/api/attendance/student";

  useEffect(() => {
    if (studentId) {
      fetchAttendance();
    }
  }, [studentId]);

  const fetchAttendance = async () => {
    try {
      if (!studentId) return;

      const res = await axios.get(`${API}/${studentId}`);
      setRecords(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Calculate stats
  const presentCount = records.filter(r => r.status === "Present").length;
  const absentCount = records.filter(r => r.status === "Absent").length;
  const total = records.length;

  return (
    <div className="container-fluid">
      <h3 className="fw-bold">My Attendance</h3>
      <p className="text-muted">View your attendance records</p>

      {/* SUMMARY */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Total Classes</h6>
            <h4>{total}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Present</h6>
            <h4 className="text-success">{presentCount}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Absent</h6>
            <h4 className="text-danger">{absentCount}</h4>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">Attendance Records</h5>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr key={r._id}>
                  <td>{r.subject}</td>
                  <td>{r.date}</td>
                  <td>
                    <span
                      className={`badge ${r.status === "Present"
                          ? "bg-success"
                          : "bg-danger"
                        }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;