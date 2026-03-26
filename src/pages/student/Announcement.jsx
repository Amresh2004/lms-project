import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/announcements";

function Announcement() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(API)
      .then(res => setList(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="announcement-page">
      <h2>📢 Announcements</h2>

      {list.length === 0 ? (
        <p className="empty-message">No announcements yet 🚫</p>
      ) : (
        list.map(item => (
          <div key={item._id} className="announcement-card">
            <h3>{item.title}</h3>

            <div className="meta">
              📅 {new Date(item.date).toLocaleString()}
            </div>

            <p>{item.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Announcement;