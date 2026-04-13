import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await axios.get("http://localhost:5000/api/assignments");
    setAssignments(res.data);
  };

  // submissions count fetch
  const getSubmissionCount = async (id) => {
    const res = await axios.get("http://localhost:5000/api/submissions");
    const filtered = res.data.filter(s => s.assignmentId?._id === id);
    return filtered.length;
  };

  const [counts, setCounts] = useState({});

  useEffect(() => {
    const loadCounts = async () => {
      const res = await axios.get("http://localhost:5000/api/submissions");
      let obj = {};
      res.data.forEach(s => {
        const aid = s.assignmentId?._id;
        obj[aid] = (obj[aid] || 0) + 1;
      });
      setCounts(obj);
    };
    loadCounts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Assignments</h2>

        <button
          className="btn btn-lg text-white"
          style={{
            background: "linear-gradient(90deg,#8e2de2,#ff0080)",
            borderRadius: "30px"
          }}
          onClick={() => navigate("/faculty/create-assignment")}
        >
          + Create Assignment
        </button>
      </div>

      {assignments.map(a => {
        const today = new Date();
        const end = new Date(a.endDate);
        const status = end < today ? "Completed" : "Active";

        return (
          <div className="card shadow-sm p-4 mb-4" key={a._id}>
            <div className="d-flex justify-content-between">
              <div>
                <h4>{a.title}</h4>
                <p className="text-primary mb-1">{a.subject}</p>
                <p className="text-muted">
                  📅 Due: {new Date(a.endDate).toLocaleDateString()}
                </p>

                <p className="fw-bold">
                  Submissions: {counts[a._id] || 0}
                </p>
              </div>
              
              <div className="text-end">
                <span
                  className={`badge ${
                    status === "Active" ? "bg-success" : "bg-secondary"
                  } mb-3`}
                >
                  {status}
                </span>

                <div>
                  {/* <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => navigate(`/faculty/edit/${a._id}`)}
                  >
                    Edit
                  </button> */}
            

                  <button
                    className="btn text-white"
                    style={{
                      background: "linear-gradient(90deg,#8e2de2,#ff0080)"
                    }}
                    onClick={() => navigate("/faculty/submissions")}
                  >
                    View Submissions
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Assignment;