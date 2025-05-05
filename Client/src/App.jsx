import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Marathon from './pages/Marathon';
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <div>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marathon" element={<Marathon />} />
         
      </Routes>

    </div>
  );
};

export default App;