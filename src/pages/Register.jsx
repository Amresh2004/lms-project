import React from "react";
function Register() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f1f5f9" }}
    >
      <div className="card shadow" style={{ width: "500px", borderRadius: "15px", overflow: "hidden" }}>
        
        {/* Header */}
        <div
          className="text-center text-white p-4"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#9333ea)"
          }}
        >
          <h4 className="fw-bold">Student Registration</h4>
          <p className="mb-0">Join ATSS College Digital Learning Platform</p>
        </div>

        {/* Form */}
        <div className="card-body p-4">

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
            required/>
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
              required/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91 XXXXX XXXXX"
              required/>
            </div>

          </div>

          <div className="mb-3">
            <label className="form-label">Select Course</label>
            <select className="form-select">
              <option>BCA - Bachelor of Computer Applications</option>
              <option>BBA - Bachelor of Business Administration</option>
              <option>BBA - Bachelor of Business Administration in Computer Applications</option>
              <option>BSC(CS) - Bachelor of Computer science</option>
              <option>BSC(AI) - Bachelor Of science in Artificial Intelligence</option>
              <option>MSC(CS) - Master of computewr science</option>
              <option>BCom(BM) - Bachelor of  Commerce in Business Management</option>
              <option>BCom(CA) - Bachelor of  Commerce in </option>

             
            </select>
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create password"
              required/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
              required/>
            </div>

          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">
              I agree to the terms and conditions of ATSS College
            </label>
          </div>

          <div className="d-grid">
            <button
              className="btn text-white"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#9333ea)",
                borderRadius: "30px",
                padding: "10px"
              }}
            >
              Register
            </button>
          </div>

          <p className="text-center mt-3">
            Already have an account? <a href="#">Login Here</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;