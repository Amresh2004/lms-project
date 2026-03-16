import "./Hero.css";
import heroImg from "../assets/atss.jpg"; // add your image here
import {
  FaBookOpen,
  FaUserGraduate,
  FaAward,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6">
              <h1 className="hero-title">
                ATSS CBSCA College Digital Learning Platform
              </h1>

              <p className="hero-text">
                Welcome to ATSS CBSCA College of Business Studies & Computer
                Application's innovative Learning Management System. Access
                courses, assignments, and resources anytime, anywhere.
              </p>

              <div className="hero-buttons">
                <Link className="login-btn" to="/login">
                  Login to LMS <span className="arrow">→</span>
                </Link>

                <Link className="course-btn" to="/courses">
                  Explore Courses
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <div className="hero-img-box">
                <img
                  src={heroImg}
                  alt="Student learning"
                  className="hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container text-center">
          <h2 className="why-title">Why Choose ATSS CBSCA College?</h2>

          <p className="why-subtitle">
            Experience excellence in education, professional development, and
            holistic student growth.
          </p>

          <div className="row mt-5">
            {/* Card 1 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box blue">
                  <FaBookOpen />
                </div>

                <br />

                <h4>Excellence In Teaching Learning Practices</h4>

                <p>
                  Everything is so easy and seamless that it generates better
                  performance.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box purple">
                  <FaUserGraduate />
                </div>

                <br />

                <h4>Develop High Quality Professionals</h4>

                <p>
                  Encouraged to develop creativity and make conceptual learning
                  very strong.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box orange">
                  <FaAward />
                </div>

                <br />

                <h4>Integrated Approach Towards Learning & Evaluation</h4>

                <p>
                  Evaluation is not only the assessment of learning but also the
                  assessment for learning.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box green">
                  <FaChartLine />
                </div>

                <br />

                <h4>Connecting With Co-Curricular Activities</h4>

                <p>
                  Co-curricular activities are an important aspect of overall
                  grooming of students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="register-now">
        <h1>Ready to Start Your Learning Journey?</h1>
        <br />
        <p>Join ATSS College and access world-class education from anywhere</p>
        <br />
        <Link className="register-btn1" to="/register">
          Register Now <span className="arrow">→</span>
        </Link>
      </section>
    </>
  );
}

export default Hero;
