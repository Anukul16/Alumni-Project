import React, { useState } from "react";
import PostModel from "./PostModel";

const PostForm = ({ profilePic, username }) => {
  const [showDropzone, setShowDropzone] = useState(false);

  const handleDropzoneToggle = () => {
    setShowDropzone((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowDropzone((prev) => !prev);
  };

  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-around items-center">
        <img
          src={profilePic}
          alt={`${username} profile`}
          className="w-12 h-12 rounded-full"
        />
        <div
          className="ml-3 bg-slate-50 w-[85%] border p-3 rounded-3xl hover:cursor-pointer"
          onClick={handleDropzoneToggle}
        >
          <h2>Write your post</h2>
        </div>
      </div>
      {showDropzone && (
        <PostModel showModal={showDropzone} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default PostForm;
