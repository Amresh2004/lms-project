import React, { useState } from "react";
import { FaChartPie, FaChartLine, FaDownload } from "react-icons/fa";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#4f46e5", "#9333ea", "#f97316", "#10b981"];

const pieData = [
  { name: "BCA", value: 40 },
  { name: "MCA", value: 30 },
  { name: "BBA", value: 20 },
  { name: "MBA", value: 10 },
];

const barData = [
  { month: "Jan", submissions: 85 },
  { month: "Feb", submissions: 92 },
  { month: "Mar", submissions: 78 },
  { month: "Apr", submissions: 88 },
  { month: "May", submissions: 95 },
  { month: "Jun", submissions: 90 },
];

const Reports = () => {

  // 🔥 Hover state
  const [activeIndex, setActiveIndex] = useState(null);

  const handleEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="container-fluid p-4" style={{ background: "#f5f7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold">Reports & Analytics</h2>
          <p className="text-muted">View comprehensive analytics and download reports</p>
        </div>

        <button
          className="btn text-white px-4 py-2 d-flex align-items-center gap-2"
          style={{
            background: "linear-gradient(90deg,#4f46e5,#9333ea)",
            borderRadius: "25px"
          }}
        >
          <FaDownload />
          Export Report
        </button>
      </motion.div>

      {/* CHARTS */}
      <div className="row g-4">

        {/* ✅ SIMPLE PIE + PREMIUM ANIMATION */}
        <div className="col-md-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-white shadow rounded-4"
          >
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span
                style={{
                  background: "linear-gradient(90deg,#4f46e5,#9333ea)",
                  padding: "8px",
                  borderRadius: "10px",
                  color: "#fff"
                }}
              >
                <FaChartPie />
              </span>
              Student Enrollment by Course
            </h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                      style={{
                        transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                        transition: "0.3s ease",
                        cursor: "pointer",
                        filter: activeIndex === index ? "brightness(1.3)" : "none",
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

          </motion.div>
        </div>

        {/* BAR CHART */}
        <div className="col-md-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-white shadow rounded-4"
          >
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span
                style={{
                  background: "linear-gradient(90deg,#4f46e5,#9333ea)",
                  padding: "8px",
                  borderRadius: "10px",
                  color: "#fff"
                }}
              >
                <FaChartLine />
              </span>
              Assignment Submission Rate
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submissions" fill="#9333ea" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* CARDS */}
      <div className="row mt-4 g-4">

        <div className="col-md-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 text-white rounded-4 shadow"
            style={{ background: "linear-gradient(90deg,#0284c7,#06b6d4)" }}
          >
            <h6>Total Students</h6>
            <h2 className="fw-bold">595</h2>
            <small>Across all programs</small>
          </motion.div>
        </div>

        <div className="col-md-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 text-white rounded-4 shadow"
            style={{ background: "linear-gradient(90deg,#9333ea,#ec4899)" }}
          >
            <h6>Course Participation</h6>
            <h2 className="fw-bold">89%</h2>
            <small>Average attendance</small>
          </motion.div>
        </div>

        <div className="col-md-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 text-white rounded-4 shadow"
            style={{ background: "linear-gradient(90deg,#f97316,#ef4444)" }}
          >
            <h6>Assignment Completion</h6>
            <h2 className="fw-bold">87%</h2>
            <small>On-time submissions</small>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Reports;