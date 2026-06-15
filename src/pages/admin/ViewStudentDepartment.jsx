import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLaptopCode,
  FaFlask,
  FaChartLine,
  FaDatabase,
} from "react-icons/fa";

const courses = [
  { name: "BCA", icon: <FaLaptopCode />, color: "#3b82f6" },
  { name: "BBA", icon: <FaChartLine />, color: "#14b8a6" },
  { name: "BBA (CA)", icon: <FaLaptopCode />, color: "#06b6d4" },
  { name: "BCom (BM)", icon: <FaChartLine />, color: "#f97316" },
  { name: "BCom (CA)", icon: <FaChartLine />, color: "#f59e0b" },
  { name: "BSc (CS)", icon: <FaFlask />, color: "#10b981" },
  { name: "BSc (AI & ML)", icon: <FaDatabase />, color: "#0ea5e9" },
  { name: "MSc (CS)", icon: <FaDatabase />, color: "#8b5cf6" },
  { name: "MSc (DS)", icon: <FaDatabase />, color: "#6366f1" },
];

export default function ViewStudentDepartment() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">
        Select Course
      </h2>

      <div className="row g-4">
        {courses.map((course) => (
          <div className="col-md-4" key={course.name}>
            <div
              className="p-4 text-white shadow"
              style={{
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${course.color}, #00000020)`,
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/admin/view-student/${encodeURIComponent(course.name)}`)
              }
            >
              <div style={{ fontSize: "30px" }}>{course.icon}</div>
              <h4 className="mt-3">{course.name}</h4>
              <p>Select Year</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}