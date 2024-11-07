import React,{}from 'react';

import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from 'react-redux';





const Details = () => {
  const userSelector = useSelector(state => state.userSlice);
  const skills = userSelector?.profile?.[0]?.skills
            ? userSelector.profile[0].skills.split(",")
            : [];

  

    return (
      <>
        <div className="flex flex-col md:flex-row items-start mt-8 space-y-8 md:space-y-0 md:space-x-16 w-full lg:w-[80%] p-4 bg-gray-100 shadow-md rounded-lg">
          
          {/* Contact Details Column */}
          <div className="flex flex-col flex-1 p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-full md:w-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2 text-blue-500" />
                <span className="text-gray-700 font-body">{userSelector.profile[0]?.phone_number}</span>
              </div>
              <div className="flex items-center">
                <FaWhatsapp className="mr-2 text-green-500" />
                <span className="text-gray-700 font-body">{userSelector.profile[0]?.whatsapp_number}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-red-500" />
                <span className="text-gray-700 font-body">{userSelector.profile[0]?.email}</span>
              </div>
              <div className="flex items-center">
                <FaLinkedin className="mr-2 text-blue-700" />
                <span className="text-gray-700 font-body">{userSelector.profile[0]?.linkedin_id}</span>
              </div>
            </div>
          </div>
  
          {/* Address Column */}
          <div className="flex-1 p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-full md:w-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Address</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MdLocationOn className="mr-2 text-red-500" />
                <div>
                  <p className="text-gray-700 font-bold">Current Address:</p>
                  <p className="text-gray-500 font-body">{userSelector.profile[0]?.current_address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MdLocationOn className="mr-2 text-red-500" />
                <div>
                  <p className="text-gray-700 font-bold">Permanent Address:</p>
                  <p className="text-gray-500 font-body">{userSelector.profile[0]?.permanent_address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Skills Row */}
        <div className="mt-8 w-full lg:w-[80%] p-4 bg-gray-100 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {
              skills.map((skill,idx)=>(
                <button key={idx} className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary transition duration-300 ease-in-out font-body">{skill}</button>
              ))
            }
          </div>
        </div>
      </>
    );
  };

  export default Details