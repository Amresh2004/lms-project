import React from "react";
import heroImg from "../../assets/hero.png";
import { FaArrowRight } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";


import heroImg from "../../assets/hero.png";



function Career() {
  const partners = [
    { name: "TCS", initial: "T", bg: "primary-subtle", text: "primary" },
    { name: "Infosys", initial: "I", bg: "secondary-subtle", text: "secondary" },
    { name: "Wipro", initial: "W", bg: "danger-subtle", text: "danger" },
    { name: "HCLTech", initial: "H", bg: "success-subtle", text: "success" },
    { name: "Accenture", initial: "A", bg: "info-subtle", text: "info" },
    { name: "Cognizant", initial: "C", bg: "primary-subtle", text: "primary" },
    { name: "IBM", initial: "I", bg: "secondary-subtle", text: "secondary" },
    { name: "Microsoft", initial: "M", bg: "success-subtle", text: "success" },
    { name: "Amazon", initial: "A", bg: "warning-subtle", text: "warning" },
    { name: "Google", initial: "G", bg: "danger-subtle", text: "danger" },
  ];

  const steps = [
    { id: 1, title: "Enrollment", desc: "Join our career track program." },
    { id: 2, title: "Training", desc: "Master skills with industry experts." },
    { id: 3, title: "Live Projects", desc: "Build a strong GitHub portfolio." },
    { id: 4, title: "Interview Prep", desc: "Mock interviews & resume building." },
    { id: 5, title: "Placement", desc: "Get hired at a top company." },
  ];
  return (
    <div>

      {/* HERO SECTION */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #dbeafe, #e9d5ff)"
        }}
      >
        <div className="container">
          <div className="row align-items-center text-center text-md-start">

            {/* LEFT TEXT */}
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Build Your Career{" "}<br />
                <span className="text-primary">With  </span>

                <span
                  style={{
                    background: "linear-gradient(to right, #6366f1, #9333ea)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Us
                </span>
              </h1>


              <div className="container my-5">
                <div
                  className="p-4 text-center shadow"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #9333ea)",
                    color: "white",
                    borderRadius: "20px",
                    animation: "fadeInUp 1s ease-in-out"
                  }}
                >
                  <p className="mb-0 fs-5 fw-semibold">
                    Empowering students to master industry-relevant skills, build high-impact projects,
                    and secure placements at global tech giants. Our structured LMS bridges the gap between
                    learning and getting hired.
                  </p>
                </div>

                {/* Animation Keyframes */}
                <style>
                  {`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
                </style>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src={heroImg}
                className="img-fluid rounded"
                alt="career"
                style={{ maxWidth: "500px", borderRadius: "50px" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* MASTER SKILLS SECTION */}
      <section className="py-5 bg-light">
        <div className="container">

          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="fw-bold">Master In-Demand Skills</h2>
            <p className="text-muted">
              Our curriculum is constantly updated to align with what top tech companies are actively hiring for.
            </p>
          </div>

          {/* DATA */}
          {(() => {
            const skillsData = [
              {
                title: "Frontend Development",
                color: "primary",
                skills: [
                  { name: "React / Next.js", level: 30 },
                  { name: "TypeScript", level: 85 },
                  { name: "Tailwind CSS", level: 95 },
                  { name: "HTML/CSS/JS", level: 100 },
                ],
              },
              {
                title: "Backend Development",
                color: "success",
                skills: [
                  { name: "Node.js / Express", level: 85 },
                  { name: "Python / Django", level: 80 },
                  { name: "REST APIs", level: 90 },
                  { name: "PostgreSQL / MongoDB", level: 85 },
                ],
              },
            ];

            return (
              <div className="row g-4">
                {skillsData.map((category, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="p-4 shadow rounded bg-white h-100">

                      <h4 className="fw-bold mb-4">{category.title}</h4>

                      {category.skills.map((skill, i) => (
                        <div className="mb-3" key={i}>
                          <div className="d-flex justify-content-between">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>

                          <div className="progress">
                            <div
                              className={`progress-bar bg-${category.color}`}
                              role="progressbar"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

        </div>
      </section>
      {/* WHY COMPANIES HIRE SECTION */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* LEFT CONTENT */}
            <div className="col-md-6">

              <h2 className="fw-bold mb-3">
                Why Top Companies <br /> Hire From Us
              </h2>

              <p className="text-muted mb-4">
                We bridge the gap between academic education and industry
                requirements. Our graduates are productive from day one.
              </p>

              {/* FEATURES */}
              {[
                {
                  title: "Pre-vetted Skilled Candidates",
                  desc: "Every candidate undergoes rigorous assessments and builds a portfolio of real-world projects before being recommended."
                },
                {
                  title: "Industry-Ready Graduates",
                  desc: "Trained on the exact tech stacks and Agile workflows your engineering teams use today."
                },
                {
                  title: "Zero Hiring Cost",
                  desc: "Our platform partners with you directly to fulfill your hiring needs without massive agency fees."
                }
              ].map((item, index) => (
                <div className="d-flex mb-4" key={index}>
                  <div className="me-3">
                    <span className="badge bg-primary rounded-circle p-3">✓</span>
                  </div>
                  <div>
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}

            </div>

            {/* RIGHT TESTIMONIALS */}
            <div className="col-md-6">

              {[
                {
                  text: "The candidates we've hired from EduPro LMS have consistently outperformed traditional university recruits in practical coding tests. They come in knowing Git, Docker, and React deeply.",
                  name: "Michelle Kwan",
                  role: "VP of Engineering, TechFlow"
                },
                {
                  text: "Finding good Data Scientists is hard. Finding Data Scientists who also understand deployment and business logic is rare. EduPro provides exactly that rare talent.",
                  name: "James Rodriguez",
                  role: "Director of Data, AnalyticsCorp"
                }
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-4 mb-4 shadow rounded bg-white"
                  style={{
                    borderLeft: i === 0 ? "5px solid #0d6efd" : "5px solid #6f42c1"
                  }}
                >
                  <p className="fst-italic">"{t.text}"</p>

                  <div className="d-flex align-items-center mt-3">
                    <div
                      className="rounded-circle bg-secondary me-3"
                      style={{ width: "50px", height: "50px" }}
                    ></div>

                    <div>
                      <h6 className="mb-0 fw-bold">{t.name}</h6>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>
      {/* hiringcomp */}
      <section className="py-5 text-center">
        <div className="container">

          <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
            250+ Companies
          </span>

          <h2 className="fw-bold mb-2">Our Top Hiring Partners</h2>
          <p className="text-muted mb-5">
            Join our alumni network at top tech companies
          </p>

          <div className="row g-4 justify-content-center">
            {partners.map((c, i) => (
              <div className="col-6 col-md-4"
                style={{ flex: "0 0 20%", maxWidth: "20%" }}
                key={i}>
                <div className={`p-4 rounded shadow-sm bg-${c.bg} text-center`}
                  style={{
                    minHeight: "160px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >

                  <div
                    className={`rounded-circle bg-white mx-auto mb-2 d-flex align-items-center justify-content-center text-${c.text}`}
                    style={{ width: "50px", height: "50px", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <strong>{c.initial}</strong>
                  </div>

                  <h6 className={`fw-bold m-0 text-${c.text}`}>
                    {c.name}
                  </h6>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section className="py-5 bg-light">
        <div className="container">

          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="fw-bold">Your Path to Placement</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              A proven step-by-step process to become job-ready.
            </p>
          </div>

          {/* Steps */}
          <div className="d-flex flex-wrap justify-content-center align-items-start">

            {steps.map((step, index) => (
              <React.Fragment key={step.id}>

                <div
                  className="text-center p-3"
                  style={{
                    width: "200px",
                    transition: "0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >

                  {/* Circle */}
                  <div
                    className="rounded-circle border d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      fontSize: "20px",
                      fontWeight: "bold"
                    }}
                  >
                    {step.id}
                  </div>

                  <h6 className="fw-bold">Step {step.id}</h6>
                  <h5 className="fw-bold text-primary">{step.title}</h5>
                  <p className="text-muted small">{step.desc}</p>

                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div
                    className="d-none d-lg-flex align-items-center justify-content-center"
                    style={{
                      height: "80px",   // same as circle height
                      width: "50px",
                      fontSize: "24px",
                      color: "#6c757d"
                    }}
                  >
                    <FaArrowRight size={24} color="#0d6efd" />
                  </div>
                )}

              </React.Fragment>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}

export default Career;