import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Page load होताच submissions fetch
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/submissions");
      setSubmissions(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Error fetching submissions");
    }
  };

  // 🎯 Faculty marks submit
  const submitMarks = async (id) => {
    const marks = document.getElementById(`marks-${id}`).value;

    if (!marks) return alert("Enter marks first");

    try {
      await axios.put(`http://localhost:5000/api/submissions/${id}/marks`, {
        marks,
      });

      alert("Marks submitted successfully ✅");
      fetchSubmissions();
    } catch (err) {
      console.log(err);
      alert("Error submitting marks");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Student Assignment Submissions</h2>

      {submissions.length === 0 ? (
        <h4 className="text-center">No submissions yet</h4>
      ) : (
        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Assignment</th>
              <th>View Answer</th>
              <th>Status</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((s) => (
              <tr key={s._id}>
                {/* Student Name */}
                <td>{s.studentName}</td>

                {/* Subject */}
                <td>{s.assignmentId?.subject}</td>

                {/* Assignment Title */}
                <td>{s.assignmentId?.title}</td>

                {/* View PDF */}
                <td>
                  <a
                    href={`http://localhost:5000/uploads/${s.answerPdf}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View PDF
                  </a>
                </td>

                {/* Status */}
                <td>
                  {s.status === "Checked" ? (
                    <span className="badge bg-success">Checked</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                </td>

                {/* Existing Marks */}
                <td>
                  {s.marks > 0 ? (
                    <span className="fw-bold text-success">{s.marks}</span>
                  ) : (
                    <span className="text-muted">Not Given</span>
                  )}
                </td>

                {/* Marks Input */}
                <td style={{ width: "180px" }}>
                  <input
                    type="number"
                    id={`marks-${s._id}`}
                    className="form-control form-control-sm mb-2"
                    placeholder="Enter marks"
                  />

                  <button
                    className="btn btn-success btn-sm w-100"
                    onClick={() => submitMarks(s._id)}
                  >
                    Submit Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={fetchSubmissions}>
          🔄 Refresh List
        </button>
      </div>
    </div>
  );
};

export default FacultySubmissions;