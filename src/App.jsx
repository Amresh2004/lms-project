import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";
import SideBar from "./components/landing/SideBar";

import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Login from "./pages/landing/Login";
import Register from "./pages/landing/Register";
import Career from "./pages/landing/Career";
import ForgotPassword from "./pages/landing/ForgotPassword";
import CourseDetails from "./pages/landing/CourseDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";


import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Student";
import Faculty from "./pages/admin/Faculty";
import Courses from "./pages/admin/Courses";
import Assignments from "./pages/admin/Assignments";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import MyCourses from "./pages/faculty/MyCourses";
import Assignment from "./pages/faculty/Assignment";
import Attendance from "./pages/faculty/Attendance";
import Grades from "./pages/faculty/Grades";
import Announcement from "./pages/faculty/Announcement";
import UploadMaterials from "./pages/faculty/UploadMaterials";
import Profile from "./pages/faculty/Profile";
import Student from "./pages/faculty/Students";



import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMyCourses from "./pages/student/MyCourses";
import StudentAssignment from "./pages/student/Assignments";
import StudentAttendance from "./pages/student/Attendance";
import StudentGrades from "./pages/student/Grades";
import Materials from "./pages/student/Materials";
import StudentProfile from "./pages/student/Profile";
import StudentAnnouncement from "./pages/student/Announcement";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");
  return (
    <>
      <ToastContainer />
      {!hideLayout && <Navbar />}
      <div style={{ marginTop: hideLayout ? "0px" : "80px" }}>
        {/* Sidebar */}
        {/* {hideLayout && <SideBar />} */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/career" element={<Career />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

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
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
<Route path="/faculty" element={<FacultyDashboard />}>
  <Route index element={<MyCourses />} />
  <Route path="dashboard" element={<MyCourses />} />
  <Route path="courses" element={<MyCourses />} />
  <Route path="assignments" element={<Assignment />} />
  <Route path="attendance" element={<Attendance />} />
  <Route path="announcements" element={<Announcement />} />
  <Route path="upload" element={<UploadMaterials />} />
  <Route path="students" element={<Student />} />
  <Route path="grades" element={<Grades />} />
  <Route path="profile" element={<Profile />} />

          
            <Route
              path="/faculty/*"
              element={
                <ProtectedRoute role="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<StudentMyCourses />} />
            <Route path="dashboard" element={<StudentMyCourses />} />
            <Route path="courses" element={<StudentMyCourses />} />
            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="announcements" element={<StudentAnnouncement />} />
            <Route path="material" element={<Materials />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route
              path="/student/*"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
