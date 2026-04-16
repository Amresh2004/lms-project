import React, { useEffect, useState } from "react";
import axios from "axios";
import colors from "../../components/style/colors";

export default function Assignment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/submissions")
      .then((res) => setData(res.data));
  }, []);

  // 🎨 Theme styles
  const tableHeadStyle = {
    backgroundColor: colors.primary,
    color: colors.white,
  };

  const thStyle = {
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: "center",
  };

  // ✅ GROUP + SORT SUBJECT WISE
  const groupedData = data.reduce((acc, item) => {
    const subject = item.assignmentId?.subject || "Unknown";

    if (!acc[subject]) {
      acc[subject] = [];
    }

    acc[subject].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Final Results</h3>

      <table className="table table-bordered shadow-sm">
        <thead style={tableHeadStyle}>
          <tr>
            <th style={thStyle}>Student</th>
            <th style={thStyle}>Subject</th>
            <th style={thStyle}>Assignment</th>
            <th style={thStyle}>Marks</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(groupedData).map((subject, index) => (
            <React.Fragment key={index}>
              
              {/* ✅ SUBJECT HEADER */}
              <tr>
                <td
                  colSpan="5"
                  style={{
                    fontWeight: "bold",
                    background: "#f1f5f9",
                  }}
                >
                  {subject}
                </td>
              </tr>

              {/* ✅ SUBJECT ROWS */}
              {groupedData[subject].map((r) => (
                <tr key={r._id}>
                  <td>{r.studentName}</td>
                  <td>{r.assignmentId?.subject}</td>
                  <td>{r.assignmentId?.title}</td>

                  <td>
                    {r.marks > 0 ? r.marks : "Not Given"}
                  </td>

                  <td>
                    {r.status === "Checked" ? (
                      <span className="badge bg-success">Checked</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}