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
import "../admin/style/admin.css";

function AdminDashboard() {
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
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <Link to="/admin/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li className={location.pathname === "/admin/manage-student" ? "active" : ""}>
            <Link to="/admin/manage-student">
              <FaUserGraduate /> Manage Students
            </Link>
          </li>

       
          <li className={location.pathname === "/admin/manage-faculty" ? "active" : ""}>
            <Link to="/admin/manage-faculty">
              <FaChalkboardTeacher /> Manage Faculty 
            </Link>
          </li>

          <li className={location.pathname === "/admin/courses" ? "active" : ""}>
            <Link to="/admin/courses">
              <FaBook /> Manage Courses
            </Link>
          </li>

          <li className={location.pathname === "/admin/assignments" ? "active" : ""}>
            <Link to="/admin/assignments">
              <FaClipboardList /> Assignments
            </Link>
          </li>

          <li className={location.pathname === "/admin/announcements" ? "active" : ""}>
            <Link to="/admin/announcements">
              <FaBullhorn /> Announcements
            </Link>
          </li>
          <li className={location.pathname === "/admin/enquiries" ? "active" : ""}>
            <Link to="/admin/enquiries">
              <FaBullhorn /> Admission Enquiries
            </Link>
          </li>

          <li className={location.pathname === "/admin/reports" ? "active" : ""}>
            <Link to="/admin/reports">
              <FaChartBar /> Reports
            </Link>
          </li>

          {/* <li className={location.pathname === "/admin/settings" ? "active" : ""}>
            <Link to="/admin/settings">
              <FaCog /> Settings
            </Link>
          </li> */}
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <h5>Welcome Back! {user?.name || "Admin"}</h5>

          <button onClick={handleLogout} className="logout-btn">
            Logout ⏻
          </button>
        </div>

        {/* PAGE CONTENT */}
        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;