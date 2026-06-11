import React, { useState, useEffect } from "react";
import "../admin/style/courses.css";
import { FaBook, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const YEAR_NAMES = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year"];

function buildInitialYears(count) {
  return Array.from({ length: count }, (_, yi) => ({
    name: YEAR_NAMES[yi] || `Year ${yi + 1}`,
    semCount: 2,
    semesters: Array.from({ length: 2 }, (_, si) => ({
      name: `Semester ${si + 1}`,
      subjects: [""],
    })),
  }));
}

function Courses() {
  const gradients = [
    "linear-gradient(135deg,#4f46e5,#7c3aed)",
    "linear-gradient(135deg,#06b6d4,#3b82f6)",
    "linear-gradient(135deg,#f97316,#fb7185)",
    "linear-gradient(135deg,#22c55e,#14b8a6)",
    "linear-gradient(135deg,#9333ea,#ec4899)",
    "linear-gradient(135deg,#0ea5e9,#6366f1)",
  ];

  // ── list view state ──
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [newSubject, setNewSubject] = useState("");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ code: "", name: "", type: "", credits: "" });

  // ── add-course form state ──
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deptName, setDeptName] = useState("");
  const [yearCount, setYearCount] = useState(3);
  const [courseYears, setCourseYears] = useState(buildInitialYears(3));

  // ── fetch ──
  const fetchDepartments = () => {
    fetch("http://localhost:5000/api/course/departments")
      .then((r) => r.json())
      .then((d) => setDepartments(Array.isArray(d) ? d : []))
      .catch(console.log);
  };

  useEffect(() => { fetchDepartments(); }, []);

  // ─────────────────────────────────────────────
  // Form helpers
  // ─────────────────────────────────────────────
  const handleYearCountChange = (val) => {
    const n = Math.max(1, Math.min(5, Number(val)));
    setYearCount(n);
    setCourseYears(buildInitialYears(n));
  };

  const handleSemCountChange = (yi, val) => {
    const n = Math.max(1, Math.min(8, Number(val)));
    setCourseYears((prev) =>
      prev.map((y, i) =>
        i !== yi ? y : {
          ...y,
          semCount: n,
          semesters: Array.from({ length: n }, (_, si) => ({
            name: `Semester ${si + 1}`,
            subjects: y.semesters[si]?.subjects || [""],
          })),
        }
      )
    );
  };

  const addSubjectField = (yi, si) => {
    setCourseYears((prev) =>
      prev.map((y, i) =>
        i !== yi ? y : {
          ...y,
          semesters: y.semesters.map((s, j) =>
            j !== si ? s : { ...s, subjects: [...s.subjects, ""] }
          ),
        }
      )
    );
  };

  const removeSubjectField = (yi, si, subi) => {
    setCourseYears((prev) =>
      prev.map((y, i) =>
        i !== yi ? y : {
          ...y,
          semesters: y.semesters.map((s, j) =>
            j !== si ? s : {
              ...s,
              subjects: s.subjects.filter((_, k) => k !== subi),
            }
          ),
        }
      )
    );
  };

  const handleSubjectChange = (yi, si, subi, val) => {
    setCourseYears((prev) =>
      prev.map((y, i) =>
        i !== yi ? y : {
          ...y,
          semesters: y.semesters.map((s, j) =>
            j !== si ? s : {
              ...s,
              subjects: s.subjects.map((sub, k) => (k === subi ? val : sub)),
            }
          ),
        }
      )
    );
  };

  // ─────────────────────────────────────────────
  // Submit full course
  // ─────────────────────────────────────────────
  const handleSaveCourse = async () => {
    if (!deptName.trim()) return alert("Enter department name");
    setSaving(true);
    try {
      const payload = {
        name: deptName.trim(),
        years: courseYears.map((y) => ({
          name: y.name,
          semesters: y.semesters.map((s) => ({
            name: s.name,
            subjects: s.subjects.filter((sub) => sub.trim()),
          })),
        })),
      };

      const res = await fetch(
        "http://localhost:5000/api/course/departments/add-full",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setDeptName("");
        setYearCount(3);
        setCourseYears(buildInitialYears(3));
        fetchDepartments();
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────
  // Delete department (cascade)
  // ─────────────────────────────────────────────
  const handleDeleteDepartment = async (e, deptId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this department and ALL its data?")) return;
    try {
      await fetch(`http://localhost:5000/api/course/departments/${deptId}`, {
        method: "DELETE",
      });
      fetchDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  // ─────────────────────────────────────────────
  // Existing drill-down handlers
  // ─────────────────────────────────────────────
  const handleDeptClick = async (dept) => {
    setSelectedDept(dept);
    setSelectedYear(null);
    setSelectedSem(null);
    setYears([]); setSemesters([]); setSubjects([]);
    try {
      const res = await fetch(`http://localhost:5000/api/course/years/${dept._id}`);
      const data = await res.json();
      const uniqueYears = [...new Map(data.map((item) => [item.name, item])).values()];
      const yearOrder = { FY: 1, "First Year": 1, SY: 2, "Second Year": 2, TY: 3, "Third Year": 3, "Fourth Year": 4, "Fifth Year": 5 };
      setYears(uniqueYears.sort((a, b) => (yearOrder[a.name] || 999) - (yearOrder[b.name] || 999)));
    } catch (err) { console.log(err); }
  };

  const handleYearClick = async (year) => {
    setSelectedYear(year);
    setSelectedSem(null);
    setSemesters([]); setSubjects([]);
    try {
      const res = await fetch(`http://localhost:5000/api/course/semesters/${year._id}`);
      const data = await res.json();
      const unique = [...new Map(data.map((item) => [item.name, item])).values()];
      setSemesters(unique.sort((a, b) => parseInt(a.name.replace(/\D/g, "")) - parseInt(b.name.replace(/\D/g, ""))));
    } catch (err) { console.log(err); }
  };

  const handleSemClick = async (sem) => {
    setSelectedSem(sem);
    setSubjects([]);
    try {
      const res = await fetch(`http://localhost:5000/api/course/subjects/${sem._id}`);
      const data = await res.json();
      setSubjects(Array.isArray(data) ? [...new Map(data.map((item) => [item.name, item])).values()] : []);
    } catch (err) { console.log(err); }
  };

  const handleEdit = (sub) => {
    setEditId(sub._id);
    setForm({ code: sub.code, name: sub.name, type: sub.type, credits: sub.credits });
  };

  const handleAddSubject = async () => {
    const url = editId
      ? `http://localhost:5000/api/course/subjects/${editId}`
      : "http://localhost:5000/api/course/subjects/add";
    await fetch(url, {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, name: newSubject || form.name, semesterId: selectedSem._id }),
    });
    setEditId(null);
    setNewSubject("");
    setForm({ code: "", name: "", type: "", credits: "" });
    handleSemClick(selectedSem);
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    await fetch(`http://localhost:5000/api/course/subjects/${id}`, { method: "DELETE" });
    handleSemClick(selectedSem);
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="container p-4">
      <h2 className="mb-4 fw-bold text-center">Courses</h2>

      {/* ================= DEPARTMENTS ================= */}
      {!selectedDept && (
        <>
          {/* Header row */}
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => setShowForm((p) => !p)}
            >
              <FaPlus />
              {showForm ? "Cancel" : "Add Course"}
            </button>
          </div>

          {/* ── FULL COURSE FORM ── */}
          {showForm && (
            <div className="card shadow-sm mb-4 p-4">
              <h5 className="fw-bold mb-3">New Course Setup</h5>

              {/* Department name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Department / Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. BSc (CS)"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
              </div>

              {/* Number of years */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Number of Years</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: 100 }}
                  min={1} max={5}
                  value={yearCount}
                  onChange={(e) => handleYearCountChange(e.target.value)}
                />
              </div>

              {/* Years → Semesters → Subjects */}
              {courseYears.map((year, yi) => (
                <div key={yi} className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                  <h6 className="fw-bold mb-3" style={{ color: "#4f46e5" }}>
                    📅 {year.name}
                  </h6>

                  {/* Semester count for this year */}
                  <div className="mb-3 d-flex align-items-center gap-3">
                    <label className="form-label mb-0 fw-semibold">Number of Semesters:</label>
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: 80 }}
                      min={1} max={8}
                      value={year.semCount}
                      onChange={(e) => handleSemCountChange(yi, e.target.value)}
                    />
                  </div>

                  {/* Semesters */}
                  <div className="row g-3">
                    {year.semesters.map((sem, si) => (
                      <div key={si} className="col-md-6">
                        <div className="border rounded p-3 bg-white">
                          <p className="fw-semibold mb-2" style={{ color: "#06b6d4" }}>
                            📚 {sem.name}
                          </p>

                          {/* Subject inputs */}
                          {sem.subjects.map((sub, subi) => (
                            <div key={subi} className="d-flex gap-2 mb-2">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder={`Subject ${subi + 1}`}
                                value={sub}
                                onChange={(e) => handleSubjectChange(yi, si, subi, e.target.value)}
                              />
                              {sem.subjects.length > 1 && (
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => removeSubjectField(yi, si, subi)}
                                >
                                  <FaMinus size={10} />
                                </button>
                              )}
                            </div>
                          ))}

                          <button
                            className="btn btn-sm btn-outline-primary mt-1"
                            onClick={() => addSubjectField(yi, si)}
                          >
                            <FaPlus size={10} /> Add Subject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Save */}
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSaveCourse}
                  disabled={saving || !deptName.trim()}
                >
                  {saving ? "Saving..." : "Save Course"}
                </button>
              </div>
            </div>
          )}

          {/* Department Cards */}
          <div className="row g-4">
            {departments.map((dept, index) => (
              <div key={dept._id} className="col-md-3">
                <div
                  className="department-card position-relative"
                  style={{ background: gradients[index % gradients.length] }}
                  onClick={() => handleDeptClick(dept)}
                >
                  <button
                    className="btn btn-sm position-absolute top-0 end-0 m-2 p-1"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "none",
                      borderRadius: "6px",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                    onClick={(e) => handleDeleteDepartment(e, dept._id)}
                    title="Delete department"
                  >
                    <FaTrash size={12} />
                  </button>
                  <FaBook className="dept-icon" />
                  <h4>{dept.name}</h4>
                  <p>View Courses</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= YEARS ================= */}
      {selectedDept && !selectedYear && (
        <>
          <button className="btn btn-secondary mb-3" onClick={() => { setSelectedDept(null); setYears([]); }}>
            ← Back
          </button>
          <h4>{selectedDept.name}</h4>
          <div className="row g-3 mt-2">
            {years.map((year, index) => (
              <div key={year._id} className="col-md-4">
                <div
                  className="year-card"
                  style={{ background: gradients[index % gradients.length] }}
                  onClick={() => handleYearClick(year)}
                >
                  <FaBook className="year-icon" />
                  <h4>{year.name}</h4>
                  <p>View Semesters</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= SEMESTERS ================= */}
      {selectedYear && !selectedSem && (
        <>
          <button className="btn btn-secondary mb-3" onClick={() => { setSelectedYear(null); setSemesters([]); }}>
            ← Back
          </button>
          <h4>{selectedYear.name}</h4>
          <div className="row g-3 mt-2">
            {semesters.map((sem, index) => (
              <div key={sem._id} className="col-md-4">
                <div
                  className="sem-card"
                  style={{ background: gradients[index % gradients.length] }}
                  onClick={() => handleSemClick(sem)}
                >
                  <FaBook className="sem-icon" />
                  <h4>{sem.name}</h4>
                  <p>View Subjects</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= SUBJECTS ================= */}
      {selectedSem && (
        <>
          <button className="btn btn-secondary mb-3" onClick={() => { setSelectedSem(null); setSubjects([]); }}>
            ← Back
          </button>
          <h4 className="mb-3">{selectedSem.name} — Subjects</h4>

          <div className="card p-3 shadow-sm mb-3">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleAddSubject}>
                {editId ? "Update" : "Add"}
              </button>
              {editId && (
                <button className="btn btn-secondary" onClick={() => { setEditId(null); setNewSubject(""); }}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="card shadow-sm">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Sr No</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((sub, index) => (
                    <tr key={sub._id}>
                      <td>{index + 1}</td>
                      <td>{sub.name}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => { handleEdit(sub); setNewSubject(sub.name); }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteSubject(sub._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No subjects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Courses;