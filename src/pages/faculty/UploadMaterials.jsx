import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import {
  BsCloudUpload,
  BsFileEarmarkPdf,
  BsCameraVideo,
  BsFileEarmarkSlides,
  BsFileText,
} from "react-icons/bs";
import "./style/UploadMaterials.css";

const API_BASE = "http://localhost:5000";

export default function UploadMaterials() {
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [materialsLoading, setMaterialsLoading] = useState(true);
  const [materials, setMaterials] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("success");

  const [formData, setFormData] = useState({
    course: "Programming in C",
    title: "",
    description: "",
    materialType: "PDF Document",
    facultyEmail: "",
    videoUrl: "",
  });

  const courses = [
    "Programming in C",
    "Data Structures",
    "Database Management System",
    "Operating System",
    "Computer Networks",
  ];

  const materialTypes = [
    "PDF Document",
    "Video File",
    "Presentation",
    "Text Notes",
    "Video Link",
  ];

  const showMessage = (title, message, variant = "success") => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupVariant(variant);
    setShowPopup(true);
  };

  // FIX: popup close jhalyavar redirect nahi honar
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const fetchMaterials = async () => {
    try {
      setMaterialsLoading(true);

      const response = await fetch(`${API_BASE}/api/materials`);
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Invalid materials response:", text);
        throw new Error("Server is not returning JSON");
      }

      const data = await response.json();

      if (data.success) {
        setMaterials(data.materials || []);
      } else {
        showMessage("Error", data.message || "Failed to fetch materials", "danger");
      }
    } catch (error) {
      console.error("Fetch materials error:", error);
      showMessage("Error", error.message || "Error loading materials", "danger");
    } finally {
      setMaterialsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const resetForm = () => {
    setFormData({
      course: "Programming in C",
      title: "",
      description: "",
      materialType: "PDF Document",
      facultyEmail: "",
      videoUrl: "",
    });

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "materialType") {
      if (value !== "Video Link") {
        setFormData((prev) => ({
          ...prev,
          materialType: value,
          videoUrl: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          materialType: value,
        }));
      }

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const pickedFile = e.target.files[0];
    if (pickedFile) {
      setSelectedFile(pickedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setSelectedFile(droppedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const isVideoLink = formData.materialType === "Video Link";

    if (
      !formData.course ||
      !formData.title ||
      !formData.materialType ||
      !formData.facultyEmail ||
      (isVideoLink && !formData.videoUrl.trim()) ||
      (!isVideoLink && !selectedFile)
    ) {
      showMessage("Error", "Please fill all required fields", "danger");
      return;
    }

    try {
      setLoading(true);

      const uploadData = new FormData();
      uploadData.append("course", formData.course);
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("materialType", formData.materialType);
      uploadData.append("facultyEmail", formData.facultyEmail);
      uploadData.append("videoUrl", formData.videoUrl);

      if (!isVideoLink && selectedFile) {
        uploadData.append("file", selectedFile);
      }

      const response = await fetch(`${API_BASE}/api/materials/upload`, {
        method: "POST",
        body: uploadData,
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Unexpected response from server");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      if (data.success) {
        resetForm();
        await fetchMaterials();
        showMessage("Success", data.message || "Material uploaded successfully", "success");
      } else {
        showMessage("Error", data.message || "Upload failed", "danger");
      }
    } catch (error) {
      console.error("Upload error:", error);
      showMessage("Error", error.message || "Something went wrong", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this material?"
      );
      if (!confirmDelete) return;

      console.log("Deleting material id:", id);

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
      console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      if (data.success) {
        await fetchMaterials();
        showMessage("Success", data.message || "Material deleted successfully", "success");
      } else {
        showMessage("Error", data.message || "Delete failed", "danger");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showMessage("Error", error.message || "Something went wrong while deleting", "danger");
    }
  };

  return (
    <>
      <div className="upload-page">
        <Container fluid="lg" className="py-4">
          <div className="page-heading">
            <h2>Upload Study Materials</h2>
            <p>Share resources with your students</p>
          </div>

          <Row className="g-4">
            <Col lg={8}>
              <Card className="main-card border-0">
                <Card.Body className="p-4">
                  <Form onSubmit={handleUpload}>
                    <Form.Group className="mb-4">
                      <Form.Label>Select Course</Form.Label>
                      <Form.Select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="custom-input"
                      >
                        {courses.map((course, index) => (
                          <option key={index} value={course}>
                            {course}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Material Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="e.g., Chapter 3 - Control Structures"
                        value={formData.title}
                        onChange={handleChange}
                        className="custom-input"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        placeholder="Brief description of the study material"
                        value={formData.description}
                        onChange={handleChange}
                        className="custom-input textarea-box"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Material Type</Form.Label>
                      <Form.Select
                        name="materialType"
                        value={formData.materialType}
                        onChange={handleChange}
                        className="custom-input"
                      >
                        {materialTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Faculty Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="facultyEmail"
                        placeholder="Enter faculty email"
                        value={formData.facultyEmail}
                        onChange={handleChange}
                        className="custom-input"
                      />
                    </Form.Group>

                    {formData.materialType === "Video Link" && (
                      <Form.Group className="mb-4">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control
                          type="text"
                          name="videoUrl"
                          placeholder="Paste YouTube or Drive link"
                          value={formData.videoUrl}
                          onChange={handleChange}
                          className="custom-input"
                        />
                      </Form.Group>
                    )}

                    {formData.materialType !== "Video Link" && (
                      <Form.Group className="mb-4">
                        <Form.Label>Upload File</Form.Label>
                        <div
                          className={`upload-box ${dragActive ? "active-drag" : ""}`}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            hidden
                            onChange={handleFileChange}
                            accept=".pdf,.ppt,.pptx,.mp4,.avi,.mkv,.txt,.doc,.docx,video/*"
                          />

                          <BsCloudUpload size={30} />
                          <p>Click or Drag file here</p>
                          <small className="upload-subtext">
                            PDF, PPT, Video, DOC, TXT
                          </small>

                          {selectedFile && (
                            <p className="mt-2 mb-0">
                              Selected: <strong>{selectedFile.name}</strong>
                            </p>
                          )}
                        </div>
                      </Form.Group>
                    )}

                    <Button
                      type="submit"
                      className="upload-btn w-100 border-0"
                      disabled={loading}
                    >
                      {loading ? "Uploading..." : "Upload Material"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="side-card border-0 mb-3">
                <Card.Body className="p-4">
                  <h5 className="side-title">Supported Formats</h5>

                  <div className="format-item">
                    <BsFileEarmarkPdf className="format-icon pdf" />
                    <span>PDF Documents</span>
                  </div>

                  <div className="format-item">
                    <BsCameraVideo className="format-icon video" />
                    <span>Video Files / Video Links</span>
                  </div>

                  <div className="format-item">
                    <BsFileEarmarkSlides className="format-icon ppt" />
                    <span>Presentations</span>
                  </div>

                  <div className="format-item">
                    <BsFileText className="format-icon text" />
                    <span>Text Notes</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs={12}>
              <Card className="border-0 shadow-sm rounded-3">
                <Card.Body className="p-2">
                  <div className="mb-2">
                    <h5 className="mb-2">Uploaded Materials</h5>
                  </div>

                  {materialsLoading ? (
                    <div className="text-center py-3">
                      <Spinner animation="border" size="sm" />
                    </div>
                  ) : materials.length === 0 ? (
                    <p className="mb-0 small">No materials uploaded yet.</p>
                  ) : (
                    <Row className="g-2">
                      {materials.map((item) => (
                        <Col xs={12} key={item._id}>
                          <Card className="border rounded-3">
                            <Card.Body className="d-flex justify-content-between align-items-center flex-wrap p-2">
                              <div>
                                <h6 className="mb-1" style={{ fontSize: "15px" }}>
                                  {item.title}
                                </h6>

                                <div
                                  className="text-muted mb-1"
                                  style={{ fontSize: "12px" }}
                                >
                                  {item.course} • {item.materialType} •{" "}
                                  {item.createdAt
                                    ? new Date(item.createdAt).toLocaleDateString()
                                    : "No date"}
                                </div>

                                <div style={{ fontSize: "12px" }}>
                                  <strong>Faculty:</strong> {item.facultyEmail}
                                </div>

                                {item.description && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      marginTop: "4px",
                                      color: "#555",
                                    }}
                                  >
                                    {item.description}
                                  </div>
                                )}

                                {item.videoUrl && (
                                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                                    <strong>Video:</strong>{" "}
                                    <a
                                      href={item.videoUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Link
                                    </a>
                                  </div>
                                )}
                              </div>

                              <div className="d-flex gap-1 flex-wrap mt-2 mt-md-0">
                                {item.fileUrl && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      href={`${API_BASE}${item.fileUrl}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      View
                                    </Button>

                                    <Button
                                      size="sm"
                                      variant="success"
                                      href={`${API_BASE}${item.fileUrl}`}
                                      download
                                    >
                                      Download
                                    </Button>
                                  </>
                                )}

                                {item.videoUrl && (
                                  <Button
                                    size="sm"
                                    variant="warning"
                                    href={item.videoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Watch
                                  </Button>
                                )}

                                <Button
                                  size="sm"
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showPopup} onHide={handlePopupClose} centered>
        <Modal.Header closeButton>
          <Modal.Title
            className={popupVariant === "success" ? "text-success" : "text-danger"}
          >
            {popupTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{popupMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={popupVariant === "success" ? "success" : "danger"}
            onClick={handlePopupClose}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}