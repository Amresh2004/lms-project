import React, { useState, useEffect } from "react";
import axios from "axios";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    course: "",
    marks: ""
  });

  const API = "http://localhost:5000/api/grades";

  // 🎯 Grade Logic
  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 50) return "B";
    if (marks >= 35) return "C";
    return "F";
  };

  // 🔥 Load Students
  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 Load Grades
  const fetchGrades = async () => {
    try {
      const res = await axios.get(API);
      setGrades(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  // ✏️ Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✏️ Edit
  const handleEdit = (g) => {
    setForm({
      studentId: g.studentId._id,
      course: g.course,
      marks: g.marks
    });
    setEditId(g._id);
  };

  // ➕ ADD / 🔄 UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentId || !form.course || !form.marks) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editId) {
        // 🔄 UPDATE
        await axios.put(`${API}/update/${editId}`, {
          ...form,
          grade: getGrade(Number(form.marks))
        });

        alert("Grade updated ✅");
      } else {
        // ➕ ADD
        await axios.post(`${API}/add`, {
          ...form,
          grade: getGrade(Number(form.marks))
        });

        alert("Grade added ✅");
      }

      // Reset form
      setForm({
        studentId: "",
        course: "",
        marks: ""
      });

      setEditId(null);
      fetchGrades();

    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);
      fetchGrades();
    } catch (err) {
      console.log(err);
    }
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
          <div className="row g-3 align-items-center">

            {/* STUDENT */}
            <div className="col-md-3">
              <select
                name="studentId"
                className="form-select"
                value={form.studentId}
                onChange={handleChange}
              >
                <option value="">Student Name</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* COURSE */}
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

            {/* MARKS */}
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

            {/* BUTTON */}
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

        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No records
                </td>
              </tr>
            ) : (
              grades.map((g) => (
                <tr key={g._id}>
                  <td>{g.studentId?.name}</td>
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
                      onClick={() => handleDelete(g._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Grade;