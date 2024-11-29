import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
const Followers = ({connection,onClose}) => {
  const { onOpenChange} = useDisclosure();
  const apiurl = import.meta.env.VITE_API_URL;
  const [followers,setFollowers] = useState([])
  const [following,setFollowing] = useState([])

    const likeAlumni = async(liked_user_id) => {
      try{
        let userDetails = localStorage.getItem('userDetails')
        userDetails=JSON.parse(userDetails)
        const resp = await axios.post(`${apiurl}/userlike/like_alumni`,{
          alumniId:userDetails.user_id,
          likedAlumniId:liked_user_id
        })
        let res = resp.data
        if(res.status != 'success'){
          toast.error(res.message)
        }else{
          fetchFollowers()
        }
      }catch(err){
        console.log(err);
      }
    }
    const unLike = async(unliked__user_id) => {
      try{
        let userDetails = localStorage.getItem('userDetails')
        userDetails=JSON.parse(userDetails)
        const resp = await axios.post(`${apiurl}/userlike/unlike_alumni`,{
          alumniId:userDetails.user_id,
          unlikedAlumniId:unliked__user_id
        })
        let res = resp.data
        if(res.status != 'success'){
          toast.error(res.message)
        }else{
          setFollowers(followers.filter(follower =>follower.user_id !== unliked__user_id))
          setFollowing(following.filter(f => f.user_id !== unliked__user_id))
        }

      }catch(err){
        console.log(err);
      }
    }
    const fetchFollowers = async() => {
        try{
            let userDetails = localStorage.getItem('userDetails')
            userDetails=JSON.parse(userDetails)
            const resp = await axios.post(`${apiurl}/userlike/fetch_followers`,{
                user_id:userDetails.user_id
            })
            let res = resp.data;
            // console.log("Res: ",res);
            
            setFollowers(res.extras[0]);
        }catch(err){
            console.log(err);
        }
    }
    

    const fetchFollowing = async() => {
        try{
            let userDetails = localStorage.getItem('userDetails')
            userDetails=JSON.parse(userDetails)
            const resp = await axios.post(`${apiurl}/userlike/fetch_following`,{
                user_id:userDetails.user_id
            })
            let res = resp.data
            setFollowing(res.extras[0])
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(connection == 'following'){
            fetchFollowing()
        }
        if(connection == 'followers'){
            fetchFollowers()
        }
    },[connection])
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={connection}
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        onClose={onClose}
        // backdrop="blur"
        size="lg"
        placement="center"
        // size="open-md"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {connection == 'followers' ? 'Followers' : 'Following'}
            </ModalHeader>
            <ModalBody>
            {(connection == 'followers' ? followers : connection == 'following' ? following :[]).map((u, idx) => (
                <div key={idx} className="flex items-center justify-between w-full p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
                {/* Left side: User photo, name, and batch */}
                <div className="flex items-center gap-4">
                    {/* User Photo */}
                    <img
                    // src={u.src}
                    src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                    alt="User"
                    className="w-16 h-16 rounded-full object-cover"
                    />

                    {/* User Details */}
                    <div>
                    <p className="font-semibold text-lg">{u.name}</p>
                    <p className="text-sm text-gray-500">Batch of {u.passout_year}</p>
                    </div>
                </div>

                {/* Right side: Heart icon */}
                {
                  (connection == 'following')
                  ?
                  <FaHeart size={28} className="text-red-600 cursor-pointer hover:text-red-500 transition-colors" onClick={()=>unLike(u.user_id)} />
                  :
                  (connection == 'followers' && u.isFollowingBack)
                  ?
                  <FaHeart size={28} className="text-red-600 cursor-pointer hover:text-red-500 transition-colors" onClick={()=>unLike(u.user_id)}/>
                  :
                  <CiHeart size={38} className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors" onClick={()=>likeAlumni(u.user_id)}/>
                 }
                </div>
            ))}
            </ModalBody>

          </>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Followers
