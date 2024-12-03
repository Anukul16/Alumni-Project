import { useEffect, useState } from 'react';
import SearchBarWithFilter from './SearchBarWithFilter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlumniList = () => {
  const [alumniData, setAlumniData] = useState([]);
  const navigate = useNavigate()
  // const [filteredData, setFilteredData] = useState([]);
  // const [selectedCompany, setSelectedCompany] = useState(null);
  // const [selectedBatch, setSelectedBatch] = useState(null);
  // const [selectedTechStack, setSelectedTechStack] = useState(null);
  const apiurl = import.meta.env.VITE_API_URL
  const imageUrl = import.meta.env.VITE_IMG_URL;

  // Fetch all alumni on component mount
  const getAllAlumni = async () => {
    try {
      const response = await axios.post(`${apiurl}/users/getAllAlumni`);
      setAlumniData(response.data.extras);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  // Fetch alumni by company
  const getAlumniByCompany = async (company) => {
    try {
      console.log('Making API call with company:', company);
      const response = await axios.post(`${apiurl}/users/getAllUserOfACompany`, {
        com:company,
      });
  
      console.log('Full response:', response.data);
      if (response.data.extras) {
        const data = response.data.extras; // Extract filtered data
        console.log('Filtered data:', data);
        setAlumniData(data);
      } else {
        console.warn('No "extras" field found in response data.');
      }
    } catch (error) {
      console.error('Error fetching company data:', error.response?.data || error.message);
    }
  };

  const getAlumniByBatch = async(batch)=>{
    try {
      const response = await axios.post(`${apiurl}/users/getBatchWise` , {
        passoutYear:batch
      })
      const data = response.data.extras;
      setAlumniData(data);
      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  const getAlumniByTechStack = async(tech)=>{
    try {
      console.log("data is : #############");
      const response = await axios.post(`${apiurl}/users/techStackWise` ,
        {techStack:tech}
      )
      const data = response.data.extras;
      console.log("data is :" , data);
      
      
      setAlumniData(data);
      
    } catch (error) {
      console.log("------------------------------------********000000999",error);
      
      
    }
  }
  


  useEffect(() => {
    getAllAlumni();
  }, []);

  const handleSearchQuery = async(value)=>{
    console.log(value);
  }



  const handleFilterChange = async (filterType, value) => {
    if (filterType === 'company'){
      console.log(value);
      
      getAlumniByCompany(value);
      
    }
    if (filterType === 'batch') {
      getAlumniByBatch(value);
    }
    if (filterType === 'techstack'){
      console.log(value);
      
      getAlumniByTechStack(value);
    } 

    // await applyFilters(); // Apply filters after setting new values
  };

  

  const groupByBatch = (data) => {
    return data.reduce((acc, item) => {
      const batch = item.passout_year;
      if (!acc[batch]) acc[batch] = [];
      acc[batch].push(item);
      return acc;
    }, {});
  };

  const groupedAlumni = groupByBatch(alumniData);
  const handleUserClick = (alumni) => {
    let path = alumni.name.replace(/\s+/g, '').toLowerCase()+alumni.id;
    navigate(`/profile/${path}`,{
      state:{userId:alumni.user_id}
    })
    
  }
  return (
    <>
      <SearchBarWithFilter onFilterChange={handleFilterChange} searchQuery={handleSearchQuery} />
      <div className="p-12 bg-gradient-to-r from-indigo-100 to-purple-100 min-h-screen">
        {Object.keys(groupedAlumni).length === 0 ? (
          <p className="text-center text-gray-600">No alumni found.</p>
        ) : (
          Object.keys(groupedAlumni).map((batch) => (
            <div
              key={batch}
              className="mb-8 p-4 bg-white shadow-lg rounded-xl transform transition-transform"
            >
              <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">{batch} Alumni</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {groupedAlumni[batch].map((alumni) => (
                  <div
                    key={alumni.id}
                    className="flex flex-col items-center p-6 bg-gradient-to-r border from-purple-50 to-indigo-50 rounded-lg shadow-md hover:cursor-pointer hover:shadow-xl transition-shadow duration-200"
                    onClick={()=>handleUserClick(alumni)}
                  >
                    <img
                      src={alumni.profile?`${imageUrl}/${alumni.profile}`:'https:upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                      alt={`${alumni.name}'s photo`}
                      className="w-28 h-28 rounded-full mb-4 border-4 border-purple-300 object-cover shadow-lg"
                    />
                    <p className="text-lg font-semibold text-gray-800">{alumni.name}</p>
                    <p className="text-sm text-purple-500 mt-1">Batch of {alumni.passout_year}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AlumniList;
