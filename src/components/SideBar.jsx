import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUpload,
  FaClipboard,
  FaUserCheck,
  FaBullhorn,
  FaUser
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "My Courses", path: "/courses", icon: <FaBook /> },
    { name: "Upload Materials", path: "/upload", icon: <FaUpload /> },
    { name: "Assignments", path: "/assignments", icon: <FaClipboard /> },
    { name: "Attendance", path: "/attendance", icon: <FaUserCheck /> },
    { name: "Grades", path: "/grades", icon: <FaClipboard /> },
    { name: "Announcements", path: "/announcements", icon: <FaBullhorn /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <div className=" text-white p-3" style={{ width: "250px", minHeight: "100vh", backgroundColor: "#374151" }}>
      <h5 className="mb-4">ATSS College</h5>
      <small className="text-light p-5 ">Faculty Portal</small>

            {/* ✅ Line yaha add karo */}
            <hr className="border-light my-2" />

      {menu.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`d-flex align-items-center gap-2 p-2 mb-2 rounded text-decoration-none ${
            location.pathname === item.path ? "bg-primary text-white" : "text-white"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;