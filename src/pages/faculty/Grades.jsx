import React, { useState } from "react";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({
    name: "",
    course: "",
    marks: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Grade Logic
  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "F";
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.course || !form.marks) {
      alert("Fill all fields");
      return;
    }

    const gradeValue = getGrade(Number(form.marks));

    if (editId) {
      const updated = grades.map((g) =>
        g.id === editId
          ? { ...form, id: editId, grade: gradeValue }
          : g
      );
      setGrades(updated);
      setEditId(null);
    } else {
      const newGrade = {
        ...form,
        id: Date.now(),
        grade: gradeValue,
      };
      setGrades([newGrade, ...grades]);
    }

    setForm({ name: "", course: "", marks: "" });
  };

  // Delete
  const handleDelete = (id) => {
    setGrades(grades.filter((g) => g.id !== id));
  };

  // Edit
  const handleEdit = (g) => {
    setForm(g);
    setEditId(g.id);
  };

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">🎓 Grades</h2>
        <p className="text-muted">Manage student grades</p>
      </div>

      {/* FORM */}
      <div className="card p-4 shadow-sm mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                name="course"
                placeholder="Course"
                className="form-control"
                value={form.course}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                name="marks"
                placeholder="Marks"
                className="form-control"
                value={form.marks}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary w-100">
                {editId ? "Update" : "Add"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">Grade Records</h5>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {grades.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No records
                </td>
              </tr>
            )}

            {grades.map((g) => (
              <tr key={g.id}>
                <td>{g.name}</td>
                <td>{g.course}</td>
                <td>{g.marks}</td>
                <td>
                  <span className="badge bg-success">
                    {g.grade}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(g)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(g.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Grade;