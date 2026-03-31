import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/courses";

function Courses() {
  const coursesData = [
  { name: "Bachelor of Business Administration [BBA]" },
  { name: "Bachelor of Business Administration in Computer Application [BBA(CA)]" },
  { name: "Bachelor of Commerce (Business Management) [BCOM(BM)]" },
  { name: "Bachelor of Commerce in Computer Application [BCOM(CA)]" },
  { name: "Bachelor of Computer Science [BSC(CS)]" },
  { name: "Bachelor of Science (Artificial Intelligence & Machine Learning) [BSC(AI&ML)]" },
  { name: "Master of Science (Computer Science) [M.Sc CS]" },
  { name: "Master of Science (Data Science) [M.Sc DS]" }
];
const createSemesters = () => {
  return ["I", "II", "III", "IV", "V", "VI"].map(sem => ({
    sem,
    subjects: []
  }));
};
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    departmentId: "",
    semester: "",
    faculty: "",
  });

  // ✅ FETCH
  const fetchData = async () => {
    const res = await axios.get(API);
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ SYNC DATA
  useEffect(() => {
    if (selectedDept && selectedSem) {
      const updatedDept = departments.find((d) => d._id === selectedDept._id);
      const updatedSem = updatedDept?.semesters.find(
        (s) => s.sem === selectedSem.sem,
      );
      setSelectedSem(updatedSem);
    }
  }, [departments]);

  // ✅ ADD / UPDATE
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.departmentId ||
      !formData.semester ||
      !formData.faculty
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editIndex !== null) {
        await axios.put(`${API}/update`, {
          ...formData,
          index: editIndex,
        });
        alert("Updated ✅");
      } else {
        await axios.post(`${API}/add`, formData);
        alert("Added ✅");
      }

      fetchData();

      setFormData({
        name: "",
        departmentId: "",
        semester: "",
        faculty: "",
      });

      setEditIndex(null);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (index) => {
    await axios.delete(`${API}/delete`, {
      data: {
        departmentId: selectedDept._id,
        semester: selectedSem.sem,
        index,
      },
    });

    fetchData();
  };

  // ✅ EDIT
  const handleEdit = (sub, index) => {
    setEditIndex(index);
    setFormData({
      name: sub.name,
      departmentId: selectedDept._id,
      semester: selectedSem.sem,
      faculty: sub.faculty,
    });
  };
  const handleAddSubject = async () => {
    if (
      !formData.name ||
      !formData.departmentId ||
      !formData.semester ||
      !formData.faculty
    ) {
      alert("Fill all fields ❗");
      return;
    }

    try {
      await axios.post(`${API}/add`, {
        departmentId: formData.departmentId,
        semester: formData.semester,
        name: formData.name,
        faculty: formData.faculty,
      });

      alert("Subject Added ✅");

      fetchData();

      setFormData({
        name: "",
        departmentId: "",
        semester: "",
        faculty: "",
      });
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div>
      <h2>Courses CRUD</h2>

      {/* FORM */}
      <input
        placeholder="Course Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <select
        value={formData.departmentId}
        onChange={(e) =>
          setFormData({
            ...formData,
            departmentId: e.target.value,
            semester: "",
          })
        }
      >
        <option value="">Select Department</option>

        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      <select
        value={formData.semester}
        onChange={(e) =>
          setFormData({
            ...formData,
            semester: e.target.value,
          })
        }
      >
        <option value="">Select Semester</option>

        {departments
          .find((d) => d._id === formData.departmentId)
          ?.semesters.map((sem, i) => (
            <option key={i} value={sem.sem}>
              Semester {sem.sem}
            </option>
          ))}
      </select>

      <input
        placeholder="Faculty"
        value={formData.faculty}
        onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
      />

      <button onClick={handleSubmit}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <hr />

      {/* VIEW */}
      {!selectedDept && (
        <div>
          {departments.map((d) => (
            <div key={d._id} onClick={() => setSelectedDept(d)}>
              {d.name}
            </div>
          ))}
        </div>
      )}

      {selectedDept && !selectedSem && (
        <div>
          <button onClick={() => setSelectedDept(null)}>Back</button>
          {selectedDept.semesters.map((s, i) => (
            <div key={i} onClick={() => setSelectedSem(s)}>
              Sem {s.sem}
            </div>
          ))}
        </div>
      )}

      {selectedSem && (
        <div>
          <button onClick={() => setSelectedSem(null)}>Back</button>

          {selectedSem?.subjects?.length > 0 ? (
            selectedSem.subjects.map((sub, index) => (
              <tr key={index}>
                <td>{sub.name}</td>
                <td>{sub.faculty}</td>
                <td>{sub.students}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No Subjects Found
              </td>
            </tr>
          )}
        </div>
      )}
    </div>
  );
}

export default Courses;
