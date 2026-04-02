import React from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const allCourses = [
  {
    code: "BCA101",
    title: "Programming in C",
    faculty: "Dr. Rajesh Kumar",
    materials: [
      { name: "Intro to C", size: "2.5 MB" },
      { name: "Data Types", size: "1.8 MB" }
    ],
    attendance: "92%",
    announcements: ["Mid exam on March 25"]
  },
  {
    code: "BCA201",
    title: "Data Structures",
    faculty: "Dr. Amit Patel",
    materials: [
      { name: "Arrays", size: "3 MB" },
      { name: "Linked List", size: "2 MB" }
    ],
    attendance: "85%",
    announcements: ["Assignment due tomorrow"]
  }
];

const CourseDetails = () => {
  const { id } = useParams();

  // ✅ FILTER COURSE BASED ON ID
  const course = allCourses.find((c) => c.code === id);

  if (!course) {
    return <h3 className="text-center mt-5">Course Not Found</h3>;
  }

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="course-header">
        <h2>{course.title}</h2>
        <p>Course Code: {course.code} | Faculty: {course.faculty}</p>
      </div>

      <div className="row mt-4">

        {/* LEFT */}
        <div className="col-md-8">
          <div className="card p-3 shadow-sm mb-4">
            <h5>📘 Study Materials</h5>

            {course.materials.map((m, i) => (
              <div key={i} className="material-item">
                <div>
                  <p className="mb-0 fw-bold">{m.name}</p>
                  <small>{m.size}</small>
                </div>
                <button className="btn btn-sm btn-primary">Download</button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm mb-3 text-center">
            <h6>Attendance</h6>
            <h2>{course.attendance}</h2>
          </div>

          <div className="card p-3 shadow-sm">
            <h6>Announcements</h6>
            {course.announcements.map((a, i) => (
              <p key={i}>{a}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;