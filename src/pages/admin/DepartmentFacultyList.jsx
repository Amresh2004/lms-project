import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Card, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function DepartmentFacultyList() {
  const { dept } = useParams();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // 🔵 Fetch Faculty
  useEffect(() => {
    fetchFaculty();
  }, [dept]);

  const fetchFaculty = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/faculty/all"
    );

    const departmentMapping = {
      CS: ["BCA", "BBA (CA)", "BSc (CS)"],
      BM: ["BBA", "BCom (BM)", "BCom (CA)", "MCA"],
      Commerce: ["BCom (BM)", "BCom (CA)"],
      "AI & ML": ["BSc (AI & ML)", "MSc (AI & ML)", "MSc (DS)",],
      PG: ["MSc (CS)", "MSc (DS)"],
    };

    const selectedDept = decodeURIComponent(dept);

    const filtered = res.data.filter((faculty) =>
      departmentMapping[selectedDept]?.includes(
        faculty.department
      )
    );

    setFaculty(filtered);
  } catch (error) {
    console.log(error);
  }
};

  // 🔵 Edit button click
  const handleEdit = (f) => {
    setEditId(f._id);
    setEditData({ ...f }); // clone object
  };

  // 🔵 input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // 🟢 SAVE UPDATE (🔥 FIXED FUNCTION)
  const handleSave = async () => {
    try {
      const { _id, __v, ...updatedData } = editData;

      await axios.put(
        `http://localhost:5000/api/faculty/update/${editId}`,
        updatedData,
      );

      alert("Faculty Updated Successfully");

      // edit mode बंद
      setEditId(null);

      // list refresh
      fetchFaculty();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/faculty/delete/${id}`);
    alert("Faculty Deleted Successfully");

    fetchFaculty(); // refresh list
  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};

  return (
    <div
      style={{ background: "#f5f7fb", minHeight: "100vh", paddingTop: "30px" }}
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
          onClick={() => navigate("/admin/view-faculty")}
        >
          ← Back to Manage Faculty
        </button>

        <Card className="shadow border-0 p-4" style={{ borderRadius: "18px" }}>
          <h2 className="text-center fw-bold mb-4">
  {decodeURIComponent(dept)} Faculty List
</h2>

          <Table bordered hover responsive className="align-middle">
            <thead style={{ background: "#eef2ff" }}>
              <tr className="text-center">
                <th>Teacher ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {faculty.map((f) => (
                <tr key={f._id} className="text-center">
                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        name="teacherId"
                        value={editData.teacherId}
                        onChange={handleChange}
                      />
                    ) : (
                      f.teacherId
                    )}
                  </td>

                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleChange}
                      />
                    ) : (
                      f.fullName
                    )}
                  </td>

                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      f.email
                    )}
                  </td>

                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      f.phone
                    )}
                  </td>

                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        name="qualification"
                        value={editData.qualification}
                        onChange={handleChange}
                      />
                    ) : (
                      f.qualification
                    )}
                  </td>

                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        name="experience"
                        value={editData.experience}
                        onChange={handleChange}
                      />
                    ) : (
                      f.experience
                    )}
                  </td>

                  <td>
                    {editId === f._id ? (
                      <Form.Control
                        type="date"
                        name="joiningDate"
                        value={editData.joiningDate?.substring(0, 10)}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(f.joiningDate).toLocaleDateString()
                    )}
                  </td>

                  {/* 🔥 ONLY EDIT / SAVE BUTTON */}

                  <td>
                    {editId === f._id ? (
                      <Button variant="success" size="sm" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleEdit(f)}
                          style={{ marginRight: "8px" }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(f._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}
