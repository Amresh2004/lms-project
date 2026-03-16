import React from "react";
function Login() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>

        {/* Left Gradient Section */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center text-white"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#9333ea,#ec4899)"
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
                margin: "auto"
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

          <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>

            <a href="#" className="mb-3 text-primary text-decoration-none">
              ← Back to Home
            </a>

            <h4 className="fw-bold">Login to LMS</h4>
            <p className="text-muted mb-4">
              Enter your credentials to access your account
            </p>

            <form>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="your.email@atsscollege.edu"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Login As</label>
                <select className="form-select">
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Admin</option>
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
                className="btn w-100 text-white"
                style={{
                  background: "linear-gradient(135deg,#3b82f6,#9333ea)",
                  borderRadius: "30px",
                  padding: "10px"
                }}
              >
                Login
              </button>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <a href="#" className="text-decoration-none">
                  Register Now
                </a>
              </p>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;