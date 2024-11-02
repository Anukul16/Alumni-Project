import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import Gallery from "./gallary/Gallery";
import AlumniList from "./components/AlumniList";
import Career from "./career/Career";
import "./App.css";
import "./fonts/fonts.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/about" element={}/> */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/alumni" element={<AlumniList />} />
        <Route path="/career" element={<Career />} />
        {/* <Route path="/e-magazine" element={}/> */}
      </Routes>
    </Router>
  );
};

export default App;
