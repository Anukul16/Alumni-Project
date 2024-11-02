import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

const Post = ({ profilePic, username, timestamp, content, imageUrl }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  const handleLike = () => setLikes(likes + 1);
  const handleComment = () => setComments(comments + 1);
  const handleShare = () => setShares(shares + 1);

  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={profilePic}
          alt={`${username} profile`}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-bold">{username}</h3>
          <p className="text-gray-500 text-sm">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4">{content}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post content"
          className="rounded-lg w-full mb-4"
        />
      )}

      {/* Reactions */}
      <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
        <span>{likes} Likes</span>
        <span>{comments} Comments</span>
        <span>{shares} Shares</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-around border-t border-gray-300 pt-2">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
        >
          <FaThumbsUp />
          <span>Like</span>
        </button>
        <button
          onClick={handleComment}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
        >
          <FaComment />
          <span>Comment</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
        >
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
