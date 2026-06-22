import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Button,
  Form,
  Badge,
} from "react-bootstrap";

export default function AdmissionEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/enquiries/all"
      );

      setEnquiries(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/enquiries/update/${id}`,
        { status }
      );

      fetchEnquiries();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/enquiries/delete/${id}`
      );

      fetchEnquiries();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "primary";

      case "Contacted":
        return "warning";

      case "Interested":
        return "info";

      case "Converted":
        return "success";

      case "Not Interested":
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "30px",
      }}
    >
      <Container>
        <Card
          className="shadow border-0"
          style={{
            borderRadius: "20px",
          }}
        >
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">
                Admission Enquiries
              </h2>

              <Badge bg="dark">
                Total: {enquiries.length}
              </Badge>
            </div>

            {loading ? (
              <h5 className="text-center">
                Loading...
              </h5>
            ) : (
              <Table
                bordered
                hover
                responsive
                className="align-middle"
              >
                <thead
                  style={{
                    background: "#eef2ff",
                  }}
                >
                  <tr className="text-center">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Course</th>
                    <th>Admission Year</th>
                    <th>Qualification</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center"
                      >
                        No enquiries found
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr
                        key={e._id}
                        className="text-center"
                      >
                        <td>{e.fullName}</td>

                        <td>{e.email}</td>

                        <td>{e.phone}</td>

                        <td>
                          {e.courseInterested}
                        </td>

                        <td>
                          {e.yearOfAdmission}
                        </td>

                        <td>
                          {e.qualification}
                        </td>

                        <td>{e.city}</td>

                        <td>
                          <Badge
                            bg={getStatusColor(
                              e.status
                            )}
                          >
                            {e.status}
                          </Badge>
                        </td>

                        <td>
                          <Form.Select
                            size="sm"
                            value={e.status}
                            onChange={(event) =>
                              updateStatus(
                                e._id,
                                event.target.value
                              )
                            }
                            className="mb-2"
                          >
                            <option value="New">
                              New
                            </option>

                            <option value="Contacted">
                              Contacted
                            </option>

                            <option value="Interested">
                              Interested
                            </option>

                            <option value="Converted">
                              Converted
                            </option>

                            <option value="Not Interested">
                              Not Interested
                            </option>
                          </Form.Select>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              deleteEnquiry(
                                e._id
                              )
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}