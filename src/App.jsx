import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";


import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";
// import SideBar from "./components/landing/SideBar"
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";



import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Login from "./pages/landing/Login";
import Register from "./pages/landing/Register";
import Career from "./pages/landing/Career";
import CourseDetails from "./pages/landing/CourseDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";

import StudentDashboard from "./pages/student/StudentDashboard";

import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Student";
import Staff from "./pages/admin/Staff";
import Courses from "./pages/admin/Courses";
import Assignments from "./pages/admin/Assignments";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

import MyCourses from "./pages/faculty/MyCourses";
import Assignment from "./pages/faculty/Assignment";
import Attendance from "./pages/faculty/Attendance";
import Grades from "./pages/faculty/Grades";
import Announcement from "./pages/faculty/Announcement";
import UploadMaterials from "./pages/faculty/UploadMaterials";
import Profile from "./pages/faculty/Profile";
import Student from "./pages/faculty/Students";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");

  return (
    <div style={{ marginTop: hideLayout ? "0px" : "80px" }}>
      {!hideLayout && <Navbar />}

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

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="staff" element={<Staff />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

       

        <Route path="/faculty/dashboard" element={<ProtectedRoute>
              <Layout>
                <FacultyDashboard />
              </Layout>
            </ProtectedRoute>}/>
        
        <Route path="/faculty/courses" element={<ProtectedRoute>
              <Layout>
                <MyCourses />
              </Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/assignments" element={<ProtectedRoute>
              <Layout>
                <Assignment />
              </Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/attendance" element={<ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/announcements" element={<ProtectedRoute>
              <Layout>
                <StudentsFaculty />
              </Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/upload" element={<ProtectedRoute>
              <Layout><UploadMaterials /></Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/profile" element={<ProtectedRoute>
              <Layout><Profile /></Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/students" element={<ProtectedRoute>
              <Layout><Student /></Layout>
            </ProtectedRoute>} />
        <Route path="/faculty/grades" element={ <ProtectedRoute>
              <Layout>
                <Grades />
              </Layout>
            </ProtectedRoute>}/>

        


        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div >
  );
}

export default App;
