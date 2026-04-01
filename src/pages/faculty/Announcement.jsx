import React, { useState, useEffect } from "react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("announcements"));
    if (saved) setAnnouncements(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements));
  }, [announcements]);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add announcement
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.message) {
      alert("Fill all fields");
      return;
    }

    const newAnnouncement = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setForm({ title: "", message: "" });
  };

  // Delete
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">📢 Announcements</h2>
        <p className="text-muted">Share updates with students</p>
      </div>

      {/* FORM */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-4">
              <input
                type="text"
                name="title"
                placeholder="Announcement Title"
                className="form-control"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="message"
                placeholder="Write announcement..."
                className="form-control"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100">
                Post
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* ANNOUNCEMENT LIST */}
      <div className="row g-4">

        {announcements.length === 0 && (
          <p className="text-muted">No announcements yet</p>
        )}

        {announcements.map((a) => (
          <div className="col-md-6" key={a.id}>
            <div className="card announcement-card p-3 shadow-sm">

              <div className="d-flex justify-content-between">
                <h5 className="fw-bold">{a.title}</h5>
                <small className="text-muted">{a.date}</small>
              </div>

              <p className="mt-2">{a.message}</p>

              <div className="text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Announcement;