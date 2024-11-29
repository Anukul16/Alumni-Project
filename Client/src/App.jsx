import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Homepage from "./homepage/Homepage";
import "./App.css";
import "./fonts/fonts.css";
import AlumniList from "./components/AlumniList";
import CommonNavbar from "./components/CommonNavbar";
import Profile from "./profilepage/Profile";
import { Toaster } from "react-hot-toast";
import Gallery from "./gallary/Gallery";

import AboutUs from "./about/About";
import Career from "./career/Career";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <CommonNavbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:section" element={<Gallery />} />
            <Route path="/gallery/:section/:year" element={<Gallery />} />
            <Route path="/alumni" element={<AlumniList />} />
            <Route path="/career" element={<Career />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
