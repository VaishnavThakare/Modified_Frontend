import React, { useState } from 'react';
import demo1 from './demo7.jpg';
import demo2 from './demo2.jpg';
import demo3 from './demo3.jpg';
import axios from 'axios';
import { useEffect } from 'react';


const News = () => {

  const backgroundImageUrl =`  ${process.env.PUBLIC_URL}/bgImage.png` ;

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [news, setnews] = useState([
    {
      id: 1,
      title: 'News Title 1',
      imagePath: demo1,
      content: 'Lorem ipsum dolor sit amet,  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      title: 'News Title 2',
      imagePath: demo2,
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      title: 'News Title 3',
      imagePath: demo3,
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    }
  ]);


  const getAllNews = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/News/All`);
      if (res.status == 200 && res.data != null) {
        setnews(res.data);
      }
    } 
    catch (error) {
      console.error("Error fetching Project data:", error);
    }
    finally{
      console.log(news);
    }
  };

  const handleForwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handleBackwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length); 
  };

  useEffect(()=>{
    getAllNews();
  },[]);

  return (
    <div className="container mr-10 relative  w-full h-[280px] shadow-2xl overflow-hidden " >
      <img src={news[currentNewsIndex].imagePath} alt="" className='w-full h-40 mx-auto' />
      <h1 className='text-center font-semibold'>{news[currentNewsIndex].title}</h1>
      <p className="text-1xl  text-gray-800 mb-4 px-6 py-2 text-wrap overflow-hidden">
        {news[currentNewsIndex].content}
      </p>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0" style={{ width: '100%' }}>
        <button className="absolute left-0 top-[0px] text-2xl text-black font-semibold text-gray w-[22px] h-[55px] rounded" onClick={handleBackwardClick}>
          &lt; 
        </button>
        <button className="absolute right-0 top-[0px] text-2xl text-black font-semibold text-gray  w-[22px] h-[55px] rounded" onClick={handleForwardClick}>
        {/* bg-stone-300 */}
          &gt;
        </button>
      </div>
    </div>
  );
};

export default News;
