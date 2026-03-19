import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import "../admin/style/admin.css";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const location = useLocation();

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h4 className="logo">ATSS College</h4>

        <ul>
          <li
            className={location.pathname === "/admin/dashboard" ? "active" : ""}
          >
            <Link to="/admin/dashboard">
              <FaTachometerAlt className="icon" /> Dashboard
            </Link>
          </li>

          <li
            className={location.pathname === "/admin/students" ? "active" : ""}
          >
            <Link to="/admin/students">
              <FaUserGraduate className="icon" /> Manage Students
            </Link>
          </li>

          <li className={location.pathname === "/admin/staff" ? "active" : ""}>
            <Link to="/admin/staff">
              <FaChalkboardTeacher className="icon" /> Manage Staff
            </Link>
          </li>

          <li
            className={location.pathname === "/admin/courses" ? "active" : ""}
          >
            <Link to="/admin/courses">
              <FaBook className="icon" /> Manage Courses
            </Link>
          </li>

          <li
            className={
              location.pathname === "/admin/assignments" ? "active" : ""
            }
          >
            <Link to="/admin/assignments">
              <FaClipboardList className="icon" /> Assignments
            </Link>
          </li>

          <li
            className={
              location.pathname === "/admin/announcements" ? "active" : ""
            }
          >
            <Link to="/admin/announcements">
              <FaBullhorn className="icon" /> Announcements
            </Link>
          </li>

          <li
            className={location.pathname === "/admin/reports" ? "active" : ""}
          >
            <Link to="/admin/reports">
              <FaChartBar className="icon" /> Reports
            </Link>
          </li>

          <li
            className={location.pathname === "/admin/settings" ? "active" : ""}
          >
            <Link to="/admin/settings">
              <FaCog className="icon" /> Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h5>Welcome Back! {user?.name || "Admin"}</h5>

          <button onClick={handleLogout} className="logout-btn">
            Logout ⏻
          </button>
        </div>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
