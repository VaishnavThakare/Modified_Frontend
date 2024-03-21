import React, { useState } from "react";
import Carousel from "./Carousel";
import Event from "./Event";
import News from "./News";
import Info from "./Info";
import Policies from "./Policies";
import LoginModal from "./LoginModal";
import sciqusLogo from "./sciqus1.png"; // Import the image

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const backgroundImageUrl =`  ${process.env.PUBLIC_URL}/bgImage.png` ;
  const logom=`./sciqus1.png`;

  return (
    <div className="block items-start justify-start h-screen relative">
      {showLogin && <LoginModal onClose={handleCloseLogin} />}

      <div id="navbar" className="grid grid-cols-2 w-full p-[10px] bg -white shadow-2xl">
        <div>
          <img className="w-[80px] h-[35px]  ml-[30px]" src={sciqusLogo} alt="logo" />
        </div>
        <div className="flex items-end justify-end mr-[80px]">
          <button className="font-poppins  font-normal text-center mr-[15px] hover:font-bold " onClick={handleLoginClick}>LogIn</button>
          <button className=" font-poppins  font-normal text-center">Contact: 90909090</button>
        </div>
      </div> 

     <div className="w-full grid grid-rows-2 pt-[20px] pb-[40px] lg:px-40 bg-cover bg-center" style={{backgroundImage: `url(${backgroundImageUrl})`, backgroundRepeat: 'repeat'}}>

        <div className=" grid grid-cols-2 row-span-1 w-full h-10 p-[10px] bg-cover bg-center" style={{backgroundImage: `url(${backgroundImageUrl})`, backgroundRepeat: 'repeat'}} >
          <div id="col1" className="w-[135%] bg-white">
            <Carousel></Carousel>
          </div>
          <div id="col1" className="ml-[40%] w-[60%] bg-cyan-100 ">
            {/* Info image with side arrow and content */}
            <Info />
          </div>
        </div>
        
      <div>
      {/* <div className="mt-[35px] flex font-semibold ">
        <div className="text-black ml-[10px]">POLICIES</div>
        <div className="text-black ml-[307px]">NEWS</div>
        <div className="text-black ml-[395px]">EVENTS</div>
     </div> */}

          <div className="grid grid-cols-3 w-full mt-[10px]  "  >
            <div id="col1" className="mx-[10px]">
              {/* Policies with scrollbar */}
              <div className="text-black  font-semibold mb-[20px] ">POLICIES</div>
              <Policies />
            </div>

            <div id="col1" className="mx-[10px] " >
              {/* News image side arrow with content */}
              <div className="text-black ml-[2px] font-semibold mb-[20px]">NEWS</div>
              <News />
            </div>

            <div id="col1" className="mx-[10px] bg-cover bg-right"  style={{backgroundImage: `url(${backgroundImageUrl})`,backgroundPosition: 'right '}}>
              {/* Events with content */}
              <div className="text-black ml-[2px] font-semibold mb-[20px]">EVENTS</div>
              <Event />
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  );
}

export default LandingPage;