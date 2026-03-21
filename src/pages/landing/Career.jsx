import React, { useEffect, useState, useRef } from "react";

import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";

import heroImg from "../../assets/hero.png";

function Career() {
  const navigate = useNavigate();

  // 📊 STATS
  const stats = [
    { value: 70, label: "Placement Rate", suffix: "%" },
    { value: 8.5, label: "Highest Package", suffix: " LPA" },
    { value: 4.5, label: "Average Package", suffix: " LPA" },
    { value: 30, label: "Recruiting Companies", suffix: "+" }
  ];

  // 🏢 COMPANIES
  const partners = [
    { name: "TCS" },
    { name: "Infosys" },
    { name: "Wipro" },
    { name: "HCLTech" },
    { name: "Accenture" },
    { name: "Cognizant" },
    { name: "IBM" },
    { name: "Microsoft" },
    { name: "Amazon" },
    { name: "Google" },
  ];

  // 🎯 STEPS
  const steps = [
    { id: 1, title: "Enrollment" },
    { id: 2, title: "Training" },
    { id: 3, title: "Projects" },
    { id: 4, title: "Interview" },
    { id: 5, title: "Placement" },
  ];

  // 🔢 COUNTER
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev =>
        prev.map((c, i) => {
          const target = stats[i].value;
          if (c < target) return Math.min(c + target / 40, target);
          return c;
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 📊 GRAPH
  const chartData = {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Placement %",
        data: [45, 55, 60, 65, 70],
        backgroundColor: "rgba(13,110,253,0.6)"
      }
    ]
  };

  // 🎠 CAROUSEL
  const [index, setIndex] = useState(0);
  const visibleCards = 1;

  // duplicate first items for smooth infinite loop
  const extendedPartners = [
    ...partners,
    ...partners.slice(0, visibleCards),
  ];

  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  // ▶ AUTO SLIDE
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // 🔁 RESET FOR INFINITE LOOP
  useEffect(() => {
    if (index === partners.length) {
      setTimeout(() => {
        setIsTransitioning(false); // remove animation
        setIndex(0);               // jump back

        setTimeout(() => {
          setIsTransitioning(true); // restore animation
        }, 50);
      }, 1000); // match transition duration
    }
  }, [index, partners.length]);

  return (
    <div>


      < section className="d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#dbeafe,#e9d5ff)"
        }}>
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <h1 className="fw-bold display-4">
                Build Your Career <br />
                <span style={{
                  background: "linear-gradient(to right,#6366f1,#9333ea)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  With Confidence
                </span>
              </h1>

              <p className="mb-0 fs-5 fw-semibold">
                Empowering students to master industry-relevant skills, build high-impact projects,
                and secure placements at global tech giants. Our structured LMS bridges the gap between
                learning and getting hired.
              </p>




              {/* ✅ SIMPLE BUTTON */}
              <button
                onClick={() => navigate("/register")}
                style={{
                  background: "linear-gradient(90deg, #6a11cb, #8e2de2)",
                  color: "#fff",
                  border: "2px solid #fff",
                  padding: "12px 28px",
                  fontSize: "18px",
                  fontWeight: "500",
                  borderRadius: "50px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "30px"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 0 15px rgba(142, 45, 226, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Register Now <span style={{ marginLeft: "10px" }}>→</span>
              </button>
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

      {/* 📊 PLACEMENT CARDS */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-5">Placement Statistics</h2>

          <div className="row g-4">
            {stats.map((s, i) => (
              <div className="col-md-3" key={i}>
                <div
                  className="p-4 bg-white shadow rounded"
                  style={{ transition: "0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h2 className="text-primary">
                    {counts[i].toFixed(1)}{s.suffix}
                  </h2>
                  <p className="mt-2">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 📈 GRAPH */}
      <section className="py-5 text-center">
        <h2 className="mb-4">Placement Growth</h2>

        <div
          style={{
            maxWidth: "650px",
            margin: "auto",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
          }}
        >
          <Bar data={chartData} />
        </div>
      </section>

      {/* 🏢 CAROUSEL */}
      <section className="py-5 text-center"
        style={{ backgroundColor: "#f3f0ff" }} // light purple
      >
        <h2 className="mb-4">Top Hiring Partners</h2>

        <div className="d-flex justify-content-center align-items-center gap-3">

          {/* LEFT BUTTON */}
          <button
            className="btn btn-tranparent"

            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          >
            <FaChevronLeft />
          </button>

          {/* CAROUSEL VIEW */}
          <div style={{ width: "80%", overflow: "hidden" }}>
            <div
              className="d-flex"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: isTransitioning
                  ? "1.5s cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none"
              }}
            >
              {extendedPartners.map((c, i) => (
                <div key={i} style={{ minWidth: "100%", padding: "10px" }}>
                  <div
                    className="shadow rounded bg-light text-center fw-bold"
                    style={{
                      padding: "60px",
                      fontSize: "28px",
                      height: "500px",        // 👈 ADD THIS
                      display: "flex",        // 👇 to center content nicely
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.3s"
                    }}

                  >
                    {c.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            className="btn btn-tranparent"

            onClick={() => setIndex((prev) => prev + 1)}
          >
            <FaChevronRight />
          </button>

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

    </div >
  );
}

export default Career;