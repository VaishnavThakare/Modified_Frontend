import React, { useState } from 'react';
import demo4 from './demo4.jpg';
import demo5 from './demo5.jpg';
import demo6 from './demo6.jpg';

const profileData = [
  {
    id: 1,
    name: 'John Doe',
    image: demo4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Jeff Bezos',
    image: demo5,
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    name: 'Alice Smith',
    image: demo6,
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

const Info = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleForwardClick = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profileData.length);
  };

  const handleBackwardClick = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex - 1 + profileData.length) % profileData.length);
  };

  return (
    <div className="container  relative h-[280px]">
      <img src={profileData[currentProfileIndex].image} alt="" className='w-[150px] mt-5 h-[100px] mx-auto' />
      <p className="text-1xl text-center text-gray-800 mt-6 mb-4 px-2 lg:px-5 font-poppins font-normal italic "  >
        {profileData[currentProfileIndex].description}
      </p>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0" style={{ width: '100%' }}>
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl px-2 py-1 text-gray" onClick={handleBackwardClick}>
          &lt; 
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl px-2 py-1 text-gray" onClick={handleForwardClick}>
          &gt;
        </button>
      </div>
      <p className="text-1xl text-gray-800 mb-4 px-6 py-2 font-semibold text-center ">{profileData[currentProfileIndex].name} - CEO</p>
    </div>
  );
};

export default Info;