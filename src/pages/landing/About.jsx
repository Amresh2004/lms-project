import React, { useState } from 'react';
import collegeImg from "../assets/aboutimage.jpg"; // your uploaded image
import "./About.css";
import founderImg from "../assets/Founder.png";
import chairpersonImg from "../assets/chairperson.png";
import secretaryImg from "../assets/general-secretary.png";
import principalImg from "../assets/principle.png";
import React from 'react'
import collegeImg from "../../assets/aboutimage.jpg"; // your uploaded image
import "../landing/style/About.css";


import founderImg from "../../assets/Founder.png";
import chairpersonImg from "../../assets/chairperson.png";
import secretaryImg from "../../assets/general-secretary.png";
import principalImg from "../../assets/principle.png";



function About() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <>

      
      {/* Top Gradient Header */}
      <div className="about-header text-center text-white d-flex align-items-center justify-content-center">
        <div>
          <h1 className="fw-bold">About ATSS College</h1>
          <p className="lead">
            Excellence in Business Studies & Computer Application
          </p>
        </div>
      </div>

      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Side Content */}
            <div className="col-lg-6">
              <h1 className="about-heading fw-bold mb-4">
                Welcome to ATSS College of Business Studies & Computer Application
              </h1>

              <p className="text-muted">
                <h4>Introduction<br /></h4>
                Audyogik Tantra Shikshan Sanstha popularity known as ATSS is an education trust
                established in 1963 and registered under Bombay Public Trust Act 1965 with registration
                number F-324 dated 16/7/66 and is also registered under Society's Act 1860 with registration
                number MAH/499/P of 6/7/65.
              </p>

              <p className="text-muted">
                <h4>The Beginning<br /></h4>
                Deep rooted commitment towards education, strong social sense and focus on creating employable
                youth have been the pillars of 'Audyogik Tantra Shikshan Sanstha[ATSS]. Since its inception in year
                1966 when Mr. M.D.Jambhekar, a visionary leader and educationist founded ATSS with the prime focus
                of giving skill training to the youth of Pimpri-Chinchwad for generation employable manpower for
                the emerging industries at that time.
                The trust was supported by various manufacturing industries located in the industrial belt of
                Pimpri Chinchwad like Atlas Copco,TELCO[present Tata Motors],Forbes Marshall to name a few
              </p>

              <p className="text-muted">
                <h4>Growth and Expansion<br /></h4>
                Over the period of last five decades, the trust established other Institutes as a
                response to the changing needs of Pimpri Chinchwad area. As per the changing times and
                needs of the industries and society, the true spread its wings in diversified educational
                areas in the field of primary education, technical education, computer education and
                management education.
              </p>

              <p className="text-muted">
                <h4>Different institutes under ATSS<br /></h4>
                The Trust runs various recognized and affiliated institutes namely "Institute of Industrial
                and Computer Management and Research"[IICMR]; ATSS College of Business Studies and Computer
                Applications [CBSCA]. ATSS Industrial Training Center[ITC] and City Pride School under two
                campus operations, one at Pradhikaran,Nigdi and other at Chinchwad.
              </p>

            </div>

            {/* Right Side Image */}
            <div className="col-lg-6">
              <div className="about-img">
                <img
                  src={collegeImg}
                  alt="ATSS College"
                  className="img-fluid shadow"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision Mission Section */}

      <section className="vision-section py-5">
        <div className="container">
          <div className="row g-4">

            {/* Vision Card */}
            <div className="col-lg-6">
              <div className="vision-card">
                <div className="icon-box vision-icon">
                  <i className="bi bi-eye"></i>
                </div>

                <h3 className="fw-bold mt-3">Our Vision</h3>

                <p>
                  "To be center for quality education and research, through excellent academic
                  ambience and natural relation with society and industry, with an objective of
                  purposeful existence in society."
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="col-lg-6">
              <div className="vision-card">
                <div className="icon-box mission-icon">
                  <i className="bi bi-bullseye"></i>
                </div>

                <h3 className="fw-bold mt-3">Our Mission</h3>

                <p>
                  "We, at ATSS regard it as our mission to develop competent professionals &
                  entrepreneurs capable of withstanding and managing the ever-changing scenario
                  in the world of Information Technology & Management, and having a deep-rooted sense
                  of social responsibility."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Programs Offered Section */}

      <section className="programs-section py-5">
        <div className="container">

          <h2 className="text-center fw-bold mb-5">Programs Offered</h2>

          <div className="row g-4">

            {/* BCA */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-blue">3-4 Years</span>

                <h4 className="fw-bold mt-3">
                  Bachelor of Business Administration [BBA]
                </h4>

                <p>
                  Comprehensive program covering programming, software
                  development, database management, and emerging technologies.
                </p>
              </div>
            </div>

            {/* BBA */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-purple">3-4 Years</span>

                <h4 className="fw-bold mt-3">
                  Bachelor of Business Administration in Computer Applications [BBA(CA)]
                </h4>

                <p>
                  Dynamic program focusing on management principles, marketing,
                  finance, and entrepreneurship skills.
                </p>
              </div>
            </div>

            {/* Business Specialization */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-green">3-4 Years</span>

                <h4 className="fw-bold mt-3">
                  Bachelor of Commerce in Business Management [BCom(BM)]
                </h4>

                <p>
                  Specialized programs in digital marketing, financial
                  management, and human resource development.
                </p>
              </div>
            </div>

            {/* Business Specialization */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-green">3-4 Years</span>

                <h4 className="fw-bold mt-3">
                  Bachelor of Commerce in Computer Application [BCom(CA)]
                </h4>

                <p>
                  Specialized programs in digital marketing, financial
                  management, and human resource development.
                </p>
              </div>
            </div>

            {/* Computer Specialization */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-orange">3-4 Years</span>

                <h4 className="fw-bold mt-3">
                  Bachelor of Computer Science [BSC(CS)]
                </h4>

                <p>
                  Advanced courses in web development, mobile apps, AI, and
                  data science for tech enthusiasts.
                </p>
              </div>
            </div>

            {/* Business Specialization */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-green">3-4 Years</span>

                <h4 className="fw-bold mt-3">
                  Bachelor Of science in Artificial Intelligence & Machine Learning [BSC(AI & ML)]
                </h4>

                <p>
                  Specialized programs in digital marketing, financial
                  management, and human resource development.
                </p>
              </div>
            </div>

            

            

            {/* Business Specialization */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-green">2 Years</span>

                <h4 className="fw-bold mt-3">
                  Master of Computer science [MSC(CS)]
                </h4>

                <p>
                  Specialized programs in digital marketing, financial
                  management, and human resource development.
                </p>
              </div>
            </div>

            {/* Business Specialization */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="badge program-badge badge-green">2 Years</span>

                <h4 className="fw-bold mt-3">
                  Master Of Data Science [MSC(DS)]
                </h4>

                <p>
                  Specialized programs in digital marketing, financial
                  management, and human resource development.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Faculty Section */}

      <section className="faculty-section py-5">
        <div className="container">

          <h2 className="text-center fw-bold mb-2">Our Distinguished Faculty</h2>
          <p className="text-center text-muted mb-5">
            Learn from experienced professors and industry professionals
          </p>

          <div className="row g-4">

            {/* Qualified Educators */}
            <div className="col-md-6">
              <div className="faculty-card d-flex align-items-start">

                <div className="faculty-icon educator-icon">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <h5 className="fw-bold">Qualified Educators</h5>
                  <p>
                    Our faculty members hold advanced degrees from prestigious
                    institutions and bring years of industry experience.
                  </p>
                </div>

              </div>
            </div>

            {/* Industry Experts */}
            <div className="col-md-6">
              <div className="faculty-card d-flex align-items-start">

                <div className="faculty-icon expert-icon">
                  <i className="bi bi-award"></i>
                </div>

                <div>
                  <h5 className="fw-bold">Industry Experts</h5>
                  <p>
                    Regular guest lectures and workshops by industry leaders
                    provide practical insights and networking opportunities.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Management Section */}

<section className="management-section py-5">
  <div className="container">
    <h2 className="text-center fw-bold mb-2">
  Our Leadership & Management
</h2>

<p className="text-center text-muted mb-5">
  Guiding the institution with vision, experience, and excellence
</p>
    <div className="row g-4">

      {/* Founder */}
      <div className="col-md-6">
        <div className="management-card">

          <div className="d-flex align-items-center position-relative">

            <div className="profile-container">
              <img src={founderImg} className="profile-img" alt="" />
            </div>

            <div className="ms-4">
              <h5 className="fw-bold mb-1">Late Mr. M. D. Jambhekar</h5>
              <p className="text-muted mb-1">Former Chairman, ATSS Trust</p>
            </div>

            <span className="role-badge">Founder</span>

          </div>

          <p className="mt-3">
  {expandedIndex === 0
    ? "We are in the First Quarter of 21st Century. This Century is a century of Knowledge,Management and Technology. On one side we are peeping in universe to multitude of opportunities,  on the other hand we are finding out what is hidden in the depth of oceans."
    : "On this background, whether you go in cosmos or in the depth of ocean, the accuracy, quality of your product services must be of highest standard.What is the Standard? ISO, DIN, I.S.S these are international, German Indian standards. Similarly in Service sector slowly the standards are also making an imprint .For instance, if the computer is not functioning, a guarantee is given that without two hours it would be repaired.This guarantee is given because manufacturer is sure about Quality. This has created a standard for deviation either on positive side or negative side.This system is now called Six Sigma i.e within one million products part will be defective Naturally engineers started making the process of manufacturing near to perfection This century wherein 'Knowledge' plays a major need devised number of methods to make the process near to perfection.Similarly, imparting education, correction of papers should have least variation and this could be done only by standardizing process of teaching, process of correction so that no injustice is done towards any student.We at ATSS work hard at level to make this process of Education near to perfection."}

  <span
    className="read-more"
    onClick={() =>
      setExpandedIndex(expandedIndex === 0 ? null : 0)
    }
  >
    {expandedIndex === 0 ? " Read More" : " Show Less"}
  </span>
</p>
 




        </div>
      </div>

      {/* Chairperson */}
      <div className="col-md-6">
        <div className="management-card">

          <div className="d-flex align-items-center position-relative">

            <div className="profile-container">
              <img src={chairpersonImg} className="profile-img" alt="" />
            </div>

            <div className="ms-4">
              <h5 className="fw-bold mb-1">Prof.(Dr.) Deepali Sawai</h5>
              <p className="text-muted mb-1">Chairperson, ATSS Trust</p>
            </div>

            <span className="role-badge">Chairperson</span>

          </div>

          <p className="mt-3">
            First I Would Like To Welcome All The Students To ATSS Family. It Is Really A Very Happy Moment When Someone New Enters In The Family.
            <span className="read-more"> Read More</span>
          </p>

        </div>
      </div>

      {/* Secretary */}
      <div className="col-md-6">
        <div className="management-card">

          <div className="d-flex align-items-center position-relative">

            <div className="profile-container">
              <img src={secretaryImg} className="profile-img" alt="" />
            </div>

            <div className="ms-4">
              <h5 className="fw-bold mb-1">Dr. Ashwini Kulkarni</h5>
              <p className="text-muted mb-1">General Secretary, ATSS Trust</p>
            </div>

            <span className="role-badge">General Secretary</span>

          </div>

          <p className="mt-3">
            The Institute Takes Rigorous Efforts To Inculcate The Fundamental Platform Of Knowledge And Try To Enhance The Awareness Of Corporate Processes Among Our Students.
            <span className="read-more"> Read More</span>
          </p>

        </div>
      </div>

      {/* Principal */}
      <div className="col-md-6">
        <div className="management-card">

          <div className="d-flex align-items-center position-relative">

            <div className="profile-container">
              <img src={principalImg} className="profile-img" alt="" />
            </div>

            <div className="ms-4">
              <h5 className="fw-bold mb-1">Dr. Vishwas Swami</h5>
              <p className="text-muted mb-1">Principal</p>
            </div>

            <span className="role-badge">Principal</span>

          </div>

          <p className="mt-3">
            Dear Students, As You Begin Your Academic Journey That Will Define Your Career In The Coming Years, It Gives Me Immense Pleasure To Welcome You To This Great ATSS Family.
            <span className="read-more"> Read More</span>
          </p>

        </div>
      </div>

    </div>
  </div>
</section>






    </>
  );
}


export default About;