import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Virat Kohli',
      role: 'Full Stack Developer',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-TkEqCMp9GH1Mw4HxZUqIN3qU2US8WSsxA&s',
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: 'https://www.linkedin.com/in/anukul-maity/',
      },
    },
    {
      name:'Alaistar Cook',
      role:'Grinding',
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4aIh5zqt_FEp23eonjT3x8TutoY3THPbkoQ&s',
      socialLinks:{
        twitter:'#',
        github:'#',
        linkedin:'#'
      },
    },
    {
      name:'Manish Pandey',
      role:'Grinding',
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw2xgW7t4iiaesXhl0k6SaUXlA_ydCwkwAw&s',
      socialLinks:{
        twitter:'#',
        github:'#',
        linkedin:'#'
      },
    },
    {
      name:'Rohit Sharma',
      role:'Grinding',
      img:'https://cdn.britannica.com/52/252752-050-2E120356/Cricketer-Rohit-Sharma-2023.jpg',
      socialLinks:{
        twitter:'#',
        github:'#',
        linkedin:'#'
      },
    }
    // Add more team members as needed
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">About Us</h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Meet our team of dedicated developers who bring this alumni website to life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 group"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 rounded-full border-4 border-blue-500 mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
              <h3 className="text-gray-500 mb-3">{member.role}</h3>
              <div className="flex space-x-8 md:space-x-16 mt-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <a href={member.socialLinks.twitter} className="text-gray-800 hover:text-gray-600 transition">
                  <FaXTwitter size={24} />
                </a>
                <a href={member.socialLinks.github} className="text-gray-800 hover:text-gray-600 transition">
                  <FaGithub size={24} />
                </a>
                <a href={member.socialLinks.linkedin} className="text-blue-600 hover:text-blue-800 transition">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
