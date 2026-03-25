import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Announcements() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    audience: "",
  });

  // FETCH
  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/announcements");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/api/announcements";
    let method = "POST";

    if (editId) {
      url += `/${editId}`;
      method = "PUT";
    }

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", audience: "" });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  return (
    <div className="students-container">
      {/* HEADER */}
      <div className="students-header">
        <div>
          <h2>Announcements</h2>
          <p>Create and manage announcements</p>
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Create Announcement
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="audience"
            placeholder="Audience (All / BCA)"
            value={form.audience}
            onChange={handleChange}
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button className="add-btn">
            {editId ? "Update" : "Add"}
          </button>
        </form>
      )}

      {/* LIST */}
      {data.map((item) => (
        <div key={item._id} className="table-box" style={{ marginBottom: "15px" }}>
          <h4>{item.title}</h4>
          <p>
            📅 {new Date(item.date).toDateString()} | 👥 {item.audience}
          </p>
          <p>{item.description}</p>

          <div>
            <FaEdit
              onClick={() => handleEdit(item)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            />
            <FaTrash
              onClick={() => handleDelete(item._id)}
              style={{ cursor: "pointer", color: "red" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Announcements;