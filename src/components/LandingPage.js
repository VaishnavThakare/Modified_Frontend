import React, { useState } from "react";
import Carousel from "./Carousel";
import Event from "./Event";
import News from "./News";
import Info from "./Info";
import Policies from "./Policies";
import LoginModal from "./LoginModal";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const backgroundImageUrl =`  ${process.env.PUBLIC_URL}/bgImage.png` ;

  return (
    <div className="block items-start justify-start h-screen relative">
      {showLogin && <LoginModal onClose={handleCloseLogin} />}

      <div id="navbar" className="grid grid-cols-2 w-full p-[5px]">
        <div>
          <img className="w-[150px] h-[40px]" src={`${process.env.PUBLIC_URL}/sciqus.png`} alt="logo" />
        </div>
        <div className="flex items-end justify-end mr-[150px]">
          <button className="font-poppins  font-normal text-center mr-[15px]" onClick={handleLoginClick}>LogIn</button>
          <button className=" font-poppins  font-normal text-center">Contact: 90909090</button>
        </div>
      </div> 

     <div className="w-full grid grid-rows-2 pt-[20px] pb-[40px] lg:px-40 bg-cover bg-center" style={{backgroundImage: `url(${backgroundImageUrl})`, backgroundRepeat: 'repeat'}}>

        <div className=" grid grid-cols-2 row-span-1 w-full h-10 p-[10px]">
          <div id="col1" className="w-[145%] bg-white">
            <Carousel></Carousel>
          </div>
          <div id="col1" className="ml-[50%] w-[50%] bg-cyan-100 ">
            {/* Info image with side arrow and content */}
            <Info />
          </div>
        </div>
        
      <div>
        <div className="mt-[35px] flex font-semibold ">
  <div className="text-black ml-[10px]">POLICIES</div>
  <div className="text-black ml-[307px]">NEWS</div>
  <div className="text-black ml-[395px]">EVENTS</div>
</div>

        <div className="grid grid-cols-3 w-full mt-[20px]">
          <div id="col1" className=" ml-[0px] w-[85%] ">
            {/* Policies with scrollbar */}
            <Policies />
          </div>
          <div id="col1" className=" mr-[60px]  w-[85%]  ">
            {/* News image side arrow with content */}
            <News />
          </div>
          <div id="col1" className=" ml-[50px] w-[85%] ">
            {/* Events with content */}
            <Event />
          </div>
        </div>
        </div>
        </div>
      </div>
    
  );
}

export default LandingPage;