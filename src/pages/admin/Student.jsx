import React, { useEffect, useState } from "react";
import {
  FaLaptopCode,
  FaChartLine,
  FaDatabase,
  FaFlask,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import "../admin/style/admin.css";

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
  "MSc (CS)": ["First Year", "Second Year"],
};

function CourseSystem() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null); // ✅ FIXED

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // FETCH
  const fetchStudents = async () => {
    const res = await fetch(
      `http://localhost:5000/api/students/filter?course=${selectedCourse}&year=${selectedYear}`
    );
    const data = await res.json();

    if (data.success) {
      setStudents(data.students);
    }
  };

  useEffect(() => {
    if (selectedCourse && selectedYear) fetchStudents();
  }, [selectedCourse, selectedYear]);

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const url = editId
      ? `http://localhost:5000/api/students/${editId}`
      : "http://localhost:5000/api/students";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
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
    setEditId(null);

    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });

    fetchStudents();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  // EDIT
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      password: student.password,
      phone: student.phone,
      address: student.address,
    });

    setEditId(student._id);
    setShowForm(true);
  };

  // SEARCH
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">

      {/* COURSES */}
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

      {/* YEAR */}
      {selectedCourse && !selectedYear && (
        <>
          <div className="d-flex align-items-center gap-3 mb-4">
            <FaArrowLeft onClick={() => setSelectedCourse(null)} />
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
                    textAlign: "center",
                  }}
                  onClick={() => setSelectedYear(y)}
                >
                  <h4>{y}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TABLE */}
      {selectedCourse && selectedYear && (
        <>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex gap-3 align-items-center">
              <FaArrowLeft onClick={() => setSelectedYear(null)} />
              <h4>
                {selectedCourse} - {selectedYear}
              </h4>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForm(true);
                setEditId(null);
              }}
            >
              <FaPlus /> Add Student
            </button>
          </div>

          <input
            className="form-control mb-3"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s, i) => (
                    <tr key={s._id}>
                      <td>{i + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.phone || "Not provided"}</td>
                      <td>{s.address || "Not provided"}</td>
                      <td>{s.course}</td>
                      <td>{s.year}</td>
                      <td>
                        <FaEdit
                          style={{ color: "blue", cursor: "pointer", marginRight: 10 }}
                          onClick={() => handleEdit(s)}
                        />

                        <FaTrash
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleDelete(s._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FORM (UNCHANGED UI) */}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="card p-4 shadow-lg"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "15px",
              animation: "fadeIn 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>
                {editId ? "Edit Student" : "Add Student"} ({selectedCourse} - {selectedYear})
              </h5>

              <button
                className="btn-close"
                onClick={() => setShowForm(false)}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <input className="form-control mb-3" placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input type="email" className="form-control mb-3" placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <input type="password" className="form-control mb-3" placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <input className="form-control mb-3" placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setForm({ ...form, phone: value });
                  }
                }}
                required
              />

              <textarea className="form-control mb-3" placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <input className="form-control mb-3" value={selectedCourse} disabled />
              <input className="form-control mb-3" value={selectedYear} disabled />

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary"
                  onClick={() => setShowForm(false)}>
                  Cancel
                </button>

                <button type="submit" className="btn btn-success">
                  {editId ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSystem;