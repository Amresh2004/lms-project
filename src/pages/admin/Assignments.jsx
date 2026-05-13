import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook } from "react-icons/fa";

export default function Assignment() {
  const [data, setData] = useState([]);

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/submissions/structured")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ STRUCTURE DATA
  const structuredData = data.reduce((acc, item) => {
    const dept =
      item?.assignmentId?.subject?.semester?.year?.departmentId?.name ||
      "Unknown Department";

    const year =
      item?.assignmentId?.subject?.semester?.year?.name || "Unknown Year";

    const sem =
      item?.assignmentId?.subject?.semester?.name || "Unknown Sem";

    const subject =
      item?.assignmentId?.subject?.name || "Unknown Subject";

    if (!acc[dept]) acc[dept] = {};
    if (!acc[dept][year]) acc[dept][year] = {};
    if (!acc[dept][year][sem]) acc[dept][year][sem] = {};
    if (!acc[dept][year][sem][subject])
      acc[dept][year][sem][subject] = [];

    acc[dept][year][sem][subject].push(item);

    return acc;
  }, {});

  // ================= UI =================

  return (
    <div className="container p-4">
      <h3 className="fw-bold text-center mb-4">
        📊 Assignment Dashboard
      </h3>

      {/* ================= DEPARTMENTS ================= */}
      {!selectedDept && (
        <div className="row g-4">
          {Object.keys(structuredData).map((dept, index) => (
            <div key={index} className="col-md-3">
              <div
                className="course-card"
                onClick={() => setSelectedDept(dept)}
              >
                <FaBook className="icon" />
                <h5>{dept}</h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= YEARS ================= */}
      {selectedDept && !selectedYear && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedDept(null)}
          >
            ← Back
          </button>

          <h4>{selectedDept}</h4>

          <div className="row g-3 mt-2">
            {Object.keys(structuredData[selectedDept]).map((year) => (
              <div key={year} className="col-md-3">
                <div
                  className="semester-card"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= SEMESTERS ================= */}
      {selectedYear && !selectedSem && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedYear(null)}
          >
            ← Back
          </button>

          <h4>{selectedYear}</h4>

          <div className="row g-3 mt-2">
            {Object.keys(
              structuredData[selectedDept][selectedYear]
            ).map((sem) => (
              <div key={sem} className="col-md-3">
                <div
                  className="semester-card"
                  onClick={() => setSelectedSem(sem)}
                >
                  {sem}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= SUBJECT + ASSIGNMENTS ================= */}
      {selectedSem && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedSem(null)}
          >
            ← Back
          </button>

          <h4>{selectedSem}</h4>

          {Object.entries(
            structuredData[selectedDept][selectedYear][selectedSem]
          ).map(([subject, records]) => (
            <div key={subject} className="card mb-3 shadow-sm">

              {/* SUBJECT HEADER */}
              <div className="card-header bg-light fw-bold">
                📚 {subject}
              </div>

              {/* ASSIGNMENTS */}
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Student</th>
                      <th>Assignment</th>
                      <th>Marks</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((r) => (
                      <tr key={r._id}>
                        <td>{r.studentName}</td>
                        <td>{r.assignmentId?.title}</td>
                        <td>{r.marks || "Not Given"}</td>
                        <td>
                          {r.status === "Checked" ? (
                            <span className="badge bg-success">
                              Checked
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ))}
        </>
      )}
    </div>
  );
}