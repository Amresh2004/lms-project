
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    parentPhone: "",
    courseInterested: "",
    qualification: "",
    yearOfAdmission: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName)
      newErrors.fullName = "Full Name is required";

    if (!formData.email)
      newErrors.email = "Email is required";

    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid Email";
    }

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone =
        "Mobile Number must be 10 digits";

    if (
      formData.parentPhone &&
      !/^\d{10}$/.test(formData.parentPhone)
    ) {
      newErrors.parentPhone =
        "Parent Mobile must be 10 digits";
    }

    if (!formData.courseInterested)
      newErrors.courseInterested =
        "Please select a course";

    if (!formData.qualification)
      newErrors.qualification =
        "Qualification is required";

    if (!formData.yearOfAdmission)
      newErrors.yearOfAdmission =
        "Select Year of Admission";

    if (!formData.city)
      newErrors.city = "City is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/enquiries/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          "Admission Enquiry Submitted Successfully!"
        );

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          parentPhone: "",
          courseInterested: "",
          qualification: "",
          yearOfAdmission: "",
          city: "",
          message: "",
        });
      } else {
        alert(
          data.message ||
            "Failed to submit enquiry"
        );
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="container mt-5 mb-5"
      style={{ maxWidth: "750px" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ borderRadius: "20px" }}
      >
        <div
          className="card-header text-center text-white"
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <h3 className="mb-0">
            <FaGraduationCap className="me-2" />
            Admission Enquiry Form
          </h3>
        </div>

        <div className="card-body p-4">
          <Link
            to="/home"
            className="text-decoration-none"
          >
            <FaArrowLeft /> Back
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              {/* Full Name */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.fullName}
                </small>
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.email}
                </small>
              </div>

              {/* Student Mobile */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.phone}
                </small>
              </div>

              {/* Parent Mobile */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Parent Mobile Number"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.parentPhone}
                </small>
              </div>

              {/* Course */}
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  name="courseInterested"
                  value={
                    formData.courseInterested
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select Course
                  </option>

                  <option>BCA</option>
                  <option>BBA</option>
                  <option>BBA (CA)</option>
                  <option>BCom (BM)</option>
                  <option>BCom (CA)</option>
                  <option>BSc (CS)</option>
                  <option>BSc (AI & ML)</option>
                  <option>MSc (CS)</option>
                  <option>MSc (DS)</option>
                </select>

                <small className="text-danger">
                  {errors.courseInterested}
                </small>
              </div>

              {/* Admission Year */}
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  name="yearOfAdmission"
                  value={formData.yearOfAdmission}
                  onChange={handleChange}
                >
                  <option value="">
                    Admission Year
                  </option>

                  <option>2026-27</option>
                  <option>2027-28</option>
                  <option>2028-29</option>
                </select>

                <small className="text-danger">
                  {errors.yearOfAdmission}
                </small>
              </div>

              {/* Qualification */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.qualification}
                </small>
              </div>

              {/* City */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <small className="text-danger">
                  {errors.city}
                </small>
              </div>

              {/* Message */}
              <div className="col-12 mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your enquiry here..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              Submit Admission Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
