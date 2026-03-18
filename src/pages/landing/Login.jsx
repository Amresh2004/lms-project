import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "Login successful") {
        // store user
        localStorage.setItem("user", JSON.stringify(data.user));

        // redirect
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        {/* Left Gradient Section */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center text-white"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#9333ea,#ec4899)",
          }}
        >
          <div className="mb-4">
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "15px",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3b82f6",
                fontSize: "28px",
                margin: "auto",
              }}
            >
              🎓
            </div>
          </div>

          <h2 className="fw-bold">Welcome to ATSS College LMS</h2>

          <p className="mt-3">
            Access your courses, assignments, and learning materials anytime,
            anywhere
          </p>

          <img
            src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b"
            alt="student"
            className="img-fluid mt-4"
            style={{ width: "300px", borderRadius: "15px" }}
          />
        </div>

        {/* Right Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
          <div
            className="card shadow p-4"
            style={{ width: "400px", borderRadius: "15px" }}
          >
            <Link className="mb-3 text-primary text-decoration-none" to="/home">
              ← Back to Home
            </Link>

            <h4 className="fw-bold">Login to LMS</h4>
            <p className="text-muted mb-4">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="your.email@atsscollege.edu"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Login As</label>
                <select
                  className="form-select"
                  name="role"
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">Remember me</label>
                </div>

                <a href="#" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              <button
              type="submit"
                className="btn w-100 text-white"
                style={{
                  background: "linear-gradient(135deg,#3b82f6,#9333ea)",
                  borderRadius: "30px",
                  padding: "10px",
                }}
              >
                Login
              </button>

              {/* <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link className="text-decoration-none" to="/register">
                  Register Now
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
