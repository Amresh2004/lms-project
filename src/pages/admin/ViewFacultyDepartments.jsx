import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode, FaFlask, FaChartLine, FaDatabase } from "react-icons/fa";

const departments = [
  {
    name: "Computer Science Department",
    shortName: "CS",
    icon: <FaLaptopCode />,
    color: "#3b82f6",
  },
  {
    name: "Business Management Department",
    shortName: "BM",
    icon: <FaChartLine />,
    color: "#14b8a6",
  },
  {
    name: "Artificial Intelligence & Machine Learning",
    shortName: "AI & ML",
    icon: <FaDatabase />,
    color: "#0ea5e9",
  },
  {
    name: "Commerce Department",
    shortName: "Commerce",
    icon: <FaChartLine />,
    color: "#f59e0b",
  },
  {
    name: "Postgraduate Studies",
    shortName: "PG",
    icon: <FaFlask />,
    color: "#8b5cf6",
  },
];

export default function ViewFacultyDepartments() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">

      {/* BACK BUTTON */}
    <button
  className="btn d-flex align-items-center gap-2 shadow-sm mb-4"
  style={{
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 18px",
    fontWeight: "500",
    transition: "0.3s"
  }}
  onClick={() => navigate("/admin/manage-faculty")}
  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
>
  ← Back to Manage Faculty
</button>

      <h2 className="fw-bold mb-4 text-center">Faculty Departments</h2>

      <div className="row g-4">
        {departments.map((dept, i) => (
          <div className="col-md-4" key={i}>
            <div
              className="p-4 text-white shadow"
              style={{
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${dept.color}, #00000020)`,
                cursor: "pointer",
                transition: "0.3s",
                height: "150px"
              }}
             onClick={() =>
  navigate(
    `/admin/view-faculty/${encodeURIComponent(dept.shortName)}`
  )
}
            >
              <div style={{ fontSize: "30px" }}>{dept.icon}</div>
              <h4 className="mt-3">{dept.shortName}</h4>

<p
  style={{
    fontSize: "14px",
    opacity: "0.9",
    minHeight: "40px",
  }}
>
  {dept.name}
</p>
              <p>View Faculty</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}