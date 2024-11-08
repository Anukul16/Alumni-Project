import React, { useState,useCallback, useEffect} from 'react';
import { CiHeart } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaCamera } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { GrGallery } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import {useDropzone} from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { useSelector } from 'react-redux';
import { Skeleton } from '@nextui-org/skeleton';
import axios from 'axios';



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
    setIsChooseProfileClicked,
    isChooseCoverClicked,
    setIsChooseCoverClicked,
    onPictureRemove
  }) => {
    const [ownProfile, setOwnProfile] = useState(true);
    const [profilePic, setProfilePic] = useState('');
    const [coverPic, setCoverPic] = useState('');
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
    const userSelector = useSelector(state => state.userSlice);
    const [isLoaded,setIsLoaded] = useState(true)
    const [imgFile,setImgFile] = useState('')
    const apiurl = import.meta.env.VITE_API_URL;
    const imgurl = import.meta.env.VITE_IMG_URL;
    useEffect(()=>{
      let userDetails = localStorage.getItem('userDetails');
      userDetails=JSON.parse(userDetails)
      
      setProfilePic(userDetails.profile)
      setCoverPic(userDetails.cover)
    },[])
    useEffect(()=>{
      // console.log("profile: ",profilePic);
      
    },[profilePic])

    const onDrop = useCallback(async(acceptedFiles) => {
      const file = acceptedFiles[0]; 
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        // console.log("File: ",file);
        // setImgFile(file)
         
      }
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
  
      
      
    }, [isChooseCoverClicked,isChooseProfileClicked]);
    function base64ToFile(base64String) {
      // Derive the file extension
      const match = base64String.match(/^data:(image\/\w+);base64,/);
      const extension = match ? match[1].split('/')[1] : 'png'; // Default to png if not found
      
      // Generate a unique filename
      const filename = `image_${Date.now()}.${extension}`;
      
      // Remove the Base64 prefix, if present
      const cleanedBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');
    
      // Convert Base64 to binary data
      const byteCharacters = atob(cleanedBase64);
      const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
    
      // Create and return the File object
      return new File([byteArray], filename, { type: `image/${extension}` });
    }
    
    const uploadPicture = async(file,type) => {
      try{
        let userDetails = localStorage.getItem('userDetails')
        userDetails=JSON.parse(userDetails)
        const formData = new FormData();
        formData.append('alumniId',userDetails.user_id);
        formData.append('type',type);
        formData.append('file',file);
        
        const resp = await axios.post(`${apiurl}/uploads/upload`,formData,{
          headers:{
            "Content-Type":'multipart/form-data'
          }
        })
        const res = resp.data;
        // console.log("Res=========: ",res);
        
        if(res.status != 'success'){
          console.log(res.message);
        }else{
          const userData = JSON.parse(localStorage.getItem('userDetails'));
          if(type == 'profile'){
            setProfilePic(res.extras[0])
            userData.profile = res.extras[0];
          }else if(type == 'cover'){
            setCoverPic(res.extras[0])
            userData.cover = res.extras[0];
          }
          localStorage.setItem('userDetails', JSON.stringify(userData));
         
        }
      }catch(err){
        console.error(err);
      }
    }
    
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
        console.log([isChooseProfileClicked,isChooseCoverClicked]);
        
        let picType = isChooseProfileClicked ? selectedProfile : isChooseCoverClicked ? selectedCover : ''
        const croppedImg = await getCroppedImg(picType, croppedArea);
        
        setCroppedImage(croppedImg); 
        let resFile = base64ToFile(croppedImg)
        if(isChooseProfileClicked){
          setProfilePic(croppedImg)
          uploadPicture(resFile,'profile')
          setIsChooseProfileClicked(false)
          toast.success('Profile Picture Updated Successfully')
          
        }else if(isChooseCoverClicked){
          setCoverPic(croppedImg)
          uploadPicture(resFile,'cover')
          setIsChooseCoverClicked(false)
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
        deletePicture('profile')
      }
      if(removeCover){
        deletePicture('cover')
      }
      setIsOpen(false)
      onPictureRemove(true)
    }
    const deletePicture = async(picType) => {
      try{
        const endpoint = picType === 'profile'
            ? 'delete_profile_pic'
            : picType === 'cover'
              ? 'delete_cover_pic'
              : null;
        let userDetails = localStorage.getItem('userDetails')
        userDetails=JSON.parse(userDetails)
        
        const resp = await axios.post(`${apiurl}/users/${endpoint}`,{
          alumniId:userDetails.user_id
        })
        const res = resp.data
        if(res.status != 'success'){
          console.log(res.message);
        }else{
          if(picType == 'profile'){
            userDetails.profile=''
            setProfilePic('')
          }else if(picType == 'cover'){
            userDetails.cover=''
            setCoverPic('')
          }
          localStorage.setItem('userDetails',JSON.stringify(userDetails))
        }
      }catch(err){
        console.error(err);
      }
    }
    
    return (
      <div className="w-full lg:w-[80%] flex flex-col justify-center items-center bg-gray-100 shadow-md rounded-lg">
        {/* Cover Section */}
        <div className="w-full h-32 sm:h-48 md:h-64 lg:h-80 bg-blue-500 relative overflow-hidden">
          <img src={coverPic ? `${imgurl}/${coverPic}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZADoFa6P0jXUPhuoUhTgc2i2E3kSBJGHolA&s'} alt="Cover" className="object-fill w-full h-full" />
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
            <Skeleton isLoaded={isLoaded} className={!isLoaded ? 'rounded-full border-4 border-white shadow-lg':''}>
              <img
                key={true}
                src={profilePic ? `${imgurl}/${profilePic}` : 'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                style={{ aspectRatio: '1' }}
              />
            </Skeleton>
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
                    onClick={() => onSeeProfileClick(`${imgurl}/${profilePic}`,'see profile')}
                  >
                    <CgProfile className="mr-2" />
                    See profile picture
                  </button>
  
                  
                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out font-body"
                    onClick={()=>{open();onChoosePictureClick('choose profile')}}
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
                  onClick={() => onSeeProfileClick(`${imgurl}/${coverPic}`,'see profile')} 
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
            <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-3/5 rounded-lg':''}>
              <h2 className="text-2xl font-bold">{userSelector.profile[0]?.name}</h2>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-4/5 rounded-lg mt-2':''}>
              <p className="text-lg text-gray-700 font-body">{userSelector.profile[0]?.designation}</p>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className={!isLoaded?'h-3 w-5/5 mt-2 rounded-lg':''}>
              <p className="text-sm text-gray-500 font-body">{userSelector.profile[0]?.location}</p>
            </Skeleton>
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
            <div className="flex justify-end items-center mt-20 md:mt-20 absolute right-8 lg:right-0">
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

  export default ProfileHeader