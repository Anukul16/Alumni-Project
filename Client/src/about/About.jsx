import React from 'react';


const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Anukul Maity',
      role: 'Full Stack Developer',
      img: 'https://scontent-ccu1-2.xx.fbcdn.net/v/t39.30808-6/454491927_1354449345942669_4631559582116264192_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=kSlyuEqHzLQQ7kNvgELT87j&_nc_zt=23&_nc_ht=scontent-ccu1-2.xx&_nc_gid=AFISeyKIuyij7ha5KOeRN_T&oh=00_AYDfviyPFaidiM4cFiIrBjFU9SuPC0U6NKOLireYdBBIrQ&oe=6725BE9E',
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: '#',
      },
    },
    {
      name: 'John Doe',
      role: 'Frontend Developer',
      img: 'https://c4.wallpaperflare.com/wallpaper/244/899/830/lana-rhoades-model-women-blue-eyes-wallpaper-preview.jpg',
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Jane Smith',
      role: 'Backend Developer',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgqEZvsRRwrHC3S55gMHbGkDzfE0CscgP6A&s',
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Dani Daniels',
      role: 'Full Stack Developer',
      img: 'https://wallpapers.com/images/hd/dani-daniels-selfie-ti7m9a0rvylikw42.jpg',
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: '#',
      },
    },
    // Add more team members here
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">About Us</h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Meet our team of dedicated developers who bring this alumni website to life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 rounded-full border-4 border-blue-500 mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
              <h3 className="text-gray-500 mb-3">{member.role}</h3>
              <div className="flex space-x-4 mt-3">
                <a href={member.socialLinks.twitter} className="text-blue-500 hover:text-blue-700 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={member.socialLinks.github} className="text-gray-800 hover:text-gray-600 transition">
                  <i className="fab fa-github"></i>
                </a>
                <a href={member.socialLinks.linkedin} className="text-blue-600 hover:text-blue-800 transition">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
