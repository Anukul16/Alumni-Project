import  { useState } from 'react';

import { Link } from 'react-router-dom';
export default function CommonNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (


    <div className="bg-primary text-white py-4 px-8 font-body z-20">
      {/* Top Section: Company Name and Slogan */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-header">VUCS Alumni</h1>
          <span className="text-sm italic font-body">Where Alumni are Excellence Unite</span>
        </div>

        {/* Login/Register Section for Desktop */}
        <div className="hidden md:flex">
            <div>Register/Login</div>
          {/* <button className="bg-white text-cyan-700 px-4 py-2 mr-4 rounded hover:bg-cyan-100 transition">Login</button> */}
          {/* <button className="bg-white text-cyan-700 px-4 py-2 rounded hover:bg-cyan-100 transition">Register</button> */}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Section: Navigation Links */}
      <div className={`md:flex md:space-x-8 py-4 ${isOpen ? "block" : "hidden"} md:block`}>
        <Link to="/" className="block md:inline hover:text-gray-300 transition py-2 font-bold">Home</Link>
        <Link to="/gallery" className="block md:inline hover:text-gray-300 transition py-2 font-bold">Gallery</Link>
        <Link to="/alumni" className="block md:inline hover:text-gray-300 transition py-2 font-bold">Alumni</Link>
        <Link to="/career" className="block md:inline hover:text-gray-300 transition py-2 font-bold">Career</Link>
        <Link to="/e-magazine" className="block md:inline hover:text-gray-300 transition py-2 font-bold">E-Magazine</Link>
        <Link to="/about" className="block md:inline hover:text-gray-300 transition py-2 font-bold">About Us</Link>
      </div>

      {/* Mobile Menu: Login/Register */}
      {isOpen && (
        <div className="md:hidden px-8 py-4">
          <button className="bg-white text-cyan-700 px-4 py-2 w-full mb-2 rounded hover:bg-cyan-100 transition">Login</button>
          <button className="bg-white text-cyan-700 px-4 py-2 w-full rounded hover:bg-cyan-100 transition">Register</button>
        </div>
      )}
    </div>
  );
}
