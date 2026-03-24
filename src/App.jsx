import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";


import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";

import SideBar from "./components/landing/SideBar"
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
import Faculty from "./pages/admin/Faculty";
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

<<<<<<< HEAD
import StudentMyCourses from "./pages/student/MyCourses";
import StudentAssignment from "./pages/student/Assignments";
import StudentAttendance from "./pages/student/Attendance";
import StudentGrades from "./pages/student/Grades";
import StudentUploadMaterials from "./pages/student/Materials";
import StudentProfile from "./pages/student/Profile";

function App() {
  const location = useLocation();
=======

function App() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");

 

>>>>>>> 00a5ab6122f40f06279a75fb4415c1ac4bc9f465

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");
  return (
    <>
      {!hideLayout && <Navbar />}
<<<<<<< HEAD
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
=======
     

      {/* Sidebar */}

        {/* {hideLayout && <SideBar />} */}



      {hideLayout && <SideBar />}
     
>>>>>>> 00a5ab6122f40f06279a75fb4415c1ac4bc9f465

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

          <Route path="/student/dashboard" element={<StudentDashboard />} />

<<<<<<< HEAD
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
          </Route>
=======
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />


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
              {/* <Layout>
                <StudentsFaculty />
              </Layout> */}
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

        


        <Route path="/faculty/courses" element={<MyCourses />} />
        <Route path="/faculty/assignments" element={<Assignment />} />
        <Route path="/faculty/attendance" element={<Attendance />} />
        <Route path="/faculty/announcements" element={<Announcement />} />
        <Route path="/faculty/upload" element={<UploadMaterials />} />
        <Route path="/faculty/profile" element={<Profile />} />
        <Route path="/faculty/students" element={<Student />} />
        <Route path="/faculty/grades" element={<Grades />} />


        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
>>>>>>> 00a5ab6122f40f06279a75fb4415c1ac4bc9f465

          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<StudentMyCourses />} />
            <Route path="dashboard" element={<StudentMyCourses />} />
            <Route path="courses" element={<StudentMyCourses />} />
            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="material" element={<StudentUploadMaterials />} />
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
