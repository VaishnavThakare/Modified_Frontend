import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

const PHeadHeader= ()=>{

    const left={
        left:'20%'
    };

    const [menu,setMenu] = useState("true");
    const [userName,setUserName] = useState("");
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(sessionStorage.getItem('currentPage') || null);

    const logOut = () =>{
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("exp");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("sid");
    }

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

    const getPageName = () => {
        // Extract the page name from the current URL path
        const pathSegments = location.pathname.split("/");
        return [pathSegments[pathSegments.length - 2].toUpperCase(), pathSegments[pathSegments.length - 1].toUpperCase()];
      };
    

    return(
        <>
            <div className="bg-white text-sm flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 grid grid-rows-2 " style={left}>
                <div className="mt-0 pb-0 pl-4  place-self-end w-full">
                    <h3 className=" py-2 px-6 font-sans font-bold text-2xl">Vendor Portal</h3>                  
                </div>
                <div className="grid grid-cols-2 gap-2  bg-stone-300 py-3 pl-4 w-full place-self-end">
                <h3 className="border-red-500 font-sans font-bold text-m">
                        <NavLink to="/dashboard" activeClassName="border-b-2 border-red-500">
                        {getPageName()[0]+" / " +getPageName()[1]} 
                        </NavLink>
                    </h3>
                    <div className="grid grid-cols-2  place-self-end mr-4 ">
                        
                        {
                            sessionStorage.getItem("role")==="ProjectHead" &&
                            <>
                                <NavLink to="/head">
                                    <img className="w-[18px] h-[19px]  place-self-start mb-[3px] cursor cursor-pointer" src={`${process.env.PUBLIC_URL}/house-solid.svg`} alt="logo" /> 
                                </NavLink>
                            </>
                        }                                                
                        <ul>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }} className="cursor cursor-pointer" >
                            <FontAwesomeIcon className="place-self-start mt-[2px] mr-1 cursor cursor-pointer" icon={faUser} onClick={() => { setMenu(!menu) }} />
                            <p className="ml-2 font-bold">{profile.name}</p>
                            <div className="flex items-center">
                            <h3 className="place-self-start font-sans font-bold ml-1 cursor cursor-pointer" onClick={() => { setMenu(!menu) }}>{userName}</h3>
                            </div>
                            </li>
                            <ul className="absolute  bg-stone-300 py-3  w-full" hidden={menu}>
                                <li className="font-sans font-bold text-left pl-4 cursor cursor-pointer w-full hover:bg-blue-300">
                                   <NavLink to="profile">Profile</NavLink> 
                                </li>
                                <li className="font-sans font-bold pl-4 text-left cursor cursor-pointer w-full hover:bg-blue-300">
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

export default PHeadHeader;