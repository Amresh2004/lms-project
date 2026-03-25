import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";

import { Modal, Button } from "react-bootstrap";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/students/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

    
      setShowPopup(true);
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #e0ecff, #f3e8ff, #fce7f3)",
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div
            className="card border-0 shadow-lg rounded-4 p-4 p-md-5"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-center mb-4">
              <div
                className="d-inline-flex justify-content-center align-items-center rounded-circle shadow"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #0d6efd, #6f42c1)",
                  fontSize: "32px",
                }}
              >
                <span className="text-white"> <FaLock size={35} color="#e4e8ec" />
                </span>
              </div>

              <h2 className="fw-bold mt-3 mb-2 text-dark">Forgot Password?</h2>
              <p className="text-secondary mb-0">
                Enter your email and create a new password
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-4">
                    <FaEnvelope size={18} color="#9333ea" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control border-start-0 rounded-end-4 py-3"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={form.email}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">
                  New Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-4">
                    <FaKey size={18} color="#facc15" />
                  </span>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control border-start-0 rounded-end-4 py-3"
                    placeholder="Enter new password"
                    onChange={handleChange}
                    value={form.newPassword}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #0d6efd, #6f42c1)",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <button
              type="button"
              className="btn btn-link text-decoration-none mt-3 fw-semibold"
              onClick={() =>
               
                navigate("/login")}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
      {/* Success Popup */}
      <Modal show={showPopup} onHide={handleClosePopup} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary text-center w-100">
            Password Updated
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center pt-2">
          <FaCheckCircle size={60} color="#22c55e" />
          <h5 className="mt-3 fw-bold">Success!</h5>
          <p className="text-muted mb-0">
            Your password has been updated successfully.
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0 justify-content-center">
          <Button
            onClick={handleClosePopup}
            className="rounded-pill px-4"
            style={{
              background: "linear-gradient(135deg, #0d6efd, #6f42c1)",
              border: "none",
            }}
          >
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ForgotPassword;