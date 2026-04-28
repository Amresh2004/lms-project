import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BsClipboardCheck } from "react-icons/bs";
import "../admin/style/dashboard.css"

const API = "http://localhost:5000/api"; // base API

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    assignments: 0,
  });

  const [activities, setActivities] = useState([]);

  // 🔥 FETCH LIVE DATA
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/admin/dashboard`);
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setActivities(data.activities);
      }
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  // 🔁 AUTO REFRESH EVERY 5 SEC
  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Live overview of your LMS system</p>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Total Students</p>
              <h3>{stats.students}</h3>
            </div>
            <div className="stat-icon blue">
              <FaUserGraduate />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Total Faculty</p>
              <h3>{stats.faculty}</h3>
            </div>
            <div className="stat-icon purple">
              <FaUserGraduate />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Total Courses</p>
              <h3>{stats.courses}</h3>
            </div>
            <div className="stat-icon orange">
              <HiOutlineBookOpen />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Pending Assignments</p>
              <h3>{stats.assignments}</h3>
            </div>
            <div className="stat-icon green">
              <BsClipboardCheck />
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 LIVE ACTIVITY */}
      <div className="card custom-card mt-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">🔥 Live Activity</h5>
          <span className="badge bg-primary">Real-time</span>
        </div>

        {activities.length > 0 ? (
          <div className="activity-list">
            {activities.map((a, i) => (
              <div className="activity-card" key={i}>
                {/* ICON / DOT */}
                <div className="activity-icon">●</div>

                {/* CONTENT */}
                <div className="activity-content">
                  <p className="activity-text">{a.message}</p>
                  <span className="activity-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-4">🚫 No activity yet</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
