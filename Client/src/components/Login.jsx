import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {FaUser } from "react-icons/fa";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import React,{useEffect, useState} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateLoginStatus } from "../redux/slices/UserSlice";

const Login = ({isOpen,onClose}) =>  {

  const {onOpenChange} = useDisclosure();
  const [isVisible,setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const toggleVisibility = () => setIsVisible(!isVisible)
  const apiurl = import.meta.env.VITE_API_URL;
  const userSelector = useSelector(state => state.userSlice);
  const [loginCredentials,setLoginCredentials] = useState({
    alumni_id:'',
    password:''
  })
  const handleLogin = async () => {
    try {
      const resp = await axios.post(`${apiurl}/users/login`, {
        user_id: loginCredentials.alumni_id,
        password: loginCredentials.password,
      });
      const res = resp.data;
  
      console.log(res); 
  
      if (res.status !== 'success') {
        setLoginCredentials((prev) => ({
          ...prev,
          password: '',
        }));
        toast.error(res.message);
      } else {
        dispatch(updateLoginStatus(true))
        toast.success('Login Successful');
        localStorage.setItem('userDetails', JSON.stringify(res.extras[0]));
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during login');
    }
  };
  useEffect(()=>{
    if(userSelector.isLoggedin == false){
      setLoginCredentials({
        user_id:'',
        password:''
      })
    }
  },[userSelector.isLoggedin])
  
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <FaUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="AlumniId"
                  placeholder="Enter your alumniId"
                  variant="bordered"
                  value={loginCredentials.alumni_id}
                  onChange={(e)=>setLoginCredentials((prev)=>({...prev,alumni_id:e.target.value}))}
                />
                <Input
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {
                            isVisible ? (
                              <BiSolidLockOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0 hover:cursor-pointer" />
                            ):(
                              <BiSolidLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0 hover:cursor-pointer" />
                            )
                          }
                    </button>
                    
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type={isVisible ? 'text':'password'}
                  variant="bordered"
                  value={loginCredentials.password}
                  onChange={(e)=>setLoginCredentials((prev)=>({...prev,password:e.target.value}))}
                />
                <div className="flex py-2 px-1 justify-end">
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleLogin}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Login