import React, { useState } from "react";
import axios from "axios"; // ✅ correct place

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    darkMode: false,
    emailNotif: true,
    assignmentNotif: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };


const handleSave = async () => {
  try {
    console.log("Sending Data:", form); // 🔍 debug

    await axios.post("http://localhost:5000/api/settings", form);

    alert("Saved successfully ✅");
  } catch (error) {
    console.error(error);
    alert("Error saving settings ❌");
  }
}

  return (
    <div className="students-container">

      {/* HEADER */}
      <h2>⚙️ Settings</h2>

      {/* TABS */}
      <div className="tabs">
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("security")}>Security</button>
        <button onClick={() => setActiveTab("notifications")}>Notifications</button>
        <button onClick={() => setActiveTab("appearance")}>Appearance</button>
      </div>

      {/* CONTENT */}
      <div className="custom-card">

        {/* PROFILE */}
        {activeTab === "profile" && (
          <>
            <h3>Profile Settings</h3>

            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

          

            <button className="add-btn" onClick={handleSave}>
              Save Changes
            </button>
          </>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <>
            <h3>Security Settings</h3>

            <input placeholder="New Password" type="password" />
            <input placeholder="Confirm Password" type="password" />

            <label>
              Session Timeout:
              <select>
                <option>5 min</option>
                <option>15 min</option>
                <option>30 min</option>
              </select>
            </label>

            <button className="add-btn" onClick={handleSave}>
              Update Security
            </button>
          </>
        )}


        {/* NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <>
            <h3>Notification Settings</h3>

            <label>
              Email Notifications
              <input
                type="checkbox"
                name="emailNotif"
                checked={form.emailNotif}
                onChange={handleChange}
              />
            </label>

            <label>
              Assignment Alerts
              <input
                type="checkbox"
                name="assignmentNotif"
                checked={form.assignmentNotif}
                onChange={handleChange}
              />
            </label>

            <button className="add-btn" onClick={handleSave}>
              Save Notifications
            </button>
          </>
        )}

        {/* APPEARANCE */}
        {activeTab === "appearance" && (
          <>
            <h3>Appearance</h3>

            <label>
              Dark Mode
              <input
                type="checkbox"
                name="darkMode"
                checked={form.darkMode}
                onChange={handleChange}
              />
            </label>

            <button className="add-btn" onClick={handleSave}>
              Save Appearance
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Settings;