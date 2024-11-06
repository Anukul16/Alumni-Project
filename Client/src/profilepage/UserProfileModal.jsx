import React, {} from 'react';





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

  export default UserProfileModal