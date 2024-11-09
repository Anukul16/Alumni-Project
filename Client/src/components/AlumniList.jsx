import { useEffect, useState } from 'react';
import SearchBarWithFilter from './SearchBarWithFilter';

const AlumniList = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [isModalOpen,setIsModalOpen] = useState(null)
  useEffect(() => {
    // Using dummy data for now instead of an API call
    const dummyData = [
      { id: 1, name: 'John Doe', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2022 },
      { id: 2, name: 'Jane Smith', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2022 },
      { id: 3, name: 'Alex Johnson', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2023 },
      { id: 4, name: 'Emily Davis', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2023 },
      { id: 5, name: 'Chris Lee', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2021 },
    ];

    setAlumniData(dummyData);
  }, []);

  // Helper function to group alumni by batch
  const groupByBatch = (data) => {
    return data.reduce((acc, item) => {
      const batch = item.batchYear;
      if (!acc[batch]) acc[batch] = [];
      acc[batch].push(item);
      return acc;
    }, {});
  };

  const groupedAlumni = groupByBatch(alumniData);
  const handleModalOpen = (data) => {
    setIsModalOpen(data)
  }
  useEffect(()=>{
    console.log("isopen: ",isModalOpen);
    
  },[isModalOpen])
  return (
    <>
      <SearchBarWithFilter handleModal={handleModalOpen}/>
      <div className="p-12 bg-gradient-to-r from-indigo-100 to-purple-100 min-h-screen">
        {Object.keys(groupedAlumni).map((batch) => (
          <div
          key={batch}
          className={`mb-12 p-8 bg-white shadow-lg rounded-xl ${!isModalOpen ? 'transform transition-transform hover:scale-110' : ''}`}
        >
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">{batch} Alumni</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {groupedAlumni[batch].map((alumni) => (
                <div
                  key={alumni.id}
                  className="flex flex-col items-center p-6 bg-gradient-to-r border from-purple-50 to-indigo-50 rounded-lg shadow-md hover:cursor-pointer hover:shadow-xl transition-shadow duration-200"
                >
                  <img
                    src={alumni.photo}
                    alt={`${alumni.name}'s photo`}
                    className="w-28 h-28 rounded-full mb-4 border-4 border-purple-300 object-cover shadow-lg"
                  />
                  <p className="text-lg font-semibold text-gray-800">{alumni.name}</p>
                  <p className="text-sm text-purple-500 mt-1">Batch of {alumni.batchYear}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AlumniList;
