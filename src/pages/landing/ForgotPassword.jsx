import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        alert(data.message);
        return;
      }

      alert("Password updated successfully ✅");

      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h4>Forgot Password</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            className="form-control mb-3"
            placeholder="Enter new password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;