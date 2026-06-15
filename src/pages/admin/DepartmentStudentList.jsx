import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Card, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function DepartmentStudentList() {
  const { dept, year } = useParams();

const selectedCourse = decodeURIComponent(dept);
const selectedYear = decodeURIComponent(year);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // 🔵 Fetch Students
  useEffect(() => {
    fetchStudents();
  }, [dept, year]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students/all"
      );

      
        const filtered = res.data.filter(
  (s) =>
    s.course === selectedCourse &&
    s.year === selectedYear
);

      setStudents(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔵 Edit
  const handleEdit = (s) => {
    setEditId(s._id);
    setEditData({ ...s });
  };

  // 🔵 Input change
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // 🟢 Save Update
  const handleSave = async () => {
    try {
      const { _id, __v, ...updatedData } = editData;

      await axios.put(
        `http://localhost:5000/api/students/update/${editId}`,
        updatedData
      );

      alert("Student Updated Successfully");

      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  // 🔴 Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/delete/${id}`
      );

      alert("Student Deleted Successfully");

      fetchStudents();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "30px",
      }}
    >
      <Container>
        {/* BACK BUTTON */}
        <button
          className="btn d-flex align-items-center gap-2 shadow-sm mb-4"
          style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "10px 18px",
            fontWeight: "500",
          }}
          onClick={() =>
            navigate(
              `/admin/view-student/${encodeURIComponent(dept)}`
            )
          }
        >
          ← Back to Years
        </button>

        <Card
          className="shadow border-0 p-4"
          style={{ borderRadius: "18px" }}
        >
          <h2 className="text-center fw-bold mb-4">
            {selectedCourse} - {selectedYear} Students
          </h2>

          <Table bordered hover responsive className="align-middle">
            <thead style={{ background: "#eef2ff" }}>
              <tr className="text-center">
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Course</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s._id} className="text-center">
                    <td>
                      {editId === s._id ? (
                        <Form.Control
                          name="rollNo"
                          value={editData.rollNo}
                          onChange={handleChange}
                        />
                      ) : (
                        s.rollNo
                      )}
                    </td>

                    <td>
                      {editId === s._id ? (
                        <Form.Control
                          name="fullName"
                          value={editData.fullName}
                          onChange={handleChange}
                        />
                      ) : (
                        s.fullName
                      )}
                    </td>

                    <td>
                      {editId === s._id ? (
                        <Form.Control
                          name="email"
                          value={editData.email}
                          onChange={handleChange}
                        />
                      ) : (
                        s.email
                      )}
                    </td>

                    <td>
                      {editId === s._id ? (
                        <Form.Control
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        s.phone
                      )}
                    </td>

                    <td>{s.course}</td>
                    <td>{s.year}</td>

                    <td>
                      {editId === s._id ? (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEdit(s)}
                            style={{ marginRight: "8px" }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(s._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No students found for this course and year.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}