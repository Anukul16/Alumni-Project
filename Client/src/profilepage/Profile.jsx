import React, { useEffect, useState ,useRef,useCallback} from 'react';
import { CiHeart } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaBriefcase } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { GrGallery } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from 'react-icons/ai';
import { HiPlus, HiTrash } from 'react-icons/hi'; 
import toast from 'react-hot-toast';
import {useDropzone} from 'react-dropzone'
import Cropper from 'react-easy-crop'




const ProfileHeader = ({
  onEditProfileClick,
  onSeeProfileClick,
  onProfileOptionsClick,
  onCoverOptionsClick,
  showProfileOptions,
  showCoverOptions,
  onProfileUpdate,
  onChoosePictureClick,
  isChooseProfileClicked,
  isChooseCoverClicked,
  onPictureRemove
}) => {
  const [ownProfile, setOwnProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(
    'https://i1.wp.com/static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-102851686/102851686.jpg?strip=all'
  );
  const [coverPic, setCoverPic] = useState(
    'https://plus.unsplash.com/premium_photo-1673177667569-e3321a8d8256?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D'
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [selectedProfile,setSelectedProfile] = useState(null)
  const [selectedCover,setSelectedCover] = useState(null)
  const [removeProfile,setRemoveProfile] = useState(false)
  const [removeCover,setRemoveCover] = useState(false)
  const [isOpen,setIsOpen] = useState(false)
  
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; 
    const reader = new FileReader();
    
    reader.onloadend = () => {
      if(isChooseCoverClicked){
        console.log("if i am: ",isChooseCoverClicked);
        setSelectedCover(reader.result)
      }else if(isChooseProfileClicked){
        setSelectedProfile(reader.result)
      }
      // setProfilePic(reader.result);
      setIsCropping(true); 
    };

    if (file) {
      reader.readAsDataURL(file); 
    }
  }, [isChooseCoverClicked,isChooseProfileClicked]);

  
  
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': [],
    },
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const getCroppedImg = async (imageSrc, crop) => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
      });

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg'); 
  };

  const showCroppedImage = useCallback(async () => {
    try {
      let picType = isChooseProfileClicked ? selectedProfile : isChooseCoverClicked ? selectedCover : ''
      const croppedImg = await getCroppedImg(picType, croppedArea);
      setCroppedImage(croppedImg); 
      if(isChooseProfileClicked){
        setProfilePic(croppedImg)
        toast.success('Profile Picture Updated Successfully')
      }else if(isChooseCoverClicked){
        setCoverPic(croppedImg)
        toast.success('Cover Picture Updated Successfully')
      }
      setIsCropping(false);
      onProfileUpdate(true)
    } catch (e) {
      console.error(e);
    }
  }, [profilePic,coverPic,croppedArea]);

  const cancelCrop = () => {
    setIsCropping(false);
  };
  const handleRemove = (option) => {
    if(option == 'profile'){
      setRemoveProfile(true)
    } 
    if(option == 'cover'){
      setRemoveCover(true)
    }
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleDelete = () => {
    if(removeProfile){
      setProfilePic('')
    }
    if(removeCover){
      setCoverPic('')
    }
    setIsOpen(false)
    onPictureRemove(true)
  }
  
  return (
    <div className="w-full lg:w-[80%] flex flex-col justify-center items-center bg-gray-100 shadow-md rounded-lg">
      {/* Cover Section */}
      <div className="w-full h-32 sm:h-48 md:h-64 lg:h-80 bg-blue-500 relative overflow-hidden">
        <img src={coverPic} alt="Cover" className="object-fill w-full h-full" />
        <div
          className="absolute flex items-center bottom-3 right-6 cursor-pointer bg-white rounded-lg px-3.5 py-2 z-20"
          onClick={onCoverOptionsClick}
        >
          <FaCamera className="text-black w-4 h-4" />
          <span className="text-black text-md font-body ml-2 hidden xs:flex">
            Edit cover photo
          </span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative flex flex-col md:flex-row items-start w-full lg:w-[80%] -mt-16 z-10 mb-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
            style={{ aspectRatio: '1' }}
          />
          <div className="absolute top-[65%] left-[77%] flex justify-center items-center">
            <div
              className="flex items-center justify-center rounded-full bg-gray-200 border border-gray-300 p-2 cursor-pointer"
              onClick={onProfileOptionsClick}
            >
              <FaCamera className="text-gray-700 w-5 h-5" />
            </div>
          </div>
          {showProfileOptions && (
            <div className="absolute top-40 -right-24 xxs:-right-18  mx-auto max-w-md bg-white shadow-2xl rounded-lg border border-gray-300 z-10 overflow-hidden">
              <div className="py-2">
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                  onClick={() => onSeeProfileClick(profilePic,'see profile')}
                >
                  <CgProfile className="mr-2" />
                  See profile picture
                </button>

                
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                  onClick={()=>{open();onChoosePictureClick('choose profile')}} // Trigger the file selection dialog
                >
                  <GrGallery className="mr-2" />
                  Choose profile picture
                </button>
                <button 
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                onClick={()=>handleRemove('profile')}
                >
                  <MdDelete className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          )}
          
        </div>
        {showCoverOptions && (
            <div className="absolute top-16 right-0 xs:right-12 lg:right-0 mx-auto max-w-md bg-white shadow-2xl rounded-lg border border-gray-300 overflow-hidden z-30">
              <div className="py-2">
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                onClick={() => onSeeProfileClick(coverPic,'see profile')} 
              >
                <CgProfile className="mr-2" /> 
                See cover picture
              </button>

                <button className="flex items-center  w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                  onClick={()=>{open();onChoosePictureClick('choose cover')}}
                >
                  <GrGallery className="mr-2" /> {/* Gallery icon */}
                  Choose cover picture
                </button>
                <button className="flex items-center  w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                   onClick={()=>handleRemove('cover')}
                >
                  <MdDelete className="mr-2" /> {/* Gallery icon */}
                  Remove
                </button>
              </div>
            </div>
          )}
        {/* User Information */}
        <div className="text-left ml-4 mt-4 md:mt-20">
          <h2 className="text-2xl font-bold">Anukul Maity</h2>
          <p className="text-lg text-gray-700 font-body">Software Engineer at Teqsonic urieurei</p>
          <p className="text-sm text-gray-500 font-body">Midnapore, West Bengal</p>
        </div>

        {/* Edit Profile Button */}
        {ownProfile ? (
          <div className="absolute right-0 flex mt-20" onClick={onEditProfileClick}>
            <MdEdit className="mr-2 w-8 h-8 xs:hidden" />
            <button className="xs:flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out hidden font-body">
              <MdEdit className="mr-2 w-5 h-5" />
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="flex justify-end items-center mt-4 md:mt-20">
            <CiHeart className="w-10 h-10 cursor-pointer" />
          </div>
        )}
      </div>

      {/* Cropping Modal */}
      {isCropping && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs md:max-w-md lg:max-w-lg h-auto">
              {/* Cropper Component */}
              <div className="relative w-full h-64 md:h-80">
                <Cropper
                  image={isChooseProfileClicked ? selectedProfile : isChooseCoverClicked ? selectedCover : ''}
                  crop={crop}
                  cropShape={isChooseProfileClicked ? 'round' : 'rect'}
                  zoom={zoom}
                  aspect={isChooseProfileClicked ? 1 : isChooseCoverClicked ? 16/9 : null}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  
                />
              </div>

              {/* Cropping Controls */}
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={cancelCrop}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={showCroppedImage}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>

      {
        isOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">
                  Are you sure you want to delete the {removeProfile ? 'profile' : removeCover ? 'cover' : ''} picture?
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
        )
      }
    </div>
    
  );
};



const Details = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start mt-8 space-y-8 md:space-y-0 md:space-x-16 w-full lg:w-[80%] p-4 bg-gray-100 shadow-md rounded-lg">
        
        {/* Contact Details Column */}
        <div className="flex flex-col flex-1 p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-full md:w-auto">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Contact Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-blue-500" />
              <span className="text-gray-700 font-body">+123-456-7890</span>
            </div>
            <div className="flex items-center">
              <FaWhatsapp className="mr-2 text-green-500" />
              <span className="text-gray-700 font-body">+987-654-3210</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-red-500" />
              <span className="text-gray-700 font-body">john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <FaLinkedin className="mr-2 text-blue-700" />
              <span className="text-gray-700 font-body">linkedin.com/in/johndoe</span>
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
                <p className="text-gray-500 font-body">123 Main Street, Apt 4B, New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start">
              <MdLocationOn className="mr-2 text-red-500" />
              <div>
                <p className="text-gray-700 font-bold">Permanent Address:</p>
                <p className="text-gray-500 font-body">456 Elm Street, Springfield, IL 62704</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Row */}
      <div className="mt-8 w-full lg:w-[80%] p-4 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 w-full text-left">Skills</h2>
        <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary transition duration-300 ease-in-out font-body">JavaScript</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out font-body">JavaScript</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out font-body">JavaScript</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out font-body">JavaScript</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out font-body">JavaScript</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out font-body">JavaScript</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out font-body">JavaScript</button>
        
        </div>
      </div>
    </>
  );
};

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




const ModalForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    phoneNo: '',
    whatsappNo: '',
    emailId: '',
    linkedinId: '',
    currentAddress: '',
    permanentAddress: '',
    skills: '',
  });

  const [experiences, setExperiences] = useState([{ companyName: '', roles: [] }]);
  const [isSameAsPhone,setIsSameAsPhone] = useState(false)
  const [isSameAsCurrent,setIsSameAsCurrent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      if (name === 'phoneNo' && isSameAsPhone) {
        newFormData.whatsappNo = value;
      }
      if(name == 'currentAddress' && isSameAsCurrent){
        newFormData.permanentAddress=value
      }
  
      return newFormData;
    });
  };

  const handleAddExperience = () => {
    const isValid = experiences.every((experience) => experience.companyName !== '');
  
    if (!isValid) {
      // alert(" .");
      toast.error(
        "Please fill out the company name for all\nexisting experiences before adding a new one.",
        {
          duration: 2000,
        }
      );
      return; 
    }
    setExperiences([...experiences, { companyName: '', roles: [] }]);
  };

  const handleCompanyChange = (index, value) => {
    const newExperiences = [...experiences];
    newExperiences[index].companyName = value;
    setExperiences(newExperiences);
  };

  const handleAddRole = (index) => {
    if (experiences[index].companyName === '') {
      toast.error('Please enter company Name')
      return;
    }
    const newExperiences = [...experiences];
    newExperiences[index].roles.push({ role: '', startDate: '', endDate: '' });
    setExperiences(newExperiences);
  };

  const handleRoleChange = (expIndex, roleIndex, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex].roles[roleIndex][field] = value;
    setExperiences(newExperiences);
  };

  const handleRemoveRole = (expIndex, roleIndex) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex].roles.splice(roleIndex, 1);
    setExperiences(newExperiences);
    toast.success('Role removed successfully')
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
    toast.success('Experience removed successfully')
  };

  
  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateSkills = (skills) => {
    if (!skills || skills.trim() === '') {
      toast.error("Please enter at least one skill.");
      return false;
    }
  
    const skillArray = skills.split(',').map(skill => skill.trim());
    const validSkills = skillArray.filter(skill => skill.length > 0);
  
    if (validSkills.length === 0) {
      toast.error("Please enter valid skills.");
      return false;
    }
  
    console.log("Validated skills:", validSkills);
    return true;
  };
  
  const handleSaveChanges = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'linkedinId') continue;
  
      if (key === 'skills') {
        if (!validateSkills(formData.skills)) {
          break; 
        }
      } else if (value === '') {
        toast.error(`Please enter your ${key.charAt(0).toUpperCase() + key.slice(1)}`, {
          duration: 2000
        });
        break; 
      }
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative overflow-hidden zoom-in">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
          onClick={onClose}
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
        <div className="max-h-96 overflow-y-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Your Designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Your Location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNo"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Phone Number"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsappNo"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="WhatsApp Number"
                value={formData.whatsappNo}
                onChange={handleChange}
                disabled={isSameAsPhone}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="sameAsPhone"
                className="mr-2"
                onChange={(e) => {
                  const isChecked = e.target.checked
                  setIsSameAsPhone(isChecked)
                  handleCheckboxChange('whatsappNo', isChecked ? formData.phoneNo : '')
                }}
              />
              <label htmlFor="sameAsPhone" className="text-sm font-medium text-gray-700">
                Same as Phone Number
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email ID</label>
              <input
                type="email"
                name="emailId"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Email ID"
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn ID</label>
              <input
                type="url"
                name="linkedinId"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedinId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Address</label>
              <input
                type="text"
                name="currentAddress"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Current Address"
                value={formData.currentAddress}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
              <input
                type="text"
                name="permanentAddress"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Permanent Address"
                value={formData.permanentAddress}
                onChange={handleChange}
                disabled={isSameAsCurrent}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="sameAsCurrentAddress"
                className="mr-2"
                onChange={(e) =>{
                  const isChecked = e.target.checked
                  setIsSameAsCurrent(isChecked)
                  handleCheckboxChange('permanentAddress',isChecked ? formData.currentAddress : '')
                }}
              />
              <label htmlFor="sameAsCurrentAddress" className="text-sm font-medium text-gray-700">
                Same as Current Address
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
                placeholder="Skill1, Skill2, Skill3"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
            
            {/* Experience Section as implemented earlier */}
            <div>
              <h3 className="text-lg font-medium text-gray-700">Experience</h3>
              <div className="space-y-4 mt-2">
                {experiences.map((experience, expIndex) => (
                  <div key={expIndex} className="bg-gray-100 p-4 rounded-md shadow-md relative">
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 flex items-center"
                      onClick={() => handleRemoveExperience(expIndex)}
                    >
                      <HiTrash className="mr-1" /> {/* Remove experience icon */}
                      Remove Experience
                    </button>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder="Company Name"
                      value={experience.companyName}
                      onChange={(e) => handleCompanyChange(expIndex, e.target.value)}
                    />
                    {experience.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="mt-4">
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-700">Role</label>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 flex items-center"
                            onClick={() => handleRemoveRole(expIndex, roleIndex)}
                          >
                            <HiTrash className="mr-1" /> {/* Remove role icon */}
                            Remove Role
                          </button>
                        </div>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                          placeholder="Role"
                          value={role.role}
                          onChange={(e) => handleRoleChange(expIndex, roleIndex, 'role', e.target.value)}
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Start Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                          value={role.startDate}
                          onChange={(e) => handleRoleChange(expIndex, roleIndex, 'startDate', e.target.value)}
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">End Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                          value={role.endDate}
                          onChange={(e) => handleRoleChange(expIndex, roleIndex, 'endDate', e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => handleAddRole(expIndex)}
                    >
                      <HiPlus className="mr-1" /> {/* Add role icon */}
                      Add Role
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-4 text-blue-500 hover:text-blue-700 flex items-center"
                  onClick={handleAddExperience}
                >
                  <HiPlus className="mr-1" /> {/* Add experience icon */}
                  Add Experience
                </button>
              </div>
            </div>
          </form>
        </div>
        <button
          type="button"
          className="mt-4 w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};


const UserProfileModal = ({ isSeeProfileOpen, onClose,imgLink }) => {
  
  if (!isSeeProfileOpen) return null;

  return (
    <div className="fixed inset-0 bg-black  flex items-center justify-center z-50 ">
          <button
            onClick={onClose}
            className="absolute top-1 right-2 w-8 h-8 flex items-center justify-center text-white bg-gray-500 hover:bg-gray-600 text-xl font-bold rounded-full"
          >
            &#10005;
          </button>

      <div className="bg-black  rounded-lg shadow-lg relative w-[100%] sm:w-[80%] lg:w-[50%]">
        {/* Close button (Cross X Icon) */}
       

        {/* Profile picture */}
        <img
          src={imgLink}
          alt="Profile"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};









// const Profile = () => {
//   const [imageLink, setImageLink] = useState('');
//   const [modalState, setModalState] = useState({
//     isEditProfileModalOpen: false,
//     isSeeProfileModalOpen: false,
//     showProfileOptions: false,
//     showCoverOptions: false,
//   });

//   const handleModal = (modalName, img = '') => {
//     setModalState({
//       isEditProfileModalOpen: modalName === 'editProfile',
//       isSeeProfileModalOpen: modalName === 'seeProfile',
//       showProfileOptions: modalName === 'profileOptions',
//       showCoverOptions: modalName === 'coverOptions',
//     });

//     // Set the image link when the 'seeProfile' modal is opened
//     if (modalName === 'seeProfile') {
//       setImageLink(img);
//     }
//   };

//   // Disable scrolling when any modal is open
//   useEffect(() => {
//     if (modalState.isEditProfileModalOpen || modalState.isSeeProfileModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [modalState.isEditProfileModalOpen, modalState.isSeeProfileModalOpen]);

//   return (
//     <>
//       <div className="flex flex-col items-center mb-5 bg-gray-200">
//         <ProfileHeader 
//           isSeeProfileModalOpen={modalState.isSeeProfileModalOpen} 
//           onEditProfileClick={() => handleModal('editProfile')} 
//           onSeeProfileClick={(img) => handleModal('seeProfile', img)}
//           onProfileOptionsClick={() => handleModal('profileOptions')}
//           onCoverOptionsClick={() => handleModal('coverOptions')}
//           showProfileOptions={modalState.showProfileOptions}
//           showCoverOptions={modalState.showCoverOptions}
//         />
//         <Details />
//         <ExperienceTimeline />
//         <ModalForm 
//           isOpen={modalState.isEditProfileModalOpen} 
//           onClose={() => handleModal('')} // Close modal
//         />
//         <UserProfileModal 
//           isSeeProfileOpen={modalState.isSeeProfileModalOpen} 
//           onClose={() => handleModal('')} // Close modal
//           imgLink={imageLink} 
//         />
//       </div>
//     </>
//   );
// };

const Profile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isSeeProfileModalOpen,setIsSeeProfileModalOpen] = useState(false)
  const [imageLink,setImageLink] = useState('')
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showCoverOptions, setShowCoverOptions] = useState(false);
  const [isClicked,setIsClicked] = useState(false)
  const [isProfileUpdated,setIsProfileUpdated]=useState(false)
  const [isChooseCoverClicked,setIsChooseCoverClicked] = useState(false)
  const [isChooseProfileClicked,setIsChooseProfileClicked] = useState(false)
  const [isPictureRemove,setIsPictureRemove] = useState(false)
  // const [modalState,setModalState] = useState({
  //   isEditProfileModalOpen:false,
  //   isSeeProfileModalOpen:false,
  //   showProfileOptions:false,
  //   showCoverOptions:false,
  // })

  const handleOpenModal = () => {
    setIsSeeProfileModalOpen(false)
    setShowProfileOptions(false)
    setShowCoverOptions(false)
    setIsEditProfileModalOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleOpenSeeProfileModal = (img,option) => {
    if(option == 'see profile'){
      setImageLink(img)
      setIsSeeProfileModalOpen(true)
    }
    setIsEditProfileModalOpen(false)
    setShowProfileOptions(false)
    setShowCoverOptions(false)
    
  }

  const handleCloseSeeProfileModal = () => {
    setIsSeeProfileModalOpen(false)
  }

  const handleOpenProfileOptions = () => {
    setIsSeeProfileModalOpen(false)
    setShowCoverOptions(false)
    setIsEditProfileModalOpen(false);
    setShowProfileOptions((prev) => !prev);
  }

  const handleOpenCoverOptions = () => {
    setIsSeeProfileModalOpen(false)
    setShowProfileOptions(false)
    setIsEditProfileModalOpen(false);
    setShowCoverOptions((prev) => !prev);
  }

  const handleProfileUpdate = (value) => {
    console.log("Value: ",value);
    setIsProfileUpdated(value)
  }
  const handleChoosePicture = (option) => {
    if(option == 'choose cover'){
      setIsChooseCoverClicked(true)
    }
    if(option == 'choose profile'){
      setIsChooseProfileClicked(true)
    }
  } 
  const handlePictureRemove = (value) => {
    setIsPictureRemove(value)
  }
  
  useEffect(()=>{
    if(isSeeProfileModalOpen || isProfileUpdated || isPictureRemove){
      console.log("I m here");
      setIsProfileUpdated(false)
      setIsSeeProfileModalOpen(false)
      setIsPictureRemove(false)

      setShowProfileOptions(false)
      setShowCoverOptions(false) 
    }
  },[isSeeProfileModalOpen,isProfileUpdated,isPictureRemove])
  



  // when the edit profile modal is open the homepage will not scroll
  useEffect(() => {
    if (isEditProfileModalOpen || isSeeProfileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditProfileModalOpen,isSeeProfileModalOpen]);

  return (
    <>
        <div className="flex flex-col items-center mb-5 bg-gray-200">
          <ProfileHeader 
            isSeeProfileModalOpen={isSeeProfileModalOpen} 
            onEditProfileClick={handleOpenModal} 
            onSeeProfileClick={handleOpenSeeProfileModal}
            onProfileOptionsClick={handleOpenProfileOptions}
            onCoverOptionsClick={handleOpenCoverOptions}
            showProfileOptions={showProfileOptions}
            showCoverOptions={showCoverOptions}
            onProfileUpdate={handleProfileUpdate}
            onChoosePictureClick={handleChoosePicture}
            isChooseProfileClicked={isChooseProfileClicked}
            isChooseCoverClicked={isChooseCoverClicked}
            onPictureRemove={handlePictureRemove}
          />
          <Details />
          <ExperienceTimeline />
          <ModalForm 
            isOpen={isEditProfileModalOpen} 
            onClose={handleCloseModal}
          />
          <UserProfileModal 
            isSeeProfileOpen={isSeeProfileModalOpen} 
            onClose={handleCloseSeeProfileModal}
            imgLink={imageLink} 
          />
        </div>
    </>
  );
};

export default Profile;
