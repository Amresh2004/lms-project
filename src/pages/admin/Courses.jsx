import React, { useState, useEffect } from "react";
import "../admin/style/courses.css";
import { FaEdit, FaTrash, FaBook } from "react-icons/fa";

function Courses() {

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("departments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  // ✅ SHORT NAME FUNCTION
  const getShortName = (name) => {
    if (name.includes("BBA(CA)")) return "BBA(CA)";
    if (name.includes("BBA")) return "BBA";
    if (name.includes("BSC(CS)")) return "BSc(CS)";
    if (name.includes("BSC(AI&ML)")) return "BSc(AI&ML)";
    if (name.includes("BCOM(CA)")) return "BCom(CA)";
    if (name.includes("BCOM(BM)")) return "BCom(BM)";
    if (name.includes("M.Sc CS")) return "MSc(CS)";
    if (name.includes("M.Sc DS")) return "MSc(DS)";
    return name;
  };

  return (
    <div className="container p-4">

      <h2 className="mb-4 fw-bold">Courses</h2>

      {/* 🔷 COURSE CARDS */}
      {!selectedDept && (
        <div className="row g-4">
          {departments.map((dept, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">

              <div
                className={`course-card ${activeCourse === dept.name ? "active" : ""}`}
                onClick={() => {
                  setActiveCourse(dept.name);
                  setSelectedDept(dept);
                }}
              >
                <FaBook className="icon" />
                <h5 title={dept.name}>
                  {getShortName(dept.name)}
                </h5>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 🔙 SEMESTERS */}
      {selectedDept && !selectedSem && (
        <>
          <button className="btn btn-light mb-3" onClick={() => setSelectedDept(null)}>
            ← Back
          </button>

          <div className="row g-3">
            {selectedDept.semesters.map((sem, i) => (
              <div key={i} className="col-md-2 col-sm-4">

                <div
                  className="semester-card"
                  onClick={() => setSelectedSem(sem)}
                >
                  Sem {sem.sem}
                </div>

              </div>
            ))}
          </div>
        </>
      )}

      {/* 📚 SUBJECT TABLE */}
      {selectedSem && (
        <>
          <button className="btn btn-light mb-3" onClick={() => setSelectedSem(null)}>
            ← Back
          </button>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Faculty</th>
                <th>Students</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {selectedSem.subjects.map((sub, i) => (
                <tr key={i}>
                  <td>{sub.name} ({sub.code})</td>
                  <td>{sub.faculty}</td>
                  <td>{sub.students}</td>
                  <td>
                    <FaEdit style={{ cursor: "pointer" }} />
                    <FaTrash style={{ cursor: "pointer", marginLeft: 10 }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Courses;