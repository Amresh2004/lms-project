import React, { useState } from "react";
import "../admin/style/courses.css";

function Courses() {

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    faculty: "",
    semester: "",
  });

  const [departments, setDepartments] = useState([
    {
      name: "Bachelor of Business Administration [BBA]",
      // subjectsCount: 12,
      semesters: [
        { sem: "I", subjects: [{ name: "Programming in C", faculty: "Dr. Rajesh Kumar", students: 245 }] },
        { sem: "II", subjects: [{ name: "Data Structures", faculty: "Dr. Amit Patel", students: 210 }] },
        { sem: "III", subjects: [{ name: "Web Technologies", faculty: "Dr. Rajesh Kumar", students: 180 }] },
        { sem: "IV", subjects: [{ name: "DBMS", faculty: "Dr. Amit Patel", students: 200 }] },
        { sem: "V", subjects: [{ name: "AI Basics", faculty: "Dr. Mehta", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Machine Learning", faculty: "Dr. Mehta", students: 140 }] },
      ],
    },
    {
      name: "Bachelor of Business Administration in Computer Applications [BBA(CA)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
    {
      name: "Bachelor of Commerce in Business Management [BCOM(BM)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
    {
      name: "Bachelor of Commerce in Computer Application [BCOM(CA)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
    {
      name: "Bachelor of Computer Science [BSC(CS)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
    {
      name: "Bachelor of Science in Artificial Intelligence & Machine Learning [BSC(AI & ML)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
    {
      name: "Master of Computer Science [MSC(CS)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
    {
      name: "Master of Data Science [MSC(DS)]",
      subjectsCount: 10,
      semesters: [
        { sem: "I", subjects: [{ name: "Business Management", faculty: "Prof. Priya Sharma", students: 198 }] },
        { sem: "II", subjects: [{ name: "Marketing Principles", faculty: "Prof. Sneha Desai", students: 165 }] },
        { sem: "III", subjects: [{ name: "Finance Basics", faculty: "Prof. Kulkarni", students: 170 }] },
        { sem: "IV", subjects: [{ name: "HR Management", faculty: "Prof. Rao", students: 160 }] },
        { sem: "V", subjects: [{ name: "Business Analytics", faculty: "Prof. Shah", students: 150 }] },
        { sem: "VI", subjects: [{ name: "Entrepreneurship", faculty: "Prof. Shah", students: 140 }] },
      ],
    },
  ]);
  const handleAddCourse = () => {

    const updatedDepartments = departments.map((dept) => {
      if (dept.name === formData.department) {
        return {
          ...dept,
          semesters: dept.semesters.map((sem) => {
            if (sem.sem === formData.semester) {
              return {
                ...sem,
                subjects: [
                  ...sem.subjects,
                  {
                    name: formData.name,
                    faculty: formData.faculty,
                    students: 0
                  }
                ]
              };
            }
            return sem;
          })
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
    setShowForm(false);
  };

  const handleDelete = (subIndex) => {
    const updatedDepartments = departments.map((dept) => {
      if (dept.name === selectedDept.name) {
        return {
          ...dept,
          semesters: dept.semesters.map((sem) => {
            if (sem.sem === selectedSem.sem) {
              return {
                ...sem,
                subjects: sem.subjects.filter((_, i) => i !== subIndex)
              };
            }
            return sem;
          })
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
  };

  const handleEdit = (sub, index) => {
    const newName = prompt("Edit Course Name", sub.name);
    if (!newName) return;

    const updatedDepartments = departments.map((dept) => {
      if (dept.name === selectedDept.name) {
        return {
          ...dept,
          semesters: dept.semesters.map((sem) => {
            if (sem.sem === selectedSem.sem) {
              return {
                ...sem,
                subjects: sem.subjects.map((s, i) =>
                  i === index ? { ...s, name: newName } : s
                )
              };
            }
            return sem;
          })
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
  };

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Manage Courses</h2>
          <p className="text-muted mb-0">Create and manage course offerings</p>
        </div>


        <button
          className="btn text-white px-4"
          style={{
            background: "linear-gradient(90deg, #2563eb, #9333ea)",
            borderRadius: "25px"
          }}
          onClick={() => setShowForm(!showForm)}
        >
          + Add Course
        </button>

      </div>

      {showForm && (
        <div className="bg-white p-3 rounded shadow-sm mb-4">
          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Course Name"
                className="form-control"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Department"
                className="form-control"
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Faculty Assigned"
                className="form-control"
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                placeholder="Semester (I-VI)"
                className="form-control"
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              />
            </div>

            <div className="col-md-1">
              <button
                className="btn w-100 text-white"
                style={{
                  background: "linear-gradient(90deg, #2563eb, #9333ea)"
                }}
                onClick={handleAddCourse}
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DEPARTMENT TABLE ================= */}
      {!selectedDept && (

        <div className="table-responsive bg-white rounded shadow-sm reduce-right-width">


          <table className="table align-middle mb-0 custom-table">

            <thead className="custom-table-header">
              <tr>
                <th>Department</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.name}</td>
                  <td className="text-center">

                    <button
                      className="btn"
                      style={{
                        background: "linear-gradient(90deg, #2563eb, #9333ea)",
                        color: "#fff",
                        padding: "3px 10px",
                        fontSize: "12px",
                        borderRadius: "5px",
                        border: "none"
                      }}
                      onClick={() => setSelectedDept(dept)}
                    >
                      View Subjects
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ================= SEMESTERS ================= */}
      {selectedDept && !selectedSem && (
        <div>

          <button
            className="btn btn-light mb-3"
            onClick={() => setSelectedDept(null)}
          >
            ← Back to Departments
          </button>
          <div className="row g-3">

            {selectedDept.semesters.map((sem, index) => (
              <div key={index} className="col-md-2">

                <div
                  className="semester-card text-center p-3 shadow-sm"
                  style={{
                    cursor: "pointer",
                    width: "100%"
                  }}
                  onClick={() => setSelectedSem(sem)}
                >
                  <h6 className="fw-bold mb-0">Sem {sem.sem}</h6>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* ================= SUBJECT TABLE ================= */}
      {selectedSem && (
        <div>

          <button
            className="btn btn-light mb-3"
            onClick={() => setSelectedSem(null)}
          >
            ← Back to Semesters
          </button>

          <div className="table-responsive bg-white rounded shadow-sm">

            <table className="table align-middle mb-0">

              <thead style={{
                background: "linear-gradient(90deg, #2563eb, #9333ea)",
                color: "#fff"
              }}>
                <tr>
                  <th>Course Name</th>
                  <th>Department</th>
                  <th>Faculty Assigned</th>
                  <th>Semester</th>
                  <th>Students</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {selectedSem.subjects.map((sub, index) => (
                  <tr key={index}>
                    <td>{sub.name}</td>
                    <td>{selectedDept.name}</td>
                    <td>{sub.faculty}</td>
                    <td>{selectedSem.sem}</td>
                    <td>{sub.students}</td>

                    <td>
                      <i
                        className="bi bi-pencil-square text-dark me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(sub, index)}
                      ></i>

                      <i
                        className="bi bi-trash text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(index)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      )}

    </div>
  );
}

export default Courses;