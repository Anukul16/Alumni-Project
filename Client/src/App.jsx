import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './homepage/Homepage';
// import Home from './Home';
// import About from './About';
// import Gallery from './Gallery';
// import Alumni from './Alumni';
// import Career from './Career';
// import EMagazine from './EMagazine';

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Homepage />
      {/* <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/career" element={<Career />} />
        <Route path="/e-magazine" element={<EMagazine />} />
      </Routes> */}
    </Router>
  );
};

export default App;
