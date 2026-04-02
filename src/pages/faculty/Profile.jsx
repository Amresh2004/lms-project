import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaCamera } from "react-icons/fa";

const FacultyProfile = () => {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const fileInputRef = useRef();

  // Load from localStorage
  // const [faculty, setFaculty] = useState(() => {
  //   const saved = localStorage.getItem("facultyProfile");
  //   return saved
  //     ? JSON.parse(saved)
  //     : {
  //         firstName: "",
  //         lastName: "",
  //         dob: "",
  //         phone: "",
  //         email: "",
  //         qualification: "",
  //         department: "",
  //         designation: "",
  //         employeeId: "",
  //         joiningDate: "",
  //         image: "",
  //       };
  // });
  const [faculty, setFaculty] = useState(() => {
  const saved = localStorage.getItem("facultyProfile");

  if (saved) {
    const parsed = JSON.parse(saved);

    return {
      ...parsed,
      image: parsed.image && parsed.image !== "null" ? parsed.image : "",
    };
  }

  return {
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    qualification: "",
    department: "",
    designation: "",
    employeeId: "",
    joiningDate: "",
    image: "",
  };
});

  const [tempData, setTempData] = useState(faculty);
  const [isEdit, setIsEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordToast, setShowPasswordToast] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Sync tempData
  useEffect(() => {
    setTempData(faculty);
  }, [faculty]);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  // ✅ FIXED IMAGE UPLOAD (Base64)
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setTempData({
          ...tempData,
          image: reader.result, // ✅ base64 stored
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setTempData({ ...tempData, image: "" });
  };

  const handleUpdate = () => {
    setFaculty(tempData);
    localStorage.setItem("facultyProfile", JSON.stringify(tempData));

    setIsEdit(false);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCancel = () => {
    setTempData(faculty);
    setIsEdit(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setShowPasswordModal(false);

    setShowPasswordToast(true);
    setTimeout(() => setShowPasswordToast(false), 2000);
  };

  // ---------------- UI ----------------
  return (
    <div className="bg-light min-vh-100">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
        <h2
          style={{
            background: "linear-gradient(to right, #2563eb, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {faculty.firstName ? `Hiii ${faculty.firstName}!` : "Hiii User!"}
        </h2>

        <button
          className="btn text-white"
          onClick={() => {
            setTempData(faculty);
            setIsEdit(true);
          }}
          style={{
            background: "linear-gradient(to right, #2563eb, #9333ea)",
            borderRadius: "50px",
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
            <img
              // src={tempData.image || defaultImage}
              src={
  tempData.image && tempData.image !== "null"
    ? tempData.image
    : defaultImage
}
              alt="profile"
              className="rounded-circle shadow"
              style={{ width: "140px", height: "140px", objectFit: "cover" }}
            />

            {isEdit && (
              <div
                className="position-absolute d-flex gap-2"
                style={{
                  bottom: "10px",
                  right: "calc(50% - 70px)",
                  transform: "translateX(100%)",
                }}
              >
                <div
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    background:
                      "linear-gradient(to right, #2563eb, #9333ea)",
                    borderRadius: "50%",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  <FaCamera color="white" />
                </div>

                {tempData.image && (
                  <div
                    onClick={handleDeleteImage}
                    style={{
                      background: "red",
                      borderRadius: "50%",
                      padding: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrash color="white" />
                  </div>
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImage}
              className="d-none"
            />
          </div>

          {/* PERSONAL DETAILS */}
          <div className="bg-white p-4 rounded shadow-sm mb-3">
            <h5 className="fw-bold mb-3">Personal Details</h5>

            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "DOB", name: "dob" },
              { label: "Mobile Number", name: "phone" },
              { label: "Email", name: "email" },
            ].map((field) => (
              <div key={field.name} className="mb-3">
                <label>{field.label}</label>
                <input
                  name={field.name}
                  value={tempData[field.name]}
                  onChange={handleChange}
                  disabled={!isEdit}
                  className="form-control"
                />
              </div>
            ))}
          </div>

          {/* PROFESSIONAL DETAILS */}
          <div className="bg-white p-4 rounded shadow-sm mb-3">
            <h5 className="fw-bold mb-3">Professional Details</h5>

            {[
              { label: "Qualification", name: "qualification" },
              { label: "Department", name: "department" },
              { label: "Designation", name: "designation" },
              { label: "Employee ID", name: "employeeId" },
              { label: "Joining Date", name: "joiningDate" },
            ].map((field) => (
              <div key={field.name} className="mb-3">
                <label>{field.label}</label>
                <input
                  name={field.name}
                  value={tempData[field.name]}
                  onChange={handleChange}
                  disabled={!isEdit}
                  className="form-control"
                />
              </div>
            ))}

            <div
              className="form-control mb-3 text-primary"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </div>
          </div>

          {/* BUTTONS */}
          {isEdit && (
            <div className="d-flex gap-3 mb-3">
              <button
                onClick={handleUpdate}
                className="btn text-white w-50"
                style={{
                  background:
                    "linear-gradient(to right, #2563eb, #9333ea)",
                }}
              >
                Update
              </button>

              <button
                onClick={handleCancel}
                className="btn btn-secondary w-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Change Password</h5>

              <input type="password" name="oldPassword" placeholder="Old Password"
                className="form-control mb-2" onChange={handlePasswordChange} />

              <input type="password" name="newPassword" placeholder="New Password"
                className="form-control mb-2" onChange={handlePasswordChange} />

              <input type="password" name="confirmPassword" placeholder="Confirm Password"
                className="form-control mb-3" onChange={handlePasswordChange} />

              <button className="btn btn-primary w-100" onClick={handlePasswordUpdate}>
                Update Password
              </button>

              <button className="btn btn-secondary w-100 mt-2"
                onClick={() => setShowPasswordModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE TOAST */}
      {showToast && (
        <div style={{ position: "fixed", top: "90px", right: "20px" }}>
          <div className="bg-success text-white px-4 py-2 rounded shadow">
            Profile updated!
          </div>
        </div>
      )}

      {/* PASSWORD TOAST */}
      {showPasswordToast && (
        <div style={{ position: "fixed", top: "90px", right: "20px" }}>
          <div
            className="text-white px-4 py-2 rounded shadow"
            style={{
              background: "green",
            }}
          >
            Password updated!
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;