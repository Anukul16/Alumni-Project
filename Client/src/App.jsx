import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import "./App.css";
import "./fonts/fonts.css";
//import CommonNavbar from "./components/CommonNavbar";
import Gallery from "./gallary/Gallery";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
