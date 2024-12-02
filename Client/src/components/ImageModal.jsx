import React from "react";

const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  closeModal,
  showNextImage,
  showPrevImage,
}) => {
  if (!isOpen) return null;
  
  const galleryurl = import.meta.env.VITE_GALLERY_URL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Background */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold transition-transform transform hover:rotate-90 focus:outline-none"
          onClick={closeModal}
        >
          &times;
        </button>

        {/* Current Image */}
        <img
          src={`${galleryurl}/${images[currentIndex].section_name}/${images[currentIndex].image_path}`}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-auto rounded-t-lg"
        />

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2  bg-transparent text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-700 focus:outline-none"
          onClick={showPrevImage}
        >
          &#x276E;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-700 focus:outline-none"
          onClick={showNextImage}
        >
          &#x276F;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
