import React, { useEffect, useState} from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

import { HiPlus, HiTrash } from 'react-icons/hi'; 
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ModalForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      passoutYear:'',
      designation: '',
      location: '',
      phoneNo: '',
      whatsappNo: '',
      emailId: '',
      linkedinId: '',
      currentAddress: '',
      permanentAddress: '',
      skills: '',
    });
    const { onOpenChange } = useDisclosure();
    const [experiences, setExperiences] = useState([{ companyName: '', roles: [] }]);
    const [isSameAsPhone,setIsSameAsPhone] = useState(false)
    const [isSameAsCurrent,setIsSameAsCurrent] = useState(false)
    const [user,setUser] = useState(null)
    const userSelector = useSelector(state => state.userSlice);
    const apiurl = import.meta.env.VITE_API_URL;

    useEffect(() => {
      const userDetails = localStorage.getItem('userDetails');
      if (userDetails) {
        const user_details = JSON.parse(userDetails);
        setUser(user_details)
        setFormData((prev) => ({
          ...prev,
          name: user_details.name || '',
          passoutYear:user_details.passout_year || '',
          designation: user_details.designation || '',
          location: user_details.location || '',
          phoneNo: user_details.phone_number || '',
          whatsappNo: user_details.whatsapp_number || '',
          emailId: user_details.email || '',
          linkedinId: user_details.linkedin_id || '',
          currentAddress: user_details.current_address || '',
          permanentAddress: user_details.permanent_address || '',
          skills: user_details.skills || '',
        }));
      }
    }, []);
    useEffect(()=>{
      if(formData.phoneNo == formData.whatsappNo){
        setIsSameAsPhone(true)
      }
      if(formData.currentAddress == formData.permanentAddress){
        setIsSameAsCurrent(true)
      }
    },[isSameAsPhone,isSameAsCurrent])
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const newFormData = { ...prevData, [name]: value };
        if (name === 'phoneNo' && isSameAsPhone) {
          newFormData.whatsappNo = value;
        }
        if(name == 'currentAddress' && isSameAsCurrent){
          newFormData.permanentAddress=value
        }
    
        return newFormData;
      });
    };
  
    const handleAddExperience = () => {
      const isValid = experiences.every((experience) => experience.companyName !== '');
    
      if (!isValid) {
        // alert(" .");
        toast.error(
          "Please fill out the company name for all\nexisting experiences before adding a new one.",
          {
            duration: 2000,
          }
        );
        return; 
      }
      setExperiences([...experiences, { companyName: '', roles: [] }]);
    };
  
    const handleCompanyChange = (index, value) => {
      const newExperiences = [...experiences];
      newExperiences[index].companyName = value;
      setExperiences(newExperiences);
    };
  
    const handleAddRole = (index) => {
      if (experiences[index].companyName === '') {
        toast.error('Please enter company Name')
        return;
      }
      const newExperiences = [...experiences];
      newExperiences[index].roles.push({ role: '', startDate: '', endDate: '' });
      setExperiences(newExperiences);
    };
  
    const handleRoleChange = (expIndex, roleIndex, field, value) => {
      const newExperiences = [...experiences];
      newExperiences[expIndex].roles[roleIndex][field] = value;
      setExperiences(newExperiences);
    };
  
    const handleRemoveRole = (expIndex, roleIndex) => {
      const newExperiences = [...experiences];
      newExperiences[expIndex].roles.splice(roleIndex, 1);
      setExperiences(newExperiences);
      toast.success('Role removed successfully')
    };
  
    const handleRemoveExperience = (index) => {
      const newExperiences = [...experiences];
      newExperiences.splice(index, 1);
      setExperiences(newExperiences);
      toast.success('Experience removed successfully')
    };
  
    
    const handleCheckboxChange = (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    const validateSkills = (skills) => {
      if (!skills || skills.trim() === '') {
        toast.error("Please enter at least one skill.");
        return false;
      }
    
      const skillArray = skills.split(',').map(skill => skill.trim());
      const validSkills = skillArray.filter(skill => skill.length > 0);
    
      if (validSkills.length === 0) {
        toast.error("Please enter valid skills.");
        return false;
      }
    
      console.log("Validated skills:", validSkills);
      return true;
    };
    const isValidated = () => {
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'linkedinId') continue;
    
        if (key === 'skills') {
          if (!validateSkills(formData.skills)) {
            return false; 
          }
        } else if (value === '') {
          toast.error(`Please enter your ${key.charAt(0).toUpperCase() + key.slice(1)}`, {
            duration: 2000
          });
          return false;
        }
      }
      return true;
    }
    
    const handleSaveChanges = async() => {
      try{
        const {name,passoutYear,designation,location,phoneNo,whatsappNo,emailId,linkedinId,currentAddress,permanentAddress,skills} = formData
        if(isValidated()){
          console.log("USER iD: ",user.user_id);
          
          let resp = await axios.post(`${apiurl}/users/edit_profile`,{
            name:name,
            passoutYear:passoutYear,
            designation:designation,
            location:location,
            phoneNo:phoneNo,
            whatsappNo:whatsappNo,
            email:emailId,
            linkedin:linkedinId,
            currentAddress:currentAddress,
            permanentAddress:permanentAddress,
            skills:skills,
            userId:user.user_id,
            companies:JSON.stringify(experiences)
          })
          let res = resp.data
          console.log("Res: ",res);
          
          if(res.status != 'success'){
            console.log("Something went wrong: ",res.message);
          }else{
            console.log("Succesfull");
            onClose()
          }
        }
      }catch(err){
        console.log(err);
      }
    };
    
    const fetchData = async() => {
      
    }
    
    if (!isOpen) return null;
  
    return (
      <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior='inside'
      onClose={onClose}
      backdrop="blur"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Edit Profile
          </ModalHeader>
          <ModalBody>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Passout Year"
          type="text"
          name="passoutYear"
          placeholder="Your passout year"
          value={formData.passoutYear}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Designation"
          type="text"
          name="designation"
          placeholder="Your Designation"
          value={formData.designation}
          onChange={handleChange}
        />
        
        <Input
          label="Location"
          type="text"
          name="location"
          placeholder="Your Location"
          value={formData.location}
          onChange={handleChange}
        />
        
        <Input
          label="Phone Number"
          type="tel"
          name="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
        />
        
        <Input
          label="WhatsApp Number"
          type="tel"
          name="whatsappNo"
          placeholder="WhatsApp Number"
          value={formData.whatsappNo}
          onChange={handleChange}
          disabled={isSameAsPhone}
        />
        
        <Checkbox
          id="sameAsPhone"
          isSelected={isSameAsPhone}
          onChange={(e) => {
            const isChecked = e.target.checked
            setIsSameAsPhone(isChecked)
            handleCheckboxChange('whatsappNo', isChecked ? formData.phoneNo : '')
          }}
        >
          Same as Phone Number
        </Checkbox>
        
        <Input
          label="Email ID"
          type="email"
          name="emailId"
          placeholder="Email ID"
          value={formData.emailId}
          onChange={handleChange}
          disabled={true}
        />
        
        <Input
          label="LinkedIn ID"
          type="url"
          name="linkedinId"
          placeholder="LinkedIn Profile URL"
          value={formData.linkedinId}
          onChange={handleChange}
        />
        
        <Input
          label="Current Address"
          type="text"
          name="currentAddress"
          placeholder="Current Address"
          value={formData.currentAddress}
          onChange={handleChange}
        />
        
        <Input
          label="Permanent Address"
          type="text"
          name="permanentAddress"
          placeholder="Permanent Address"
          value={formData.permanentAddress}
          onChange={handleChange}
          disabled={isSameAsCurrent}
        />
        
        <Checkbox
          id="sameAsCurrentAddress"
          isSelected={isSameAsCurrent}
          onChange={(e) =>{
            const isChecked = e.target.checked
            setIsSameAsCurrent(isChecked)
            handleCheckboxChange('permanentAddress',isChecked ? formData.currentAddress : '')
          }}
        >
          Same as Current Address
        </Checkbox>
        
        <Input
          label="Skills (comma separated)"
          type="text"
          name="skills"
          placeholder="Skill1, Skill2, Skill3"
          value={formData.skills}
          onChange={handleChange}
        />

        {/* Experience Section */}
        <div>
            <h3 className="text-lg font-medium text-gray-700">Experience</h3>
            <div className="space-y-4 mt-2">
              {experiences.map((experience, expIndex) => (
                <div key={expIndex} className="bg-gray-100 p-4 rounded-md shadow-md relative">
                  <button
                    type="button"
                    className="absolute top-2 right-0 xs:right-2 text-sm xs:text-medium text-red-500 hover:text-red-700 flex items-center"
                    onClick={() => handleRemoveExperience(expIndex)}
                  >
                    <HiTrash className="mr-1" /> {/* Remove experience icon */}
                    Remove Company
                  </button>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Company Name"
                    value={experience.companyName}
                    onChange={(e) => handleCompanyChange(expIndex, e.target.value)}
                  />
                  {experience.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="mt-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 flex items-center"
                          onClick={() => handleRemoveRole(expIndex, roleIndex)}
                        >
                          <HiTrash className="mr-1" /> {/* Remove role icon */}
                          Remove Role
                        </button>
                      </div>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Role"
                        value={role.role}
                        onChange={(e) => handleRoleChange(expIndex, roleIndex, 'role', e.target.value)}
                      />
                      <label className="block text-sm font-medium text-gray-700 mt-2">Start Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        value={role.startDate}
                        onChange={(e) => handleRoleChange(expIndex, roleIndex, 'startDate', e.target.value)}
                      />
                      <label className="block text-sm font-medium text-gray-700 mt-2">End Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        value={role.endDate}
                        onChange={(e) => handleRoleChange(expIndex, roleIndex, 'endDate', e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
                    onClick={() => handleAddRole(expIndex)}
                  >
                    <HiPlus className="mr-1" /> {/* Add role icon */}
                    Add Role
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 text-blue-500 hover:text-blue-700 flex items-center"
                onClick={handleAddExperience}
              >
                <HiPlus className="mr-1" /> {/* Add experience icon */}
                Add Experience
              </button>
            </div>
          </div>
      </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSaveChanges}>
              Save
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
      
      
      
// <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 ">
      //   <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative overflow-hidden zoom-in">
      //     <button
      //       className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
      //       onClick={onClose}
      //     >
      //       <span className="text-2xl">&times;</span>
      //     </button>
      //     <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
      //     <div className="max-h-96 overflow-y-auto">
      //       <form className="space-y-4">
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Name</label>
      //           <input
      //             type="text"
      //             name="name"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Your Name"
      //             value={formData.name}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Designation</label>
      //           <input
      //             type="text"
      //             name="designation"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Your Designation"
      //             value={formData.designation}
      //             onChange={handleChange}
      //           />
      //         </div>
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Location</label>
      //           <input
      //             type="text"
      //             name="location"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Your Location"
      //             value={formData.location}
      //             onChange={handleChange}
      //           />
      //         </div>
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Phone Number</label>
      //           <input
      //             type="tel"
      //             name="phoneNo"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Phone Number"
      //             value={formData.phoneNo}
      //             onChange={handleChange}
      //           />
      //         </div>
              
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
      //           <input
      //             type="tel"
      //             name="whatsappNo"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="WhatsApp Number"
      //             value={formData.whatsappNo}
      //             onChange={handleChange}
      //             disabled={isSameAsPhone}
      //           />
      //         </div>
      //         <div>
      //           <input
      //             type="checkbox"
      //             id="sameAsPhone"
      //             className="mr-2"
                  // onChange={(e) => {
                  //   const isChecked = e.target.checked
                  //   setIsSameAsPhone(isChecked)
                  //   handleCheckboxChange('whatsappNo', isChecked ? formData.phoneNo : '')
                  // }}
      //           />
      //           <label htmlFor="sameAsPhone" className="text-sm font-medium text-gray-700">
      //             Same as Phone Number
      //           </label>
      //         </div>
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Email ID</label>
      //           <input
      //             type="email"
      //             name="emailId"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Email ID"
      //             value={formData.emailId}
      //             onChange={handleChange}
      //           />
      //         </div>
              
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">LinkedIn ID</label>
      //           <input
      //             type="url"
      //             name="linkedinId"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="LinkedIn Profile URL"
      //             value={formData.linkedinId}
      //             onChange={handleChange}
      //           />
      //         </div>
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Current Address</label>
      //           <input
      //             type="text"
      //             name="currentAddress"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Current Address"
      //             value={formData.currentAddress}
      //             onChange={handleChange}
      //           />
      //         </div>
              
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
      //           <input
      //             type="text"
      //             name="permanentAddress"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Permanent Address"
      //             value={formData.permanentAddress}
      //             onChange={handleChange}
      //             disabled={isSameAsCurrent}
      //           />
      //         </div>
      //         <div>
      //           <input
      //             type="checkbox"
      //             id="sameAsCurrentAddress"
      //             className="mr-2"
                  // onChange={(e) =>{
                  //   const isChecked = e.target.checked
                  //   setIsSameAsCurrent(isChecked)
                  //   handleCheckboxChange('permanentAddress',isChecked ? formData.currentAddress : '')
                  // }}
      //           />
      //           <label htmlFor="sameAsCurrentAddress" className="text-sm font-medium text-gray-700">
      //             Same as Current Address
      //           </label>
      //         </div>
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
      //           <input
      //             type="text"
      //             name="skills"
      //             className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
      //             placeholder="Skill1, Skill2, Skill3"
      //             value={formData.skills}
      //             onChange={handleChange}
      //           />
      //         </div>
              
      //         {/* Experience Section as implemented earlier */}
      //         <div>
      //           <h3 className="text-lg font-medium text-gray-700">Experience</h3>
      //           <div className="space-y-4 mt-2">
      //             {experiences.map((experience, expIndex) => (
      //               <div key={expIndex} className="bg-gray-100 p-4 rounded-md shadow-md relative">
      //                 <button
      //                   type="button"
      //                   className="absolute top-2 right-2 text-red-500 hover:text-red-700 flex items-center"
      //                   onClick={() => handleRemoveExperience(expIndex)}
      //                 >
      //                   <HiTrash className="mr-1" /> {/* Remove experience icon */}
      //                   Remove Experience
      //                 </button>
      //                 <label className="block text-sm font-medium text-gray-700">Company Name</label>
      //                 <input
      //                   type="text"
      //                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
      //                   placeholder="Company Name"
      //                   value={experience.companyName}
      //                   onChange={(e) => handleCompanyChange(expIndex, e.target.value)}
      //                 />
      //                 {experience.roles.map((role, roleIndex) => (
      //                   <div key={roleIndex} className="mt-4">
      //                     <div className="flex justify-between items-center">
      //                       <label className="block text-sm font-medium text-gray-700">Role</label>
      //                       <button
      //                         type="button"
      //                         className="text-red-500 hover:text-red-700 flex items-center"
      //                         onClick={() => handleRemoveRole(expIndex, roleIndex)}
      //                       >
      //                         <HiTrash className="mr-1" /> {/* Remove role icon */}
      //                         Remove Role
      //                       </button>
      //                     </div>
      //                     <input
      //                       type="text"
      //                       className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
      //                       placeholder="Role"
      //                       value={role.role}
      //                       onChange={(e) => handleRoleChange(expIndex, roleIndex, 'role', e.target.value)}
      //                     />
      //                     <label className="block text-sm font-medium text-gray-700 mt-2">Start Date</label>
      //                     <input
      //                       type="date"
      //                       className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
      //                       value={role.startDate}
      //                       onChange={(e) => handleRoleChange(expIndex, roleIndex, 'startDate', e.target.value)}
      //                     />
      //                     <label className="block text-sm font-medium text-gray-700 mt-2">End Date</label>
      //                     <input
      //                       type="date"
      //                       className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
      //                       value={role.endDate}
      //                       onChange={(e) => handleRoleChange(expIndex, roleIndex, 'endDate', e.target.value)}
      //                     />
      //                   </div>
      //                 ))}
      //                 <button
      //                   type="button"
      //                   className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
      //                   onClick={() => handleAddRole(expIndex)}
      //                 >
      //                   <HiPlus className="mr-1" /> {/* Add role icon */}
      //                   Add Role
      //                 </button>
      //               </div>
      //             ))}
      //             <button
      //               type="button"
      //               className="mt-4 text-blue-500 hover:text-blue-700 flex items-center"
      //               onClick={handleAddExperience}
      //             >
      //               <HiPlus className="mr-1" /> {/* Add experience icon */}
      //               Add Experience
      //             </button>
      //           </div>
      //         </div>
      //       </form>
      //     </div>
      //     <button
      //       type="button"
      //       className="mt-4 w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
      //       onClick={handleSaveChanges}
      //     >
      //       Save Changes
      //     </button>
      //   </div>
      // </div>
    );
  };

  export default ModalForm