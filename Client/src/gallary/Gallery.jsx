import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GalleryCard from "./GalleryCard";
import Pagination from "../components/PaginationModal";
import PaginationModal from "../components/PaginationModal";
import ImageModal from "../components/ImageModal";

const Gallery = () => {  
  const apiurl = import.meta.env.VITE_API_URL;
  const { section, year } = useParams();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [years, setYears] = useState([]);
  const [images, setImages] = useState([]);
  const [isImageClick,setIsImageClick] = useState(false)
  const [currentIndex,setCurrentIndex] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalImages,setTotalImages] = useState(0);
  const [isLoaded,setIsLoaded] = useState(false)
  const getSections = async () => {
    try {
      const resp = await axios.get(`${apiurl}/admin/get_sections`);
      setSections(resp.data.extras[0]);
      setTimeout(() => {
        setIsLoaded(true)
      }, 5000);
      // setIsLoaded(true)
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(()=>{
  //   console.log("isloaded: ",isLoaded);
  // },[isLoaded])
  const getYears = async () => {
    try {
      const resp = await axios.post(`${apiurl}/admin/get_years`, {
        section_name: section,
      });
      setYears(resp.data.extras[0]); 
      setTimeout(() => {
        setIsLoaded(true)
      }, 5000);
      // setIsLoaded(true)
    } catch (err) {
      console.log(err);
    }
  };

  const getImages = async () => {
    try {
      const resp = await axios.post(`${apiurl}/admin/get_images`, {
        section_name: section,
        year: year,
        pageNo:currentPage
      });
      setTotalImages(resp.data.extras.count);
      setImages(resp.data.extras.result);
      setTimeout(() => {
        setIsLoaded(true)
      }, 5000);
    } catch (err) {
      console.log(err);
    } 
  };

  useEffect(() => {
    getSections();
  }, []);

  useEffect(() => {
    if (section){
      setIsLoaded(false)
      getYears();
    }
  }, [section]);

  useEffect(() => {
    console.log("Year: ",year,"currentpage:  ",currentPage);
    
    if (year && currentPage) {
      setIsLoaded(false)
      getImages();
    }
  }, [year,currentPage]);

  const handleSectionClick = (sectionName) => {
    navigate(`/gallery/${sectionName}`);
  };

  const handleYearClick = (selectedYear) => {
    navigate(`/gallery/${section}/${selectedYear}`);
  };

  const handleImageClick = (item,idx) => {
    if(isLoaded){
      setIsImageClick(true)
      setCurrentIndex(idx)
    }
  };
  const closeModal = () => {
    setIsImageClick(false);
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const handlePageChange = (page) => {
    // console.log("Page==: ",page);
    
    setCurrentPage(page)
  }
  useEffect(() => {
    if (isImageClick) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    } 
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isImageClick]);
  return (
<<<<<<< HEAD
    <>
      <div className="flex flex-col items-center mt-4  md:mt-4  ">
        {" "}
        {/* Flexbox centers content horizontally */}
        <h1 className="font-days-one text-center mb-8 text-4xl">
          “Gallery Where Memory Meets”
        </h1>
        <div className=" w-full h-auto grid grid-cols-1 pb-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {galleryItems.map((items) => (
            <div
              key={items}
              className="relative mx-auto w-full h-60 shadow-[0px_4px_8px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center lg:w-96 md:w-full"
            >
              <img src={pin} alt="" className="absolute top-0 z-10" />
              <img
                src={items.image}
                alt=""
                className="absolute w-full h-full object-cover p-3"
              />
              <h1 className="font-days-one absolute bottom-10 z-10 text-white	text-xl	text-stroke">
                {items.name}
              </h1>
            </div>
          ))}
        </div>
=======
    <div className="flex flex-col items-center mt-4 md:mt-4">
      <h1 className="font-days-one text-center mb-8 text-4xl">
        “Gallery Where Memory Meets”
      </h1>

      {/* Display Sections */}
      {!section && (
        <GalleryCard
          galleryItems={sections}
          sendItem={(item) => handleSectionClick(item.section_name)}
          type={"section"}
          isLoaded={isLoaded}
        />
      )}

      {/* Display Years */}
      {section && !year && (
        <GalleryCard
          galleryItems={years}
          sendItem={(item) => handleYearClick(item.year)}
          type={"year"}
          isLoaded={isLoaded}
        />
      )}

      {/* Display Images */}
      {year && (
        <GalleryCard
          galleryItems={images}
          sendItem={(item,idx) => handleImageClick(item,idx)}
          type={"image"}
          isLoaded={isLoaded}
        />
      )}
      {
        isImageClick && 
        <ImageModal 
        isOpen={isImageClick}
        images={images}
        currentIndex={currentIndex}
        closeModal={closeModal}
        showNextImage={showNextImage}
        showPrevImage={showPrevImage}
        />
      }
      <div className="mt-16">
        {year && <PaginationModal onPageChange={handlePageChange} totalImages={totalImages}/>}
>>>>>>> upstream/main
      </div>
    </div>
  );
};

export default Gallery;
