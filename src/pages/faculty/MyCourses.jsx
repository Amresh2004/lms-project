// import React from "react";
// import { FaUsers } from "react-icons/fa";

// const MyCourses = () => {

//   const courses = [
//     {
//       code: "BCA301",
//       title: "Data Structures & Algorithms",
//       semester: "Semester 3",
//       students: 45,
//     },
//     {
//       code: "BCA202",
//       title: "Object Oriented Programming",
//       semester: "Semester 2",
//       students: 52,
//     },
//     {
//       code: "BCA401",
//       title: "Database Management Systems",
//       semester: "Semester 4",
//       students: 38,
//     },
//     {
//       code: "BCA501",
//       title: "Web Development",
//       semester: "Semester 5",
//       students: 42,
//     },
//     {
//       code: "BCA601",
//       title: "Software Engineering",
//       semester: "Semester 6",
//       students: 35,
//     },
//     {
//       code: "BCA502",
//       title: "Computer Networks",
//       semester: "Semester 5",
//       students: 40,
//     },
//   ];

//   return (
//     <div className="container-fluid">

//       {/* Heading */}
//       <h4 className="fw-bold mb-3">My Courses</h4>

//       <div className="row g-4">

//         {courses.map((course, index) => (
//           <div className="col-md-4" key={index}>
//             <div className="card shadow-sm border-0 p-4 h-100">

//               {/* Icon Box */}
//               <div
//                 className="d-flex align-items-center justify-content-center mb-3"
//                 style={{
//                   width: "60px",
//                   height: "60px",
//                   background: "#efe6ff",
//                   borderRadius: "15px",
//                 }}
//               >
//                 <FaUsers size={22} color="#8b5cf6" />
//               </div>

//               {/* Course Info */}
//               <small className="text-muted">{course.code}</small>
//               <h5 className="fw-bold mt-2">{course.title}</h5>

//               {/* Footer */}
//               <div className="d-flex justify-content-between mt-3 text-muted">
//                 <span>{course.semester}</span>
//                 <span>{course.students} students</span>
//               </div>

//             </div>
//           </div>
//         ))}

//       </div>

//     </div>
//   );
// };

// export default MyCourses;

import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);

  const facultyId = localStorage.getItem("facultyId");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/faculty/${facultyId}/courses`
      );

      setCourses(res.data.courses);
      setTotalCourses(res.data.totalCourses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">

      {/* Total Courses Card */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Assigned Courses</h6>
              <h1 className="text-primary">{totalCourses}</h1>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4">My Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">
                  {course.course_code}
                </h6>

                <h4>{course.course_name}</h4>

                <div className="mt-3">
                  Semester {course.semester}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MyCourses;