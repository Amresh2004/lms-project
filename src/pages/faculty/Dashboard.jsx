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

import { FaChalkboardTeacher, FaChartLine } from "react-icons/fa";
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

const API = "http://localhost:5000/api/faculty";

function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    assignments: 0,
    attendance: 0,
  });

  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH DATA
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/dashboard?id=${user._id}`);
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);

        // 📈 Student engagement / attendance trend
        setLineData({
          labels: data.lineChart.labels,
          datasets: [
            {
              label: "Student Activity",
              data: data.lineChart.data,
              borderColor: "#3b82f6",
              backgroundColor: "#3b82f6",
              tension: 0.4,
            },
          ],
        });

        // 📊 Course-wise performance
        setBarData({
          labels: data.barChart.labels,
          datasets: [
            {
              label: "Performance",
              data: data.barChart.data,
              backgroundColor: "#8b5cf6",
              borderRadius: 8,
            },
          ],
        });
      }
    } catch (error) {
      console.log("Faculty Dashboard Error:", error);
    }
  };

  // 🔁 AUTO REFRESH (REAL-TIME FEEL)
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
        <h2 className="fw-bold">Faculty Dashboard</h2>
        <p className="text-muted">
          Manage your courses and track student performance
        </p>
      </div>

      {/* STATS */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>My Courses</p>
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
              <p>Total Students</p>
              <h3>{stats.students}</h3>
            </div>
            <div className="stat-icon purple">
              <FaChalkboardTeacher />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Assignments</p>
              <h3>{stats.assignments}</h3>
            </div>
            <div className="stat-icon orange">
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

      </div>

      <div className="row">

        {/* LINE CHART */}
        <div className="col-md-6 mb-4">
          <div className="card custom-card">
            <div className="card-header">
              <div className="icon blue">
                <FaChartLine />
              </div>
              <h5>Student Activity Trend</h5>
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
              <h5>Course Performance</h5>
            </div>

            {barData.labels && <Bar data={barData} options={options} />}
          </div>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="card custom-card mt-3">
        <h5 className="mb-3">Recent Activity</h5>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            New assignment created
            <div className="time">1 hour ago</div>
          </div>
        </div>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            Material uploaded
            <div className="time">2 hours ago</div>
          </div>
        </div>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            Attendance marked
            <div className="time">Today</div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;