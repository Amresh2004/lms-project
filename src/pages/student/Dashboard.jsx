import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { FaChartLine } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BsClipboardCheck } from "react-icons/bs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API = "http://localhost:5000/api/students";

function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    assignments: 0,
    attendance: 0,
    grade: "N/A",
  });

  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH DATA FROM BACKEND
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/dashboard?id=${user._id}`);
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);

        // 📈 LINE CHART (attendance trend)
        setLineData({
          labels: data.lineChart.labels,
          datasets: [
            {
              label: "Attendance",
              data: data.lineChart.data,
              borderColor: "#3b82f6",
              backgroundColor: "#3b82f6",
              tension: 0.4,
            },
          ],
        });

        // 📊 BAR CHART (course progress)
        setBarData({
          labels: data.barChart.labels,
          datasets: [
            {
              label: "Progress",
              data: data.barChart.data,
              backgroundColor: "#8b5cf6",
              borderRadius: 8,
            },
          ],
        });
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  // 🔁 AUTO REFRESH
  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    plugins: {
      legend: { position: "bottom" },
    },
    responsive: true,
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Student Dashboard</h2>
        <p className="text-muted">
          Welcome back! Here's your learning overview
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

      <div className="row">

        {/* LINE CHART */}
        <div className="col-md-6 mb-4">
          <div className="card custom-card">
            <div className="card-header">
              <div className="icon blue">
                <FaChartLine />
              </div>
              <h5>Attendance Trend</h5>
            </div>

            {lineData.labels && <Line data={lineData} options={options} />}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-md-6 mb-4">
          <div className="card custom-card">
            <div className="card-header">
              <div className="icon purple">
                <MdBarChart />
              </div>
              <h5>Course Progress</h5>
            </div>

            {barData.labels && <Bar data={barData} options={options} />}
          </div>
        </div>

      </div>

      {/* ACTIVITY */}
      <div className="card custom-card mt-3">
        <h5 className="mb-3">Recent Activity</h5>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            Assignment submitted successfully
            <div className="time">1 hour ago</div>
          </div>
        </div>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            New material uploaded
            <div className="time">3 hours ago</div>
          </div>
        </div>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            Attendance updated
            <div className="time">Today</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;