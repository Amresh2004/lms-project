import React, { useEffect, useState } from "react";
import axios from "axios";
import "../student/style/profile.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
const API = "http://localhost:5000/api/students";

const Profile = () => {
  // ✅ GET USER FROM LOCAL STORAGE
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  // ✅ STATE
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  // ✅ FETCH DATA
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/profile/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/profile/update/${userId}`, user);
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">My Profile</h2>
      <p className="text-muted">Manage your personal information</p>

      <div className="row mt-4">
        {/* LEFT CARD */}
        <div className="col-md-4">
          <div className="card text-center p-4 shadow-sm">
            <div className="profile-avatar">👤</div>

            <h4 className="mt-3">{user.name || "No Name"}</h4>
            <p className="text-primary">{user.employeeId || "-"}</p>
            {/* <p className="text-primary">{user.rollNumber || "-"}</p> */}
            {/* <p>{user.semester || "-"}</p> */}

            <button
              className="btn btn-primary mt-2"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-md-8">
  <div className="card p-4 shadow-sm">

    {/* PERSONAL DETAILS */}
    <h5 className="mb-3">Personal Information</h5>

    <div className="row g-3">
      <div className="col-md-6">
        <label>Full Name</label>
        <input
          name="name"
          value={user.name || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Email</label>
        <input
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Address</label>
        <input
          name="address"
          value={user.address || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Phone</label>
        <input
          name="phone"
          value={user.phone || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>
    </div>

    {/* PROFESSIONAL DETAILS */}
    <h5 className="mt-5 mb-3">Professional Details</h5>

    <div className="row g-3">
      <div className="col-md-6">
        <label>Employee ID</label>
        <input
          name="employeeId"
          value={user.employeeId || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Qualification</label>
        <input
          name="qualification"
          value={user.qualification || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Designation</label>
        <input
          name="designation"
          value={user.designation || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={user.joiningDate || ""}
          onChange={handleChange}
          disabled={!editMode}
          className="form-control"
        />
      </div>
    </div>

    {/* KEEP YOUR EXISTING SAVE BUTTON + FORGOT PASSWORD HERE */}
    {editMode && (
      <button className="btn btn-success mt-3" onClick={handleUpdate}>
        Save Changes
      </button>
    )}

    <br />

    <Link to="/forgot-password" className="text-decoration-none">
      Forgot Password?
    </Link>

  </div>
</div>
      </div>
    </div>
  );
};

export default Profile;
