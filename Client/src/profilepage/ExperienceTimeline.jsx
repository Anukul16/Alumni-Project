import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FaBriefcase } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateExperience, updateProfileDetails } from '../redux/slices/UserSlice';
import { Skeleton } from '@nextui-org/skeleton';
import { useParams } from 'react-router-dom';



const ExperienceTimeline = ({jobDetails,dataLoaded}) => {
    const apiurl = import.meta.env.VITE_API_URL;
    
    const dispatch = useDispatch();
    const [experiences, setExperiences] = useState([]);
    const [isLoaded,setIsLoaded] = useState(dataLoaded)
    const {id} = useParams()
    // console.log("Jobdetails: ",Array.isArray(jobDetails)," ",jobDetails);
    useEffect(()=>{
      setExperiences(()=>jobDetails)
      
    },[jobDetails])
    // console.log("DataloadedExp: ",dataLoaded);
    useEffect(()=>{
      if(dataLoaded){
        setTimeout(() => {
          setIsLoaded(dataLoaded)
        }, 2000);
      }
    },[dataLoaded])
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
                    <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-16 w-16 rounded-sm':''}>
                        <img
                        src={exp.companyLogo}
                        alt={exp.companyName}
                        className="w-16 h-16 border-2 border-gray-300 object-cover"
                      />
                    </Skeleton>
                  ) : (
                    <FaBriefcase className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-6 w-20 rounded-md mt-2':''} >
                  <h3 className="text-xl font-bold">{exp.companyName}</h3>
                </Skeleton>
              </div>
  
              {/* Roles within the company */}
              {exp.roles && Array.isArray(exp.roles) && exp.roles.length > 0 &&  exp.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="relative pl-8 mb-8">
                  {/* Circle inside the road */}
                  <div className={`absolute left-[-1.9px] top-4 w-4 h-4 rounded-full 
                    ${roleIndex === 0 ? 'bg-blue-500' : 'bg-gray-300'}
                  `}></div>
  
                  {/* Role details */}
                  <div>
                    <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-16 rounded-md':''}>
                      <p className="text-gray-600 font-body">{role.role}</p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-48 rounded-md mt-3':''}>
                        <p className="text-sm text-gray-500 font-body">
                          {role.start_date.split("T")[0]} - {role.end_date.split("T")[0]}
                        </p>
                    </Skeleton>
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