import React, { useState } from "react";

function Courses() {

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);

  const departments = [
    {
      name: "Computer Science",
      subjectsCount: 12,
      semesters: [
        { sem: "I", subjects: [{ name: "Programming in C", faculty: "Dr. Rajesh Kumar", students: 245 }] },
        { sem: "II", subjects: [{ name: "Data Structures", faculty: "Dr. Amit Patel", students: 210 }] },
        { sem: "III", subjects: [{ name: "Web Technologies", faculty: "Dr. Rajesh Kumar", students: 180 }] },
        { sem: "IV", subjects: [{ name: "DBMS", faculty: "Dr. Amit Patel", students: 200 }] },
        { sem: "V", subjects: [{ name: "AI Basics", faculty: "Dr. Mehta", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Machine Learning", faculty: "Dr. Mehta", students: 140 }] },
      ],
    },
    {
      name: "Business Admin",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
  ];

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Manage Courses</h2>
          <p className="text-muted mb-0">Create and manage course offerings</p>
        </div>

        <button
          className="btn text-white px-4"
          style={{
            background: "linear-gradient(90deg, #2563eb, #9333ea)",
            borderRadius: "25px"
          }}
        >
          + Add Course
        </button>
      </div>

      {/* ================= DEPARTMENT TABLE ================= */}
      {!selectedDept && (
        <div className="table-responsive bg-white rounded shadow-sm">

          <table className="table align-middle mb-0">

            <thead style={{
              background: "linear-gradient(90deg, #2563eb, #9333ea)",
              color: "#fff"
            }}>
              <tr>
                <th>Department</th>
                <th>Subjects</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.name}</td>
                  <td>{dept.subjectsCount}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedDept(dept)}
                    >
                      View Subjects →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ================= SEMESTERS ================= */}
      {selectedDept && !selectedSem && (
        <div>

          <button
            className="btn btn-light mb-3"
            onClick={() => setSelectedDept(null)}
          >
            ← Back to Departments
          </button>

          <div className="row g-3">

            {selectedDept.semesters.map((sem, index) => (
              <div key={index} className="col-md-2">
                <div
                  className="card text-center p-3 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedSem(sem)}
                >
                  <h6 className="fw-bold mb-0">Sem {sem.sem}</h6>
                </div>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* ================= SUBJECT TABLE ================= */}
      {selectedSem && (
        <div>

          <button
            className="btn btn-light mb-3"
            onClick={() => setSelectedSem(null)}
          >
            ← Back to Semesters
          </button>

          <div className="table-responsive bg-white rounded shadow-sm">

            <table className="table align-middle mb-0">

              <thead style={{
                background: "linear-gradient(90deg, #2563eb, #9333ea)",
                color: "#fff"
              }}>
                <tr>
                  <th>Course Name</th>
                  <th>Department</th>
                  <th>Faculty Assigned</th>
                  <th>Semester</th>
                  <th>Students</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {selectedSem.subjects.map((sub, index) => (
                  <tr key={index}>
                    <td>{sub.name}</td>
                    <td>{selectedDept.name}</td>
                    <td>{sub.faculty}</td>
                    <td>{selectedSem.sem}</td>
                    <td>{sub.students}</td>
                    <td>
                      <i className="bi bi-pencil text-primary me-3"></i>
                      <i className="bi bi-trash text-danger"></i>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      )}

    </div>
  );
}

export default Courses;