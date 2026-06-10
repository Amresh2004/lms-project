import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    parentPhone: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

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

  const sendOTP = async () => {
    if (!formData.parentPhone) {
      alert("Enter Parent Mobile Number");
      return;
    }

    if (formData.phone === formData.parentPhone) {
      alert(
        "Parent Mobile Number cannot be same as Student Mobile Number"
      );
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/otp/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: formData.parentPhone,
          }),
        }
      );

      const data = await res.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/otp/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: formData.parentPhone,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOtpVerified(true);
      }

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name)
      newErrors.name = "Name is required";

    if (!formData.email)
      newErrors.email = "Email is required";

    if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid Email";
    }

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone =
        "Student Mobile must be 10 digits";

    if (
      !/^\d{10}$/.test(formData.parentPhone)
    )
      newErrors.parentPhone =
        "Parent Mobile must be 10 digits";

    if (
      formData.phone === formData.parentPhone
    ) {
      newErrors.parentPhone =
        "Parent Mobile cannot be same as Student Mobile";
    }

    if (!formData.course)
      newErrors.course =
        "Please select a course";

    if (!formData.password)
      newErrors.password =
        "Password required";

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!otpVerified) {
      newErrors.otp =
        "Verify Parent Mobile Number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/register",
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

      alert(data.message);

      if (
        data.message ===
        "User registered successfully"
      ) {
        window.location.href =
          "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container mt-5 mb-5"
      style={{ maxWidth: "700px" }}
    >
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h3>Student Registration</h3>
        </div>

        <div className="card-body">
          <Link to="/home">
            <FaArrowLeft /> Back
          </Link>

          <form onSubmit={handleSubmit}>
            <br />

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.name}
            </small>

            <input
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.email}
            </small>

            <input
              className="form-control mb-3"
              placeholder="Student Mobile"
              name="phone"
              onChange={handleChange}
            />
            <small className="text-danger">
              {errors.phone}
            </small>

            <div className="input-group mb-2">
              <input
                className="form-control"
                placeholder="Parent Mobile"
                name="parentPhone"
                onChange={handleChange}
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={sendOTP}
              >
                Send OTP
              </button>
            </div>

            <small className="text-danger">
              {errors.parentPhone}
            </small>

            <div className="input-group mt-3 mb-2">
              <input
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <button
                type="button"
                className="btn btn-success"
                onClick={verifyOTP}
              >
                Verify
              </button>
            </div>

            {otpVerified && (
              <p className="text-success">
                ✓ Parent Mobile Verified
              </p>
            )}

            <small className="text-danger">
              {errors.otp}
            </small>

            <select
              className="form-select mt-3"
              name="course"
              onChange={handleChange}
            >
              <option value="">
                Select Course
              </option>
              <option>BBA</option>
              <option>BBA(CA)</option>
              <option>BSC(CS)</option>
              <option>BSC(AI & ML)</option>
              <option>MSC(CS)</option>
              <option>MSC(DS)</option>
            </select>

            <small className="text-danger">
              {errors.course}
            </small>

            <input
              type="password"
              className="form-control mt-3"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <small className="text-danger">
              {errors.password}
            </small>

            <input
              type="password"
              className="form-control mt-3"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />

            <small className="text-danger">
              {errors.confirmPassword}
            </small>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
              disabled={!otpVerified}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;  