import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function SubmitAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const submitAssignment = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    const studentName = localStorage.getItem("studentName");

    fd.append("assignmentId", id);
    fd.append("studentName", studentName);
    fd.append("answerPdf", file);

  
    await axios.post("http://localhost:5000/api/submissions", fd);

    // success message box  show
    setSuccessMsg("Assignment submitted successfully 🎉");

    // 2.5 sec after redirect

   
    setSuccessMsg("Assignment submitted successfully 🎉");

    setTimeout(() => {
      navigate("/student/assignments");
    }, 2500);
      };

  return (
    <div className="container mt-5" style={{maxWidth:"600px"}}>
      {/* 9 */}
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
      <h3 className="mb-4">Upload Assignment</h3>

      <div className="card shadow p-4">
        <form onSubmit={submitAssignment}>

          <label className="fw-bold">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control mb-4"
            onChange={(e)=>setFile(e.target.files[0])}
            required
          />

          <button
            className="btn w-100 text-white"
            style={{
              background:"linear-gradient(90deg,#2f80ed,#bb6bd9)",
              padding:"12px",
              borderRadius:"25px"
            }}
          >
            Submit Assignment
          </button>
          
        </form>
        {/* 9 */}
        <style>
{`
@keyframes fadeIn {
  from {opacity:0; transform:translateY(-10px);}
  to {opacity:1; transform:translateY(0);}
}
`}
</style>
      </div>
    </div>
  );
}

export default SubmitAssignment;