import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import "../landing/style/Navbar.css";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm fixed-top"
      style={{ fontFamily: "Inter, sans-serif", padding: "14px 40px"  }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              background: "linear-gradient(135deg,#4f46e5,#9333ea)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              marginRight: "12px",
            }}
          >
            <FaGraduationCap />
          </div>

          <div>
            <div style={{ fontWeight: "600", fontSize: "20px" }}>
              ATSS CBSCA College
            </div>

            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Digital Learning
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navMenu"
        >
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link nav-hover fw-medium" to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover fw-medium" to="/about">
                About
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link nav-hover fw-medium" to="/courses">
              </Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link nav-hover fw-medium" to="/contact">
                Contact
              </Link>
            </li>

             <li className="nav-item">
              <Link className="nav-link nav-hover fw-medium" to="/career">
                Career
              </Link>
            </li>

            {/* Login Button */}
            <li className="nav-item">
              <Link
                className="login-btn1"
                to="/login"
              >
                LMS Login
              </Link>
            </li>

            {/* Register Button
            <li className="nav-item">
              <Link
                className="register-btn"
                to="/register"
              >
                Register
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
