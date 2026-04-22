import React, { useEffect, useState } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BsClipboardCheck } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

const API = "http://localhost:5000/api/students";

function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    assignments: 0,
    attendance: 0,
    grade: "N/A",
  });

  const [activities, setActivities] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/dashboard?id=${user._id}`);
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setActivities(data.activities || []);
      }
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Student Dashboard</h2>
        <p className="text-muted">
          Live overview of your academic progress
        </p>
      </div>

      {/* STATS */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Enrolled Courses</p>
              <h3>{stats.courses}</h3>
            </div>
            <div className="stat-icon blue">
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
            <div className="stat-icon purple">
              <BsClipboardCheck />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Attendance</p>
              <h3>{stats.attendance}%</h3>
            </div>
            <div className="stat-icon green">
              <FaChartLine />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Average Grade</p>
              <h3>{stats.grade}</h3>
            </div>
            <div className="stat-icon orange">
              <MdBarChart />
            </div>
          </div>
        </div>

      </div>

      {/* 🔥 LIVE ACTIVITY */}
      <div className="card custom-card mt-3">
        <h5 className="mb-3">Live Activity</h5>

        {activities.length > 0 ? (
          activities.map((a, i) => (
            <div className="activity-box" key={i}>
              <span className="dot"></span>
              <div>
                {a.message}
                <div className="time">{a.time || "Just now"}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No activity yet</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;