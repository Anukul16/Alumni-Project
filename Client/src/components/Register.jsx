import React,{useState} from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { FaUser, FaCalendarAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

const Register = ({ isOpen, onClose }) => {
  const { onOpenChange } = useDisclosure();
  const [isVisible,setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const apiurl = import.meta.env.VITE_API_URL;
  const [formData,setFormData]=useState({
    name:'',
    passout_year:'',
    phone_number:'',
    email:'',
    password:'',
    confirm_password:''
  })


  const isValidated = () => {
    const { name, passout_year, phone_number, email, password, confirm_password } = formData;
  
    const validations = [
      { condition: !name.trim(), message: 'Name cannot be empty' },
      { condition: !passout_year.trim(), message: 'Passout year cannot be empty' },
      { condition: !/^\d{4}$/.test(passout_year), message: 'Passout year must be a 4-digit numeric value' },
      { condition: !phone_number.trim(), message: 'Phone number cannot be empty' },
      { condition: !/^\d{10}$/.test(phone_number), message: 'Phone number must be a 10-digit numeric value' },
      { condition: !email.trim(), message: 'Email cannot be empty' },
      { condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.trim(), message: 'Invalid email format' },
      { condition: !password.trim(), message: 'Password cannot be empty' },
      { condition: password !== confirm_password, message: 'Passwords do not match' }
    ];
  
    for (let { condition, message } of validations) {
      if (condition) {
        toast.error(message,{duration:1500});
        return false;
      }
    }
    return true;
  };
  
  
  
  

  const handleRegister = async() => {
    try{
      if(isValidated()){
        let resp = await axios.post(`${apiurl}/users/register`,{
          name:formData.name,
          passout_year:formData.passout_year,
          phone_number:formData.phone_number,
          email:formData.email,
          password:formData.password
        })
        let res = resp.data
        if(res.status == 'success'){
          toast(
            "Your profile is being reviewed and will be displayed within one business day",
            {
              duration: 3000,
              icon:'⌛'
            }
          );
          onClose()
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior='outside'
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Register
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={<FaUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Name"
                placeholder="Enter your full name" 
                variant="bordered"
                onChange={(e)=>setFormData((prev)=>({...prev,name:e.target.value}))}
              />
              <Input
                endContent={<FaCalendarAlt className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Passout Year"
                placeholder="Enter your passout year"
                variant="bordered"
                onChange={(e)=>setFormData((prev)=>({...prev,passout_year:e.target.value}))}
              />
              <Input
                endContent={<FaPhone className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                variant="bordered"
                onChange={(e)=>setFormData((prev)=>({...prev,phone_number:e.target.value}))}
              />
              <Input
                endContent={<FaEnvelope className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Email ID"
                placeholder="Enter your email address"
                type="email"
                variant="bordered"
                onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
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
                  onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
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
                  label="Confirm Password"
                  placeholder="Re-Enter your password"
                  type={isVisible ? 'text':'password'}
                  variant="bordered"
                  onChange={(e)=>setFormData((prev)=>({...prev,confirm_password:e.target.value}))}
                />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleRegister}>
                Register
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Register;
