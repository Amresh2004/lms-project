import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/landing/Navbar'
import Footer from './components/landing/Footer';

import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Courses from './pages/landing/Courses';
import Contact from './pages/landing/Contact';
import Login from './pages/landing/Login';
import Register from './pages/landing/Register';
import Career from './pages/landing/Career';
import CourseDetails from "./pages/landing/CourseDetails";

function App() {
  return (
    <div style={{ marginTop: "80px" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
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