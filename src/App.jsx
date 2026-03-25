import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";

import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Login from "./pages/landing/Login";
import ForgotPassword from "./pages/landing/ForgotPassword";
import Register from "./pages/landing/Register";
import Career from "./pages/landing/Career";
import CourseDetails from "./pages/landing/CourseDetails";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Student";
import Faculty from "./pages/admin/Faculty";
import Courses from "./pages/admin/Courses";
import Assignments from "./pages/admin/Assignments";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// Faculty
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyMyCourses from "./pages/faculty/MyCourses";
import FacultyAssignment from "./pages/faculty/Assignment";
import FacultyAttendance from "./pages/faculty/Attendance";
import FacultyGrades from "./pages/faculty/Grades";
import FacultyAnnouncement from "./pages/faculty/Announcement";
import FacultyUpload from "./pages/faculty/UploadMaterials";
import FacultyProfile from "./pages/faculty/Profile";
import FacultyStudents from "./pages/faculty/Students";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMyCourses from "./pages/student/MyCourses";
import StudentAssignment from "./pages/student/Assignments";
import StudentAttendance from "./pages/student/Attendance";
import StudentGrades from "./pages/student/Grades";
import StudentMaterials from "./pages/student/Materials";
import StudentProfile from "./pages/student/Profile";

function App() {
  const location = useLocation();

  // ✅ Hide navbar/footer for dashboards
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");

  return (
    <>
    <ToastContainer />
      {!hideLayout && <Navbar />}

      <div style={{ marginTop: hideLayout ? "0px" : "80px" }}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/career" element={<Career />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="courses" element={<Courses />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* FACULTY */}
          <Route path="/faculty" element={<FacultyDashboard />}>
            <Route index element={<FacultyMyCourses />} />
            <Route path="dashboard" element={<FacultyMyCourses />} />
            <Route path="courses" element={<FacultyMyCourses />} />
            <Route path="assignments" element={<FacultyAssignment />} />
            <Route path="attendance" element={<FacultyAttendance />} />
            <Route path="announcements" element={<FacultyAnnouncement />} />
            <Route path="upload" element={<FacultyUpload />} />
            <Route path="students" element={<FacultyStudents />} />
            <Route path="grades" element={<FacultyGrades />} />
            <Route path="profile" element={<FacultyProfile />} />
          </Route>

          {/* STUDENT */}
          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<StudentMyCourses />} />
            <Route path="dashboard" element={<StudentMyCourses />} />
            <Route path="courses" element={<StudentMyCourses />} />
            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="material" element={<StudentMaterials />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;