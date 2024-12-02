import React,{ useState }from 'react';

import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from 'react-redux';
import {Card, Skeleton } from '@nextui-org/react';




const Details = () => {
  const userSelector = useSelector(state => state.userSlice);
  const skills = userSelector?.profile?.[0]?.skills
            ? userSelector.profile[0].skills.split(",")
            : [];

  const [isLoaded,setIsLoaded] = useState(false)

    return (
      <>
        <div className="flex flex-col md:flex-row items-start mt-8 space-y-8 md:space-y-0 md:space-x-16 w-full lg:w-[80%] p-4 bg-gray-100 shadow-md rounded-lg">
          
          {/* Contact Details Column */}
          {/* <Card radius='lg' className='flex flex-col flex-1 p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-full md:w-auto'> */}
          <div className="flex flex-col flex-1 p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-full md:w-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Contact Details</h2>
            <div className="space-y-4">
              <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-2/5 rounded-lg':''}>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-2 text-blue-500" />
                  <span className="text-gray-700 font-body">{userSelector.profile[0]?.phone_number}</span>
                </div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-3/5 rounded-lg':''}>
                  <div className="flex items-center">
                    <FaWhatsapp className="mr-2 text-green-500" />
                    <span className="text-gray-700 font-body">{userSelector.profile[0]?.whatsapp_number}</span>
                  </div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-2/5 rounded-lg':''}>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-red-500" />
                    <span className="text-gray-700 font-body">{userSelector.profile[0]?.email}</span>
                  </div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-3/5 rounded-lg':''}>
                  <div className="flex items-center">
                    <FaLinkedin className="mr-2 text-blue-700" />
                    <span className="text-gray-700 font-body">{userSelector.profile[0]?.linkedin_id}</span>
                  </div>
              </Skeleton>
            </div>
          </div>
          {/* </Card> */}
  
          {/* Address Column */}
          <div className="flex-1 p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-full md:w-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Address</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MdLocationOn className="mr-2 text-red-500" />
                <div>
                  <p className="text-gray-700 font-bold">Current Address:</p>
                  <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-5/5 rounded-lg mt-2':''}>
                      <p className="text-gray-500 font-body">{userSelector.profile[0]?.current_address}</p>
                  </Skeleton>
                </div>
              </div>
              <div className="flex items-start">
                <MdLocationOn className="mr-2 text-red-500" />
                <div>
                  <p className="text-gray-700 font-bold">Permanent Address:</p>
                  <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-5/5 rounded-lg mt-2':''}>
                      <p className="text-gray-500 font-body">{userSelector.profile[0]?.permanent_address}</p>
                  </Skeleton>
                  
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
                <Skeleton key={idx} isLoaded={isLoaded} className={!isLoaded?'h-10 w-24 rounded-lg':''}>
                  <button key={idx} className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary transition duration-300 ease-in-out font-body">{skill}</button>
                </Skeleton>
                ))
            }
          </div>
        </div>
      </>
    );
  };

  export default Details