import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  axios.get(
    `http://localhost:5000/api/quiz/student?course=${user.course}&year=${user.year}`
  )
  .then(res => setData(res.data.quizzes));
}, []);

  const fetchData = async () => {
    const a = await axios.get("http://localhost:5000/api/assignments");
    const s = await axios.get("http://localhost:5000/api/submissions");

    setAssignments(a.data);
    setSubmissions(s.data);
  };

  const openSubmitPage = (id) => {
    navigate(`/student/submit/${id}`);
  };

  // ⭐ check assignment submitted or not
  const isSubmitted = (assignmentId) => {
    return submissions.some(
      (s) => s.assignmentId?._id === assignmentId
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📚 My Assignments</h2>

      {assignments.map((a) => {
        const submitted = isSubmitted(a._id);

        return (
          <div className="card shadow-lg mb-4 p-4" key={a._id}>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="fw-bold">{a.title}</h4>
                <p className="text-primary mb-1">{a.subject}</p>
                <small className="text-danger">
                  Last Date: {a.endDate?.substring(0, 10)}
                </small>
              </div>

              {/* 🔄 STATUS BADGE */}
              {submitted ? (
                <span className="badge bg-success h-25">Submitted</span>
              ) : (
                <span className="badge bg-warning text-dark h-25">Pending</span>
              )}
            </div>

            <div className="mt-3">

              {/* ⭐ ATTRACTIVE VIEW BUTTON */}
              <a
                href={`http://localhost:5000/uploads/${a.questionPdf}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary me-3"
                style={{
                  borderRadius: "25px",
                  padding: "8px 18px",
                  fontWeight: "600"
                }}
              >
               View Assignment
              </a>

              {/* ⭐ SUBMIT BUTTON / DISABLED */}
              {submitted ? (
                <button className="btn btn-secondary" disabled>
                  ✔ Already Submitted
                </button>
              ) : (
                <button
                  className="btn text-white"
                  style={{
                    background: "linear-gradient(90deg,#2f80ed,#bb6bd9)",
                    borderRadius: "25px",
                    padding: "8px 18px",
                    fontWeight: "600"
                  }}
                  onClick={() => openSubmitPage(a._id)}
                >
                  ⬆ Submit Assignment
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Assignments;