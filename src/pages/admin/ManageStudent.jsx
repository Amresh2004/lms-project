import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserGraduate } from "react-icons/fa";

export default function ManageStudent() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", paddingTop: "40px" }}>
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Student Management</h2>
          <p className="text-muted">Manage your students easily</p>
        </div>

        <div className="row justify-content-center g-4">

          {/* Add Student */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card border-0 text-center p-5"
              style={{
                borderRadius: "40px",
                cursor: "pointer",
                transition: "0.35s",
                boxShadow: "0 20px 60px rgba(0,0,0,0.10)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 30px 70px rgba(99,102,241,0.30)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.10)";
              }}
              onClick={() => navigate("/admin/student/add")}
            >
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "95px",
                  height: "95px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "white",
                  fontSize: "38px",
                  boxShadow: "0 15px 35px rgba(99,102,241,0.35)"
                }}
              >
                <FaUserPlus />
              </div>

              <h3 className="fw-bold">Add Student</h3>
              <p className="text-muted mb-0">Register new students</p>
            </div>
          </div>

          {/* View Students */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card border-0 text-center p-5"
              style={{
                borderRadius: "40px",
                cursor: "pointer",
                transition: "0.35s",
                boxShadow: "0 20px 60px rgba(0,0,0,0.10)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 30px 70px rgba(16,185,129,0.30)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.10)";
              }}
              onClick={() => navigate("/admin/view-student")}
            >
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "95px",
                  height: "95px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#10b981,#06b6d4)",
                  color: "white",
                  fontSize: "38px",
                  boxShadow: "0 15px 35px rgba(16,185,129,0.35)"
                }}
              >
                <FaUserGraduate />
              </div>

              <h3 className="fw-bold">View Students</h3>
              <p className="text-muted mb-0">Course & year wise student list</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}