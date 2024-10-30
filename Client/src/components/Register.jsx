import React,{useState} from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { FaUser, FaCalendarAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
const Register = ({ isOpen, onClose }) => {
  const { onOpenChange } = useDisclosure();
  const [isVisible,setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
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
              />
              <Input
                endContent={<FaCalendarAlt className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Passout Year"
                placeholder="Enter your passout year"
                variant="bordered"
              />
              <Input
                endContent={<FaPhone className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                variant="bordered"
              />
              <Input
                endContent={<FaEnvelope className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Email ID"
                placeholder="Enter your email address"
                type="email"
                variant="bordered"
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
                />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
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
