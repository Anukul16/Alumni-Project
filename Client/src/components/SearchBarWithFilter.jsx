import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';

const SearchBarWithFilter = ({ onFilterChange } , searchQuery) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [batches, setBatches] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const apiurl = import.meta.env.VITE_API_URL
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    searchQuery(searchTerm);
  };

  // Fetch all data from the company API
  const getAllCompanies = async () => {
    try {
      const response = await axios.post(`${apiurl}/users/getAllCompanyName`);
      const companyNames = response.data.extras
        .map((item) => item.company)
        .filter((company) => company !== null);
      setCompanies(companyNames);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBatches = async () => {
    try {
      const response = await axios.post(`${apiurl}/users/getAllBatchYears`);
      const batchYears = response.data.extras;
      
      // Correcting the typo here
      const uniqueBatchYears = [...new Set(batchYears.map(batch => batch.passout_year))];
      
      setBatches(uniqueBatchYears);
      // console.log(uniqueBatchYears); 
    } catch (error) {
      console.log(error);
    }
  };
  

  const getAllTechStacks = async () => {
    try {
      const response = await axios.post(`${apiurl}/users/getAllTechStacks`);
      const skillArray = response.data.extras.filter((item)=>item.skills).flatMap((item)=>item.skills.split(','));
      const uniqueSkills = [...new Set(skillArray)];
      setTechStacks(uniqueSkills);

      // console.log("Fetching all tech stacks...");
      // Your logic to fetch tech stacks
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCompanies();
    getAllBatches();
    getAllTechStacks();
  }, []);

  const handleFilterChange = (filterType, value) => {

    switch (filterType) {
      case 'company':
        onFilterChange(filterType, companies[value]);
        console.log('Choosed filter type is :' , filterType ,"and the value is ----------->", companies[value]);
        break;
      case 'batch':
        onFilterChange(filterType, batches[value]);
        console.log('Choosed filter type is :' , filterType ,"and the value is ----------->", batches[value]);
        break;
      case 'techstack':
        onFilterChange(filterType, techStacks[value]);
        console.log('Choosed filter type is :' , filterType ,"and the value is ----------->", techStacks[value]);
        break;
      default:
        break;
    }
    
    // onFilterChange(filterType, value);
    onClose();
  };

  return (
    <div className="flex justify-center p-6 z-500">
      <div className="w-full max-w-2xl p-4 flex space-x-4 items-center"> 
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Icon */}
        <button onClick={onOpen} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h18M6.75 9h10.5M10.5 13.5h3M13.5 18h-3"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          backdrop="blur"
          placement="center"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Filter Options
            </ModalHeader>
            <ModalBody>
              <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Filter by company" title="Filter by company" className='bg-zinc-300'>
                  <Select
                    label="Choose Company"
                    placeholder="Select a company"
                    className="max-w-xs"
                    onChange={(event) => handleFilterChange('company', event.target.value)}
                    // onChange={(event) => console.log(event)}
                  >
                    {companies.map((company, id) => (
                      <SelectItem key={id} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </Select>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Filter by batch" title="Filter by batch" className='bg-zinc-300'>
                  <Select
                    label="Choose Passout Year"
                    placeholder="Select a year"
                    className="max-w-xs"
                    onChange={(event) => handleFilterChange('batch', event.target.value)}
                  >
                    {batches.map((batch, id) => (
                      <SelectItem key={id} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </Select>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Filter by techstack" title="Filter by techstack" className='bg-zinc-300'>
                  <Select
                    label="Choose Techstack"
                    placeholder="Select a techstack"
                    className="max-w-xs"
                    onChange={(event) => handleFilterChange('techstack',event.target.value)}
                    // onChange={(event) => console.log(event.target.value)}
                  >
                    {techStacks.map((techStack, id) => (
                      <SelectItem key={id} value={techStack}>
                        {techStack}
                      </SelectItem>
                    ))}
                  </Select>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary">
                Apply
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default SearchBarWithFilter;
