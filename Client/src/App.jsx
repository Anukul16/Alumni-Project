
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage/Homepage';
import './App.css';
import './fonts/fonts.css'
import CommonNavbar from './components/CommonNavbar';

const App = () => {
  return (
    <Router>
      <Homepage />
      <CommonNavbar/>
    </Router>
  );
};

export default App;
