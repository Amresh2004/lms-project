
import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

export default function AddFaculty() {

  const [faculty,setFaculty] = useState({
    fullName:"",
    gender:"",
    email:"",
    phone:"",
    password:"",
    currentAddress:"",
    permanentAddress:"",
    qualification:"",
    experience:"",
    department:"",
    teacherId:"",
    joiningDate:""
  });

  const handleChange = (e)=>{
    setFaculty({...faculty,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await axios.post("http://localhost:5000/api/faculty/add", faculty);
    alert("Staff Added Successfully ✅");

    // ⭐ FORM RESET AFTER SUBMIT
    setFaculty({
      fullName:"",
      gender:"",
      email:"",
      phone:"",
      password:"",
      currentAddress:"",
      permanentAddress:"",
      qualification:"",
      experience:"",
      department:"",
      teacherId:"",
      joiningDate:""
    });
  };

  return (
    <div style={{ background:"#f5f7fb", minHeight:"100vh", paddingTop:"30px" }}>
      <Container>

        <div className="text-center mb-4">
          <h2 className="fw-bold">Add Faculty / Staff</h2>
          <p className="text-muted">Fill the details below to register new faculty member</p>
        </div>

        <Card className="shadow border-0 p-4" style={{borderRadius:"18px"}}>
          
          {/* ⭐ AUTOFILL FULLY BLOCKED */}
          <Form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="fakeusernameremembered" style={{display:"none"}} />
            <input type="password" name="fakepasswordremembered" style={{display:"none"}} />

            <Row className="g-4">

              <Col md={6}>
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control name="fullName" size="lg" value={faculty.fullName} onChange={handleChange} autoComplete="off" required/>
              </Col>

              <Col md={6}>
                <Form.Label className="fw-semibold">Gender</Form.Label>
                <Form.Select name="gender" size="lg" value={faculty.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Col>

              {/* EMAIL */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  size="lg"
                  value={faculty.email}
                  onChange={handleChange}
                  autoComplete="new-email"
                  required
                />
              </Col>

              <Col md={6}>
                <Form.Label className="fw-semibold">Mobile Number</Form.Label>
                <Form.Control name="phone" size="lg" value={faculty.phone} onChange={handleChange} autoComplete="off" required/>
              </Col>

              {/* PASSWORD */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  size="lg"
                  value={faculty.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </Col>

              <Col md={6}>
                <Form.Label className="fw-semibold">Teacher ID</Form.Label>
                <Form.Control name="teacherId" size="lg" value={faculty.teacherId} onChange={handleChange} autoComplete="off" required/>
              </Col>

              {/* Department Dropdown */}
              <Col md={6}>
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Select name="department" size="lg" value={faculty.department} onChange={handleChange} required>
                  <option value="">Select Department</option>
                  <option>BCA</option>
                  <option>BBA</option>
                  <option>BBA (CA)</option>
                  <option>BCom (BM)</option>
                  <option>BCom (CA)</option>
                  <option>BSc (CS)</option>
                  <option>BSc (AI & ML)</option>
                  <option>MSc (CS)</option>
                  <option>MSc (DS)</option>
                </Form.Select>
              </Col>

              {/* Qualification Dropdown */}
             <Col md={6}>
  <Form.Label className="fw-semibold">Qualification</Form.Label>
  <Form.Control
    type="text"
    name="qualification"
    size="lg"
    placeholder="Eg: M.Sc Computer Science, PhD"
    value={faculty.qualification}
    onChange={handleChange}
    autoComplete="off"
    required
  />
</Col>

              <Col md={6}>
                <Form.Label className="fw-semibold">Experience</Form.Label>
                <Form.Control name="experience" size="lg" value={faculty.experience} onChange={handleChange} autoComplete="off" required/>
              </Col>

              <Col md={6}>
                <Form.Label className="fw-semibold">Joining Date</Form.Label>
                <Form.Control type="date" name="joiningDate" size="lg" value={faculty.joiningDate} onChange={handleChange} required/>
              </Col>

              <Col md={12}>
                <Form.Label className="fw-semibold">Current Address</Form.Label>
                <Form.Control as="textarea" rows={2} name="currentAddress" value={faculty.currentAddress} onChange={handleChange} required/>
              </Col>

              <Col md={12}>
                <Form.Label className="fw-semibold">Permanent Address</Form.Label>
                <Form.Control as="textarea" rows={2} name="permanentAddress" value={faculty.permanentAddress} onChange={handleChange} required/>
              </Col>

            </Row>

            <Button
              type="submit"
              className="mt-4 w-100 fw-bold"
              size="lg"
              style={{
                background:"linear-gradient(135deg,#4f46e5,#9333ea)",
                border:"none",
                padding:"14px",
                fontSize:"18px",
                borderRadius:"12px"
              }}
            >
              Add Staff Member
            </Button>

          </Form>
        </Card>
      </Container>
    </div>
  );
}