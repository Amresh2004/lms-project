import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Career from './pages/Career';
import CourseDetails from "./CourseDetails";
function App() {
  return (
    <div style={{ marginTop: "80px" }}>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/career" element={<Career />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App