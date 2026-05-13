import React, { useState } from "react";
import { FaBook } from "react-icons/fa";

function MyCourses() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const years = [
    { _id: 1, name: "First Year" },
    { _id: 2, name: "Second Year" },
    { _id: 3, name: "Third Year" },
  ];

  const semesters = {
    "First Year": ["Semester 1", "Semester 2"],
    "Second Year": ["Semester 3", "Semester 4"],
    "Third Year": ["Semester 5", "Semester 6"],
  };

  const subjects = {
    "Semester 1": [
      "Programming in C",
      "Mathematics I",
      "Computer Fundamentals",
      "Communication Skills",
    ],

    "Semester 2": [
      "Data Structures",
      "Operating System",
      "DBMS",
      "Web Designing",
    ],

    "Semester 3": [
      "Java Programming",
      "Python",
      "Software Engineering",
      "Computer Networks",
    ],

    "Semester 4": [
      "PHP",
      "Advanced Java",
      "Linux",
      "Cyber Security",
    ],

    "Semester 5": [
      "Machine Learning",
      "Cloud Computing",
      "React JS",
      "Project Work",
    ],

    "Semester 6": [
      "AI",
      "Data Science",
      "Internship",
      "Major Project",
    ],
  };

  return (
    <div className="container-fluid p-4">
      {/* TITLE */}
      <div className="text-center mb-4">
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          📘 My Courses
        </h1>
      </div>

      {/* DEPARTMENT */}
      <h2
        style={{
          marginBottom: "22px",
          fontWeight: "600",
          fontSize: "22px",
          color: "#111827",
        }}
      >
        Department :{" "}
        <span style={{ color: "#2563eb" }}>BCA</span>
      </h2>

      {/* YEARS */}
      {!selectedYear && (
        <div className="row g-3">
          {years.map((year, index) => (
            <div className="col-lg-4 col-md-6" key={year._id}>
              <div
                onClick={() => setSelectedYear(year.name)}
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(135deg,#4f46e5,#9333ea)"
                      : index === 1
                      ? "linear-gradient(135deg,#06b6d4,#3b82f6)"
                      : "linear-gradient(135deg,#f97316,#fb7185)",

                  borderRadius: "18px",
                  padding: "22px",
                  cursor: "pointer",
                  color: "white",
                  height: "165px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    marginBottom: "14px",
                  }}
                >
                  <FaBook />
                </div>

                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "8px",
                  }}
                >
                  {year.name}
                </h2>

                <p
                  style={{
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  View Semesters
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEMESTERS */}
      {selectedYear && !selectedSemester && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedYear(null)}
          >
            ← Back
          </button>

          <h2
            style={{
              marginBottom: "22px",
              fontWeight: "600",
              fontSize: "24px",
              color: "#111827",
            }}
          >
            {selectedYear}
          </h2>

          <div className="row g-3">
            {semesters[selectedYear].map((sem, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div
                  onClick={() => setSelectedSemester(sem)}
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(135deg,#4f46e5,#9333ea)"
                        : "linear-gradient(135deg,#06b6d4,#3b82f6)",

                    borderRadius: "18px",
                    padding: "22px",
                    color: "white",
                    height: "155px",
                    cursor: "pointer",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      marginBottom: "14px",
                    }}
                  >
                    <FaBook />
                  </div>

                  <h2
                    style={{
                      fontWeight: "700",
                      fontSize: "22px",
                      marginBottom: "8px",
                    }}
                  >
                    {sem}
                  </h2>

                  <p
                    style={{
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    View Subjects
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SUBJECTS */}
      {selectedSemester && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedSemester(null)}
          >
            ← Back
          </button>

          <h2
            style={{
              marginBottom: "22px",
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            {selectedSemester}
          </h2>

          {/* CENTERED TABLE */}
          <div className="d-flex justify-content-center">
            <div
              className="card shadow-sm border-0"
              style={{
                width: "75%",
                borderRadius: "18px",
              }}
            >
              <div className="card-body p-4">
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th style={{ width: "120px" }}>Sr No</th>
                      <th>Subject Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {subjects[selectedSemester].map((sub, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{sub}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyCourses;