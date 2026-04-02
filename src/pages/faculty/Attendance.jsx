import React, { useState, useEffect } from "react";
// import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    status: "Present"
  });
  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendance"));
    if (saved) setRecords(saved);
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(records));
  }, [records]);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.date) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      const updated = records.map((r) =>
        r.id === editId ? { ...form, id: editId } : r
      );
      setRecords(updated);
      setEditId(null);
    } else {
      setRecords([...records, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", date: "", status: "Present" });
  };

  // Delete
  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  // Edit
  const handleEdit = (r) => {
    setForm(r);
    setEditId(r.id);
  };

  // Chart Data
  // const presentCount = records.filter(r => r.status === "Present").length;
  // const absentCount = records.filter(r => r.status === "Absent").length;

  // const data = {
  //   labels: ["Present", "Absent"],
  //   datasets: [
  //     {
  //       data: [presentCount, absentCount],
  //       backgroundColor: ["#198754", "#dc3545"]
  //     }
  //   ]
  // };

  return (
    <div className="container-fluid">

      <h3 className="fw-bold">Attendance</h3>
      <p className="text-muted">Manage student attendance</p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
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
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>

        </div>
      </form>

      {/* CHART
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="fw-bold mb-3">Attendance Chart</h5>
        <div style={{ maxWidth: "300px" }}>
          <Pie data={data} />
        </div>
      </div> */}

      {/* TABLE */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">Records</h5>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No records
                </td>
              </tr>
            )}

            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "Present"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(r.id)}
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

export default Attendance;