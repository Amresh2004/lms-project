import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
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
  const navigate = useNavigate();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    try {
      if (
        !formData.course ||
        !formData.title ||
        !formData.materialType ||
        !formData.facultyEmail ||
        (formData.materialType !== "Video Link" && !selectedFile) ||
        (formData.materialType === "Video Link" && !formData.videoUrl)
      ) {
        alert("Please fill all required fields and select a file");
        return;
      }

      setLoading(true);

      const uploadData = new FormData();
      uploadData.append("course", formData.course);
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("materialType", formData.materialType);
      uploadData.append("facultyEmail", formData.facultyEmail);
      uploadData.append("videoUrl", formData.videoUrl);

      // Only file if not video link
      if (formData.materialType !== "Video Link") {
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
      console.log("UPLOAD RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      if (data.success) {
        alert("Material uploaded successfully");

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

        navigate("/student/material");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
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

                  {/* Video URL */}
                  {formData.materialType === "Video Link" && (
                    <Form.Group className="mb-3">
                      <Form.Label>Video URL</Form.Label>
                      <Form.Control
                        name="videoUrl"
                        placeholder="Paste YouTube or Drive link"
                        value={formData.videoUrl}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )}

                  {/* File Upload */}
                {formData.materialType !== "Video Link" && (
                  <div
                    className="upload-box"
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      hidden
                      onChange={handleFileChange}
                    />
                    <BsCloudUpload size={30} />
                    <p>Click or Drag file here</p>
                    <small className="upload-subtext">
                          PDF, PPT, Video, DOC, TXT (max 500MB)
                        </small>
                    {selectedFile && <p>{selectedFile.name}</p>}
                  </div>
                )}


                  {/* {formData.materialType !== "Video Link" && (
                    <Form.Group className="mb-4">
                      <Form.Label>Upload File</Form.Label>

                      <div
                        className={`upload-box ${dragActive ? "active-drag" : ""}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="d-none"
                          onChange={handleFileChange}
                          accept=".pdf,.ppt,.pptx,.mp4,.avi,.mkv,.txt,.doc,.docx"
                        />

                        <BsCloudUpload className="upload-icon" />
                        <p className="upload-text">Click to upload or drag and drop</p>
                        <small className="upload-subtext">
                          PDF, PPT, Video, DOC, TXT (max 100MB)
                        </small>

                        {selectedFile && (
                          <div className="selected-file mt-3">
                            Selected: <strong>{selectedFile.name}</strong>
                          </div>
                        )}

                      </div>

                    </Form.Group>
                  )} */}

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
                  <span>Video Files</span>
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
      </Container>
    </div>
  );
}