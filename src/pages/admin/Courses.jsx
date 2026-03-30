import React, { useState, useEffect } from "react";
import "../admin/style/courses.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function Courses() {

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    faculty: "",
    semester: "",
  });

  const initialDepartments = [
    {
      name: "Bachelor of Business Administration [BBA]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { name: "Principles of Management", code: "BBA101T", faculty: "-", students: 0 },
            { name: "Principles of Finance", code: "BBA102FINT", faculty: "-", students: 0 },
            { name: "Principles of Marketing", code: "BBA102MART", faculty: "-", students: 0 },
            { name: "Principles of Human Resource Management", code: "BBA101HRMT", faculty: "-", students: 0 },
            { name: "Agriculture and Indian Economy", code: "BBA102AGBT", faculty: "-", students: 0 },
            { name: "Essentials of Services Management", code: "BBA102SEMT", faculty: "-", students: 0 },
            { name: "Business Mathematics I", code: "OE101", faculty: "-", students: 0 },
            { name: "Business Statistics I", code: "OE102", faculty: "-", students: 0 },
            { name: "Information Technology for Business", code: "VSC101", faculty: "-", students: 0 },
            { name: "Soft Skills Development", code: "SEC101", faculty: "-", students: 0 },
            { name: "Business Communication Skills I", code: "AEC101", faculty: "-", students: 0 },
            { name: "Environmental Awareness", code: "VEC101", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { name: "Business Cost Accounting", code: "BBA201T", faculty: "-", students: 0 },
            { name: "Business Accounting", code: "BBA202FINT", faculty: "-", students: 0 },
            { name: "Consumer Behavior and Sales Management", code: "BBA202MART", faculty: "-", students: 0 },
            { name: "Organizational Behavior", code: "BBA202HRM", faculty: "-", students: 0 },
            { name: "Essentials of Rural Development", code: "BBA202AGB", faculty: "-", students: 0 },
            { name: "Business Economics I", code: "MINOR101", faculty: "-", students: 0 },
            { name: "Business Mathematics II", code: "OE201", faculty: "-", students: 0 },
            { name: "Business Statistics II", code: "OE202", faculty: "-", students: 0 },
            { name: "Computerized Accounting using Tally", code: "VSC201", faculty: "-", students: 0 },
            { name: "Business Communication Skills II", code: "AEC201", faculty: "-", students: 0 },
            { name: "Democracy Awareness & Gender Sensitization", code: "VEC201", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { name: "Business Law", code: "BBA301T", faculty: "-", students: 0 },
            { name: "Human Resource Management", code: "BBA302HRM", faculty: "-", students: 0 },
            { name: "Marketing Management", code: "BBA302MART", faculty: "-", students: 0 },
            { name: "Financial Management", code: "BBA302FIN", faculty: "-", students: 0 },
            { name: "Business Statistics", code: "BBA303STAT", faculty: "-", students: 0 },
            { name: "Entrepreneurship Development", code: "BBA304ED", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { name: "Production & Operations Management", code: "BBA401POM", faculty: "-", students: 0 },
            { name: "Management Information System", code: "BBA402MIS", faculty: "-", students: 0 },
            { name: "Research Methodology", code: "BBA403RM", faculty: "-", students: 0 },
            { name: "Financial Markets & Services", code: "BBA404FIN", faculty: "-", students: 0 },
            { name: "Organizational Behavior", code: "BBA405HRM", faculty: "-", students: 0 },
            { name: "Advertising & Sales Promotion", code: "BBA406MART", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "V",
          subjects: [
            { name: "Strategic Management", code: "BBA501SM", faculty: "-", students: 0 },
            { name: "International Business", code: "BBA502IB", faculty: "-", students: 0 },
            { name: "Project Management", code: "BBA503PM", faculty: "-", students: 0 },
            { name: "Financial Analysis & Planning", code: "BBA504FIN", faculty: "-", students: 0 },
            { name: "Human Resource Development", code: "BBA505HRD", faculty: "-", students: 0 },
            { name: "Digital Marketing", code: "BBA506DM", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "VI",
          subjects: [
            { name: "Business Ethics & Corporate Governance", code: "BBA601BE", faculty: "-", students: 0 },
            { name: "Supply Chain Management", code: "BBA602SCM", faculty: "-", students: 0 },
            { name: "E-Commerce", code: "BBA603EC", faculty: "-", students: 0 },
            { name: "Investment Analysis", code: "BBA604FIN", faculty: "-", students: 0 },
            { name: "Performance Management", code: "BBA605HRM", faculty: "-", students: 0 },
            { name: "Retail Management", code: "BBA606MART", faculty: "-", students: 0 }
          ]
        },
      ],
    },

    {
      name: "Bachelor of Business Administration in Computer Application [BBA(CA)]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "BCA101", name: "Problem Solving using C", faculty: "-", students: 0 },
            { code: "BCA102", name: "Database Management System", faculty: "-", students: 0 },
            { code: "BCA103", name: "C & DBMS Lab", faculty: "", students: 0 },
            { code: "BCA104", name: "Business Mathematics", faculty: "-", students: 0 },
            { code: "BCA105", name: "Principles of Management", faculty: "-", students: 0 },
            { code: "BCA106", name: "Office Automation Tools", faculty: "-", students: 0 },
            { code: "BCA107", name: "Programming Principles & Algorithms", faculty: "-", students: 0 },
            { code: "BCA108", name: "Business Communication Skills-I", faculty: "-", students: 0 },
            { code: "BCA109", name: "Environmental Awareness", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "BCA201", name: "Advanced C Programming", faculty: "-", students: 0 },
            { code: "BCA202", name: "Relational Database Management System", faculty: "-", students: 0 },
            { code: "BCA203", name: "Advanced C & RDBMS Lab", faculty: "-", students: 0 },
            { code: "BCA204", name: "Organizational Behavior", faculty: "-", students: 0 },
            { code: "BCA205", name: "Business Statistics", faculty: "-", students: 0 },
            { code: "BCA206", name: "Financial Accounting with Tally", faculty: "-", students: 0 },
            { code: "BCA207", name: "Web Technology", faculty: "-", students: 0 },
            { code: "BCA208", name: "E-Commerce", faculty: "-", students: 0 },
            { code: "BCA209", name: "Business Communication Skills-II", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "BCA301", name: "Data Structure", faculty: "-", students: 0 },
            { code: "BCA302", name: "PHP", faculty: "-", students: 0 },
            { code: "BCA303", name: "DS & PHP Lab", faculty: "-", students: 0 },
            { code: "BCA304", name: "Web Development Tools", faculty: "-", students: 0 },
            { code: "BCA305", name: "Modern Indian Languages-I", faculty: "-", students: 0 },
            { code: "BCA306", name: "Project (Web Applications)", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "BCA401", name: "Object Oriented Programming using C++", faculty: "-", students: 0 },
            { code: "BCA402", name: "Advanced PHP", faculty: "-", students: 0 },
            { code: "BCA403", name: "CPP & Advanced PHP Lab", faculty: "-", students: 0 },
            { code: "BCA404", name: "Digital Marketing", faculty: "-", students: 0 },
            { code: "BCA405", name: "Computer Networks", faculty: "-", students: 0 },
            { code: "BCA406", name: "Modern Indian Languages-II", faculty: "-", students: 0 },
            { code: "BCA407", name: "Project (Digital Marketing)", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "V",
          subjects: [
            { code: "BCA501", name: "Java Programming", faculty: "-", students: 0 },
            { code: "BCA502", name: "Mobile Application Development", faculty: "-", students: 0 },
            { code: "BCA503", name: "Java & Mobile App Lab", faculty: "-", students: 0 },
            { code: "BCA504", name: "Linux Operating System", faculty: "-", students: 0 },
            { code: "BCA505", name: "Software Engineering", faculty: "-", students: 0 },
            { code: "BCA506", name: "Dot Net Programming", faculty: "-", students: 0 },
            { code: "BCA507", name: "Project (Mobile Application)", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "VI",
          subjects: [
            { code: "BCA601", name: "Recent Trends in IT", faculty: "-", students: 0 },
            { code: "BCA602", name: "Python Programming", faculty: "-", students: 0 },
            { code: "BCA603", name: "Python Lab", faculty: "-", students: 0 },
            { code: "BCA604", name: "Internet of Things", faculty: "-", students: 0 },
            { code: "BCA605", name: "Software Testing", faculty: "-", students: 0 },
            { code: "BCA606", name: "Management Information Systems", faculty: "-", students: 0 },
            { code: "BCA607", name: "Internship + Project", faculty: "-", students: 0 }
          ]
        }
      ]
    },

    {
      name: "Bachelor of Commerce (Business Management) [BCOM(BM)]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "BM101", name: "Principles of Management", faculty: "-", students: 0 },
            { code: "BM102", name: "Business Mathematics", faculty: "-", students: 0 },
            { code: "BM103", name: "Soft Skills Development", faculty: "-", students: 0 },
            { code: "BM104", name: "Business Communication Skills-I", faculty: "-", students: 0 },
            { code: "BM105", name: "Environmental Awareness", faculty: "-", students: 0 },
            { code: "BM106", name: "Indian Knowledge System", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "BM201", name: "Business Cost Accounting", faculty: "-", students: 0 },
            { code: "BM202", name: "Business Statistics", faculty: "-", students: 0 },
            { code: "BM203", name: "Stock Market / AI for Business", faculty: "-", students: 0 },
            { code: "BM204", name: "Business Communication Skills-II", faculty: "-", students: 0 },
            { code: "BM205", name: "Democracy & Gender Sensitization", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "BM301", name: "Management Accounting", faculty: "-", students: 0 },
            { code: "BM302", name: "Business Organization System", faculty: "-", students: 0 },
            { code: "BM303", name: "Business Economics", faculty: "-", students: 0 },
            { code: "BM304", name: "Business Analytics", faculty: "-", students: 0 },
            { code: "BM305", name: "Modern Indian Languages-I", faculty: "-", students: 0 },
            { code: "BM306", name: "Project Work", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "BM401", name: "Business Taxation", faculty: "-", students: 0 },
            { code: "BM402", name: "Banking and Finance", faculty: "-", students: 0 },
            { code: "BM403", name: "Entrepreneurship Development", faculty: "-", students: 0 },
            { code: "BM404", name: "International Business Management", faculty: "-", students: 0 },
            { code: "BM405", name: "Modern Indian Languages-II", faculty: "-", students: 0 },
            { code: "BM406", name: "Project Work-II", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "V",
          subjects: [
            { code: "BM501", name: "Financial Statement Analysis", faculty: "-", students: 0 },
            { code: "BM502", name: "Legal Aspects in Finance", faculty: "-", students: 0 },
            { code: "BM503", name: "Cases in Finance", faculty: "-", students: 0 },
            { code: "BM504", name: "Supply Chain Management", faculty: "-", students: 0 },
            { code: "BM505", name: "Business Research Methods", faculty: "-", students: 0 },
            { code: "BM506", name: "Project Work", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "VI",
          subjects: [
            { code: "BM601", name: "Financial Management", faculty: "-", students: 0 },
            { code: "BM602", name: "International Financial Management", faculty: "-", students: 0 },
            { code: "BM603", name: "Management of Innovation", faculty: "-", students: 0 },
            { code: "BM604", name: "Elective Subject", faculty: "-", students: 0 },
            { code: "BM605", name: "Internship + Project", faculty: "-", students: 0 }
          ]
        }
      ]
    },

    {
      name: "Bachelor of Commerce in Computer Application [BCOM(CA)]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "BCAC101", name: "Problem Solving using C", faculty: "-", students: 0 },
            { code: "BCAC102", name: "Database Management System", faculty: "-", students: 0 },
            { code: "BCAC103", name: "C Programming & DBMS Lab", faculty: "-", students: 0 },
            { code: "BCAC104", name: "Business Mathematics", faculty: "-", students: 0 },
            { code: "BCAC105", name: "Principles and Practice of Management", faculty: "-", students: 0 },
            { code: "BCAC106", name: "Office Automation Tools", faculty: "-", students: 0 },
            { code: "BCAC107", name: "Programming Principles and Algorithm", faculty: "-", students: 0 },
            { code: "BCAC108", name: "Business Communication Skills-I", faculty: "-", students: 0 },
            { code: "BCAC109", name: "Environmental Awareness", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "BCAC201", name: "Advance C Programming", faculty: "-", students: 0 },
            { code: "BCAC202", name: "Relational Database Management System", faculty: "-", students: 0 },
            { code: "BCAC203", name: "Advanced C & RDBMS Lab", faculty: "-", students: 0 },
            { code: "BCAC204", name: "Organizational Behavior", faculty: "-", students: 0 },
            { code: "BCAC205", name: "Business Statistics", faculty: "-", students: 0 },
            { code: "BCAC206", name: "Financial Accounting with Tally", faculty: "-", students: 0 },
            { code: "BCAC207", name: "Web Technology", faculty: "-", students: 0 },
            { code: "BCAC208", name: "E-Commerce", faculty: "-", students: 0 },
            { code: "BCAC209", name: "Business Communication Skills-II", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "BCAC301", name: "Data Structure", faculty: "-", students: 0 },
            { code: "BCAC302", name: "PHP Programming", faculty: "-", students: 0 },
            { code: "BCAC303", name: "DS & PHP Lab", faculty: "-", students: 0 },
            { code: "BCAC304", name: "Web Development Tools", faculty: "-", students: 0 },
            { code: "BCAC305", name: "Modern Indian Languages-I", faculty: "-", students: 0 },
            { code: "BCAC306", name: "Web Application Project", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "BCAC401", name: "Object Oriented Programming (C++)", faculty: "-", students: 0 },
            { code: "BCAC402", name: "Advance PHP", faculty: "-", students: 0 },
            { code: "BCAC403", name: "CPP & PHP Lab", faculty: "-", students: 0 },
            { code: "BCAC404", name: "Digital Marketing", faculty: "-", students: 0 },
            { code: "BCAC405", name: "Computer Network", faculty: "-", students: 0 },
            { code: "BCAC406", name: "Modern Indian Languages-II", faculty: "-", students: 0 },
            { code: "BCAC407", name: "Digital Marketing Project", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "V",
          subjects: [
            { code: "BCAC501", name: "Java Programming", faculty: "-", students: 0 },
            { code: "BCAC502", name: "Mobile Application Development", faculty: "-", students: 0 },
            { code: "BCAC503", name: "Java & Mobile App Lab", faculty: "-", students: 0 },
            { code: "BCAC504", name: "Linux Operating System", faculty: "-", students: 0 },
            { code: "BCAC505", name: "Software Engineering", faculty: "-", students: 0 },
            { code: "BCAC506", name: "Dot Net Programming", faculty: "-", students: 0 },
            { code: "BCAC507", name: "Mobile App Project", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "VI",
          subjects: [
            { code: "BCAC601", name: "Recent Trends in IT", faculty: "-", students: 0 },
            { code: "BCAC602", name: "Python Programming", faculty: "-", students: 0 },
            { code: "BCAC603", name: "Python Lab", faculty: "-", students: 0 },
            { code: "BCAC604", name: "Internet of Things", faculty: "-", students: 0 },
            { code: "BCAC605", name: "Software Testing", faculty: "-", students: 0 },
            { code: "BCAC606", name: "Management Information Systems", faculty: "-", students: 0 },
            { code: "BCAC607", name: "Internship + Project", faculty: "-", students: 0 }
          ]
        }
      ]
    },

    {
      name: "Bachelor of Computer Science [BSC(CS)]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "CS-101-T", name: "Problem Solving using C Programming", faculty: "-", students: 0 },
            { code: "CS-102-P", name: "Lab Course based on C Programming", faculty: "-", students: 0 },
            { code: "MTS-101-T", name: "Mathematics", faculty: "-", students: 0 },
            { code: "ELS-101-T", name: "Electronic Science", faculty: "-", students: 0 },
            { code: "IKS100T", name: "Generic IKS", faculty: "-", students: 0 },
            { code: "OE101CS", name: "Office Automation I", faculty: "-", students: 0 },
            { code: "SEC101CS", name: "Statistical Methods for CS I", faculty: "-", students: 0 },
            { code: "AEC101", name: "MIL-I (Hindi/Marathi)", faculty: "-", students: 0 },
            { code: "VEC101ENV", name: "EVS-I", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "CS-151-T", name: "Advanced C Programming", faculty: "-", students: 0 },
            { code: "CS-152-P", name: "Lab Course based on Advanced C", faculty: "-", students: 0 },
            { code: "MTS-151-T", name: "Mathematics", faculty: "-", students: 0 },
            { code: "ELS-151-T", name: "Electronic Science", faculty: "-", students: 0 },
            { code: "OE151CS", name: "Office Automation II", faculty: "-", students: 0 },
            { code: "SEC151CS", name: "Statistical Methods for CS II", faculty: "-", students: 0 },
            { code: "AEC151", name: "MIL-II (Hindi/Marathi)", faculty: "-", students: 0 },
            { code: "VEC151ENV", name: "EVS-II", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "CS-201", name: "Data Structures", faculty: "-", students: 0 },
            { code: "CS-202", name: "Relational Database Management Systems", faculty: "-", students: 0 },
            { code: "CS-203", name: "Discrete Mathematics", faculty: "-", students: 0 },
            { code: "CS-204", name: "Digital Electronics", faculty: "-", students: 0 },
            { code: "CS-205", name: "Data Structures Lab", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "CS-251", name: "Object Oriented Programming (C++)", faculty: "-", students: 0 },
            { code: "CS-252", name: "Operating Systems", faculty: "-", students: 0 },
            { code: "CS-253", name: "Software Engineering", faculty: "-", students: 0 },
            { code: "CS-254", name: "Computer Networks", faculty: "-", students: 0 },
            { code: "CS-255", name: "OOP Lab", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "V",
          subjects: [
            { code: "CS-301", name: "Java Programming", faculty: "-", students: 0 },
            { code: "CS-302", name: "Web Technologies", faculty: "-", students: 0 },
            { code: "CS-303", name: "Theory of Computation", faculty: "-", students: 0 },
            { code: "CS-304", name: "Artificial Intelligence", faculty: "-", students: 0 },
            { code: "CS-305", name: "Java & Web Lab", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "VI",
          subjects: [
            { code: "CS-351", name: "Python Programming", faculty: "-", students: 0 },
            { code: "CS-352", name: "Cloud Computing", faculty: "-", students: 0 },
            { code: "CS-353", name: "Cyber Security", faculty: "-", students: 0 },
            { code: "CS-354", name: "Machine Learning", faculty: "-", students: 0 },
            { code: "CS-355", name: "Project Work", faculty: "-", students: 0 }
          ]
        }
      ]
    },

    {
      name: "Bachelor of Science (Artificial Intelligence & Machine Learning) [BSC(AI&ML)]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "AIML-101-T", name: "Object Oriented Programming using C++", faculty: "-", students: 0 },
            { code: "AIML-102-P", name: "Practical based on C++", faculty: "-", students: 0 },
            { code: "MTS-101-T", name: "Discrete Structures for Computer Science", faculty: "-", students: 0 },
            { code: "MTS-102-P", name: "Practical based on Discrete Structures", faculty: "-", students: 0 },
            { code: "STS-101-T", name: "Statistical Data Analysis", faculty: "-", students: 0 },
            { code: "STS-102-P", name: "Practical based on Statistics", faculty: "-", students: 0 },
            { code: "SEC-101", name: "Basic Probability & Distributions", faculty: "-", students: 0 },
            { code: "AEC-101", name: "English", faculty: "-", students: 0 },
            { code: "VEC-101", name: "Environmental Studies", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "AIML-151-T", name: "Introduction to Python Programming", faculty: "-", students: 0 },
            { code: "AIML-152-P", name: "Python Practical", faculty: "-", students: 0 },
            { code: "MTS-151-T", name: "Graph Theory", faculty: "-", students: 0 },
            { code: "MTS-152-P", name: "Graph Theory Practical", faculty: "-", students: 0 },
            { code: "STS-151-T", name: "Probability & Hypothesis Testing", faculty: "-", students: 0 },
            { code: "STS-152-P", name: "Statistics Practical", faculty: "-", students: 0 },
            { code: "SEC-151", name: "Databases - I", faculty: "-", students: 0 },
            { code: "AEC-151", name: "English", faculty: "-", students: 0 },
            { code: "VEC-151", name: "Environmental Studies II", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "AIML-201", name: "Data Structures (Python)", faculty: "-", students: 0 },
            { code: "AIML-202", name: "Software Engineering", faculty: "-", students: 0 },
            { code: "AIML-203", name: "Lab: DS + SE", faculty: "-", students: 0 },
            { code: "AIML-221", name: "Advanced Python Programming", faculty: "-", students: 0 },
            { code: "AIML-231", name: "Mini Project", faculty: "-", students: 0 },
            { code: "AIML-241", name: "Linear Algebra", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "AIML-251", name: "Microservices using Python", faculty: "-", students: 0 },
            { code: "AIML-252", name: "Artificial Intelligence - I", faculty: "-", students: 0 },
            { code: "AIML-253", name: "AI Practical", faculty: "-", students: 0 },
            { code: "AIML-221-VSC", name: "Databases - II", faculty: "-", students: 0 },
            { code: "AIML-241", name: "Logic", faculty: "-", students: 0 },
            { code: "SEC-251", name: "Design & Analysis of Algorithms", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "V",
          subjects: [
            { code: "AIML-301", name: "Artificial Intelligence - II", faculty: "-", students: 0 },
            { code: "AIML-302", name: "Machine Learning Techniques I", faculty: "-", students: 0 },
            { code: "AIML-303", name: "Data Visualization", faculty: "-", students: 0 },
            { code: "AIML-304", name: "DAA - II", faculty: "-", students: 0 },
            { code: "AIML-321", name: "Linux Shell Scripting", faculty: "-", students: 0 },
            { code: "AIML-331", name: "Project", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "VI",
          subjects: [
            { code: "AIML-351", name: "Optimization Techniques", faculty: "-", students: 0 },
            { code: "AIML-352", name: "Machine Learning Techniques II", faculty: "-", students: 0 },
            { code: "AIML-353", name: "Data Mining", faculty: "-", students: 0 },
            { code: "AIML-354", name: "Evolutionary Algorithms", faculty: "-", students: 0 },
            { code: "AIML-371", name: "Database Technologies", faculty: "-", students: 0 },
            { code: "AIML-381", name: "On Job Training", faculty: "-", students: 0 }
          ]
        }
      ]
    },

    {
      name: "Master of Science (Computer Science) [M.Sc CS]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "CS-501-MJ", name: "Advanced Operating System", faculty: "-", students: 0 },
            { code: "CS-502-MJ", name: "Artificial Intelligence", faculty: "-", students: 0 },
            { code: "CS-503-MJ", name: "Principles of Programming Languages", faculty: "-", students: 0 },
            { code: "CS-504-MJP", name: "Lab: Advanced Operating System", faculty: "-", students: 0 },
            { code: "CS-505-MJP", name: "Lab: Artificial Intelligence", faculty: "-", students: 0 },
            { code: "CS-510-MJ", name: "Advanced Databases & Web Tech", faculty: "-", students: 0 },
            { code: "CS-511-MJP", name: "Lab: Databases & Web Tech", faculty: "-", students: 0 },
            { code: "CS-531-RM", name: "Research Methodology", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "CS-551-MJ", name: "Design & Analysis of Algorithms", faculty: "-", students: 0 },
            { code: "CS-552-MJ", name: "Mobile App Development", faculty: "-", students: 0 },
            { code: "CS-553-MJ", name: "Software Project Management", faculty: "-", students: 0 },
            { code: "CS-554-MJP", name: "Lab: DAA", faculty: "-", students: 0 },
            { code: "CS-555-MJP", name: "Lab: Mobile App Dev", faculty: "-", students: 0 },
            { code: "CS-560-MJ", name: "Full Stack Development I", faculty: "-", students: 0 },
            { code: "CS-561-MJP", name: "Lab: Full Stack I", faculty: "-", students: 0 },
            { code: "CS-581-OJT", name: "On Job Training", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "CS-601-MJ", name: "Software Architecture & Design Pattern", faculty: "-", students: 0 },
            { code: "CS-602-MJ", name: "Machine Learning", faculty: "-", students: 0 },
            { code: "CS-603-MJ", name: "Internet of Things", faculty: "-", students: 0 },
            { code: "CS-604-MJP", name: "Lab: Architecture & IoT", faculty: "-", students: 0 },
            { code: "CS-605-MJP", name: "Lab: Machine Learning", faculty: "-", students: 0 },
            { code: "CS-610-MJ", name: "Full Stack Development II", faculty: "-", students: 0 },
            { code: "CS-611-MJP", name: "Lab: Full Stack II", faculty: "-", students: 0 },
            { code: "CS-631-RP", name: "Research Project", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "CS-651-MJP", name: "Industrial Training", faculty: "-", students: 0 },
            { code: "CS-652-MJ", name: "MOOC / Elective Course", faculty: "-", students: 0 },
            { code: "CS-681-RP", name: "Research Project Work", faculty: "-", students: 0 }
          ]
        }
      ]
    },

    {
      name: "Master of Science (Data Science) [M.Sc DS]",
      semesters: [
        {
          sem: "I",
          subjects: [
            { code: "DS-501-MJ", name: "Statistics for Data Science", faculty: "-", students: 0 },
            { code: "DS-502-MJ", name: "Computational Mathematics", faculty: "-", students: 0 },
            { code: "DS-503-MJ", name: "Fundamentals of Data Science", faculty: "-", students: 0 },
            { code: "DS-504-MJP", name: "Lab: Statistics", faculty: "-", students: 0 },
            { code: "DS-505-MJP", name: "Lab: Computational Mathematics", faculty: "-", students: 0 },
            { code: "DS-510-MJ", name: "Data Mining & Data Warehousing", faculty: "-", students: 0 },
            { code: "DS-511-MJP", name: "Lab: Data Mining", faculty: "-", students: 0 },
            { code: "DS-531-RM", name: "Research Methodology", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "II",
          subjects: [
            { code: "DS-551-MJ", name: "Database Technologies", faculty: "-", students: 0 },
            { code: "DS-552-MJ", name: "Machine Learning", faculty: "-", students: 0 },
            { code: "DS-553-MJ", name: "Python for Data Science", faculty: "-", students: 0 },
            { code: "DS-554-MJP", name: "Lab: Database Technology", faculty: "-", students: 0 },
            { code: "DS-555-MJP", name: "Lab: Machine Learning", faculty: "-", students: 0 },
            { code: "DS-560-MJ", name: "Big Data", faculty: "-", students: 0 },
            { code: "DS-561-MJP", name: "Lab: Big Data", faculty: "-", students: 0 },
            { code: "DS-581-OJT", name: "On Job Training", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "III",
          subjects: [
            { code: "DS-601-MJ", name: "Data Visualization & Analytics", faculty: "-", students: 0 },
            { code: "DS-602-MJ", name: "Optimization Techniques", faculty: "-", students: 0 },
            { code: "DS-603-MJ", name: "Predictive Analysis", faculty: "-", students: 0 },
            { code: "DS-604-MJP", name: "Lab: Data Visualization", faculty: "-", students: 0 },
            { code: "DS-605-MJP", name: "Lab: Optimization & Predictive", faculty: "-", students: 0 },
            { code: "DS-610-MJ", name: "Exploratory Data Analysis", faculty: "-", students: 0 },
            { code: "DS-611-MJP", name: "Lab: EDA", faculty: "-", students: 0 },
            { code: "DS-631-RP", name: "Research Project", faculty: "-", students: 0 }
          ]
        },
        {
          sem: "IV",
          subjects: [
            { code: "DS-651-MJP", name: "Industrial Training", faculty: "-", students: 0 },
            { code: "DS-681-RP", name: "Research Work / Journal Paper", faculty: "-", students: 0 }
          ]
        }
      ]
    }
  ];

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("departments");
    return saved ? JSON.parse(saved) : initialDepartments;
  });

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const handleAddCourse = () => {
    if (!formData.name || !formData.department || !formData.semester || !formData.faculty) {
      alert("Please fill all fields");
      return;
    }

    const updatedDepartments = departments.map((dept) => {
      if (dept.name === formData.department) {
        return {
          ...dept,
          semesters: dept.semesters.map((sem) => {
            if (
              (editIndex !== null && sem.sem === formData.semester) ||
              (editIndex === null && sem.sem === formData.semester)
            ) {

              if (editIndex !== null) {
                return {
                  ...sem,
                  subjects: sem.subjects.map((s, i) =>
                    i === editIndex
                      ? {
                        ...s,
                        name: formData.name,
                        faculty: formData.faculty,
                        code: s.code || ""
                      }
                      : s
                  )
                };
              }

              return {
                ...sem,
                subjects: [
                  ...sem.subjects,
                  {
                    name: formData.name,
                    faculty: formData.faculty,
                    students: 0
                  }
                ]
              };
            }
            return sem;
          })
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
    if (selectedDept && selectedSem) {
      const updatedDept = updatedDepartments.find(
        (d) => d.name === selectedDept.name
      );

      const updatedSem = updatedDept.semesters.find(
        (s) => s.sem === selectedSem.sem
      );
      setSelectedSem(updatedSem);
    }

    setFormData({
      name: "",
      department: "",
      faculty: "",
      semester: ""
    });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleDelete = (subIndex) => {
    const updatedDepartments = departments.map((dept) => {
      if (selectedDept && dept.name === selectedDept.name) {
        return {
          ...dept,
          semesters: dept.semesters.map((sem) => {
            if (selectedSem && sem.sem === selectedSem.sem) {
              return {
                ...sem,
                subjects: sem.subjects.filter((_, i) => i !== subIndex)
              };
            }
            return sem;
          })
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
    if (selectedDept && selectedSem) {
      const updatedDept = updatedDepartments.find(
        (d) => d.name === selectedDept.name
      );

      const updatedSem = updatedDept.semesters.find(
        (s) => s.sem === selectedSem.sem
      );

      setSelectedSem(updatedSem);
    }
  };

  const handleEdit = (sub, index) => {
    setShowForm(true);
    setEditIndex(index);
    setFormData({
      name: sub.name,
      department: selectedDept.name,
      faculty: sub.faculty,
      semester: selectedSem.sem
    });
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Manage Courses</h2>
          <p className="text-muted mb-0">Create and manage course offerings</p>
        </div>

        <button
          className="btn text-white px-4"
          style={{
            background: "linear-gradient(90deg, #2563eb, #9333ea)",
            borderRadius: "25px"
          }}
          onClick={() => setShowForm(!showForm)}
        >
          + Add Course
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-3 rounded shadow-sm mb-4">
          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Course Name"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Faculty Assigned"
                className="form-control"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-control"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
              >
                <option value="">Select Semester</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
              </select>
            </div>

            <div className="col-md-1">
              <button
                className="btn w-100 text-white"
                style={{
                  background: "linear-gradient(90deg, #2563eb, #9333ea)"
                }}
                onClick={handleAddCourse}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )
      }

      {/* ================= DEPARTMENT TABLE ================= */}

      {
        !selectedDept && (
          <div className="table-responsive bg-white rounded shadow-sm reduce-right-width">
            <table className="table align-middle mb-0 custom-table">

              <thead className="custom-table-header">
                <tr>
                  <th>Department</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {departments.map((dept, index) => (
                  <tr key={index}>
                    <td>{dept.name}</td>
                    <td className="text-center">

                      <button
                        className="btn"
                        style={{
                          background: "linear-gradient(90deg, #2563eb, #9333ea)",
                          color: "#fff",
                          padding: "3px 10px",
                          fontSize: "12px",
                          borderRadius: "5px",
                          border: "none"
                        }}
                        onClick={() => setSelectedDept(dept)}
                      >
                        View Subjects
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

      {/* ================= SEMESTERS ================= */}

      {
        selectedDept && !selectedSem && (
          <div>

            <button
              className="btn btn-light mb-3"
              onClick={() => setSelectedDept(null)}
            >
              ← Back to Departments
            </button>
            <div className="row g-3">

              {selectedDept.semesters.map((sem, index) => (
                <div key={index} className="col-md-2">

                  <div
                    className="semester-card text-center p-3 shadow-sm"
                    style={{
                      cursor: "pointer",
                      width: "100%"
                    }}
                    onClick={() => setSelectedSem(sem)}
                  >
                    <h6 className="fw-bold mb-0">Sem {sem.sem}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* ================= SUBJECT TABLE ================= */}

      {
        selectedSem && (
          <div>

            <button
              className="btn btn-light mb-3"
              onClick={() => setSelectedSem(null)}
            >
              ← Back to Semesters
            </button>

            <div className="table-responsive bg-white rounded shadow-sm">
              <table className="table align-middle mb-0">

                <thead style={{
                  background: "linear-gradient(90deg, #2563eb, #9333ea)",
                  color: "#fff"
                }}>
                  <tr>
                    <th>Course Name</th>
                    <th className="text-center">Faculty Assigned</th>
                    <th className="text-center">Semester</th>
                    <th className="text-center">Students</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedSem.subjects.map((sub, index) => (
                    <tr key={index}>
                      <td>{sub.name} {sub.code ? `(${sub.code})` : ""}</td>
                      <td className="text-center">{sub.faculty}</td>
                      <td className="text-center">{selectedSem.sem}</td>
                      <td className="text-center">{sub.students || 0}</td>

                      <td className="text-center">

                        <FaEdit
                          className="text-dark me-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(sub, index)}
                        />

                        <FaTrash
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default Courses;