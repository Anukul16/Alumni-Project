import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

export default function CommonNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [icon, setIcon] = useState(null);
  const imgurl = import.meta.env.VITE_IMG_URL;
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("userDetails");
    user = JSON.parse(user);
    if (user) {
      setIsAuthenticated(true);
      setIcon(user.profile);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

        {/* Authentication Section */}
        {isAuthenticated ? (
          <div
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-200 hover:cursor-pointer hover:scale-110"
            onClick={() => navigate("/profile")}
          >
            {icon ? (
              <Avatar
                isBordered
                color="primary"
                src={`${imgurl}/${icon}`}
                className="w-full h-full"
              />
            ) : (
              <Avatar showFallback src="https://images.unsplash.com/broken" />
            )}
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <button
              className="bg-white text-cyan-700 px-4 py-2 rounded hover:bg-cyan-100 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-white text-cyan-700 px-4 py-2 rounded hover:bg-cyan-100 transition"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}

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
                d={
                  isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`md:flex md:space-x-8 py-4 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        {[
          { to: "/", label: "Home" },
          { to: "/gallery", label: "Gallery" },
          { to: "/alumni", label: "Alumni" },
          { to: "/career", label: "Career" },
          { to: "/e-magazine", label: "E-Magazine" },
          { to: "/about", label: "About Us" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block md:inline hover:text-gray-300 transition py-2 font-bold"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu: Login/Register */}
      {isOpen && !isAuthenticated && (
        <div className="md:hidden px-8 py-4">
          <button
            className="bg-white text-cyan-700 px-4 py-2 w-full mb-2 rounded hover:bg-cyan-100 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-white text-cyan-700 px-4 py-2 w-full rounded hover:bg-cyan-100 transition"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
