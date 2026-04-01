import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    date: "",
    status: "Present",
  });
  const [editId, setEditId] = useState(null);

  const [students, setStudents] = useState([]);

  // Load data
  const API = "http://localhost:5000/api/attendance";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data));
  }, []);
  const fetchData = async () => {
    const res = await axios.get(API);
    setRecords(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentId || !form.subject || !form.date || !form.status) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API}/update/${editId}`, form);
      } else {
        await axios.post(`${API}/add`, form);
      }

      fetchData();

      setForm({ name: "", date: "", status: "Present" });
      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchData();
  };

  // Edit
  const handleEdit = (r) => {
    setForm({
      name: r.name,
      date: r.date,
      status: r.status,
    });
    setEditId(r._id);
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
            <select
              name="studentId"
              className="form-select"
              value={form.studentId}
              onChange={handleChange}
            >
              <option value="">Select Student</option>

              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="form-control"
              value={form.subject}
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
              <th>Student Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Attendance Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td>{r.studentId?.name}</td>
                <td>{r.subject}</td>
                <td>{r.date}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "Present" ? "bg-success" : "bg-danger"
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
                    onClick={() => handleDelete(r._id)}
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
