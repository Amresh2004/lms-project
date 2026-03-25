import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaBullhorn,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import "../student/style/student.css";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h4 className="logo">ATSS College</h4>

        <ul>

          <li className={location.pathname.includes("/student/dashboard") ? "active" : ""}>
            <Link to="/student/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li className={location.pathname.includes("/student/courses") ? "active" : ""}>
            <Link to="/student/courses">
              <FaUserGraduate /> My Courses
            </Link>
          </li>

          <li className={location.pathname.includes("/student/material") ? "active" : ""}>
            <Link to="/student/material">
              <FaChalkboardTeacher /> Study Material
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/assignments") ? "active" : ""}>
            <Link to="/student/assignments">
              <FaBook /> Assignment
            </Link>
          </li>


          <li className={location.pathname.includes("/faculty/attendance") ? "active" : ""}>
            <Link to="/student/attendance">
              <FaBullhorn /> Attendance
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/grades") ? "active" : ""}>
            <Link to="/student/grades">
              <FaChartBar /> Grades
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/profile") ? "active" : ""}>
            <Link to="/student/profile"> {/* ✅ FIXED */}
              <FaCog /> Profile
            </Link>
          </li>

        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <h5>Welcome Back! {user?.name || "Faculty"}</h5>

          <button onClick={handleLogout} className="logout-btn">
            Logout ⏻
          </button>
        </div>

        {/* CONTENT */}
        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;