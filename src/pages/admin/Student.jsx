import React, { useEffect, useState } from "react";
import {
  FaLaptopCode,
  FaChartLine,
  FaDatabase,
  FaFlask,
  FaArrowLeft,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const courses = [
  { name: "BCA", icon: <FaLaptopCode />, color: "#3b82f6" },
  { name: "BSc (CS)", icon: <FaFlask />, color: "#10b981" },
  { name: "BCom CA", icon: <FaChartLine />, color: "#f59e0b" },
  { name: "MSc (CS)", icon: <FaDatabase />, color: "#8b5cf6" },
];

const yearOptions = {
  BCA: ["First Year", "Second Year", "Third Year"],
  "BSc (CS)": ["First Year", "Second Year", "Third Year"],
  "BCom CA": ["First Year", "Second Year", "Third Year"],
  "MSc (CS)": ["First Year", "Second Year"], // ✅ FIX
};

function CourseSystem() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔥 FETCH STUDENTS
  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students/filter?course=" + selectedCourse + "&year=" + selectedYear);
    const data = await res.json();

    if (data.success) {
      setStudents(data.students);
    }
  };

  useEffect(() => {
    if (selectedCourse && selectedYear) fetchStudents();
  }, [selectedCourse, selectedYear]);

  // ➕ ADD STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        course: selectedCourse,
        year: selectedYear,
      }),
    });

    setShowForm(false);
    setForm({ name: "", email: "", password: "" });
    fetchStudents();
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  // 🔍 SEARCH
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">

      {/* ================= COURSE MODULES ================= */}
      {!selectedCourse && (
        <>
          <h2 className="fw-bold mb-4">Courses</h2>

          <div className="row g-4">
            {courses.map((course, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="p-4 text-white shadow"
                  style={{
                    borderRadius: "20px",
                    background: `linear-gradient(135deg, ${course.color}, #00000020)`,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => setSelectedCourse(course.name)}
                >
                  <div style={{ fontSize: "30px" }}>{course.icon}</div>
                  <h4 className="mt-3">{course.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= YEAR SELECT ================= */}
{selectedCourse && !selectedYear && (
  <>
    <div className="d-flex align-items-center gap-3 mb-4">
      <FaArrowLeft
        style={{ cursor: "pointer", fontSize: "20px" }}
        onClick={() => setSelectedCourse(null)}
      />
      <h3>{selectedCourse}</h3>
    </div>

    <div className="row g-4">
      {yearOptions[selectedCourse].map((y, i) => (
        <div className="col-md-4" key={i}>
          <div
            className="p-4 text-white shadow"
            style={{
              borderRadius: "20px",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
              transition: "0.3s",
              textAlign: "center",
            }}
            onClick={() => setSelectedYear(y)}
            onMouseEnter={(e) =>
  (e.currentTarget.style.transform = "scale(1.05)")
}
onMouseLeave={(e) =>
  (e.currentTarget.style.transform = "scale(1)")
}
          >
            <h4 className="fw-bold">{y}</h4>
            <p style={{ opacity: 0.8 }}>Click to view students</p>
          </div>
        </div>
      ))}
    </div>
    
  </>
)}
      {/* ================= STUDENTS ================= */}
      {selectedCourse && selectedYear && (
        <>
          {/* HEADER */}
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex gap-3">
              <FaArrowLeft
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedYear(null)}
              />
              <h3>
                {selectedCourse} - {selectedYear}
              </h3>
            </div>

            <button
              className="btn btn-success"
              onClick={() => setShowForm(true)}
            >
              <FaPlus /> Add Student
            </button>
          </div>

          {/* SEARCH */}
          <input
            className="form-control mb-4"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* STUDENT COUNT */}
          <p className="text-muted">
            Total Students: {filteredStudents.length}
          </p>

          {/* LIST */}
          <div className="row">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <div className="col-md-4 mb-3" key={s._id}>
                  <div className="card p-3 shadow-sm">
                    <h5>{s.name}</h5>
                    <p>{s.email}</p>

                    <FaTrash
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(s._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No students found</p>
            )}
          </div>
        </>
      )}

      {/* ================= ADD FORM ================= */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="card p-4"
            style={{ maxWidth: "400px", margin: "100px auto" }}
          >
            <h5>
              Add Student ({selectedCourse} - {selectedYear})
            </h5>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <button className="btn btn-success w-100">
                Add Student
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSystem;