import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">

      <div className="container py-5">

        <div className="row">

          {/* Column 1 */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">ATSS College</h4>
            <p className="footer-text">
              Leading institution for Business Studies &
              Computer Application in Pune
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">Quick Links</h4>

            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">Contact Info</h4>

            <p className="footer-text">
              Pune, Maharashtra
            </p>

            <p className="footer-text">
              info@atsscollege.edu
            </p>

            <p className="footer-text">
              +91 XXX XXX XXXX
            </p>
          </div>

        </div>

        <hr className="footer-line" />

        <p className="footer-copy text-center">
          © 2026 ATSS College. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;