import "./Hero.css";
import heroImg from "../assets/student.jpg"; // add your image here
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
                ATSS College Digital <br /> Learning Platform
              </h1>

              <p className="hero-text">
                Welcome to ATSS College of Business Studies & Computer
                Application's innovative Learning Management System. Access
                courses, assignments, and resources anytime, anywhere.
              </p>

              <div className="hero-buttons">
                <Link className="login-btn" to="/login">
                  Login to LMS <span className="arrow">→</span>
                </Link>

                <Link className="course-btn" to="/courses">Explore Courses</Link>
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
          <h2 className="why-title">Why Choose ATSS LMS?</h2>

          <p className="why-subtitle">
            Experience modern education with our comprehensive learning platform
          </p>

          <div className="row mt-5">
            {/* Card 1 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box blue">
                  <FaBookOpen />
                </div>

                <h4>Quality Education</h4>

                <p>Access comprehensive study materials and resources</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box purple">
                  <FaUserGraduate />
                </div>

                <h4>Expert Faculty</h4>

                <p>Learn from experienced professors and industry experts</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box orange">
                  <FaAward />
                </div>

                <h4>Recognized Programs</h4>

                <p>BCA, BBA, and specialized courses</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-3">
              <div className="why-card">
                <div className="icon-box green">
                  <FaChartLine />
                </div>

                <h4>Career Growth</h4>

                <p>Build skills for professional success</p>
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
