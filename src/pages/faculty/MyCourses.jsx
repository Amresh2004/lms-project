import React from "react";
import { FaUsers } from "react-icons/fa";

const MyCourses = () => {

  const courses = [
    {
      code: "BCA301",
      title: "Data Structures & Algorithms",
      semester: "Semester 3",
      students: 45,
    },
    {
      code: "BCA202",
      title: "Object Oriented Programming",
      semester: "Semester 2",
      students: 52,
    },
    {
      code: "BCA401",
      title: "Database Management Systems",
      semester: "Semester 4",
      students: 38,
    },
    {
      code: "BCA501",
      title: "Web Development",
      semester: "Semester 5",
      students: 42,
    },
    {
      code: "BCA601",
      title: "Software Engineering",
      semester: "Semester 6",
      students: 35,
    },
    {
      code: "BCA502",
      title: "Computer Networks",
      semester: "Semester 5",
      students: 40,
    },
  ];

  return (
    <div className="container-fluid">

      {/* Heading */}
      <h4 className="fw-bold mb-3">My Courses</h4>

      <div className="row g-4">

        {courses.map((course, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 p-4 h-100">

              {/* Icon Box */}
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#efe6ff",
                  borderRadius: "15px",
                }}
              >
                <FaUsers size={22} color="#8b5cf6" />
              </div>

              {/* Course Info */}
              <small className="text-muted">{course.code}</small>
              <h5 className="fw-bold mt-2">{course.title}</h5>

              {/* Footer */}
              <div className="d-flex justify-content-between mt-3 text-muted">
                <span>{course.semester}</span>
                <span>{course.students} students</span>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default MyCourses;