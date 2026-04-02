import { useEffect, useState } from "react";
import { Card, Button, Spinner, Form, Row, Col } from "react-bootstrap";

const API_BASE = "http://localhost:5000";

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [loading, setLoading] = useState(true);


  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }

    return url;
  };

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/materials`);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Invalid response:", text);
        throw new Error("Server is not returning JSON");
      }

      const data = await response.json();

      if (data.success) {
        setMaterials(data.materials || []);
        setFilteredMaterials(data.materials || []);
      } else {
        alert(data.message || "Failed to fetch materials");
      }
    } catch (error) {
      console.error("Fetch materials error:", error);
      alert("Error loading study materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (selectedCourse === "All Courses") {
      setFilteredMaterials(materials);
    } else {
      setFilteredMaterials(
        materials.filter((item) => item.course === selectedCourse)
      );
    }
  }, [selectedCourse, materials]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this material?");
      if (!confirmDelete) return;

      const response = await fetch(`${API_BASE}/api/materials/${id}`, {
        method: "DELETE",
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Invalid delete response:", text);
        throw new Error("Server error while deleting");
      }

      const data = await response.json();

      if (data.success) {
        const updatedMaterials = materials.filter((item) => item._id !== id);
        setMaterials(updatedMaterials);

        if (selectedCourse === "All Courses") {
          setFilteredMaterials(updatedMaterials);
        } else {
          setFilteredMaterials(
            updatedMaterials.filter((item) => item.course === selectedCourse)
          );
        }

        alert("Material deleted successfully");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Something went wrong while deleting");
    }
  };

  const courses = ["All Courses", ...new Set(materials.map((item) => item.course))];

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontWeight: "700", marginBottom: "6px" }}>Study Materials</h2>
        <p style={{ color: "#6c757d", marginBottom: 0 }}>
          Access all your uploaded course materials here.
        </p>
      </div>

      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Label style={{ fontWeight: "600" }}>Filter by Course</Form.Label>
            <Form.Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : filteredMaterials.length === 0 ? (
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body>
            <p style={{ margin: 0 }}>No study materials available.</p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {filteredMaterials.map((item) => (
            <Col xs={12} key={item._id}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <div className="text-muted mb-2" style={{ fontSize: "14px" }}>
                      <span className="me-2">{item.course}</span>
                      <span className="me-2">• {item.materialType}</span>
                      <span className="me-2">
                        •{" "} {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "No date"}
                      </span>
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      <strong>Faculty:</strong> {item.facultyEmail}
                    </div>
                    {item.description && (
                      <div style={{ fontSize: "14px", marginTop: "6px", color: "#555" }}>
                        {item.description}
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-wrap gap-3 align-items-start">
                    {item.materialType === "Video Link" && item.videoUrl ? (
                      item.videoUrl.includes("youtube.com") || item.videoUrl.includes("youtu.be") ? (
                        <iframe
                          width="320"
                          height="200"
                          src={getYoutubeEmbedUrl(item.videoUrl)}
                          title="Video Player"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <a href={item.videoUrl} target="_blank" rel="noreferrer">
                          <Button variant="primary">Open Video Link</Button>
                        </a>
                      )
                    ) : item.materialType === "Video File" && item.fileUrl ? (
                      <video width="320" height="200" controls>
                        <source src={`${API_BASE}${item.fileUrl}`} />
                        Your browser does not support the video tag.
                      </video>
                    ) : item.fileUrl ? (

                      <>

                        <Button
                          variant="primary"
                          href={`${API_BASE}${item.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </Button>

                        <Button
                          variant="success"
                          href={`${API_BASE}${item.fileUrl}`}
                          download
                        >
                          Download
                        </Button>
                      </>
                    ) : null}

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>



                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}