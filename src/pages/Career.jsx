
import React from "react";
// import heroImg from "./assets/hero.png";
// import counsellingImg from "./assets/counselling.png";
import heroImg from "../assets/hero.png";
import counsellingImg from "../assets/counselling.png";

function Career() {
  return (
    <div>

      {/* HERO SECTION */}
      <section
        className="text-white py-5"
        style={{ background: "#0c4a6e" }}
      >
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <h1 className="fw-bold">
                GET THE RIGHT CAREER COUNSELLING TO LEAP THROUGH YOUR CAREER
              </h1>

              <p className="mt-3">
                Our top counsellors guide you to find your best
                career path through expert counselling.
              </p>

              <button className="btn btn-light mt-3">
                Book Counselling Session
              </button>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={heroImg}
                className="img-fluid rounded"
                alt="career"
              />
            </div>

          </div>
        </div>
      </section>


      
    


      {/* WHAT IS CAREER COUNSELLING */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center bg-info bg-opacity-10 p-4 rounded">

            <div className="col-md-5">
              <h3>What is Career Counselling?</h3>

              <img
                src={counsellingImg}
                className="img-fluid rounded mt-3"
                alt="counselling"
              />
            </div>

            <div className="col-md-7">
              <p>
                Career counselling helps students and professionals
                choose the right career path based on their interests,
                skills, and goals. Expert counsellors provide guidance
                and clarity about education, job opportunities, and
                career development.
              </p>

              <p>
                With proper counselling, students can understand their
                strengths and make informed career decisions.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* BRAINWONDERS SECTION */}
      <section className="text-center py-5">
        <div className="container">

          <h2 className="fw-bold">
            Brainwonders – Your Guide to Smart Career Decisions!
          </h2>

          <p className="text-muted">
            Personalized career guidance using scientific analysis
          </p>

        </div>
      </section>


      {/* STUDENT & PROFESSIONAL CARDS */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-6">
              <div className="card p-4 shadow">
                <h4>For Students</h4>

                <p>
                  Discover the best career options based on your
                  interests and abilities.
                </p>

                <ul>
                  <li>Career assessment</li>
                  <li>Stream selection</li>
                  <li>College guidance</li>
                </ul>

                <button className="btn btn-primary">
                  Start Your Test
                </button>
              </div>
            </div>


            <div className="col-md-6">
              <div className="card p-4 shadow">
                <h4>For Professionals</h4>

                <p>
                  Upgrade your career path with professional
                  counselling and guidance.
                </p>

                <ul>
                  <li>Career growth planning</li>
                  <li>Job switch analysis</li>
                  <li>Skill assessment</li>
                </ul>

                <button className="btn btn-dark">
                  Explore Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Career;