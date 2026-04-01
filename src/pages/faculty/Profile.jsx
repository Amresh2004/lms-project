import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaCamera } from "react-icons/fa";

const FacultyProfile = () => {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const fileInputRef = useRef();

  const [faculty, setFaculty] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    department: "",
    designation: "",
    image: "",
  });

  const [tempData, setTempData] = useState(faculty);
  const [isEdit, setIsEdit] = useState(false);

  // handle input
  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  // upload image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempData({
        ...tempData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleImageClick = () => {
    if (isEdit) fileInputRef.current.click();
  };

  // delete image
  const handleDeleteImage = () => {
    setTempData({ ...tempData, image: "" });
  };

  // save
  const handleUpdate = () => {
    setFaculty(tempData);
    setIsEdit(false);
    alert(
      tempData.firstName
        ? `Hiii ${tempData.firstName}! Profile updated`
        : "Profile updated"
    );
  };

  // cancel
  const handleCancel = () => {
    setTempData(faculty);
    setIsEdit(false);
  };

  return (
    <div className="bg-light min-vh-100">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
        <div>
          <h2
            style={{
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            {faculty.firstName
              ? `Hiii ${faculty.firstName}!`
              : "Hiii User!"}
          </h2>
          <small className="text-muted">
            Manage your profile information
          </small>
        </div>

        <button
          className="btn text-white"
          onClick={() => {
            setTempData(faculty);
            setIsEdit(true);
          }}
          style={{
            background: "linear-gradient(to right, #2563eb, #9333ea)",
            borderRadius: "50px",
            padding: "8px 20px",
          }}
        >
          + Update Information
        </button>
      </div>

      {/* MAIN */}
      <div className="container-fluid mt-4 d-flex justify-content-center">

        <div style={{ maxWidth: "500px", width: "100%" }}>

          {/* PROFILE IMAGE */}
          <div className="text-center mb-4 position-relative">

            <div
              onClick={handleImageClick}
              style={{ cursor: isEdit ? "pointer" : "default" }}
            >
              <img
                src={tempData.image || defaultImage}
                alt="profile"
                className="rounded-circle shadow"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  border: "4px solid white",
                }}
              />
            </div>

            {/* ICONS SIDE BY SIDE */}
            {isEdit && (
              <div
                className="position-absolute d-flex gap-2"
                style={{
                  bottom: "10px",
                  right: "calc(50% - 70px)",
                  transform: "translateX(100%)",
                }}
              >
                {/* CAMERA */}
                <div
                  onClick={handleImageClick}
                  style={{
                    background:
                      "linear-gradient(to right, #2563eb, #9333ea)",
                    borderRadius: "50%",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  <FaCamera color="white" size={12} />
                </div>

                {/* DELETE */}
                {tempData.image && (
                  <div
                    onClick={handleDeleteImage}
                    style={{
                      background: "#dc3545",
                      borderRadius: "50%",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrash color="white" size={12} />
                  </div>
                )}
              </div>
            )}

            {/* FILE INPUT */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImage}
              className="d-none"
            />
          </div>

          {/* FORM */}
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-bold mb-3 text-center">
              Personal Details
            </h5>

            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "DOB", name: "dob" },
              { label: "Mobile Number", name: "phone" },
              { label: "Email", name: "email" },
              { label: "Department", name: "department" },
              { label: "Designation", name: "designation" },
            ].map((field) => (
              <div key={field.name} className="mb-3">
                <label className="form-label text-muted">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={tempData[field.name]}
                  onChange={handleChange}
                  disabled={!isEdit}
                  className="form-control"
                />
              </div>
            ))}

            {/* BUTTONS */}
            {isEdit && (
              <div className="d-flex gap-3 mt-3">
                <button
                  onClick={handleUpdate}
                  className="btn text-white w-50"
                  style={{
                    background:
                      "linear-gradient(to right, #2563eb, #9333ea)",
                    borderRadius: "10px",
                  }}
                >
                  Update
                </button>

                <button
                  onClick={handleCancel}
                  className="btn btn-outline-secondary w-50"
                  style={{ borderRadius: "10px" }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;