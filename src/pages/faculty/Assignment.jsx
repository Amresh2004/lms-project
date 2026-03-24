import React, { useState, useEffect } from "react";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    course: "",
    dueDate: "",
    status: "Pending"
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("assignments"));
    if (saved) setAssignments(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  // Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.course || !form.dueDate) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      const updated = assignments.map((a) =>
        a.id === editId ? { ...form, id: editId } : a
      );
      setAssignments(updated);
      setEditId(null);
    } else {
      const newAssignment = {
        ...form,
        id: Date.now()
      };
      setAssignments([...assignments, newAssignment]);
    }

    setForm({ title: "", course: "", dueDate: "", status: "Pending" });
  };

  // Delete
  const handleDelete = (id) => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
  };

  // Edit
  const handleEdit = (a) => {
    setForm(a);
    setEditId(a.id);
  };

  // Filter + Search Logic
  const filteredAssignments = assignments.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.course.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || a.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="container-fluid">

      {/* Heading */}
      <h3 className="fw-bold">Assignments</h3>
      <p className="text-muted">Manage assignments with ease</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
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
            <button className="btn btn-primary w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>

        </div>
      </form>

      {/* Search + Filter */}
      <div className="row mb-3">

        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by title or course..."
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

      {/* Cards */}
      <div className="row g-4">

        {filteredAssignments.length === 0 && (
          <p className="text-muted">No assignments found</p>
        )}

        {filteredAssignments.map((a) => (
          <div className="col-md-4" key={a.id}>

            <div className="card shadow-sm border-0 p-3">

              <h5 className="fw-bold">{a.title}</h5>
              <p className="text-muted mb-1">{a.course}</p>

              <small className="text-danger">
                Due: {a.dueDate}
              </small>

              {/* Status Badge */}
              <div className="mt-2">
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

              {/* Buttons */}
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