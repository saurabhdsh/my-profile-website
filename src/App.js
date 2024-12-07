import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Experience from './components/Experience.js';
import Achievements from './components/Achievements.js';
import Innovation from './components/Innovation';
import Education from './components/Education';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [trailingPosition, setTrailingPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    let frame;
    const animateTrailing = () => {
      setTrailingPosition(prev => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.15,
        y: prev.y + (cursorPosition.y - prev.y) * 0.15
      }));
      frame = requestAnimationFrame(animateTrailing);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    frame = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      cancelAnimationFrame(frame);
    };
  }, [cursorPosition]);

  return (
    <Router>
      <GlobalStyles />
      <div
        className="cursor-dot"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
      <div
        className="cursor-circle"
        style={{
          left: `${trailingPosition.x}px`,
          top: `${trailingPosition.y}px`,
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
          </>
        } />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
