import React, { useEffect, useState} from 'react'
import ProfileHeader from './ProfileHeader';
import Details from './Details';
import ExperienceTimeline from './ExperienceTimeline';
import ModalForm from './ModalForm';
import UserProfileModal from './UserProfileModal';

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
