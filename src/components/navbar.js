import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar({ handleMenuVisible }) {
  const navigate = useNavigate();

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isNotiVisible, setNotiVisible] = useState(false);
  const [isProfile, setProfile] = useState(false);

  const handleSearchButton = () => {
    setSearchVisible(!isSearchVisible);
    setProfile(false);
    setNotiVisible(false);
  };
  const handleNotiButton = () => {
    setNotiVisible(!isNotiVisible);
    setProfile(false);
    setSearchVisible(false);
  };

  const handleProfile = () => {
    setProfile(!isProfile);
    setSearchVisible(false);
    setNotiVisible(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };


  /////////////////////////

  const [profile, setProfileName] = useState({
    name: "",
  });

  const fetchData = async () => {
    try {
      const sid = sessionStorage.getItem("sid");
      const Role=sessionStorage.getItem("roles");
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/${Role}/${sid}`
      );

      setProfileName(result.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  ///////////////////

  return (
    <div class="py-2 px-6 bg-cyan-50 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button
        type="button"
        class="text-lg text-gray-900 font-semibold sidebar-toggle md:hidden"
        onClick={handleMenuVisible}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <ul class="ml-auto flex items-center">
        

        <li class="dropdown ml-3">
          <button
            type="button"
            class="dropdown-toggle flex items-center"
            onClick={handleProfile}
          >
            <div class="flex-shrink-0 w-10 h-10 relative">
              <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                  alt=""
                />
                <div class="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                <div class="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <div class="p-2 md:block text-left">
              <h2 class="text-sm font-semibold text-gray-800">{profile.name}</h2>
              <p class="text-xs text-gray-500">
                {sessionStorage.getItem("roles")}
              </p>
            </div>
          </button>
          {isProfile && (
            <ul class="dropdown-menu absolute right-5 shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <Link
                  to="profile"
                  class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                >
                  Profile
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                >
                  Settings
                </a>
              </li> */}
              <li>
                <a
                  role="menuitem"
                  class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
