import React, { useState } from 'react';
import demo1 from './demo7.jpg';
import demo2 from './demo2.jpg';
import demo3 from './demo3.jpg';
import axios from 'axios';
import { useEffect } from 'react';


const Event= () => {

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [events, setevents] = useState([
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


  const getAllEvents = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Event/All`);
      //console.log(res.data);
      if(res.status == 200 && res.data != null && res.data.length > 0){
        setevents(res.data);   
      }
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
    finally{
      console.log(events);
    }
  };

  const handleForwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handleBackwardClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length); 
  };

  useEffect(()=>{
    getAllEvents();
  },[]);

  return (

    <div className="container mr-10 relative  w-full h-[280px] shadow-2xl overflow-hidden">
      <img src={events[currentNewsIndex].imagePath} alt="" className='w-full h-40 mx-auto' />
      <h1 className='text-center font-semibold'>{events[currentNewsIndex].title}</h1>
      <p className="text-1xl text-gray-800 mb-4 px-6 py-2 text-wrap overflow-hidden">
        {events[currentNewsIndex].content}
      </p>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0" style={{ width: '100%' }}>
        <button className="absolute left-0 top-[0px] text-2xl text-black font-semibold text-gray  w-[22px] h-[55px] rounded" onClick={handleBackwardClick}>
          &lt; 
        </button>
        <button className="absolute right-0 top-[0px] text-2xl text-black font-semibold text-gray  w-[22px] h-[55px] rounded" onClick={handleForwardClick}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Event;
