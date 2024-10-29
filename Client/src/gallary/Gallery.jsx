import React from "react";
import CommonNavbar from "../components/CommonNavbar";
import "../fonts/fonts.css";
import pin from "../assets/pin.png";
const Gallery = () => {
  const galleryItems = [
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
    { name: "Phire Pawa 2K24", image: "https://picsum.photos/200/300" },
  ];

  return (
    <>
      <div className="flex flex-col items-center">
        {" "}
        {/* Flexbox centers content horizontally */}
        <h1 className="font-days-one text-center mt-4 text-4xl">
          “Gallery Where Memory Meets”
        </h1>
        <div className="mt-10 w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
      </div>
    </>
  );
};

export default Gallery;
