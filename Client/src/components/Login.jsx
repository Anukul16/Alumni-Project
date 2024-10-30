import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {FaUser } from "react-icons/fa";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import React,{useState} from 'react'

const Login = ({isOpen,onClose}) =>  {

  const {onOpenChange} = useDisclosure();
  const [isVisible,setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
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
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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