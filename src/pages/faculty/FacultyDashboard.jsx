import React from "react";
import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaClock,
  FaTachometerAlt,
  FaUpload,
  FaUserGraduate,
  FaBullhorn,
  FaUserCircle
} from "react-icons/fa";


function FacultyDashboard() {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div
        className="text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "#1e293b"
        }}
      >
        <h5 className="fw-bold mb-4">🎓 ATSS College</h5>

        <ul className="nav flex-column gap-3">
          <li className="nav-item text-white">
            <FaTachometerAlt /> Dashboard
          </li>
          <li className="nav-item">
            <FaBook /> My Courses
          </li>
          <li className="nav-item">
            <FaUpload /> Upload Materials
          </li>
          <li className="nav-item">
            <FaClipboardList /> Assignments
          </li>
          <li className="nav-item">
            <FaUserGraduate /> Students
          </li>
          <li className="nav-item">
            <FaBullhorn /> Announcements
          </li>
          <li className="nav-item">
            <FaUserCircle /> Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4 w-100 bg-light">

        {/* Header */}
        <h2 className="fw-bold">Faculty Dashboard</h2>
        <p className="text-muted">
          Welcome, Dr. Rajesh Kumar! Manage your courses and students.
        </p>

        {/* Stats Cards */}
        <div className="row g-4 mt-3">

          <div className="col-md-3">
            <div className="card shadow border-0 p-3">
              <FaBook size={25} className="text-primary mb-2" />
              <h3>6</h3>
              <p>Courses Assigned</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 p-3">
              <FaUsers size={25} className="text-purple mb-2" />
              <h3>234</h3>
              <p>Students Enrolled</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 p-3">
              <FaClipboardList size={25} className="text-primary mb-2" />
              <h3>18</h3>
              <p>Assignments Created</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 p-3">
              <FaClock size={25} className="text-warning mb-2" />
              <h3>45</h3>
              <p>Pending Submissions</p>
            </div>
          </div>

        </div>

        {/* Courses Section */}
        <h4 className="mt-5 fw-bold">My Courses</h4>

        <div className="row g-4 mt-2">

          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <h6 className="text-muted">BCA301</h6>
              <h5 className="fw-bold">Data Structures & Algorithms</h5>
              <p className="text-muted">Semester 3 • 45 students</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <h6 className="text-muted">BCA202</h6>
              <h5 className="fw-bold">Object Oriented Programming</h5>
              <p className="text-muted">Semester 2 • 52 students</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-3">
              <h6 className="text-muted">BCA401</h6>
              <h5 className="fw-bold">Database Management Systems</h5>
              <p className="text-muted">Semester 4 • 38 students</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default FacultyDashboard;