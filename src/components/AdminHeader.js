import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the user, bell, and times icons
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

const AdminHeader = () => {
    const left = {
        left: '20%'
    };

    const [menu, setMenu] = useState(true);
    const [userName, setUserName] = useState("");
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(sessionStorage.getItem('currentPage') || null);
    const [notifications, setNotifications] = useState(0); // State for notifications
    const [showNotifications, setShowNotifications] = useState(false); // State to control notification popup

    const logOut = () => {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("exp");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("sid");
    };

    const simulateNewNotifications = () => {
        setNotifications(notifications + 1);
    };

    const [profile, setProfileName] = useState({
        name: "",
    });

    const fetchData = async () => {
        try {
            const sid = sessionStorage.getItem("sid");
            const Role = sessionStorage.getItem("roles");
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

    const getPageName = () => {
        // Extract the page name from the current URL path
        const pathSegments = location.pathname.split("/");
        return [pathSegments[pathSegments.length - 2].toUpperCase(), pathSegments[pathSegments.length - 1].toUpperCase()];
    };

    return (
        <>
            <div className="bg-white text-sm flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 grid grid-rows-2 " style={left}>
                <div className="mt-0 pb-0 pl-4  place-self-end w-full">
                    <h3 className=" py-2 px-6 font-sans font-bold text-2xl">Vendor Portal</h3>
                </div>
                <div className="grid grid-cols-2 gap-2  bg-stone-300 py-3 pl-4 w-full place-self-end">
                    <h3 className="border-red-500 font-sans font-bold text-m">
                        <NavLink to="/dashboard" activeClassName="border-b-2 border-red-500">
                            {getPageName()[0] + " / " + getPageName()[1]}
                        </NavLink>
                    </h3>
                    <div className="grid grid-cols-2  place-self-end mr-4 relative">
                        {/* Notification button */}
                        <div className="relative">
                            <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                                <FontAwesomeIcon className="place-self-start mt-[2px] mr-1 cursor-pointer" icon={faBell} />
                                {notifications > 0 && (
                                    <span className="notification-count">{notifications}</span>
                                )}
                            </div>
                            {/* Notification popup box */}
                            {showNotifications && (
                                <div className="absolute top-[40px] right-0 mt-2 bg-white shadow-md rounded-md p-4 z-50">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Notifications</h3>
                                        <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={() => setShowNotifications(false)} />
                                    </div>
                                    {/* Notifications content */}
                                    <div className="mt-4">
                                        {/* Display the notification count or "No new notifications" message */}
                                        {notifications > 0 ? (
                                            // Display each notification
                                            [...Array(notifications).keys()].map((index) => (
                                                <p key={index}>Notification {index + 1}</p>
                                            ))
                                        ) : (
                                            <p>No new notifications.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile menu */}
                        <ul>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }} className="cursor-pointer" >
                                <FontAwesomeIcon className="place-self-start mt-[2px] mr-1 cursor-pointer" icon={faUser} onClick={() => { setMenu(!menu) }} />
                                <p className="ml-2 font-bold">{profile.name}</p>
                                <div className="flex items-center">
                                    <h3 className="place-self-start font-sans font-bold ml-1 cursor-pointer" onClick={() => { setMenu(!menu) }}>{userName}</h3>
                                </div>
                            </li>
                            <ul className="absolute  bg-stone-300 py-3  w-full" hidden={menu}>
                                <li className="font-sans font-bold text-left pl-4 cursor-pointer w-full hover:bg-blue-300">
                                    <NavLink to="profile">Profile</NavLink>
                                </li>
                                <li className="font-sans font-bold pl-4 text-left cursor-pointer w-full hover:bg-blue-300">
                                    <NavLink to="http://localhost:3000/" onClick={logOut}>Log Out</NavLink>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHeader;
