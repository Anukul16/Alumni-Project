import React, {} from 'react';

import { FaBriefcase } from 'react-icons/fa';



const ExperienceTimeline = () => {
    const experiences = [
      {
        companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEndPkpxU-FDOQK0acJ6iuFECTI914xOelQ&s',
        companyName: 'Google',
        roles: [
          {
            role: 'Senior Software Engineer',
            startDate: 'Jan 2022',
            endDate: 'Present',
          },
          {
            role: 'Software Engineer',
            startDate: 'Jan 2020',
            endDate: 'Dec 2021',
          },
          {
            role: 'Software Engineer 2',
            startDate: 'Jan 2018',
            endDate: 'Jan 2020',
          },
          {
            role: 'Software Engineer 3',
            startDate: 'Jan 2018',
            endDate: 'Jan 2020',
          },
          {
            role: 'Software Engineer',
            startDate: 'Jan 2018',
            endDate: 'Jan 2020',
          },
          {
            role: 'Software Engineer',
            startDate: 'Jan 2018',
            endDate: 'Jan 2020',
          },
          {
            role: 'Software Engineer',
            startDate: 'Jan 2018',
            endDate: 'Jan 2020',
          },
        ],
      },
      {
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
        companyName: 'Microsoft',
        roles: [
          {
            role: 'Junior Developer',
            startDate: 'May 2018',
            endDate: 'Dec 2019',
          },
          {
            role: 'Junior Developer',
            startDate: 'May 2018',
            endDate: 'Dec 2019',
          }
        ],
      },
      {
        companyLogo: 'https://1000logos.net/wp-content/uploads/2017/04/Oracle-Logo.jpg', 
        companyName: 'Oracle',
        roles: [
          {
            role: 'Junior Developer',
            startDate: 'May 2018',
            endDate: 'Dec 2019',
          }
        ],
      },
    ];
  
    return (
      <div className="mt-8 w-full lg:w-[80%] p-4 bg-gray-100 rounded-lg shadow-lg z-30">
        <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
  
        {/* Timeline container */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 relative">
              {/* Company Logo */}
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 mr-4">
                  {exp.companyLogo ? (
                    <img
                      src={exp.companyLogo}
                      alt={exp.companyName}
                      className="w-16 h-16 border-2 border-gray-300 object-cover"
                    />
                  ) : (
                    <FaBriefcase className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold">{exp.companyName}</h3>
              </div>
  
              {/* Roles within the company */}
              {exp.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="relative pl-8 mb-8">
                  {/* Circle inside the road */}
                  <div className={`absolute left-[-1.9px] top-4 w-4 h-4 rounded-full 
                    ${roleIndex === 0 ? 'bg-blue-500' : 'bg-gray-300'}
                  `}></div>
  
                  {/* Role details */}
                  <div>
                    <p className="text-gray-600 font-body">{role.role}</p>
                    <p className="text-sm text-gray-500 font-body">
                      {role.startDate} - {role.endDate}
                    </p>
                  </div>
  
                  {/* Role change road */}
                  {roleIndex !== exp.roles.length - 1 && (
                    <div className="absolute left-[5px] top-[32px] w-[2px] h-[75px] bg-gray-300"></div>
                  )}
                </div>
              ))}
  
              {/* Timeline road between companies */}
              {/* {index !== experiences.length - 1 && (
                <div className="absolute left-[50px] top-[82px] w-[2px] h-[100px] bg-gray-300"></div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default ExperienceTimeline