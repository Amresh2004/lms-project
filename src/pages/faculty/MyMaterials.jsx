import React, { useEffect, useState } from "react";

function MyMaterials() {
  const [materials, setMaterials] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const facultyEmail = user?.email;

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/materials/faculty/${facultyEmail}`
        );
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (facultyEmail) {
      fetchMaterials();
    }
  }, [facultyEmail]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Uploaded Materials</h2>

      <div className="row">
        {materials.map((item) => (
          <div className="col-md-6 mb-4" key={item._id}>
            <div className="card shadow-sm p-3 rounded-4">
              <h5>{item.title}</h5>
              <p className="text-muted">{item.description}</p>
              <a
                href={`http://localhost:5000${item.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-pill"
              >
                View File
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyMaterials;