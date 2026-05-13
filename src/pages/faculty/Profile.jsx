import React, { useEffect, useState } from "react";
import axios from "axios";
import "../student/style/profile.css";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api/students";

const Profile = () => {

  // ✅ GET USER FROM LOCAL STORAGE
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const userId = storedUser?._id;

  // ✅ SAFE DEFAULT STATE
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    employeeId: "",
    qualification: "",
    designation: "",
    joiningDate: ""
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ FETCH PROFILE
  const fetchProfile = async () => {
    try {

      if (!userId) {
        console.log("No user id found");
        return;
      }

      const res = await axios.get(`${API}/profile/${userId}`);

      // ✅ SAFETY CHECK
      if (res.data) {
        setUser(res.data);
      }

    } catch (err) {
      console.log("PROFILE ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // ✅ UPDATE PROFILE
  const handleUpdate = async () => {
    try {

      // ✅ CORRECT ROUTE
      await axios.put(`${API}/update/${userId}`, user);

      alert("Profile updated successfully ✅");

      setEditMode(false);

      fetchProfile();

    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container py-4">

      <h2 className="fw-bold">My Profile</h2>

      <p className="text-muted">
        Manage your personal information
      </p>

      <div className="row mt-4">

        {/* LEFT CARD */}
        <div className="col-md-4">

          <div className="card text-center p-4 shadow-sm">

            <div className="profile-avatar">
              👤
            </div>

            {/* ✅ SAFE ACCESS */}
            <h4 className="mt-3">
              {user?.name || "No Name"}
            </h4>

            <p className="text-primary">
              {user?.employeeId || "-"}
            </p>

            <button
              className="btn btn-primary mt-2"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-8">

          <div className="card p-4 shadow-sm">

            {/* PERSONAL INFO */}
            <h5 className="mb-3">
              Personal Information
            </h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={user?.name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  value={user?.address || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={user?.phone || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

            </div>

            {/* PROFESSIONAL INFO */}
            <h5 className="mt-5 mb-3">
              Professional Details
            </h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label>Employee ID</label>

                <input
                  type="text"
                  name="employeeId"
                  value={user?.employeeId || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label>Qualification</label>

                <input
                  type="text"
                  name="qualification"
                  value={user?.qualification || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label>Designation</label>

                <input
                  type="text"
                  name="designation"
                  value={user?.designation || ""}
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
                  value={user?.joiningDate?.split("T")[0] || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="form-control"
                />
              </div>

            </div>

            {/* SAVE BUTTON */}
            {editMode && (
              <button
                className="btn btn-success mt-4"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            )}

            <br />

            <Link
              to="/forgot-password"
              className="text-decoration-none mt-3"
            >
              Forgot Password?
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;