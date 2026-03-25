import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Faculty() {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    subject: "",
  });

  const [editId, setEditId] = useState(null);

  // ✅ FETCH STAFF
  const fetchStaff = async () => {
    const res = await fetch("http://localhost:5000/api/faculty");
    const data = await res.json();
    setStaff(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ✅ EDIT
  const handleEdit = (s) => {
    setForm({
      name: s.name,
      email: s.email,
      password: s.password || "",
      subject: s.subject,
    });

    setEditId(s._id);
    setShowForm(true);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/faculty/${id}`, {
        method: "DELETE",
      });

      fetchStaff();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT (ADD / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "http://localhost:5000/api/faculty";
      let method = "POST";

      if (editId) {
        url = `http://localhost:5000/api/faculty/${editId}`;
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
      console.log("RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      // RESET
      setForm({ name: "", email: "", password: "", subject: "" });
      setEditId(null);
      setShowForm(false);

      fetchStaff();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="students-container">

      {/* HEADER */}
      <div className="students-header">
        <div>
          <h2>Manage Staff</h2>
          <p>View and manage all staff records</p>
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Staff
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

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <button type="submit" className="add-btn">
            {editId ? "Update Staff" : "Add Staff"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.subject}</td>
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

export default Faculty;