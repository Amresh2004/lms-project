import React, { useState, useEffect } from "react";
// import { Pie } from "react-chartjs-2";
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

  // ================= API =================
  const API = "http://localhost:5000/api/attendance";

  // ================= LOAD STUDENTS =================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students/all")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log("Student Fetch Error:", err);
      });
  }, []);

  // ================= LOAD ATTENDANCE =================
  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setRecords(res.data);
    } catch (err) {
      console.log("Attendance Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.studentId ||
      !form.subject ||
      !form.date ||
      !form.status
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API}/update/${editId}`, form);
        alert("Attendance updated ✅");
      } else {
        await axios.post(`${API}/add`, form);
        alert("Attendance added ✅");
      }

      fetchData();

      // RESET FORM
      setForm({
        studentId: "",
        subject: "",
        date: "",
        status: "Present",
      });

      setEditId(null);

    } catch (err) {
      console.log("Submit Error:", err);
      alert("Something went wrong");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);

      alert("Attendance deleted ✅");

      fetchData();

    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (r) => {
    setForm({
      studentId: r.studentId?._id || "",
      subject: r.subject || "",
      date: r.date
        ? new Date(r.date).toISOString().split("T")[0]
        : "",
      status: r.status || "Present",
    });

    setEditId(r._id);
  };

  return (
    <div className="container-fluid">

      <h3 className="fw-bold">Attendance</h3>

      <p className="text-muted">
        Manage student attendance
      </p>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm mb-4"
      >

        <div className="row g-3">

          {/* STUDENT */}
          <div className="col-md-3">
            <select
              name="studentId"
              className="form-select"
              value={form.studentId}
              onChange={handleChange}
            >
              <option value="">
                Select Student
              </option>

              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}
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

          {/* DATE */}
          <div className="col-md-3">
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          {/* STATUS */}
          <div className="col-md-3">
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="col-md-3">
            <button className="btn btn-primary w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>

        </div>
      </form>

      {/* ================= TABLE ================= */}
      <div className="card p-4 shadow-sm">

        <h5 className="fw-bold mb-3">
          Records
        </h5>

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

            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No attendance records
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r._id}>

                  <td>
                    {r.studentId?.name || "N/A"}
                  </td>

                  <td>
                    {r.subject}
                  </td>

                  <td>
                    {r.date
                      ? new Date(r.date).toLocaleDateString()
                      : "N/A"}
                  </td>

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
                      onClick={() => handleDelete(r._id)}
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

export default Attendance;