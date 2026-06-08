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
    const response = await fetch(
      "http://localhost:5000/api/materials"
    );

    const data = await response.json();

    if (data.success) {
      setMaterials(data.materials);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMaterials();
  }, []);

  

 

  const courses = ["All Courses", ...new Set(materials.map((item) => item.course))];

  return (
    <Row>
  {materials.map((item) => (
    <Col md={6} key={item._id}>
      <Card className="mb-3">
        <Card.Body>
          <h5>{item.title}</h5>

          <p>
            <strong>Course:</strong> {item.course}
          </p>

          <p>
            <strong>Subject:</strong> {item.subject}
          </p>

          <p>
            <strong>Faculty:</strong> {item.facultyEmail}
          </p>

          {item.fileUrl && (
            <>
              <Button
                href={`http://localhost:5000${item.fileUrl}`}
                target="_blank"
              >
                View
              </Button>

              <Button
                className="ms-2"
                href={`http://localhost:5000${item.fileUrl}`}
                download
              >
                Download
              </Button>
            </>
          )}

          {item.videoUrl && (
            <Button
              variant="warning"
              href={item.videoUrl}
              target="_blank"
            >
              Watch Video
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
    // <div style={{ padding: "24px" }}>
    //   <div style={{ marginBottom: "20px" }}>
    //     <h2 style={{ fontWeight: "700", marginBottom: "6px" }}>Study Materials</h2>
    //     <p style={{ color: "#6c757d", marginBottom: 0 }}>
    //       Access all your uploaded course materials here.
    //     </p>
    //   </div>

    //   <Card className="border-0 shadow-sm rounded-4 mb-4">
    //     <Card.Body>
    //       <Form.Group>
    //         <Form.Label style={{ fontWeight: "600" }}>Filter by Course</Form.Label>
    //         <Form.Select
    //           value={selectedCourse}
    //           onChange={(e) => setSelectedCourse(e.target.value)}
    //         >
    //           {courses.map((course, index) => (
    //             <option key={index} value={course}>
    //               {course}
    //             </option>
    //           ))}
    //         </Form.Select>
    //       </Form.Group>
    //     </Card.Body>
    //   </Card>

    //   {loading ? (
    //     <div className="text-center py-5">
    //       <Spinner animation="border" />
    //     </div>
    //   ) : filteredMaterials.length === 0 ? (
    //     <Card className="border-0 shadow-sm rounded-4">
    //       <Card.Body>
    //         <p style={{ margin: 0 }}>No study materials available.</p>
    //       </Card.Body>
    //     </Card>
    //   ) : (
    //     <Row className="g-4">
    //       {filteredMaterials.map((item) => (
    //         <Col xs={12} key={item._id}>
    //           <Card className="border-0 shadow-sm rounded-4">
    //             <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
    //               <div>
    //                 <h5 className="mb-1">{item.title}</h5>
    //                 <div className="text-muted mb-2" style={{ fontSize: "14px" }}>
    //                   <span className="me-2">{item.course}</span>
    //                   <span className="me-2">• {item.materialType}</span>
    //                   <span className="me-2">
    //                     •{" "}
    //                     {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "No date"}
    //                   </span>
    //                 </div>
    //                 <div style={{ fontSize: "14px" }}>
    //                   <strong>Faculty:</strong> {item.facultyEmail}
    //                 </div>
    //                 {item.description && (
    //                   <div style={{ fontSize: "14px", marginTop: "6px", color: "#555" }}>
    //                     {item.description}
    //                   </div>
    //                 )}
    //               </div>

    //               <div className="d-flex flex-wrap gap-3 align-items-start">
    //                 {item.materialType === "Video Link" && item.videoUrl ? (
    //                   item.videoUrl.includes("youtube.com") || item.videoUrl.includes("youtu.be") ? (
    //                     <iframe
    //                       width="320"
    //                       height="200"
    //                       src={getYoutubeEmbedUrl(item.videoUrl)}
    //                       title="Video Player"
    //                       allowFullScreen
    //                       style={{ border: "none", borderRadius: "12px" }}
    //                     ></iframe>
    //                   ) : (
    //                     <a href={item.videoUrl} target="_blank" rel="noreferrer">
    //                       <Button variant="primary">Open Video Link</Button>
    //                     </a>
    //                   )
    //                 ) : item.materialType === "Video File" && item.fileUrl ? (
    //                   <video
    //                     width="320"
    //                     height="200"
    //                     controls
    //                     style={{ borderRadius: "12px" }}
    //                   >

    //                     <source src={`${API_BASE}${item.fileUrl}`} />
    //                     Your browser does not support the video tag.
    //                   </video>
    //                 ) : item.fileUrl ? (

    //                   <>
    //                     <div className="d-flex gap-2 flex-wrap">
    //                       <Button
    //                         variant="primary"
    //                         href={`${API_BASE}${item.fileUrl}`}
    //                         target="_blank"
    //                         rel="noreferrer"
    //                       >
    //                         View
    //                       </Button>

    //                       <Button
    //                         variant="success"
    //                         href={`${API_BASE}${item.fileUrl}`}
    //                         download
    //                       >
    //                         Download
    //                       </Button>
    //                     </div>
    //                   </>
    //                 ) : null}

    //                 {/* <Button
    //                   variant="danger"
    //                   onClick={() => handleDelete(item._id)}
    //                 >
    //                   Delete
    //                 </Button> */}



    //               </div>

    //             </Card.Body>
    //           </Card>
    //         </Col>
    //       ))}
    //     </Row>
    //   )}
    // </div>

  );
}







