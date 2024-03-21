import React, { useState } from 'react';
import demo1 from './demo7.jpg';
import demo2 from './demo2.jpg';
import demo3 from './demo3.jpg';
import axios from 'axios';
import { useEffect } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [banners, setbanners] = useState([
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


  const getAllBanners = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Banner/All`);
      if (res.status == 200 && res.data != null && res.data.length > 0) {
        setbanners(res.data);
      }
    } catch (error) {
      console.error("Error fetching Banner data:", error);
    }
    finally{
      console.log(banners);
    }
  };

  useEffect(()=>{
    getAllBanners();
  },[]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center' }}>
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    ),
  };

  if(banners.length == 1){
    return (
      <div className='relative h-[300px] border border-b-black'>
        <img src={banners[0].imagePath} alt={banners[0].title} className="w-full h-[300px]" />
        <p className='absolute top-[90%] h-[10%] w-full px-3 text-right bg-stone-300 bg-opacity-35 text-black'>
          {banners[0].title}
        </p>
      </div>
    );
  }

  return (
      <Slider {...settings}>
      {
        banners.map((slide) => (
        <div key={slide.id} className='relative h-[300px] border border-b-black'>
          <img src={slide.imagePath} alt={slide.id} className="w-full h-[370px]" />
          <p className='absolute top-[95%] h-[10%] w-full px-3 text-right bg-stone-300 bg-opacity-35 text-black'>
            {slide.title}
          </p>
        </div>
      ))
      }
    </Slider>
  );
};

export default Carousel;