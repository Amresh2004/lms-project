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
<<<<<<< HEAD
import Location from "./components/Location";

=======
import Career from './pages/Career';


import "bootstrap-icons/font/bootstrap-icons.css";
>>>>>>> 790902e640d6df7d8a95715053ece8ee87c894f6

function App() {
  return (
    <div style={{ marginTop: "80px" }}>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/career" element={<Career />} />
      </Routes>
      <Location/>

      <Footer />
    </div>
  )
}

export default App