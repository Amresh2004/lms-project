import React from "react";
import { FaBookOpen, FaUsers, FaFileAlt, FaClock } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="container-fluid">

      {/* Heading */}
      <h2 className="fw-bold">Faculty Dashboard</h2>
      <p className="text-muted">
        Welcome, Manage your courses and students.
      </p>

      {/* Stats Cards */}
      <div className="row g-4 mt-2">

        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 rounded-4">

            {/* ICON BOX */}
            <div
              className="d-flex align-items-center justify-content-center mb-3"
              style={{
                width: "60px",
                height: "60px",
                background: "#e0ecff",
                borderRadius: "15px"
              }}
            >
              <FaBookOpen size={24} color="#3b82f6" />
            </div>

            <h2 className="fw-bold">6</h2>
            <p className="text-muted mb-0">Courses Assigned</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 rounded-4">

            <div
              className="d-flex align-items-center justify-content-center mb-3"
              style={{
                width: "60px",
                height: "60px",
                background: "#efe6ff",
                borderRadius: "15px"
              }}
            >
              <FaUsers size={24} color="#8b5cf6" />
            </div>

            <h2 className="fw-bold">234</h2>
            <p className="text-muted mb-0">Students Enrolled</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 rounded-4">

            <div
              className="d-flex align-items-center justify-content-center mb-3"
              style={{
                width: "60px",
                height: "60px",
                background: "#e0ecff",
                borderRadius: "15px"
              }}
            >
              <FaFileAlt size={24} color="#3b82f6" />
            </div>

            <h2 className="fw-bold">18</h2>
            <p className="text-muted mb-0">Assignments Created</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-4 rounded-4">

            <div
              className="d-flex align-items-center justify-content-center mb-3"
              style={{
                width: "60px",
                height: "60px",
                background: "#efe6ff",
                borderRadius: "15px"
              }}
            >
              <FaClock size={24} color="#8b5cf6" />
            </div>

            <h2 className="fw-bold">45</h2>
            <p className="text-muted mb-0">Pending Submissions</p>
          </div>
        </div>

      </div>

      {/* Courses Section */}
      <h4 className="mt-5 fw-bold">My Courses</h4>

      <div className="row g-4 mt-2">

        {[ 
          { code: "BCA301", name: "Data Structures & Algorithms", sem: "Semester 3", students: "45 students" },
          { code: "BCA202", name: "Object Oriented Programming", sem: "Semester 2", students: "52 students" },
          { code: "BCA401", name: "Database Management Systems", sem: "Semester 4", students: "38 students" },
          { code: "BCA501", name: "Web Development", sem: "Semester 5", students: "42 students" },
          { code: "BCA601", name: "Software Engineering", sem: "Semester 6", students: "35 students" },
          { code: "BCA502", name: "Computer Networks", sem: "Semester 5", students: "40 students" }
        ].map((course, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 p-4 rounded-4">

              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#efe6ff",
                  borderRadius: "15px"
                }}
              >
                <FaBookOpen size={24} color="#8b5cf6" />
              </div>

              <small className="text-muted">{course.code}</small>
              <h5 className="fw-bold mt-2">{course.name}</h5>

              <div className="d-flex justify-content-between mt-3">
                <span>{course.sem}</span>
                <span>{course.students}</span>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Recent Activities */}
<div className="card shadow-sm border-0 p-4 mt-5">
  <h5 className="fw-bold mb-4">Recent Activities</h5>

  {/* Activity Item */}
  <div className="d-flex justify-content-between align-items-start mb-3">
    <div className="d-flex">
      <span
        className="me-3 mt-2"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#2563eb",
          borderRadius: "50%",
          display: "inline-block",
        }}
      ></span>

      <div>
        <div className="fw-semibold">Assignment graded</div>
        <div className="text-muted small">
          Data Structures - Assignment 3
        </div>
      </div>
    </div>

    <small className="text-muted">1 hour ago</small>
  </div>

  <hr />

  {/* Activity Item */}
  <div className="d-flex justify-content-between align-items-start mb-3">
    <div className="d-flex">
      <span
        className="me-3 mt-2"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#2563eb",
          borderRadius: "50%",
        }}
      ></span>

      <div>
        <div className="fw-semibold">Material uploaded</div>
        <div className="text-muted small">
          OOP - Lecture Notes Week 8
        </div>
      </div>
    </div>

    <small className="text-muted">2 hours ago</small>
  </div>

  <hr />

  {/* Activity Item */}
  <div className="d-flex justify-content-between align-items-start mb-3">
    <div className="d-flex">
      <span
        className="me-3 mt-2"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#2563eb",
          borderRadius: "50%",
        }}
      ></span>

      <div>
        <div className="fw-semibold">Attendance marked</div>
        <div className="text-muted small">
          DBMS - Class dated 18 March 2026
        </div>
      </div>
    </div>

    <small className="text-muted">4 hours ago</small>
  </div>

  <hr />

  {/* Activity Item */}
  <div className="d-flex justify-content-between align-items-start">
    <div className="d-flex">
      <span
        className="me-3 mt-2"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#2563eb",
          borderRadius: "50%",
        }}
      ></span>

      <div>
        <div className="fw-semibold">Assignment created</div>
        <div className="text-muted small">
          Web Development - Project Assignment
        </div>
      </div>
    </div>

    <small className="text-muted">1 day ago</small>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
