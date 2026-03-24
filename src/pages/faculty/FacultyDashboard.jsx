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
import "../faculty/style/faculty.css";

function FacultyDashboard() {
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

          <li className={location.pathname.includes("/faculty/dashboard") ? "active" : ""}>
            <Link to="/faculty/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/courses") ? "active" : ""}>
            <Link to="/faculty/courses">
              <FaUserGraduate /> My Courses
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/upload") ? "active" : ""}>
            <Link to="/faculty/upload">
              <FaChalkboardTeacher /> Upload Material
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/assignments") ? "active" : ""}>
            <Link to="/faculty/assignments">
              <FaBook /> Assignment
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/submissions") ? "active" : ""}>
            <Link to="/faculty/submissions">
              <FaClipboardList /> Submissions
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/attendance") ? "active" : ""}>
            <Link to="/faculty/attendance">
              <FaBullhorn /> Attendance
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/grades") ? "active" : ""}>
            <Link to="/faculty/grades">
              <FaChartBar /> Grades
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/announcements") ? "active" : ""}>
            <Link to="/faculty/announcements">
              <FaCog /> Announcements
            </Link>
          </li>

          <li className={location.pathname.includes("/faculty/profile") ? "active" : ""}>
            <Link to="/faculty/profile"> {/* ✅ FIXED */}
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

export default FacultyDashboard;