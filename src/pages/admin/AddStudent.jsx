import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    course: "",
    year: "",
    rollNo: "",
    admissionDate: "",
    address: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/students/add", student);
    alert("Student Added Successfully ✅");

    // reset form
    setStudent({
      fullName: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      course: "",
      year: "",
      rollNo: "",
      admissionDate: "",
      address: "",
    });
  };

  return (
    <div
      style={{ background: "#f5f7fb", minHeight: "100vh", paddingTop: "30px" }}
    >
      <Container>
        <button
          className="btn d-flex align-items-center gap-2 shadow-sm mb-4"
          style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "10px 18px",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onClick={() => navigate("/admin/manage-student")}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          ← Back to Manage Student
        </button>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Add Student</h2>
          <p className="text-muted">Register new student in system</p>
        </div>

        <Card className="shadow border-0 p-4" style={{ borderRadius: "18px" }}>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" style={{ display: "none" }} />
            <input type="password" style={{ display: "none" }} />

            <Row className="g-4">
              {/* Name */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control
                  name="fullName"
                  size="lg"
                  value={student.fullName}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Gender */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Gender</Form.Label>
                <Form.Select
                  name="gender"
                  size="lg"
                  value={student.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Col>

              {/* Email */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  size="lg"
                  value={student.email}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Phone */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Mobile Number</Form.Label>
                <Form.Control
                  name="phone"
                  size="lg"
                  value={student.phone}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Password */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  size="lg"
                  value={student.password}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Roll No */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Roll Number</Form.Label>
                <Form.Control
                  name="rollNo"
                  size="lg"
                  value={student.rollNo}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Course */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Course</Form.Label>
                <Form.Select
                  name="course"
                  size="lg"
                  value={student.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option>BCA</option>
                  <option>BBA</option>
                  <option>BBA (CA)</option>
                  <option>BCom (CA)</option>
                  <option>BSc (CS)</option>
                  <option>BSc (AI & ML)</option>
                  <option>MSc (CS)</option>
                </Form.Select>
              </Col>

              {/* Year */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Year</Form.Label>
                <Form.Select
                  name="year"
                  size="lg"
                  value={student.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                </Form.Select>
              </Col>

              {/* Admission Date */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Admission Date</Form.Label>
                <Form.Control
                  type="date"
                  name="admissionDate"
                  size="lg"
                  value={student.admissionDate}
                  onChange={handleChange}
                  required
                />
              </Col>

              {/* Address */}
              <Col md={12}>
                <Form.Label className="fw-semibold">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Button
              type="submit"
              className="mt-4 w-100 fw-bold"
              size="lg"
              style={{
                background: "linear-gradient(135deg,#4f46e5,#9333ea)",
                border: "none",
                padding: "14px",
                fontSize: "18px",
                borderRadius: "12px",
              }}
            >
              Add Student
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
