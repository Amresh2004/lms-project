import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";

import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Login from "./pages/landing/Login";
import Register from "./pages/landing/Register";
import Career from "./pages/landing/Career";
import CourseDetails from "./pages/landing/CourseDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import Sidebar from "./component/Sidebar";
import StudentDashboard from "./pages/student/StudentDashboard";

import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Student";
import Staff from "./pages/admin/Staff";
import Courses from "./pages/admin/Courses";
import Assignments from "./pages/admin/Assignments";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");
  return (
    <div style={{ marginTop: hideLayout ? "0px" : "80px" }}>
      {!hideLayout && <Navbar />}

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

        <Route path="/faculty/dashboard" element={<FacultyDashboard />}></Route>

        <Route path="/dashboard" element={<FacultyDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<MyCourses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/upload" element={<UploadMaterials />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/grades" element={<Grades />}>
</Route>
      

      <Route path="/student/dashboard" element={<StudentDashboard />} />
    </Routes>

      { !hideLayout && <Footer /> }
    </div >
  );
}

export default App;
