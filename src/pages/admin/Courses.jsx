import React, { useState, useEffect } from "react";
import "../admin/style/courses.css";
import { FaBook } from "react-icons/fa";

function Courses() {
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);

  // ✅ FETCH DEPARTMENTS
  useEffect(() => {
    fetch("http://localhost:5000/api/course/departments")
      .then((res) => res.json())
      .then((data) => {
        console.log("DEPARTMENTS:", data);
        setDepartments(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ FETCH YEARS
  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
    setYears([]);
    setSelectedYear(null);
    setSemesters([]);
    setSelectedSem(null);
    setSubjects([]);

    fetch(`http://localhost:5000/api/course/years/${dept._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("YEARS:", data);

        const uniqueYears = [
          ...new Map(data.map((item) => [item.name, item])).values(),
        ];

        setYears(uniqueYears);
      })
      .catch((err) => console.log(err));
  };

  // ✅ FETCH SEMESTERS
  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSemesters([]);
    setSelectedSem(null);
    setSubjects([]);

    fetch(`http://localhost:5000/api/course/semesters/${year._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("SEMESTERS:", data);

        const uniqueSemesters = [
          ...new Map(data.map((item) => [item.name, item])).values(),
        ];

        setSemesters(uniqueSemesters);
      })
      .catch((err) => console.log(err));
  };

  // ✅ FETCH SUBJECTS
  const handleSemClick = (sem) => {
    setSelectedSem(sem);
    setSubjects([]);

    fetch(`http://localhost:5000/api/course/subjects/${sem._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("SUBJECTS:", data);

        const uniqueSubjects = [
          ...new Map(data.map((item) => [item.name, item])).values(),
        ];

        setSubjects(uniqueSubjects);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 fw-bold">Courses</h2>

      {/* 🔷 DEPARTMENTS */}
      {!selectedDept && (
        <div className="row g-4">
          {departments.map((dept) => (
            <div key={dept._id} className="col-md-3">
              <div
                className="course-card"
                onClick={() => handleDeptClick(dept)}
              >
                <FaBook className="icon" />
                <h5>{dept.name}</h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔷 YEARS */}
      {selectedDept && !selectedYear && (
        <>
          <button
            className="btn btn-light mb-3"
            onClick={() => {
              setSelectedDept(null);
              setYears([]);
            }}
          >
            ← Back
          </button>

          <h4>{selectedDept.name}</h4>

          <div className="row">
            {years.map((year) => (
              <div key={year._id} className="col-md-3">
                <div
                  className="semester-card"
                  onClick={() => handleYearClick(year)}
                >
                  {year.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔷 SEMESTERS */}
      {selectedYear && !selectedSem && (
        <>
          <button
            className="btn btn-light mb-3"
            onClick={() => {
              setSelectedYear(null);
              setSemesters([]);
            }}
          >
            ← Back
          </button>

          <h4>{selectedYear.name}</h4>

          <div className="row">
            {semesters.map((sem) => (
              <div key={sem._id} className="col-md-3">
                <div
                  className="semester-card"
                  onClick={() => handleSemClick(sem)}
                >
                  {sem.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔷 SUBJECTS */}
      {selectedSem && (
        <>
          <button
            className="btn btn-light mb-3"
            onClick={() => {
              setSelectedSem(null);
              setSubjects([]);
            }}
          >
            ← Back
          </button>

          <h4>{selectedSem.name}</h4>

          <table className="table">
            <thead>
              <tr>
                <th>Subject Name</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
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