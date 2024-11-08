import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle,FaUser,FaSignOutAlt } from 'react-icons/fa';
import Login from './Login';
import Register from './Register';
import { useDisclosure } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginStatus } from '../redux/slices/UserSlice';
import {Avatar} from "@nextui-org/react";

const Navbar = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const userSelector = useSelector(state => state.userSlice)
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalType,setModalType] = useState(null)
  const dispatch = useDispatch()
  const [icon,setIcon] = useState('')
  const imgurl = import.meta.env.VITE_IMG_URL;
  // console.log("login: ",userSelector.isLoggedIn);
  
  const {isOpen,onOpen,onClose} = useDisclosure();
  const handleLogout = () => {
    console.log("Removing======");
    
    localStorage.removeItem('userDetails')
    setIsAuthenticated(false);
    dispatch(updateLoginStatus(false))
    setIsModalOpen(false);
    toast.success("You have logged out successfully")
  };
  const handleModal = (type) => {
    setModalType(type);
    onOpen();
  };
  useEffect(()=>{
    console.log("redux: ",userSelector.isLoggedin);
    setIsAuthenticated(true)
  },[userSelector.isLoggedin])
  
  useEffect(()=>{
    console.log("isauthnticated: ",isAuthenticated);
    let user = localStorage?.getItem('userDetails')
    user=JSON.parse(user)
    if(user != null){
      setIsAuthenticated(true)
      setIcon(user.profile)
    }else{
      setIsAuthenticated(false)
    }
  },[isAuthenticated])
  
  return (
    <nav className="fixed w-full z-10 bg-transparent border border-black/20 shadow-md sm:px-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-3">
          <div className="text-white">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold xs:font-bold">
              VUCS ALUMNI
            </h1>
            <div className="text-xxs sm:text-lg">
              Where Alumni and Excellence Unite
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm font-normal sm:text-lg xs:font-semibold">
            {isAuthenticated ? (
              <div className="relative flex items-center cursor-pointer">
                <div
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full  flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:bg-gray-200"
                  onClick={() => setIsModalOpen(!isModalOpen)} 
                >
                  {
                    icon
                    ?
                      <Avatar isBordered color="primary" src={`${imgurl}/${icon}`} className='w-full h-full'/>
                    :
                      <Avatar showFallback src='https://images.unsplash.com/broken' />
                  }
                </div>

                {/* Modal */}
                {isModalOpen && (
                  <div className="absolute -right-2 top-8 sm:top-12 w-36 sm:w-40 bg-white rounded-md shadow-lg z-20">
                    <div className="flex flex-col">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setIsModalOpen(false)} // Close modal on link click
                      >
                        <FaUser className="h-5 w-5 text-gray-600 mr-2" />{" "}
                        {/* Profile Icon */}
                        My Profile
                      </Link>
                      <button
                        className="flex items-center text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={handleLogout} 
                      >
                        <FaSignOutAlt className="h-5 w-5 text-gray-600 mr-2" />{" "}
                        {/* Logout Icon */}
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : 
              isAuthenticated === false
              ?(
                <>
                <button className="text-white hover:text-gray-300" onClick={()=>handleModal('login')}>Login</button>
                <h6 className='text-white'>/</h6>
                <button className="text-white hover:text-gray-300" onClick={()=>handleModal('register')}>Register</button>
              </>
              ):null
            }
          </div>
        </div>
        
        <div className="flex justify-center sm:justify-start space-x-2 p-3 xxs:space-x-3 xxs:p-2 xxs:pl-2 xs:space-x-4 xs:p-2 xs:pl-6 sm:space-x-8 md:space-x-12 md:p-3 md:pl-20">
          <Link
            to="/"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            Gallery
          </Link>
          
          <Link
            to="/alumni"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            Alumni
          </Link>
          <Link
            to="/career"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            Career
          </Link>
          <Link
            to="/e-magazine"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            E-Magazine
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            About
          </Link>
        </div>
      </div>
      {/* {
        loginClicked ? <Login isOpen={}/> : registerClicked ? <Register /> : null
      } */}
      {modalType == 'login' && <Login isOpen={isOpen} onClose={onClose}/>}
      {modalType == 'register' && <Register isOpen={isOpen} onClose={onClose}/>}
    </nav>
  );
};

export default Navbar;
