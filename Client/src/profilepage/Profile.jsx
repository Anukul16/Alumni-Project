import React, { useEffect, useState} from 'react'
import ProfileHeader from './ProfileHeader';
import Details from './Details';
import ExperienceTimeline from './ExperienceTimeline';
import ModalForm from './ModalForm';
import UserProfileModal from './UserProfileModal';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

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
  // const {id} = useParams()
  const [userData,setUserData] = useState({
    user:[],
    followingCount:0,
    followersCount:0,
    followings:[],
    followers:[],
    myFollowings:[]
  })
  const [dataLoaded,setDataLoaded] = useState(false)
  const [jobDetails,setJobDetails] = useState([])
  const apiurl = import.meta.env.VITE_API_URL
  const location = useLocation()
  const {userId} = location.state || {}
  const myUserId = JSON.parse(localStorage.getItem('userDetails'))?.user_id
  
  
  const fetchUser = async() => {
    try{
      // console.log("Myuserid: ",myUserId," urlid: ",id);
      const resp = await axios.post(`${apiurl}/users/get_user_details`,{
        // user_id:id ? id : myUserId
        user_id:userId ? userId : myUserId,
        myUserId:myUserId
      })
      let res = resp.data;
      if(res.status != 'success'){
        console.log(res.message);
      }else{
        const result = {
          user:res.extras.user,
          followingCount:res.extras.followingCount[0]['COUNT(*)'],
          followersCount:res.extras.followersCount[0]['COUNT(*)'],
          followings:res.extras.followings,
          followers:res.extras.followers,
          myFollowings:res.extras.myFollowings
        }
        setUserData(result)
        // console.log("profile: ",res.extras.experience);
        
        setJobDetails(res.extras.experience)
        setDataLoaded(true)
      }
    }catch(err){
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchUser()
  },[userId])
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
    if(option === 'choose cover'){
      setIsChooseCoverClicked(true)
    }
    if(option === 'choose profile'){
      setIsChooseProfileClicked(true)
    }
  } 
  useEffect(()=>{
    // console.log("Res: ",[isChooseProfileClicked,isChooseCoverClicked]);
    
  },[isChooseProfileClicked,isChooseCoverClicked])
  const handlePictureRemove = (value) => {
    setIsPictureRemove(value)
  }
  
  useEffect(()=>{
    if(isSeeProfileModalOpen || isProfileUpdated || isPictureRemove ){
      console.log("I m here");
      setIsProfileUpdated(false)
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
            setIsChooseProfileClicked={setIsChooseProfileClicked}
            isChooseCoverClicked={isChooseCoverClicked}
            setIsChooseCoverClicked={setIsChooseCoverClicked}
            onPictureRemove={handlePictureRemove}
            userData = {userData}
            setUserData={setUserData}
            dataLoaded={dataLoaded}
          />
          <Details userData={userData} dataLoaded={dataLoaded}/>
          <ExperienceTimeline jobDetails={jobDetails} dataLoaded={dataLoaded} />
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
