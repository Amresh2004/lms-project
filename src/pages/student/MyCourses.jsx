import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/students/my-courses/${user._id}`
        );

        const data = await res.json();

        if (data.success) {
          setCourses(data.courses);
        }

      } catch (err) {
        console.log("FETCH ERROR:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold">My Courses</h2>
      <p className="text-muted">View all your enrolled courses</p>

      <div className="row g-4 mt-2">
        {courses.length > 0 ? (
          courses.map((c, index) => (
            <div className="col-md-6" key={index}>
              <div className={`course-card ${c.color}`}>

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold">{c.title}</h5>
                  <span className="semester">{c.semester}</span>
                </div>

                <p className="text-muted mb-1">
                  Course Code: {c.code}
                </p>

                <p className="mb-1">👨‍🏫 {c.faculty}</p>

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

                <button
                  className={`open-btn ${c.color}`}
                  onClick={() =>
                    navigate(`/student/course/${c.code}`)
                  }
                >
                  Open Course →
                </button>

              </div>
            </div>
          ))
        ) : (
          <p>No courses assigned</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;