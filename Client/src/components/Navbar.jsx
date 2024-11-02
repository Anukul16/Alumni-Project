import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State variable for authentication
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsModalOpen(false); // Close the modal upon logout
  };

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
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:bg-gray-200"
                  onClick={() => setIsModalOpen(!isModalOpen)} // Toggle modal on click
                >
                  <FaUserCircle className="text-gray-600 w-6 h-6 sm:w-10 sm:h-10" />{" "}
                  {/* Profile icon */}
                </div>

                {/* Modal */}
                {isModalOpen && (
                  <div className="absolute -right-2 top-8 sm:top-12 w-36 sm:w-40 bg-white rounded-md shadow-lg z-20">
                    <div className="flex flex-col">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setIsModalOpen(false)} // Close modal on link click
                      >
                        My Profile
                      </Link>
                      <button
                        className="block text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={handleLogout} // Logout function
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="text-white hover:text-gray-300">
                  Login
                </button>
                <h6 className="text-white">/</h6>
                <button className="text-white hover:text-gray-300">
                  Register
                </button>
              </>
            )}
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
            to="/about"
            className="text-white hover:text-gray-300 text-xs sm:text-base font-semibold sm:font-bold"
          >
            About
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
