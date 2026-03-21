import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { useState } from "react";
// import React, { useState } from "react";
import axios from "axios";


function Contact() {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/send-mail", formData);
      alert("Message Sent Successfully");
    } catch (error) {
      alert("Error sending message");
    }
  };
  return (
    <div>

      {/* Hero Section */}
      <div
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(90deg,#3b82f6,#a855f7)"
        }}
      >
        <h1 className="fw-bold display-5" >Contact ATSS College</h1>
        <p className="lead">We're here to help and answer any questions</p>
      </div>

      {/* Contact Section */}
      <div className="container py-5 bg-light">
        
        <div className="row">

          {/* Left Side */}
          <div className="col-md-6">

            <h3 className="fw-semibold mb-3">Get in Touch</h3>

            <p className="text-secondary">
              Have questions about admissions, courses, or our LMS platform?
              Reach out to us and we'll be happy to assist you.
            </p>



            {/* Address */}
            <div className="d-flex mb-4 gap-3">
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg,#4f8cff,#8b3dff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaMapMarkerAlt size={20} color="white" />
              </div>

              <div className="mb-4">
                <h5 className="fw-semibold"> Address</h5>
                <p>
                  ATSS CBSCA
                  C2, MIDC, Opp. Niramaya Hospital, <br />
                  Chinchwad Station, <br />
                  Pune 411019. <br />
                </p>
              </div>
            </div>


            {/* Phone */}
            <div className="d-flex mb-4 gap-3">
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg,#a855f7,#ec4899)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"

                }}
              >
                <FaPhoneAlt size={20} color="white" />
              </div>


              <div className="mb-4">
                <h5 className="fw-semibold"> Phone</h5>
                <p className="text-secondary mb-0">
                  +91 985 088 6800<br />
                  Tel: 020-27472079
                </p>
              </div>
            </div>

            <div className="d-flex mb-4 gap-3">
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg,#ff7a18,#ff3d00)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaEnvelope size={20} color="white" />
              </div>
              <div className="mb-4">
                <h5 className="fw-semibold"> Email</h5>
                <p className="text-secondary mb-0">
                  atssitc@yahoo.co.in <br />
                  admin@atsscollege.edu.in
                </p>
              </div>
            </div>
            {/* office hour */}
            <div className="d-flex mb-4 gap-3">
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaClock size={20} color="white" />
              </div>

              <div className="mb-4">
                <h5 className="fw-semibold"> Office Hours</h5>
                <p className="text-secondary mb-0">
                  Monday - Friday: 9:00 AM - 6:00 PM <br />
                  Saturday: 9:00 AM - 2:00 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

          </div>


          {/* Right Side Form */}

          <div className="col-md-6 d-flex">

            <div className="card shadow p-4 border-0 w-100 ">

              <h4 className="fw-bold mb-4">Send us a Message</h4>

              <form className="d-flex flex-column" onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="form-label fw-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
            required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                     onChange={handleChange}
            required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                     onChange={handleChange}
           
                  />
                </div>


                <div className="mb-4">
                  <label className="form-label fw-medium">Message</label>
                  <textarea
                  name="message"
                    className="form-control"
                    rows="4"
                     onChange={handleChange}
            required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-100 text-white round-pill mt-2"
                  style={{
                    background:
                      "linear-gradient(90deg,#3b82f6,#a855f7)"
                  }}
                >
                  Submit Message
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>


      {/* Location */}

      <div className="container my-5">

        <h2 className="text-center fw-bold mb-4">Our Location</h2>

        {/* Map Section */}
        <div className="row justify-content-center">

          <div className="col-lg-10">

            <div className="shadow rounded overflow-hidden">

              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.558666985058!2d73.79342727372381!3d18.638910065551585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84ab759e601%3A0xffed93993c560e40!2sATSS%20College!5e0!3m2!1sen!2sin!4v1773730377736!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>

            </div>

          </div>

        </div>

      </div>
    </div>



  );
}

export default Contact;