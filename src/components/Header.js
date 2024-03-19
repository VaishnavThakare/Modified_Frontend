import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import notiIcon from "../components/noti.png";

const Header = () => {
  const left = {
    left: "20%",
  };

  const [menu, setMenu] = useState(true);
  const [isNotiVisible, setNotiVisible] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem("currentPage") || null
  );

  const logOut = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("exp");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("sid");
  };

  const handleNotiButton = () => {
    setNotiVisible(!isNotiVisible);
    setMenu(true);
  };

  const [profile, setProfileName] = useState({
    name: "",
  });

  const fetchData = async () => {
    try {
      const sid = sessionStorage.getItem("sid");
      const role = sessionStorage.getItem("roles");
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/${role}/${sid}`
      );

      setProfileName(result.data);

      const notiResult = await axios.get(
        `${process.env.REACT_APP_API_URL}/Notification/${sid}`
      );
      setNotificationData(notiResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    try {
      const sid = sessionStorage.getItem("sid");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/Notification/${sid}/${notificationId}`
      );
      // After deleting the notification, you can fetch the updated list of notifications
      fetchData();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getPageName = () => {
    // Extract the page name from the current URL path
    const pathSegments = location.pathname.split("/");
    return [
      pathSegments[pathSegments.length - 2].toUpperCase(),
      pathSegments[pathSegments.length - 1].toUpperCase(),
    ];
  };

  return (
    <>
      <div
        className="bg-white text-sm items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 grid grid-rows-2 "
        style={left}
      >
        <div className="mt-0 pb-0 pl-4  place-self-end w-full">
          <h3 className=" py-2 px-6 font-sans  text-2xl">Vendor Portal</h3>
        </div>
        <div className="grid grid-cols-2 gap-2  bg-stone-300 py-3 pl-4 w-full place-self-end">
          <h3 className="border-red-500 font-sans font-bold text-m">
            <NavLink
              to="/dashboard"
              activeClassName="border-b-2 border-red-500"
            >
              {getPageName()[0] + " / " + getPageName()[1]}
            </NavLink>
          </h3>
          <div className="grid grid-cols-2  place-self-end mr-4 ">
            {sessionStorage.getItem("role") === "Admin" && (
              <>
                <NavLink to="/admin">
                  <img
                    className="w-[18px] h-[19px]  place-self-start mb-[3px] cursor cursor-pointer"
                    src={`${process.env.PUBLIC_URL}/house-solid.svg`}
                    alt="logo"
                  />
                </NavLink>
              </>
            )}
            {sessionStorage.getItem("role") === "Vendor" && (
              <>
                <NavLink to="/vendor">
                  <img
                    className="w-[18px] h-[19px]  place-self-start mb-[3px] cursor cursor-pointer"
                    src={`${process.env.PUBLIC_URL}/house-solid.svg`}
                    alt="logo"
                  />
                </NavLink>
              </>
            )}

            {sessionStorage.getItem("role") === "ProjectHead" && (
              <>
                <NavLink to="/head">
                  <img
                    className="w-[18px] h-[19px]  place-self-start mb-[3px] cursor cursor-pointer"
                    src={`${process.env.PUBLIC_URL}/house-solid.svg`}
                    alt="logo"
                  />
                </NavLink>
              </>
            )}
            <button
              type="button"
              className="w-6 h-6 relative"
              onClick={handleNotiButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#000000"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
              </svg>
              {notificationData.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-0.5 py-0.2 text-xs">
                  {notificationData.length}
                </span>
              )}
            </button>

            {isNotiVisible && (
              <div className="dropdown-menu absolute right-2 md:right-10 top-24 shadow-md shadow-black/5 z-30 max-w-xs w-full bg-white rounded-md border border-gray-100">
                <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                  <button
                    type="button"
                    data-tab="notification"
                    data-tab-page="notifications"
                    className="text-gray-600 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active"
                  >
                    Notifications
                  </button>
                </div>
                <div className="my-2 relative">
                  <ul
                    className="max-h-64 overflow-y-auto"
                    data-tab-for="notification"
                    data-page="notifications"
                  >
                    {notificationData.length > 0 ? (
                      notificationData.map((noti, index) => {
                        const dateTime = new Date(noti.createdAt);
                        return (
                          <li key={index}>
                            <a
                              href="#"
                              className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                            >
                              <img
                                src={notiIcon}
                                alt=""
                                className="w-8 h-8 rounded block object-cover align-middle"
                              />
                              <div className="ml-2 pr-14">
                                <div className="text-[13px] text-gray-600 font-medium group-hover:text-blue-500">
                                  {noti.content}
                                </div>
                                <div className="text-[11px] text-gray-400">
                                  {dateTime.toLocaleString()}
                                </div>
                              </div>
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="cursor-pointer ml-14"
                              />
                            </a>
                          </li>
                        );
                      })
                    ) : (
                      <div className="ml-4">
                        <div className="text-[13px] text-gray-600 font-medium group-hover:text-blue-500">
                          No Messages
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            )}

            <ul>
              <li className="flex justify-between cursor cursor-pointer">
                <FontAwesomeIcon
                  className="place-self-start mt-[2px] mr-1 cursor cursor-pointer"
                  icon={faUser}
                  onClick={() => {
                    setMenu(!menu);
                    setNotiVisible(false);
                  }}
                />
                <p className="ml-2 font-bold">{profile.name}</p>
              </li>
              <ul
                className="absolute right-2 top-24 bg-white py-3 max-w-24 w-full rounded-md border border-gray-100"
                hidden={menu}
              >
                <li className="font-sans font-bold text-left pl-4 cursor cursor-pointer w-full hover:bg-blue-300">
                  <NavLink to="profile">Profile</NavLink>
                </li>
                <li className="font-sans font-bold pl-4 text-left cursor cursor-pointer w-full hover:bg-blue-300">
                  <NavLink to="/" onClick={logOut}>
                    Log Out
                  </NavLink>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
