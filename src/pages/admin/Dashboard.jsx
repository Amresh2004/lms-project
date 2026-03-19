import React from "react";

function Dashboard() {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h6>Total Students</h6>
          <h3>595</h3>
        </div>

        <div className="card">
          <h6>Total Faculty</h6>
          <h3>42</h3>
        </div>

        <div className="card">
          <h6>Total Courses</h6>
          <h3>28</h3>
        </div>

        <div className="card">
          <h6>Pending Assignments</h6>
          <h3>156</h3>
        </div>
      </div>
    </>
  );
}

export default Dashboard;