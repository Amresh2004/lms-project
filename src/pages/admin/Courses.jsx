import React, { useState, useEffect } from "react";
import "../admin/style/courses.css";
import { FaBook } from "react-icons/fa";

function Courses() {
  const gradients = [
    "linear-gradient(135deg,#4f46e5,#7c3aed)",
    "linear-gradient(135deg,#06b6d4,#3b82f6)",
    "linear-gradient(135deg,#f97316,#fb7185)",
    "linear-gradient(135deg,#22c55e,#14b8a6)",
    "linear-gradient(135deg,#9333ea,#ec4899)",
    "linear-gradient(135deg,#0ea5e9,#6366f1)",
  ];
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [editId, setEditId] = useState(null);
  const handleEdit = (sub) => {
    setEditId(sub._id);

    setForm({
      code: sub.code,
      name: sub.name,
      type: sub.type,
      credits: sub.credits,
    });
  };
  const handleAddSubject = async () => {
    const url = editId
      ? `http://localhost:5000/api/course/subjects/${editId}`
      : "http://localhost:5000/api/course/subjects/add";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        semesterId: selectedSem._id,
      }),
    });

    setEditId(null);
    setForm({ code: "", name: "", type: "", credits: "" });

    handleSemClick(selectedSem);
  };
  // ================= FETCH DEPARTMENTS =================
  useEffect(() => {
    fetch("http://localhost:5000/api/course/departments")
      .then((res) => res.json())
      .then((data) => {
        console.log("Departments:", data);
        setDepartments(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= FETCH YEARS =================
  const handleDeptClick = async (dept) => {
    setSelectedDept(dept);
    setSelectedYear(null);
    setSelectedSem(null);

    setYears([]);
    setSemesters([]);
    setSubjects([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/course/years/${dept._id}`,
      );

      const data = await res.json();

      console.log("Years:", data);

      const uniqueYears = [
        ...new Map(data.map((item) => [item.name, item])).values(),
      ];

      const yearOrder = {
        FY: 1,
        "First Year": 1,

        SY: 2,
        "Second Year": 2,

        TY: 3,
        "Third Year": 3,

        "Masters First Year": 4,
        "MSc First Year": 4,

        "Masters Second Year": 5,
        "MSc Second Year": 5,
      };

      const sortedYears = uniqueYears.sort(
        (a, b) => (yearOrder[a.name] || 999) - (yearOrder[b.name] || 999),
      );

      setYears(sortedYears);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH SEMESTERS =================
  const handleYearClick = async (year) => {
    setSelectedYear(year);
    setSelectedSem(null);

    setSemesters([]);
    setSubjects([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/course/semesters/${year._id}`,
      );

      const data = await res.json();

      console.log("Semesters:", data);

      const uniqueSemesters = [
        ...new Map(data.map((item) => [item.name, item])).values(),
      ];

      const sortedSemesters = uniqueSemesters.sort((a, b) => {
        const semA = parseInt(a.name.replace(/\D/g, ""));
        const semB = parseInt(b.name.replace(/\D/g, ""));
        return semA - semB;
      });

      setSemesters(sortedSemesters);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH SUBJECTS =================
  const handleSemClick = async (sem) => {
    setSelectedSem(sem);
    setSubjects([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/course/subjects/${sem._id}`,
      );

      const data = await res.json();

      console.log("Subjects API Response:", data);

      if (Array.isArray(data)) {
        const uniqueSubjects = [
          ...new Map(data.map((item) => [item.name, item])).values(),
        ];

        setSubjects(uniqueSubjects);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(`http://localhost:5000/api/course/subjects/${id}`, {
      method: "DELETE",
    });

    handleSemClick(selectedSem); // refresh
  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 fw-bold text-center">Courses</h2>

      {/* ================= DEPARTMENTS ================= */}
      {!selectedDept && (
        <div className="row g-4">
          {departments.map((dept, index) => (
            <div key={dept._id} className="col-md-3">
              <div
                className="department-card"
                style={{
                  background: gradients[index % gradients.length],
                }}
                onClick={() => handleDeptClick(dept)}
              >
                <FaBook className="dept-icon" />

                <h4>{dept.name}</h4>

                <p>View Courses</p>
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
            onClick={() => {
              setSelectedDept(null);
              setYears([]);
            }}
          >
            ← Back
          </button>

          <h4>{selectedDept.name}</h4>

          <div className="row g-3 mt-2">
            {years.map((year, index) => (
              <div key={year._id} className="col-md-4">
                <div
                  className="year-card"
                  style={{
                    background: gradients[index % gradients.length],
                  }}
                  onClick={() => handleYearClick(year)}
                >
                  <FaBook className="year-icon" />

                  <h4>{year.name}</h4>

                  <p>View Semesters</p>
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
            onClick={() => {
              setSelectedYear(null);
              setSemesters([]);
            }}
          >
            ← Back
          </button>

          <h4>{selectedYear.name}</h4>

          <div className="row g-3 mt-2">
            {semesters.map((sem, index) => (
              <div key={sem._id} className="col-md-4">
                <div
                  className="sem-card"
                  style={{
                    background: gradients[index % gradients.length],
                  }}
                  onClick={() => handleSemClick(sem)}
                >
                  <FaBook className="sem-icon" />

                  <h4>{sem.name}</h4>

                  <p>View Subjects</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= SUBJECTS ================= */}
      {selectedSem && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => {
              setSelectedSem(null);
              setSubjects([]);
            }}
          >
            ← Back
          </button>

          <h4 className="mb-3">{selectedSem.name} Subjects</h4>

          {/* ✅ ADD SUBJECT BOX (OUTSIDE TABLE) */}
          <div className="card p-3 shadow-sm mb-3">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleAddSubject}>
                Add
              </button>
            </div>
          </div>

          {/* ✅ SUBJECT LIST */}
          <div className="card shadow-sm">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Sr No</th>
                  {/* <th>Code</th> */}
                  <th>Subject</th>
                  {/* <th>Type</th> */}
                  {/* <th>Credits</th> */}
                  <th>Actions</th> {/* ✅ NEW */}
                </tr>
              </thead>

              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((sub, index) => (
                    <tr key={sub._id}>
                      <td>{index + 1}</td>
                      {/* <td>{sub.code}</td> */}
                      <td>{sub.name}</td>
                      {/* <td>{sub.type}</td>
                      <td>{sub.credits}</td> */}

                      {/* ✅ BUTTONS */}
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(sub)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(sub._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No subjects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Courses;
