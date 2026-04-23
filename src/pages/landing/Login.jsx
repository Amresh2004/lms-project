import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/common_files/Button";
import Modal from "../../components/common_files/Modal";
import "../landing/style/Login.css";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const checkStrength = (password) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "Weak";
    if (score === 2 || score === 3) return "Medium";
    if (score === 4) return "Strong";
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState("");

  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    newPassword: "",
  });

  useEffect(() => {
    if (showForgotPopup) {
      document.body.classList.add("forgot-open");
    } else {
      document.body.classList.remove("forgot-open");
    }
  }, [showForgotPopup]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotChange = (e) => {
    setForgotData({
      ...forgotData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        loginData.email === "admin@gmail.com" &&
        loginData.password === "123456"
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email: "admin@gmail.com", role: "admin" }),
        );
        setUserRole("admin");
        setShowPopup(true);
        return;
      }

      let res = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const data = await res.json();

        // ⭐⭐⭐ VERY IMPORTANT LINE ADD करा
        localStorage.setItem("studentName", data.student.name);

        // ✅ store full user

        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.student, role: "student" }),
        );

        // ✅ IMPORTANT: store studentId separately
        localStorage.setItem("studentId", data.student._id);

        setUserRole("student");
        setShowPopup(true);
        return;
      }

      res = await fetch("http://localhost:5000/api/faculty/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.faculty, role: "faculty" }),
        );
        setUserRole("faculty");
        setShowPopup(true);
        return;
      }

      alert("Invalid email or password");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const handleRedirect = () => {
    setShowPopup(false);

    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "student") {
      navigate("/student/dashboard");
    } else if (userRole === "faculty") {
      navigate("/faculty/dashboard");
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();

    if (!forgotData.email || !forgotData.newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/students/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forgotData),
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Password updated successfully");
        setShowForgotPopup(false);
        setForgotData({ email: "", newPassword: "" });
      } else {
        alert(data.message || "Error updating password");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };
  

  return (
    <>
      <div
        className={`container-fluid ${showForgotPopup ? "login-blur-bg" : ""}`}
      >
        <div className="row" style={{ minHeight: "100vh" }}>
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

          <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
            <div
              className="card shadow p-4"
              style={{ width: "400px", borderRadius: "15px" }}
            >
              <Link
                className="mb-3 text-primary text-decoration-none"
                to="/home"
              >
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
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <br />
                <div className="mb-2">
                  <Button
                    text="Login"
                    htmlType="submit"
                    style={{ width: "350px" }}
                  />
                </div>
                <div className="mt-3 text-start">
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => {
                      console.log("Forgot clicked");
                      setShowForgotPopup(true);
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          title="Login Successful 🎉"
        >
          <p>You have logged in successfully.</p>

          <Button
            text="Go to Dashboard"
            onClick={handleRedirect}
            style={{ marginTop: "15px", width: "100%" }}
          />
        </Modal>
      </div>

      {showForgotPopup && (
        <div className="forgot-overlay">
          <div className="forgot-card-custom">
            {/* CLOSE BUTTON */}
            <button
              className="forgot-close-btn"
              onClick={() => setShowForgotPopup(false)}
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <div className="forgot-lock-icon">🔒</div>
              <h4 className="fw-bold mt-4 mb-2">Forgot Password?</h4>
              <p className="text-muted mb-0">
                Enter your email and create a new password
              </p>
            </div>

            <form onSubmit={handleForgotSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control forgot-input"
                  placeholder="Enter your email"
                  value={forgotData.email}
                  onChange={handleForgotChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    className="form-control forgot-input"
                    placeholder="Enter new password"
                    value={forgotData.newPassword}
                    onChange={(e) => {
                      handleForgotChange(e);
                      setStrength(checkStrength(e.target.value));
                    }}
                    required
                  />

                  {forgotData.newPassword && (
                    <div style={{ marginTop: "5px", fontSize: "13px" }}>
                      Strength:{" "}
                      <span
                        style={{
                          color:
                            strength === "Weak"
                              ? "red"
                              : strength === "Medium"
                                ? "orange"
                                : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {strength}
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      height: "5px",
                      marginTop: "5px",
                      background: "#eee",
                    }}
                  >
                    <div
                      style={{
                        width:
                          strength === "Weak"
                            ? "33%"
                            : strength === "Medium"
                              ? "66%"
                              : "100%",
                        height: "100%",
                        background:
                          strength === "Weak"
                            ? "red"
                            : strength === "Medium"
                              ? "orange"
                              : "green",
                        transition: "0.3s",
                      }}
                    />
                  </div>
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <button type="submit" className="forgot-reset-btn w-100">
                Reset Password
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  className="forgot-back-btn"
                  onClick={() => setShowForgotPopup(false)}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;

//15
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Login() {
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🔥 MAIN LOGIN FUNCTION (ADMIN + STUDENT + FACULTY)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // ================= ADMIN LOGIN =================
//       if (
//         loginData.email === "admin@gmail.com" &&
//         loginData.password === "123456"
//       ) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ email: "admin@gmail.com", role: "admin" })
//         );
//         alert("Admin Login Success");
//         navigate("/admin/dashboard");
//         return;
//       }

//       // ================= STUDENT LOGIN =================
//       let res = await fetch("http://localhost:5000/api/students/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       if (res.ok) {
//         const data = await res.json();

//         localStorage.setItem(
//           "user",
//           JSON.stringify({ ...data.student, role: "student" })
//         );

//         alert("Student Login Success");
//         navigate("/student/dashboard");
//         return;
//       }

//       // ================= FACULTY LOGIN =================
//       res = await fetch("http://localhost:5000/api/faculty/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       if (res.ok) {
//         const data = await res.json();

//         localStorage.setItem(
//           "user",
//           JSON.stringify({ ...data.faculty, role: "faculty" })
//         );

//         alert("Faculty Login Success");
//         navigate("/faculty/dashboard");
//         return;
//       }

//       // ================= INVALID =================
//       alert("Invalid Email or Password");
//     } catch (error) {
//       console.log(error);
//       alert("Server Error");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ height: "100vh", background: "#f3f4f6" }}
//     >
//       <div className="card shadow p-4" style={{ width: "400px" }}>
//         <h3 className="text-center mb-4">LMS Login</h3>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="form-control mb-3"
//             value={loginData.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="form-control mb-3"
//             value={loginData.password}
//             onChange={handleChange}
//             required
//           />

//           <button className="btn btn-primary w-100">Login</button>
//         </form>

//         <div className="mt-3 text-center">
//           <small>Admin → admin@gmail.com / 123456</small>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
