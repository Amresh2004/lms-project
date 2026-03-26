import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../admin/style/announcment.css";
import { toast } from "react-toastify";

const API = "http://localhost:5000/api/announcements";

function Announcement() {
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "All Students",
  });

  // ✅ FETCH DATA FROM DB
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(API)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  };

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.title || !form.message) {
      return toast.error("Fill all fields ⚠️");
    }

    if (editId) {
      axios
        .put(`${API}/${editId}`, form)
        .then(() => {
          toast.success("Updated successfully ✏️");
          fetchData();
          resetForm();
        })
        .catch((err) => toast.error("Update failed ❌"));
    } else {
      axios
        .post(API, form)
        .then(() => {
          toast.success("Announcement added 🚀");
          fetchData();
          resetForm();
        })
        .catch((err) => toast.error("Add failed ❌"));
    }
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Delete this announcement?")) return;

    axios.delete(`${API}/${id}`).then(() => {
      toast.success("Deleted successfully 🗑️");
      fetchData();
    });
  };

  // ✅ EDIT
  const handleEdit = (item) => {
    toast.info("Editing announcement ✏️");

    setForm({
      title: item.title,
      message: item.message,
      audience: item.audience,
    });

    setEditId(item._id);
    setShowForm(true);
  };

  // ✅ RESET FORM
  const resetForm = () => {
    setForm({
      title: "",
      message: "",
      audience: "All Students",
    });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="announcement-page">
      {/* HEADER */}
      <div className="top-section">
        <div>
          <h2>Announcements</h2>
          <p>Create and manage college announcements</p>
        </div>

        <button className="create-btn" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Create Announcement
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-card">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
          />

          <select name="audience" value={form.audience} onChange={handleChange}>
            <option>All Students</option>
            <option>BBA Students</option>
            <option>BBA(CA) Students</option>
            <option>BCOM(BM) Students</option>
            <option>BCOM(CA) Students</option>
            <option>BSC(CS) Students</option>
            <option>BSC(AI & ML) Students</option>
            <option>MSC(CS) Students</option>
            <option>MSC(DS) Students</option>
          </select>

          <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
        </div>
      )}

      {/* LIST */}
      {list.length === 0 ? (
        <p className="empty-message">
          📭 No announcements yet <br />
          <span>Add your first announcement 🚀</span>
        </p>
      ) : (
        list.map((item) => (
          <div key={item._id} className="announcement-card">
            <div className="card-top">
              <h3>{item.title}</h3>

              <div>
                <FaEdit className="edit" onClick={() => handleEdit(item)} />
                <FaTrash
                  className="delete"
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>

            <div className="meta">
              📅 {new Date(item.date).toLocaleString()} | 🕒{" "}
              {new Date(item.date).toLocaleTimeString()} | 👥 {item.audience}
            </div>

            <p>{item.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Announcement;
