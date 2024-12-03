import React from "react";
import pin from "../assets/pin.png";
import { Skeleton } from "@nextui-org/react";

const GalleryCard = ({ galleryItems, sendItem, type, isLoaded }) => {
  const baseGalleryUrl = import.meta.env.VITE_GALLERY_URL;
  console.log(galleryItems);
  
  return (
    <div className="mt-10 w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      
      {galleryItems.map((item, idx) => (
        <div
          key={idx}
          className="relative mx-auto w-full h-60 shadow-[0px_4px_8px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center lg:w-96 md:w-full hover:cursor-pointer"
          onClick={() => sendItem(item, idx)}
        >
          <img
            src={pin}
            alt="pin"
            className="absolute top-0 z-10"
          />
          <Skeleton
            isLoaded={isLoaded}
            className="relative w-full h-full"
          >
            <img
              src={
                type === "image"
                  ? `${baseGalleryUrl}/${item.section_name}/${item.image_path}`
                  : type === "section"
                  ? item.section_cover
                  : type === 'year' 
                  ? `${baseGalleryUrl}/${item.section_name}/${item.image.image_path}`
                  :''
              }
              alt={item.section_name || item.year || "Image"}
              className={`absolute w-full h-full object-cover p-3 transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </Skeleton>
          {isLoaded && (
            <h1 className="font-days-one absolute bottom-5 z-10 text-white text-2xl text-stroke">
              {type === "section"
                ? item.section_name
                : type === "year"
                ? item.year
                : ""}
            </h1>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryCard;
