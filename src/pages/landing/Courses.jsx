import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";   // CS
import { FaChartLine } from "react-icons/fa";    // Business
import { FaBrain } from "react-icons/fa";        // AI / DS
import { FaBook } from "react-icons/fa";         // Courses
import { MdSchool } from "react-icons/md";       // Education

function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "BCA - Bachelor of Computer Applications",
      desc: "Comprehensive 3-year program covering programming languages, software engineering, database management, web technologies, and emerging tech trends.",
      faculty: "Dr. Rajesh Kumar",
      duration: "3 Years",
      color: "linear-gradient(135deg,#3b82f6,#06b6d4)",
      icon:<FaLaptopCode size={24} color="#fff" />,
    },
    {
      id: 2,
      title: "BBA - Bachelor of Business Administration",
      desc: "Dynamic 3-year program focusing on management principles, organizational behavior, marketing strategies, financial management, and entrepreneurship.",
      faculty: "Prof. Priya Sharma",
      duration: "3 Years",
      color: "linear-gradient(135deg,#9333ea,#ec4899)",
      icon: <FaChartLine size={24} color="#fff" />,
    },
     {
    id: 3,
    title: "BSC(AL & ML) - Bachelor of Science in Artificial Intelligence & Machine Learning",
    desc: "Specialized program in advanced topics including artificial intelligence, machine learning, cloud computing, and mobile app development.",
    faculty: "Dr. Amit Patel",
    duration: "3 - 4 Years",
    color: "linear-gradient(135deg,#f97316,#ef4444)", // orange-red
    icon: <FaBrain size={24} color="#fff" />,
  },
  {
    id: 4,
    title: "BSc (Computer Science)",
    desc: "NEP 2023 program covering programming, data structures, DBMS, operating systems, and emerging technologies.",
    faculty: "Dr. Rajesh Kumar",
    duration: "3 Years",
    color: "linear-gradient(135deg,#3b82f6,#06b6d4)",
    icon: <FaBook size={24} color="#fff" />,
  },
  {
    id: 5,
    title: "BSc (Data Science)",
    desc: "Focus on statistics, machine learning, data analysis, and AI tools for real-world problem solving.",
    faculty: "Dr. Neha Joshi",
    duration: "3 - 4 Years",
    color: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    icon: <FaChartLine size={24} color="#fff" />,
  },
  {
    id: 6,
    title: "BCom (Computer Applications)",
    desc: "Combination of commerce and IT including accounting, GST, Tally, and business applications.",
    faculty: "Prof. Amit Sharma",
    duration: "3 - 4 Years",
    color: "linear-gradient(135deg,#f59e0b,#ef4444)",
    icon: <FaBook size={24} color="#fff" />,
  },
  {
    id: 7,
    title: "BCom (Business Management)",
    desc: "Learn marketing, HR, finance, and entrepreneurship with practical business exposure.",
    faculty: "Prof. Sneha Desai",
    duration: "3 - 4 Years",
    color: "linear-gradient(135deg,#10b981,#14b8a6)",
    icon: <FaChartLine size={24} color="#fff" />,
  },
  {
    id: 8,
    title: "MSc (Computer Science)",
    desc: "Advanced program in software development, cloud computing, AI, and system design.",
    faculty: "Dr. Vikram Patil",
    duration: "2 Years",
    color: "linear-gradient(135deg,#4f46e5,#9333ea)",
    icon: <FaBrain size={24} color="#fff" />,
  },
  {
    id: 9,
    title: "MSc (Data Science)",
    desc: "Specialization in machine learning, deep learning, big data analytics, and research.",
    faculty: "Dr. Pooja Mehta",
    duration: "2 Years",
    color: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
    icon: <FaBrain size={24} color="#fff" />,
  },
  ];

  const navigate = useNavigate();

  return (
    <div>

      {/* HEADER */}
      <div
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg,#3b82f6,#9333ea)",
        }}
      >
        <h1 className="fw-bold">ATSS College Courses</h1>
        <p className="mt-2">
          Explore our comprehensive programs in Business & Computer Applications
        </p>
      </div>

      {/* COURSES */}
      <div className="container py-5">
        <div className="row">

          {courses.map((course) => (
            <div className="col-md-6 mb-4" key={course.id}>
              <div className="card shadow border-0 h-100">

                {/* TOP BORDER */}
                <div
                  style={{
                    height: "6px",
                    background: course.color,
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                ></div>

                <div className="card-body p-4">

                  {/* ICON */}
                  <div
                    className="mb-3 d-flex align-items-center justify-content-between"
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "12px",
                        background: course.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "20px",
                      }}
                    >
                      {course.icon}
                    </div>

                      <span className="badge bg-light text-dark">
                        {course.duration}
                      </span>
                  </div>

                  {/* TITLE */}
                  <h5 className="fw-bold">{course.title}</h5>

                  {/* DESC */}
                  <p className="text-muted">{course.desc}</p>

                  <hr />

                  {/* FACULTY */}
                  <p className="mb-3">
                    👨‍🏫 <strong>Faculty:</strong> {course.faculty}
                  </p>

                  {/* BUTTON */}
                  <button
  className="btn w-100 text-white"
  style={{
    background: course.color,
    borderRadius: "30px",
  }}
  onClick={() => navigate(`/course/${course.id}`)}
>
  View Details
</button>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default CoursesPage;