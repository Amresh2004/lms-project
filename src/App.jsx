import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";
// import SideBar from "./components/landing/SideBar";

import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Login from "./pages/landing/Login";
import Register from "./pages/landing/Register";
import Career from "./pages/landing/Career";
import ForgotPassword from "./pages/landing/ForgotPassword";

// ✅ Renamed to avoid conflict
import CourseDetailsLanding from "./pages/landing/CourseDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";

import Dashboard from "./pages/admin/Dashboard";
import ManageStudent from "./pages/admin/ManageStudent";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudentDepartment from "./pages/admin/ViewStudentDepartment";
import DepartmentStudentList from "./pages/admin/DepartmentStudentList";
import SelectYear from "./pages/admin/SelectYear";

import Courses from "./pages/admin/Courses";
import Assignments from "./pages/admin/Assignments";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
//15
import ManageFaculty from "./pages/admin/ManageFaculty";
import AddFaculty from "./pages/admin/AddFaculty";

import ViewFacultyDepartments from "./pages/admin/ViewFacultyDepartments";
import DepartmentFacultyList from "./pages/admin/DepartmentFacultyList";

// Faculty
import Dashboard2 from "./pages/faculty/Dashboard";
import MyCourses from "./pages/faculty/MyCourses";
import Assignment from "./pages/faculty/Assignment";
import Attendance from "./pages/faculty/Attendance";
import Grades from "./pages/faculty/Grades";
import Announcement from "./pages/faculty/Announcement";
import UploadMaterials from "./pages/faculty/UploadMaterials";
import Profile from "./pages/faculty/Profile";
import Student from "./pages/faculty/Students";
// 8
import FacultySubmissions from "./pages/faculty/FacultySubmissions";
import CreateAssignment from "./pages/faculty/CreateAssignment";
import SubmitAssignment from "./pages/student/SubmitAssignment";

// Student
import StudentCourses from "./pages/student/MyCourses";
import StudentDashboard from "./pages/student/StudentDashboard";
import Dashboard1 from "./pages/student/Dashboard";
import StudentMyCourses from "./pages/student/MyCourses";
import CourseDetailsStudent from "./pages/student/CourseDetails";
import StudentAssignment from "./pages/student/Assignments";
import StudentAttendance from "./pages/student/Attendance";
import StudentGrades from "./pages/student/Grades";
import Materials from "./pages/student/Materials";
import StudentProfile from "./pages/student/Profile";
import StudentAnnouncement from "./pages/student/Announcement";
import AdmissionEnquiries from "./pages/admin/AdmissionEnquiries";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/student");

  return (
    <>
      <ToastContainer />

      {/* Navbar */}
      {!hideLayout && <Navbar />}

      <div style={{ marginTop: hideLayout ? "0px" : "80px" }}>
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course/:id" element={<CourseDetailsLanding />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/career" element={<Career />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/admin/enquiries"
            element={<AdmissionEnquiries />}
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="students" element={<Students />} /> */}

            <Route path="courses" element={<Courses />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/admin/manage-faculty" element={<ManageFaculty />} />
            <Route path="/admin/faculty/add" element={<AddFaculty />} />
            <Route
              path="/admin/view-faculty"
              element={<ViewFacultyDepartments />}
            />
            <Route
              path="/admin/view-faculty/:dept"
              element={<DepartmentFacultyList />}
            />

            <Route path="/admin/manage-student" element={<ManageStudent />} />

<Route path="/admin/student/add" element={<AddStudent />} />

{/* Course Selection */}
<Route
  path="/admin/view-student"
  element={<ViewStudentDepartment />}
/>

{/* Year Selection */}
<Route
  path="/admin/view-student/:dept"
  element={<SelectYear />}
/>

{/* Student List */}
<Route
  path="/admin/view-student/:dept/:year"
  element={<DepartmentStudentList />}
/>
            <Route
              path="*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Faculty Routes */}
          <Route path="/faculty" element={<FacultyDashboard />}>
            <Route index element={<MyCourses />} />
            <Route path="dashboard" element={<Dashboard2 />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="assignments" element={<Assignment />} />
            {/* 8 */}
            <Route path="submissions" element={<FacultySubmissions />} />
            {/* 8 */}
            <Route
              path="/faculty/create-assignment"
              element={<CreateAssignment />}
            />

            <Route path="attendance" element={<Attendance />} />
            <Route path="announcements" element={<Announcement />} />
            <Route path="upload" element={<UploadMaterials />} />
            <Route path="students" element={<Student />} />
            <Route path="grades" element={<Grades />} />
            <Route path="profile" element={<Profile />} />

            <Route
              path="*"
              element={
                <ProtectedRoute role="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<StudentMyCourses />} />
            <Route path="dashboard" element={<Dashboard1 />} />
            <Route path="courses" element={<StudentMyCourses />} />

            {/* ✅ Fixed route */}
            <Route path="course/:id" element={<CourseDetailsStudent />} />

            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="announcements" element={<StudentAnnouncement />} />
            <Route path="material" element={<Materials />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="profile" element={<StudentProfile />} />
            {/* 8 */}
            <Route path="/student/submit/:id" element={<SubmitAssignment />} />

            <Route
              path="*"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>

      {/* Footer */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
