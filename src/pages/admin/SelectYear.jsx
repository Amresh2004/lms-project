import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const years = ["First Year", "Second Year", "Third Year"];

export default function SelectYear() {
  const { dept } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container py-4">

      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/admin/view-student")}
      >
        ← Back
      </button>

      <h2 className="text-center mb-4">{dept} - Select Year</h2>

      <div className="row g-4">
        {years.map((year, i) => (
          <div className="col-md-4" key={i}>
            <div
              className="p-4 text-white shadow text-center"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/admin/students/${dept}/${year}`)}
            >
              <h4>{year}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}