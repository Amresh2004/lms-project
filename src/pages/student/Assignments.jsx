
import React, { useEffect, useState } from "react";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Page load होताच API call
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assignments");
      console.log("Assignments from API 👉", res.data); // DEBUG
      setAssignments(res.data);
      setLoading(false);
    } catch (err) {
      console.log("API ERROR ❌", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading assignments...</h3>;
  }

  return (
    <div className="container p-4">
      <h2 className="mb-4">📚 My Assignments</h2>

      <div className="row">
        {assignments.length === 0 ? (
          <h5>No assignments available</h5>
        ) : (
          assignments.map((a) => (
            <div className="col-md-4 mb-4" key={a._id}>
              <div className="card shadow-sm p-3">
                <h5>{a.title}</h5>

                <p className="text-muted">
                  {a.course || a.subject}
                </p>

                <p>📅 Due: {a.dueDate}</p>

                <span className="badge bg-warning">
                  {a.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments; 