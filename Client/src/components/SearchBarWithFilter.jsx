import { useState } from 'react';

const SearchBarWithFilter = ({handleModal}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Name A-Z', value: 'az' },
    { label: 'Name Z-A', value: 'za' },
    { label: 'Most Recent', value: 'recent' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    handleModal(!isModalOpen);

  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsModalOpen(false); 
  };

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
      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h3 className="text-lg font-medium mb-4">Filter Options</h3>
        <ul>
          {filterOptions.map((option) => (
            <li key={option.value} className="mb-2">
              <button
                onClick={() => handleFilterChange(option.value)}
                className={`w-full text-left p-2 rounded-md  ${
                  filter === option.value ? 'bg-blue-500 text-white' : 'bg-gray-100'
                } hover:bg-gray-200`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleModal}
          className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
    
      )}
    </div>
  );
};

export default SearchBarWithFilter;
