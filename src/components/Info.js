import React, { useEffect, useState } from "react";
import demo4 from "./demo4.jpg";
import demo5 from "./demo5.jpg";
import demo6 from "./demo6.jpg";
import axios from "axios";

const Info = () => {
  const [profileData, setProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      imagePath: demo4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      position: "CEO",
    },
    {
      id: 2,
      name: "Jeff Bezos",
      imagePath: demo5,
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      position: "MD",
    },
    {
      id: 3,
      name: "Alice Smith",
      imagePath: demo6,
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      position: "CMO",
    },
  ]);

  const getAllProfile = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/ProfileCard/All`
      );
      console.log(res.data);
      let data = [];
      if (res.status == 200 && res.data != null && res.data.length > 0) {
        data = res.data;
        setProfiles(data);
      }
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  };

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleForwardClick = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profileData.length);
  };

  const handleBackwardClick = () => {
    setCurrentProfileIndex(
      (prevIndex) => (prevIndex - 1 + profileData.length) % profileData.length
    );
  };

  useEffect(() => {
    getAllProfile();
  }, []);

  return (
    <div className="container  relative h-[280px]">
      <img
        src={profileData[currentProfileIndex].imagePath}
        alt=""
        className="w-[150px] mt-5 h-[100px] mx-auto"
      />
      <p
        className="text-wrap text-1xl text-center text-gray-800 mt-6 mb-4 px-[10px] lg:px-5 font-poppins font-normal italic "
        dangerouslySetInnerHTML={{
          __html: profileData[currentProfileIndex].description,
        }}
      />
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-0"
        style={{ width: "100%" }}
      >
        <button
          className="absolute left-0 top-1/2 w-[20px] text-2xl px-[1px] py-1 font-semibold  rounded h-[37px] bg-cyan-300 text-white"
          onClick={handleBackwardClick}
        >
          &lt;
        </button>
        <button
          className="absolute right-0 top-1/2 w-[20px] text-2xl px-[1px] py-1 font-semibold  rounded h-[37px] bg-cyan-300 text-white"
          onClick={handleForwardClick}
        >
          &gt;
        </button>
      </div>
      <p className="text-1xl text-gray-800 mb-4 px-6 py-[1px] font-semibold text-center ">
        {profileData[currentProfileIndex].name} -{" "}
        {profileData[currentProfileIndex].position}
      </p>
    </div>
  );
};

export default Info;
