import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';






const Carousel = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRg61kc6vPiirZWJyd1lJ8Zf60uPa4Nlht6A&s',
    'https://cdn.britannica.com/48/252748-050-C514EFDB/Virat-Kohli-India-celebrates-50th-century-Cricket-November-15-2023.jpg',
    'https://img.etimg.com/thumb/width-420,height-315,imgsize-54414,resizemode-75,msid-111438018/news/sports/virat-kohlis-jai-hind-instagram-post-sets-new-record/virat-kohli.jpg',
    'https://www.deccanchronicle.com/h-upload/2024/07/02/1101052-gryid83byaaawvd.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 100000000000000000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <div className="relative w-full mx-auto overflow-hidden h-64 md:h-96"> 
     
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-fill md:object-cover transition-transform duration-700 ease-in-out ${
            index === currentIndex ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full'
          }`} 
        />
      ))}

      {/* dots section..... */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)} 
          />
        ))}
      </div>
    </div>
  );
};

const companies = [
  { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnt253Qlda-6a5x8LltLHZD4IWMCmk7LOQ9Q&s', alt: 'Microsoft' },
  { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsYxhoVGQgaG9RT-aQk4SsPdG_TtKgmUsjYw&s', alt: 'Oracle' },
  { id: 3, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBss61ZSzmBM75JqdYCVqsfqJ4JijX0mt9g&s', alt: 'IBM' },
  { id: 4, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2a418p8twUZDZKHOggy9fkZSrnxyUZw6Bg&s', alt: 'Wipro' },
  { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPAWYqoR1E-YMPwd869I0X2WuToOjTrPXgQ&s', alt: 'TCS' },
  { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KDGIGNftKhASVxmkWMKjaQi2Bhk8Gg4m0g&s', alt: 'Cognizant' },
  { id: 7, src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png', alt: 'Accenture' },
  { id: 8, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFL1WTbNfc8y2sztRRsC9G4VFaHdGkWaf89w&s', alt: 'Infosys' },
];

const WorkingCompanies = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl font-bold mb-10">Where Alumni Works</h2>
      <div className="flex flex-wrap justify-center">
        {companies.map(company => (
          <div key={company.id} className="flex justify-center w-1/4 p-4 mb-2 md:w-1/4 sm:w-1/2 xs:w-1/3">
            <img
              src={company.src}
              alt={company.alt}
              className="max-h-20 object-contain mx-auto" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const foundedCompanies = [
  { id: '1', src: 'https://media.licdn.com/dms/image/v2/D4D0BAQHdJj1mvZZPNw/company-logo_200_200/company-logo_200_200/0/1700468976898/idiosys_technologies_logo?e=2147483647&v=beta&t=sPgEf861LGm4cN2U0ZoQhegMLwdIUb9LyIqfpwSZ2-8', alt: 'Idiosys' },
  { id: '2', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkPdreYcfXHlJtimiJALomo1XGIDm0rxKJg&s', alt: 'PAS DIGITAL' },
  { id: '3', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCDyevhGid1n_hG8_6bOo7bC-_kxb4h00_Q&s', alt: 'PAS DIGITAL ACADEMY' }
];

const FoundedCompanies = () => {
  return (
    <>
      <div className="py-10 bg-gray-200"> 
        <h2 className="text-center text-2xl font-bold mb-12">Founded By Alumni</h2>
        <div className="flex flex-wrap justify-center">
          {foundedCompanies.map(company => (
            <div key={company.id} className="flex justify-center w-1/4 p-4 mb-2 md:w-1/4 sm:w-1/2 xs:w-1/3">
              <img
                src={company.src}
                alt={company.alt}
                className="max-h-20 object-contain mx-auto bg-gray-200" 
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Testimonial = () => {
  const testimonial = [
    {
      id: '1',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Virat_Kohli_in_PMO_New_Delhi.jpg/220px-Virat_Kohli_in_PMO_New_Delhi.jpg',
      text: '“Virat Kohli is a phenomenal player and an inspiration to many hello worldkjk jkjdkk jkjk jkjk',
    },
    {
      id: '2',
      src: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg',
      text: '“I admire his passion for the game and dedication to fitness. Hey speefd roaln iuiu herheirehi ehjrherje ehrieur dfjdfd uireu udu j j j”',
    },
    {
      id: '3',
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Hardik_Pandya_in_PMO_New_Delhi.jpg',
      text: 'Hardik lorefeiheih ehrieurieurieurie ieejkfejfjkejfeiureui eiruie uifd anukul aljkei leadership on the field is commendable.”',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonial.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); 

    return () => clearInterval(interval); 
  }, [testimonial.length]);

  return (
    <div className="py-10 px-5">
      <h2 className=" text-gray-400 text-center text-2xl font-bold mb-6">Testimonial</h2>
      <div className="flex flex-wrap justify-center shadow-xl">
        <div className="relative w-full mx-auto overflow-hidden flex flex-col sm:flex-row px-6 sm:px-10 lg:px-20 py-4 sm:py-6 ">
          {/* Profile image */}
          <div className="border border-red-600 rounded-full overflow-hidden flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto sm:mx-0 mb-4 sm:mb-0">
            <img
              src={testimonial[currentIndex].src}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          
          <div className="ml-0 sm:ml-10 flex-grow p-4 sm:p-6 sm:text-lg sm:font-semibold text-justify">
            {testimonial[currentIndex].text}
          </div>
        </div>

        
        
      </div>
      <div className="absolute   left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4 ">
          {testimonial.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)} 
            />
          ))}
        </div>
    </div>
  );
};

const Footer = () => {
  return(
    <>
      <div className='bg-customColor h-64 w-full my-10'>
       
      </div>
    </>
  )
}

const Homepage = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(()=>{
    console.log("ScrollDirection : ",scrollDirection);
    
  },[scrollDirection])
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return(
    <>
      
      {scrollDirection != 'down' && <Navbar />}
      <Carousel />
      <WorkingCompanies />
      <FoundedCompanies />
      <Testimonial />
      <Footer />
    </>
  )
}

export default Homepage;
