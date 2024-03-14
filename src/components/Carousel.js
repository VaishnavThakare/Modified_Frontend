import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselData = [
  {
    id: 1,
    image: `${process.env.PUBLIC_URL}/sbanner.jpg`,
    description: 'Slide 1 Description',
  },
  {
    id: 2,
    image: `${process.env.PUBLIC_URL}/sbanner2.jpg` ,
    description: 'Slide 2 Description',
  },
  {
    id: 3,
    image: `${process.env.PUBLIC_URL}/sbanner3.jpg`,
    description: 'Slide 3 Description',
  },
];

const Carousel = () => {
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

  return (
    <Slider {...settings}>
      {carouselData.map((slide) => (
        <div key={slide.id} className='relative'>
          <img src={slide.image} alt={slide.description} className="w-full h-[370px]" />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;