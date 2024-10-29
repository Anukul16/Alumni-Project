import { useEffect, useState } from 'react';
import CommonNavbar from './CommonNavbar';
import SearchBarWithFilter from './SearchBarWithFilter';

const AlumniList = () => {
  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    // Using dummy data for now instead of an API call
    const dummyData = [
      { id: 1, name: 'John Doe', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2022 },
      { id: 2, name: 'Jane Smith', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2022 },
      { id: 3, name: 'Alex Johnson', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2023 },
      { id: 4, name: 'Emily Davis', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2023 },
      { id: 5, name: 'Chris Lee', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2021 },
      { id: 5, name: 'Chris Lee', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2021 },
      { id: 5, name: 'Chris Lee', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2021 },
      { id: 5, name: 'Chris Lee', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2021 },
      { id: 5, name: 'Chris Lee', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPySJ92qM0KIGLpycT3FAvyWvgG1UnclB5Q&s', batchYear: 2021 },
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

  return (
    <>
    <SearchBarWithFilter/>
    <div className="p-6">
      {Object.keys(groupedAlumni).map((batch) => (
        <div key={batch} className="mb-10">
          <h2 className="text-2xl  mb-6 font-header">{batch} Pass Out</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
            {groupedAlumni[batch].map((alumni) => (
              <div key={alumni.id} className="text-center">
                <img
                  src={alumni.photo}
                  alt={`${alumni.name}'s photo`}
                  className="w-24 h-24 rounded-full mx-auto mb-2 border border-gray-300"
                />
                <p className="text-lg font-medium font-body">{alumni.name}</p>
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
