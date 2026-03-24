import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Student() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // ✅ added
    course: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH
  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  // EDIT
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      password: student.password || "", // ✅ added
      course: student.course,
    });

    setEditId(student._id);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });

      fetchStudents();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "http://localhost:5000/api/students";
      let method = "POST";

      if (editId) {
        url = `http://localhost:5000/api/students/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("SUBMIT RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Server error");
        return;
      }

      // RESET
      setForm({ name: "", email: "", password: "", course: "" });
      setEditId(null);
      setShowForm(false);

      fetchStudents();
    } catch (error) {
      console.log("SUBMIT ERROR:", error);
      alert("Server not running or API error");
    }
  };

  return (
    <div className="students-container">
      
      {/* HEADER */}
      <div className="students-header">
        <div>
          <h2>Manage Students</h2>
          <p>View and manage all student records</p>
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Student
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* ✅ PASSWORD FIELD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            required
          />

          <button type="submit" className="add-btn">
            {editId ? "Update" : "Add Student"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.email}</td>
                <td>{s.status || "Active"}</td>

                <td>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleEdit(s)}
                  />

                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(s._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Student;