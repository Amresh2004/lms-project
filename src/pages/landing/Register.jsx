import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "../landing/style/register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
  });

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  setErrors({
    ...errors,
    [e.target.name]: ""
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "User registered successfully") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };
  return (
    <>
      <br />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", background: "#f1f5f9" }}
      >
        <div
          className="card shadow"
          style={{ width: "500px", borderRadius: "15px", overflow: "hidden" }}
        >
          <Link className="back-home-link" to="/home">
            <FaArrowLeft /> Back to Home
          </Link>

          {/* Header */}
          <div
            className="text-center text-white p-4"
            style={{
              background: "linear-gradient(135deg,#3b82f6,#9333ea)",
            }}
          >
            <h4 className="fw-bold">Student Registration</h4>
            <p className="mb-0">Join ATSS College Digital Learning Platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="card-body p-4">
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              {/* Email + Phone */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="your@email.com"
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="+91 XXXXX XXXXX"
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
              </div>

              {/* Course */}
              <div className="mb-3">
                <label className="form-label">Select Course</label>
                <select
                  name="course"
                  className="form-select"
                  onChange={handleChange}
                >
                  {errors.course && <small className="text-danger">{errors.course}</small>}
                  <option value="">Select Course</option>
                  <option value="BBA">BBA</option>
                  <option value="BBA(CA)">BBA(CA)</option>
                  <option value="BSC(CS)">BSC(CS)</option>
                  <option value="BSC(AI & ML)">BSC(AI & ML)</option>
                  <option value="MSC(CS)">MSC(CS)</option>
                  <option value="MSC(DS)">MSC(DS)</option>
                  <option value="BCom(BM)">BCom(BM)</option>
                  <option value="BCom(CA)">BCom(CA)</option>
                </select>
              </div>

              {/* Password */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Create password"
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
              </div>

              {/* Checkbox */}
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" required />
                <label className="form-check-label">
                  I agree to the terms and conditions of ATSS College
                </label>
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-white"
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#9333ea)",
                    borderRadius: "30px",
                    padding: "10px",
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
      <br />
    </>
  );
}

export default Register;
