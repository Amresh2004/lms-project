// import React from 'react'

// export default function Grades() {
//   return (
//     <div>Grades</div>
//   )
// }
// ✅ NOTE: This page is for students to view their grades. It fetches grade data from the backend and displays it in a table along with summary cards.
import React, { useEffect, useState } from "react";
import axios from "axios";

const Grade = () => {
  const [grades, setGrades] = useState([]);

  const studentId = localStorage.getItem("studentId");

  const API = "http://localhost:5000/api/grades/student";

  useEffect(() => {
    if (studentId) {
      fetchGrades();
    }
  }, [studentId]);

  const fetchGrades = async () => {
    try {
      const res = await axios.get(`${API}/${studentId}`);
      setGrades(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h3 className="fw-bold">My Grades</h3>
      <p className="text-muted">View your performance</p>

      {/* SUMMARY */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Total Subjects</h6>
            <h4>{grades.length}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Average Marks</h6>
            <h4>
              {grades.length > 0
                ? (
                    grades.reduce((acc, g) => acc + g.marks, 0) /
                    grades.length
                  ).toFixed(2)
                : 0}
            </h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h6>Top Grade</h6>
            <h4>
              {grades.length > 0
                ? grades.reduce((a, b) =>
                    a.marks > b.marks ? a : b
                  ).grade
                : "-"}
            </h4>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">Grade Records</h5>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {grades.length > 0 ? (
              grades.map((g) => (
                <tr key={g._id}>
                  <td>{g.course}</td>
                  <td>{g.marks}</td>
                  <td>
                    <span className="badge bg-success">
                      {g.grade}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No grades found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grade;