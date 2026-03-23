import React, { useState } from 'react';
import collegeImg from "../../assets/aboutimage.jpg";
import "../landing/style/About.css";
import founderImg from "../../assets/Founder.png";
import chairpersonImg from "../../assets/chairperson.png";
import secretaryImg from "../../assets/general-secretary.png";
import principalImg from "../../assets/principle.png";
import { FaEye, FaBullseye, FaUsers, FaAward } from "react-icons/fa";

function About() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <>
      <div className="about-hero"
        style={{ backgroundImage: `url(${collegeImg})` }}>

        <div className="about-overlay">
          <div className="container">
            <h1 className="about-title">ABOUT COLLEGE</h1>

            <div className="breadcrumb-box">
              <p className="lead">
                Excellence in Business Studies & Computer Application
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="about-section py-5">
         <div className="container">
          <div className="container">
            <div className="row g-4">

              {/* Introduction */}
              <div className="col-md-6">
                <div className="info-card">
                  <h4 className="info-heading">Introduction</h4>
                  <p>
                    Audyogik Tantra Shikshan Sanstha popularity known as ATSS is an education trust established in 1963
                    and registered under Bombay Public Trust Act 1965 with registration number F-324 dated 16/7/66 and is
                    also registered under Society's Act 1860 with registration number MAH/499/P of 6/7/65.
                  </p>
                </div>
              </div>

              {/* Beginning */}
              <div className="col-md-6">
                <div className="info-card">
                  <h4 className="info-heading">The Beginning</h4>
                  <p>
                    Deep-rooted commitment to education, strong social values, and a focus on creating employable
                    youth have been the foundation of Audyogik Tantra Shikshan Sanstha (ATSS). Established in 1966
                    by visionary educationist Mr. M. D. Jambhekar, ATSS aimed to provide skill-based training to support
                    the growing industrial sector of Pimpri-Chinchwad.
                  </p>
                </div>
              </div>

              {/* Growth */}
              <div className="col-md-6">
                <div className="info-card">
                  <h4 className="info-heading">Growth and Expansion</h4>
                  <p>
                    Over the period of last five decades, the trust established other Institutes as a response
                    to the changing needs of Pimpri Chinchwad area. As per the changing times and needs of the industries and
                    society, the true spread its wings in diversified educational areas in the field of primary education,
                    technical education, computer education and management education.
                  </p>
                </div>
              </div>

              {/* Institutes */}
              <div className="col-md-6">
                <div className="info-card">
                  <h4 className="info-heading">Different institutes under ATSS</h4>
                  <p>
                    The Trust runs various recognized and affiliated institutes namely "Institute of Industrial and
                    Computer Management and Research"[IICMR]; ATSS College of Business Studies and Computer Applications
                    [CBSCA]. ATSS Industrial Training Center[ITC] and City Pride School under two campus operations, one
                    at Pradhikaran,Nigdi and other at Chinchwad.
                  </p>
                </div>
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
                  <FaEye className="icon" />
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
                  <FaBullseye className="icon" />
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

            {/* BBA */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-blue">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Bachelor of Business Administration [BBA]
                </h4>
                <p>
                  Dynamic program focusing on management principles, leadership skills, marketing, and business strategy.
                </p>
              </div>
            </div>

            {/* BBA-CA */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-purple">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Bachelor of Business Administration in Computer Applications [BBA(CA)]
                </h4>
                <p>
                  Blends business management with computer applications, covering IT tools, software, and business systems.
                </p>
              </div>
            </div>

            {/* BCOM-BM */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-orange">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Bachelor of Commerce in Business Management [BCom(BM)]
                </h4>
                <p>
                  Covers business management, finance, marketing, and entrepreneurship for corporate careers.
                </p>
              </div>
            </div>

            {/* BCOM-CA */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-green">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Bachelor of Commerce in Computer Application [BCom(CA)]
                </h4>
                <p>
                  Combines commerce with computer applications, including accounting software and IT-based business processes.
                </p>
              </div>
            </div>

            {/* BSC-CS */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-blue">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Bachelor of Computer Science [BSC(CS)]
                </h4>
                <p>
                  Covers core computer science concepts including programming, data structures, and software development.
                </p>
              </div>
            </div>

            {/* BSC-AIML*/}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-purple">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Bachelor Of science in Artificial Intelligence & Machine Learning [BSC(AI & ML)]
                </h4>
                <p>
                  Specialized program in artificial intelligence and machine learning with real-world data and automation applications.
                </p>
              </div>
            </div>

            {/* MSC-CS */}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-orange">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Master of Computer science [MSC(CS)]
                </h4>
                <p>
                  Advanced study in computer science focusing on software engineering, systems, and emerging technologies.
                </p>
              </div>
            </div>

            {/* MSC-DS*/}
            <div className="col-md-6">
              <div className="program-card">
                <span className="program-badge badge-green">3-4 Years</span>
                <h4 className="fw-bold mt-3">
                  Master Of Data Science [MSC(DS)]
                </h4>
                <p>
                  Focuses on data analysis, machine learning, and big data technologies for data-driven decision making
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
                  <FaUsers className="icon" />
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
                  <FaAward className="icon" />
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
                    ? "On one side we are peeping in universe to multitude of opportunities, on the other hand we are finding out what is hidden in the depth of oceans.On this background, whether you go in cosmos or in the depth of ocean, the accuracy, quality of your product services must be of highest standard.What is the Standard? ISO, DIN, I.S.S these are international, German Indian standards. Similarly in Service sector slowly the standards are also making an imprint .For instance, if the computer is not functioning, a guarantee is given that without two hours it would be repaired.This guarantee is given because manufacturer is sure about Quality. This has created a standard for deviation either on positive side or negative side.This system is now called Six Sigma i.e within one million products part will be defective Naturally engineers started making the process of manufacturing near to perfection This century wherein 'Knowledge' plays a major need devised number of methods to make the process near to perfection.Similarly, imparting education, correction of papers should have least variation and this could be done only by standardizing process of teaching, process of correction so that no injustice is done towards any student.We at ATSS work hard at level to make this process of Education near to perfection."
                    : "We are in the First Quarter of 21st Century. This Century is a century of Knowledge, Management and Technology."}

                  <span
                    className="read-more"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === 0 ? null : 0)
                    }
                  >
                    {expandedIndex === 0 ? " Show Less" : " Read More"}
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
                  {expandedIndex === 1
                    ? "The ATSS family has a qualified, trained and motivated core team of mentors in conjunction with eminent personalities from industry and academic, who ensure the effective development, sharpening and honing of our would be professionals.We strongly believe in human values our commitment to the Nation and Human Society. Accordingly our Teaching Learning process is based on motivating factors, discipline, although in relaxed natural ambiance. We have created a secured, friendly, peaceful, technologically sound environment for all our students to make the Institute, their desirable educational destination.Institute has unique distinction of being strategically located in the industrial hub ofRajiv Gandhi InfoTech Park at Hinjawadi facilitating a professional interface of our students with industry.I am confident that our wise would-be-professionals will prove themselves to be indispensable assets of any organization and thus help ATSS in reaching new heights.Finally as Swami Vivekananda said, We are responsible for what we are, and whatever we wish ourselves to be, we have the power to make ourselves. If what we are now has been the result of our own past actions, it certainly follows that whatever we wish to be in future can be produced by our present actions.I wish you all the best!"
                    : "First I would like to welcome all the students to ATSS family. It is really a very happy moment when someone new enters in the family."}

                  <span
                    className="read-more"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === 1 ? null : 1)
                    }
                  >
                    {expandedIndex === 1 ? " Show Less" : " Read More"}
                  </span>
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
                  {expandedIndex === 2
                    ? "It gives me immense pleasure to welcome you to ATSS. It is located in the midst of the Industrial hub of Automobile and IT industry also enjoys the demographic advantage of being closest to the economic capital of the country -Mumbai as well as carries the cultural advantage of Oxford of the East-Pune.Keeping our strengths in mind, ATSS recognizes Industry as the most significant stakeholder of any professional institution. We have constantly endeavored to aligh our academic activities with the vision and mission of the institute and link academics with the corporate world. The institute takes rigorous efforts to inculcate the fundamental platform of knowledge and try to enhance the awareness of corporate processes among our students.At ATSS, placement cell is backed with strong industry focused training and grooming of students throughout their academic life. To bring their overall personality, we invite and share knowledge and expertise by way of guest lectures, seminars and workshops. Training modules like Career Enhancement Programs, Aptitude Coaching, and Interview Sessions add to their special skill sets as entry level professional.With our alumni already making us proud, we are confident that the present and future student batches will definitely contribute meaningfully to the growth of many industries and organizations around the globe."
                    : "The institute takes efforts to inculcate the fundamental platform of knowledge and enhance the awareness of corporate processes among our students."}

                  <span
                    className="read-more"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === 2 ? null : 2)
                    }
                  >
                    {expandedIndex === 2 ? " Show Less" : " Read More"}
                  </span>
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
                  {expandedIndex === 3
                    ? "Dear students, As you begin your academic journey that will define your career in the coming years, it gives me immense pleasure to welcome you to this great ATSS family. It is a great honour for me to serve as the principal of the Audyogik Tantra Shikshan Sanstha's College of Business Studies & Computer Applications because it is one of the significant duties I am carrying out to groom students who will be India's future leaders.Audyogik Tantra Shikshan Sanstha's College of Business Studies & Computer Applications, popularly known as ATSS CBSCA, consists of academicians, administrators, and support staff, all of whom are dedicated to ensuring that you achieve your goals. College is affiliated to Savitribai Phule Pune University, accreted by NAAC and UGC recognized under 2(F) & 12(B). ATSS CBSCA is amongst the most popular colleges in PCMC which is committed to quality education.curricular activities & annual events. With a deep-rooted sense of social responsibility, the college feels committed to being an important part of society and conducts various extension and outreach activities on regular basis. For developing a healthy body and healthy mind sports, meditation, and yoga are integrated in our regular schedule. My best wishes to all the students of ATSS CBSCA."
                    : "Dear students, as you begin your academic journey that will define your career in the coming years, we are delighted to welcome you to the ATSS family."}

                  <span
                    className="read-more"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === 3 ? null : 3)
                    }
                  >
                    {expandedIndex === 3 ? " Show Less" : " Read More"}
                  </span>
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

