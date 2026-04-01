import React, { useState } from "react";
import "./style/assignment.css";    

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    course: "",
    dueDate: "",
    status: "Pending",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.course || !form.dueDate) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      setAssignments((prev) =>
        prev.map((a) => (a.id === editId ? { ...form, id: editId } : a))
      );
      setEditId(null);
    } else {
      setAssignments([...assignments, { ...form, id: Date.now() }]);
    }

    setForm({ title: "", course: "", dueDate: "", status: "Pending" });
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const handleEdit = (a) => {
    setForm(a);
    setEditId(a.id);
  };

  const filtered = assignments.filter((a) => {
    return (
      (a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.course.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || a.status === filter)
    );
  });

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">📚 Assignments</h2>
        <p className="text-muted">Manage assignments efficiently</p>
      </div>

      {/* FORM */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                name="title"
                placeholder="Assignment Title"
                className="form-control"
                value={form.title}
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

            <div className="col-md-2">
              <input
                type="date"
                name="dueDate"
                className="form-control"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Submitted</option>
              </select>
            </div>

            <div className="col-md-2">
              <button className="btn btn-gradient w-100">
                {editId ? "Update" : "Add"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* SEARCH + FILTER */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="🔍 Search assignments..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
          </select>
        </div>
      </div>

      {/* CARDS */}
      <div className="row g-4">
        {filtered.length === 0 && (
          <p className="text-muted">No assignments found</p>
        )}

        {filtered.map((a) => (
          <div className="col-md-4" key={a.id}>
            <div className="card assignment-card p-3">

              <div className="d-flex justify-content-between">
                <h5 className="fw-bold">{a.title}</h5>
                <span
                  className={`badge ${
                    a.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <p className="text-muted mb-1">{a.course}</p>

              <small className="text-danger">
                📅 Due: {a.dueDate}
              </small>

              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(a)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Assignment;