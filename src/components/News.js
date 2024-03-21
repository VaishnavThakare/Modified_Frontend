import React, { useState } from 'react';
import demo1 from './demo7.jpg';
import demo2 from './demo2.jpg';
import demo3 from './demo3.jpg';
import axios from 'axios';
import { useEffect } from 'react';


const News = () => {

  const backgroundImageUrl =`  ${process.env.PUBLIC_URL}/bgImage.png` ;

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [overflow, setOverflow] = useState(false);
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
      if (res.status == 200 && res.data != null && res.data.length > 0) {
        setnews(res.data);
        console.log(res.data);
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
    handleOverflow(news[(currentNewsIndex + 1) % news.length].content);
  };

  const handleBackwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length); 
    handleOverflow(news[(currentNewsIndex - 1 + news.length) % news.length].content);
  };

  const handleOverflow = (content) =>{
    var res = content.split(" ");
    if(res.length > 17){
      setOverflow(true);
    }
    else
    setOverflow(false);
  }

  useEffect(()=>{
    getAllNews();
    handleOverflow(news[currentNewsIndex].content);
  },[news]);

  return (
    <div className="container mr-10 relative  w-full h-[284px] shadow-2xl" >
      <img src={news[currentNewsIndex].imagePath} alt="" className='w-full h-40 mx-auto' />
      <h1 className='text-center font-semibold'>{news[currentNewsIndex].title}</h1>
      <div className={`w-full mb-1 h-[100px] ${overflow ?'overflow-y-scroll' :'overflow-hidden'}`}>
        <p className={`text-1xl  text-gray-800 mb-4 px-6 py-2 text-wrap`}>
          {news[currentNewsIndex].content}
        </p>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0" style={{ width: '100%' }}>
        <button className="absolute left-0 top-[0px] text-2xl font-semibold text-gray w-[22px] h-[35px] rounded bg-stone-300 text-white" onClick={handleBackwardClick}>
          &lt; 
        </button>
        <button className="absolute right-0 top-[0px] text-2xl font-semibold text-gray  w-[22px] h-[35px] rounded bg-stone-300 text-white" onClick={handleForwardClick}>
        {/* bg-stone-300 */}
          &gt;
        </button>
      </div>
    </div>
  );
};

export default News;
