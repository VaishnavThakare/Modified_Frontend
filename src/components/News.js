import React, { useState } from 'react';
import demo1 from './demo7.jpg';
import demo2 from './demo2.jpg';
import demo3 from './demo3.jpg';

const newsData = [
  {
    id: 1,
    title: 'News Title 1',
    image: demo1,
    description: 'Lorem ipsum dolor sit amet,  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    title: 'News Title 2',
    image: demo2,
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    title: 'News Title 3',
    image: demo3,
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

const News = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const handleForwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const handleBackwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  return (
    <div className="container mr-10 relative  w-full">
      <img src={newsData[currentNewsIndex].image} alt="" className='w-full h-40 mx-auto' />
      <h1 className='text-center font-semibold'>{newsData[currentNewsIndex].title}</h1>
      <p className="text-1xl text-gray-800 mb-4 px-6 py-2">
        {newsData[currentNewsIndex].description}
      </p>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0" style={{ width: '100%' }}>
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl px-2 py-1 text-gray" onClick={handleBackwardClick}>
          &lt; 
        </button>
        <button className="absolute right-0 top-1/4 transform -translate-y-1/2 text-2xl px-2 py-1 text-gray" onClick={handleForwardClick}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default News;
