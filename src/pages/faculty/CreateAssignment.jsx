import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAssignment() {
  const [form, setForm] = useState({});
  const [startDate, setStartDate] = useState("");
  //9
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // 👉 today's date (past block)
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    Object.keys(form).forEach(k => fd.append(k, form[k]));
    await axios.post("http://localhost:5000/api/assignments", fd);

    // 🎉 Show success box
    setSuccessMsg("Assignment created successfully 🎉");

    // form reset
    setForm({});
    setStartDate("");

    // auto redirect after 2.5 sec
    setTimeout(() => {
      navigate("/faculty/assignments");
    }, 2500);
      };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
     {/* //9 */}
     {successMsg && (
  <div
    className="alert alert-success shadow text-center fw-bold"
    style={{
      borderRadius: "15px",
      fontSize: "18px",
      animation: "fadeIn 0.5s"
    }}
  >
    ✅ {successMsg}
  </div>
)} 
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create Assignment</h2>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/faculty/assignments")}
        >
          ← Back
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow p-4">

        <form onSubmit={handleSubmit}>

          {/* SUBJECT */}
          <label className="fw-bold">Subject</label>
          <input
            className="form-control mb-3"
            placeholder="Enter subject name"
            onChange={e=>setForm({...form,subject:e.target.value})}
            required
          />

          {/* TITLE */}
          <label className="fw-bold">Assignment Title</label>
          <input
            className="form-control mb-3"
            placeholder="Enter assignment title"
            onChange={e=>setForm({...form,title:e.target.value})}
            required
          />

          {/* DATES */}
          <div className="row">
            <div className="col">
              <label className="fw-bold">Start Date</label>
              <input
                type="date"
                min={today}  // ❌ past date blocked
                className="form-control mb-3"
                onChange={(e)=>{
                  setStartDate(e.target.value);
                  setForm({...form,startDate:e.target.value});
                }}
                required
              />
            </div>

            <div className="col">
              <label className="fw-bold">End Date</label>
              <input
                type="date"
                min={startDate} // ❌ end before start blocked
                className="form-control mb-3"
                onChange={e=>setForm({...form,endDate:e.target.value})}
                required
              />
            </div>
          </div>

          {/* PDF */}
          <label className="fw-bold">Upload Question PDF</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control mb-4"
            onChange={e=>setForm({...form,questionPdf:e.target.files[0]})}
            required
          />

          {/* BUTTON */}
          <button
            className="btn w-100 text-white"
            style={{
              background: "linear-gradient(90deg,#8e2de2,#ff0080)",
              padding: "12px",
              borderRadius: "30px",
              fontSize: "18px"
            }}
          >
            Create Assignment
          </button>
          {/* 9 */}
            <style>
{`
@keyframes fadeIn {
  from {opacity:0; transform:translateY(-10px);}
  to {opacity:1; transform:translateY(0);}
}
`}
</style>
        </form>
      </div>
    </div>
    
  );
}

export default CreateAssignment;