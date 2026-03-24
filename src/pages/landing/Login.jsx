import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 1. ADMIN LOGIN (STATIC)
    if (
      loginData.email === "admin@gmail.com" &&
      loginData.password === "123456"
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: "admin@gmail.com", role: "admin" })
      );

      navigate("/admin/dashboard");
      return;
    }

    // ✅ 2. STUDENT LOGIN (DATABASE)
    try {
      const res = await fetch(
        "http://localhost:5000/api/students/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await res.json();
      console.log("LOGIN:", data);

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // ✅ Save student
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.student, role: "student" })
      );

      alert("Student Login Successful ✅");

      // ✅ Redirect student dashboard
      navigate("/student/dashboard");

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        
        {/* LEFT */}
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
            Access your courses, assignments, and learning materials anytime
          </p>

          <img
            src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b"
            alt="student"
            className="img-fluid mt-4"
            style={{ width: "300px", borderRadius: "15px" }}
          />
        </div>

        {/* RIGHT */}
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
                  required
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
                  required
                />
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
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;