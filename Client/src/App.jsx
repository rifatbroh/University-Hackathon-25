import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import 'leaflet/dist/leaflet.css';
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <div>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </div>
  );
};

export default App;