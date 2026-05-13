import React, { useState, useEffect } from "react";
import axios from "axios";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    course: "",
    marks: "",
  });

  // ================= API =================
  const API = "http://localhost:5000/api/grades";

  // ================= GRADE LOGIC =================
  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 50) return "B";
    if (marks >= 35) return "C";
    return "F";
  };

  // ================= LOAD STUDENTS =================
  useEffect(() => {
    fetchStudents();
    fetchGrades();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students/all"
      );

      setStudents(res.data);
    } catch (err) {
      console.log("Student Fetch Error:", err);
    }
  };

  // ================= LOAD GRADES =================
  const fetchGrades = async () => {
    try {
      const res = await axios.get(API);

      setGrades(res.data);
    } catch (err) {
      console.log("Grade Fetch Error:", err);
    }
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= EDIT =================
  const handleEdit = (g) => {
    setForm({
      studentId: g.studentId?._id || "",
      course: g.course || "",
      marks: g.marks || "",
    });

    setEditId(g._id);
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentId || !form.course || !form.marks) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        ...form,
        marks: Number(form.marks),
        grade: getGrade(Number(form.marks)),
      };

      if (editId) {
        // UPDATE
        await axios.put(`${API}/update/${editId}`, payload);

        alert("Grade updated successfully ✅");
      } else {
        // ADD
        await axios.post(`${API}/add`, payload);

        alert("Grade added successfully ✅");
      }

      // RESET FORM
      setForm({
        studentId: "",
        course: "",
        marks: "",
      });

      setEditId(null);

      fetchGrades();
    } catch (err) {
      console.log("Submit Error:", err);
      alert("Something went wrong");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);

      alert("Grade deleted successfully ❌");

      fetchGrades();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h2 className="fw-bold">🎓 Grades</h2>

        <p className="text-muted">
          Manage student grades
        </p>
      </div>

      {/* ================= FORM ================= */}
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
                required
              >
                <option value="">
                  Select Student
                </option>

                {students.map((s) => (
                  <option
                    key={s._id}
                    value={s._id}
                  >
                    {s.fullName || s.name}
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
                required
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
                min="0"
                max="100"
                required
              />
            </div>

            {/* BUTTON */}
            <div className="col-md-3">
              <button
                type="submit"
                className={`btn w-100 ${
                  editId
                    ? "btn-warning"
                    : "btn-primary"
                }`}
              >
                {editId ? "Update Grade" : "Add Grade"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">
          Grade Records
        </h5>

        <div className="table-responsive">
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
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No grade records found
                  </td>
                </tr>
              ) : (
                grades.map((g) => (
                  <tr key={g._id}>
                    
                    {/* STUDENT NAME */}
                    <td>
                      {g.studentId?.fullName ||
                        g.studentId?.name ||
                        "N/A"}
                    </td>

                    {/* COURSE */}
                    <td>{g.course}</td>

                    {/* MARKS */}
                    <td>{g.marks}</td>

                    {/* GRADE */}
                    <td>
                      <span
                        className={`badge ${
                          g.grade === "A+" ||
                          g.grade === "A"
                            ? "bg-success"
                            : g.grade === "B"
                            ? "bg-primary"
                            : g.grade === "C"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {g.grade}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(g)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(g._id)
                        }
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
    </div>
  );
};

export default Grade;