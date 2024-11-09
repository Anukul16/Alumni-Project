import { useEffect, useState } from 'react';
import {Accordion, AccordionItem} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,Select,SelectItem } from "@nextui-org/react";

const SearchBarWithFilter = ({handleModal}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isOpen,onOpen,onClose,onOpenChange} = useDisclosure()
  
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Name A-Z', value: 'az' },
    { label: 'Name Z-A', value: 'za' },
    { label: 'Most Recent', value: 'recent' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // const openModal = () => {
  //   onOpen();
  // }
  // const closeModal = () => {
  //   onClose();
  // }
  const toggleModal = () => {
    onOpen();
    setIsModalOpen(!isModalOpen);
    handleModal(!isModalOpen);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsModalOpen(false); 
  };
  const animals = ["zebra", "tiger", "lion", "elephant", "crocodile", "whale","zebra", "tiger", "lion", "elephant", "crocodile", "whale"]
  return (
    <div className="flex justify-center p-6 z-500">
      <div className="w-full max-w-2xl p-4 flex space-x-4 items-center"> 
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Icon */}
        <button onClick={toggleModal} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
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

      {/* Filter Modal */}
      {
       (
          <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior='inside'
          onClose={onClose}
          backdrop="blur"
          
          placement='center'
        >
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Filter Options
              </ModalHeader>
              <ModalBody>
              <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Filter by company" title="Filter by company" className='bg-zinc-300'>
                  <Select
                    label="Choose Company"
                        placeholder="Select a company"
                    // disabledKeys={["zebra", "tiger", "lion", "elephant", "crocodile", "whale"]}
                    className="max-w-xs"
                  >
                    {animals.map((animal,id) => (
                      <SelectItem key={id}>
                        {animal}
                      </SelectItem>
                    ))}
                  </Select>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Filter by batch" title="Filter by batch" className='bg-zinc-300'>
                    <Select
                        label="Choose Passout Year"
                        placeholder="Select a year"
                        // disabledKeys={["zebra", "tiger", "lion", "elephant", "crocodile", "whale"]}
                        className="max-w-xs"
                      >
                        {animals.map((animal,id) => (
                          <SelectItem key={id}>
                            {animal}
                          </SelectItem>
                        ))}
                      </Select>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Filter by techstack" title="Filter by techstack" className='bg-zinc-300'>
                    <Select
                        label="Choose Techstack"
                        placeholder="Select a techstack"
                        // disabledKeys={["zebra", "tiger", "lion", "elephant", "crocodile", "whale"]}
                        className="max-w-xs"
                      >
                        {animals.map((animal,id) => (
                          <SelectItem key={id}>
                            {animal}
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
                <Button color="primary" onPress={()=>{}}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
        )
      }
      {/* {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h3 className="text-lg font-medium mb-4">Filter Options</h3>
        <ul>
        
        </ul>
        <button
          onClick={toggleModal}
          className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
    
      )} */}
    </div>
  );
};

export default SearchBarWithFilter;
