import React from "react";
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

import { FaChartLine, FaUserGraduate } from "react-icons/fa";
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


function Dashboard() {

   const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "students",
        data: [120, 140, 160, 175, 210, 250],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3b82f6",
        pointRadius: 5,
      },
    ],
  };

  const barData = {
    labels: ["BCA", "BBA", "Adv CA", "BM"],
    datasets: [
      {
        label: "students",
        data: [250, 200, 90, 70],
        backgroundColor: "#8b5cf6",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
  };

  return (
    <>
      <div className="dashboard-container">

        {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">
          Welcome back! Here's what's happening with ATSS College LMS
        </p>
      </div>
       {/* STATS CARDS */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="stat-card">
            <div>
              <p>Total Students</p>
              <h3>595</h3>
              <span className="text-success">+12% from last month</span>
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
              <h3>42</h3>
              <span className="text-success">+3 new this month</span>
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
              <h3>28</h3>
              <span className="text-success">4 courses active</span>
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
              <h3>156</h3>
              <span className="text-success">Across all courses</span>
            </div>
            <div className="stat-icon green">
              <BsClipboardCheck />
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
              <h5>Student Enrollment Trend</h5>
            </div>

            <Line data={lineData} options={options} />
          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-md-6 mb-4">
          <div className="card custom-card">
            <div className="card-header">
              <div className="icon purple">
                <MdBarChart />
              </div>
              <h5>Course Activity</h5>
            </div>

            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="card custom-card mt-3">
        <h5 className="mb-3">Recent Activity</h5>

        <div className="activity-box">
          <span className="dot"></span>
          <div>
            New student enrolled in BCA
            <div className="time">2 hours ago</div>
          </div>
        </div>
        <div className="activity-box">
          <span className="dot"></span>
          <div>
           Faculty uploaded new study material
            <div className="time">3 hours ago</div>
          </div>
        </div>
        <div className="activity-box">
          <span className="dot"></span>
          <div>
            Assignment deadline approaching for BBA
            <div className="time">5 hours ago</div>
          </div>
        </div>
         <div className="activity-box">
          <span className="dot"></span>
          <div>
            New announcement posted for Adv CA
            <div className="time">6 hours ago</div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default Dashboard;