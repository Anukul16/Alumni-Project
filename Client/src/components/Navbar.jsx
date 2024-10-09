import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-10 bg-transparent  border border-black/20 shadow-md">
      <div className="flex flex-col">
        
        <div className="flex justify-between items-center p-3">
          <div className="text-white ">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold xs:font-bold">VUCS ALUMNI</h1> 
            <div className="text-xxs sm:text-lg">Where Alumni and Excellence Unite</div> 
          </div>

          <div className="flex space-x-2 text-sm font-normal sm:text-lg xs:font-semibold">
            <button className="text-white hover:text-gray-300">Login</button>
            <h6 className='text-white'>/</h6>
            <button className="text-white hover:text-gray-300">Register</button>
          </div>
        </div>

       
        <div className="flex justify-start space-x-2 p-3  xxs:space-x-3 xxs:p-2 xxs:pl-2 xs:space-x-4 xs:p-2 xs:pl-6 sm:space-x-8 md:space-x-16 md:p-3 md:pl-20">
          <Link to="/home" className="text-white hover:text-gray-300 text-xs sm:text-base font-bold">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300 text-xs sm:text-base font-bold">About</Link>
          <Link to="/gallery" className="text-white hover:text-gray-300 text-xs sm:text-base font-bold">Gallery</Link>
          <Link to="/alumni" className="text-white hover:text-gray-300 text-xs sm:text-base font-bold">Alumni</Link>
          <Link to="/career" className="text-white hover:text-gray-300 text-xs sm:text-base font-bold">Career</Link>
          <Link to="/e-magazine" className="text-white hover:text-gray-300 text-xs sm:text-base font-bold">E-Magazine</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
