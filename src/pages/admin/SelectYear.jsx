import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

export default function SelectYear() {
  const { dept } = useParams();
  const navigate = useNavigate();

  const years = [
    {
      name: "First Year",
      color: "linear-gradient(135deg,#3b82f6,#6366f1)",
    },
    {
      name: "Second Year",
      color: "linear-gradient(135deg,#10b981,#14b8a6)",
    },
    {
      name: "Third Year",
      color: "linear-gradient(135deg,#f97316,#f59e0b)",
    },
  ];

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <div className="container">
        {/* Back Button */}
        <button
          className="btn shadow-sm mb-4"
          style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "10px 20px",
            fontWeight: "600",
          }}
          onClick={() => navigate("/admin/view-student")}
        >
          ← Back to Courses
        </button>

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">
            {decodeURIComponent(dept)}
          </h2>
          <p className="text-muted">
            Select Academic Year
          </p>
        </div>

        {/* Year Cards */}
        <div className="row justify-content-center g-4">
          {years.map((year, index) => (
            <div className="col-lg-3 col-md-4" key={index}>
              <div
                className="text-center text-white p-5"
                style={{
                  background: year.color,
                  borderRadius: "30px",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px rgba(0,0,0,0.20)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,0.15)";
                }}
                onClick={() =>
                  navigate(
                    `/admin/view-student/${encodeURIComponent(
                      dept
                    )}/${encodeURIComponent(year.name)}`
                  )
                }
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "35px",
                  }}
                >
                  <FaGraduationCap />
                </div>

                <h3 className="fw-bold">{year.name}</h3>

                <p
                  style={{
                    opacity: 0.9,
                    marginBottom: 0,
                  }}
                >
                  View Students
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}