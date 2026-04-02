import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "Programming in C",
    code: "BCA101",
    faculty: "Dr. Rajesh Kumar",
    time: "Mon, Wed, Fri - 10:00 AM",
    semester: "1st Semester",
    progress: 75,
    color: "blue"
  },
  {
    title: "Data Structures",
    code: "BCA201",
    faculty: "Dr. Amit Patel",
    time: "Tue, Thu - 11:00 AM",
    semester: "2nd Semester",
    progress: 60,
    color: "purple"
  },
  {
    title: "Web Technologies",
    code: "BCA301",
    faculty: "Dr. Rajesh Kumar",
    time: "Mon, Wed - 2:00 PM",
    semester: "3rd Semester",
    progress: 45,
    color: "orange"
  },
  {
    title: "Business Management",
    code: "BBA101",
    faculty: "Prof. Priya Sharma",
    time: "Tue, Thu, Sat - 9:00 AM",
    semester: "1st Semester",
    progress: 80,
    color: "green"
  }
];

const MyCourses = () => {

  // ✅ FIX: hook must be here
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h2 className="fw-bold">My Courses</h2>
      <p className="text-muted">View all your enrolled courses</p>

      <div className="row g-4 mt-2">
        {courses.map((c, index) => (
          <div className="col-md-6" key={index}>
            <div className={`course-card ${c.color}`}>

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">{c.title}</h5>
                <span className="semester">{c.semester}</span>
              </div>

              <p className="text-muted mb-1">
                Course Code: {c.code}
              </p>

              <p className="mb-1">👨‍🏫 {c.faculty}</p>
              <p className="text-muted">📅 {c.time}</p>

              {/* Progress */}
              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <small>Course Progress</small>
                  <small>{c.progress}%</small>
                </div>

                <div className="progress-bar-bg">
                  <div
                    className={`progress-fill ${c.color}`}
                    style={{ width: `${c.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* ✅ Button */}
              <button
                className={`open-btn ${c.color}`}
                onClick={() => navigate(`/student/course/${c.code}`)}
              >
                Open Course →
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;