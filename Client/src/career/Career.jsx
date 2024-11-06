import React from "react";
import CommonNavbar from "../components/CommonNavbar";
import Post from "./Post";
import PostForm from "./PostForm";
const Career = () => {
  return (
    <div className="">
      <div className="mt-6">
        <PostForm profilePic={"https://picsum.photos/200/200"} />
        <Post
          imageUrl={"https://picsum.photos/200/200"}
          profilePic={"https://picsum.photos/200/300"}
          content={"Hello guys, this is arunva posting the letter"}
          username={"@arunava_debnath"}
        />
        <Post
          imageUrl={"https://picsum.photos/200/200"}
          profilePic={"https://picsum.photos/200/300"}
          content={"Hello guys, this is arunva posting the letter"}
          username={"@arunava_debnath"}
        />
      </div>
    </div>
  );
};

export default Career;
