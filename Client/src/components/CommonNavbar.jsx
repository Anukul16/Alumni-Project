import  { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {Avatar} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
export default function CommonNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [icon,setIcon] = useState(null)
  const imgurl = import.meta.env.VITE_IMG_URL;
  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{
    let user = localStorage.getItem('userDetails')
    user = JSON.parse(user)
    if(user != null){
      setIsAuthenticated(true)
      setIcon(user.profile)
    }
  },[])

  return (


    <div className="bg-primary text-white py-4 px-8 font-body z-20">
      {/* Top Section: Company Name and Slogan */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-header">VUCS Alumni</h1>
          <span className="text-sm italic font-body">
            Where Alumni are Excellence Unite
          </span>
        </div>
        {
          isAuthenticated ? (
            <div
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-200 hover:cursor-pointer hover:scale-110 hover:bg-gray-200"
          onClick={() => setIsModalOpen(!isModalOpen)} 
        >
          {/* <FaUserCircle className="text-gray-600 w-6 h-6 sm:w-10 sm:h-10" />{" "} */}
          <div
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full  flex items-center justify-center transition-transform duration-200 hover:scale-10 hover:bg-gray-200"
            onClick={() => navigate('/profile')} 
          >
            {
              icon
              ?
                <Avatar isBordered color="primary" src={`${imgurl}/${icon}`} className='w-full h-full'/>
              :
                <Avatar showFallback src='https://images.unsplash.com/broken' />
            }
          </div>
        </div>
          ):(
            <div className="hidden md:flex">
              <div>Register/Login</div>
            </div>
          )
        }
        
        
        

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Section: Navigation Links */}
      <div
        className={`md:flex md:space-x-8 py-4 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <Link
          to="/"
          className="block md:inline hover:text-gray-300 transition py-2 font-bold"
        >
          Home
        </Link>
        <Link
          to="/gallery"
          className="block md:inline hover:text-gray-300 transition py-2 font-bold"
        >
          Gallery
        </Link>
        <Link
          to="/alumni"
          className="block md:inline hover:text-gray-300 transition py-2 font-bold"
        >
          Alumni
        </Link>
        <Link
          to="/career"
          className="block md:inline hover:text-gray-300 transition py-2 font-bold"
        >
          Career
        </Link>
        <Link
          to="/e-magazine"
          className="block md:inline hover:text-gray-300 transition py-2 font-bold"
        >
          E-Magazine
        </Link>
        <Link
          to="/about"
          className="block md:inline hover:text-gray-300 transition py-2 font-bold"
        >
          About Us
        </Link>
      </div>

      {/* Mobile Menu: Login/Register */}
      {isOpen && (
        <div className="md:hidden px-8 py-4">
          <button className="bg-white text-cyan-700 px-4 py-2 w-full mb-2 rounded hover:bg-cyan-100 transition">
            Login
          </button>
          <button className="bg-white text-cyan-700 px-4 py-2 w-full rounded hover:bg-cyan-100 transition">
            Register
          </button>
        </div>
      )}
    </div>
  );
}
