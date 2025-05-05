import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Contact from './pages/Contact';

const App = () => {
  return (
    <div>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>

    </div>
  );
};

export default App;