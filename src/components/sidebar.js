import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
  isMenuVisible,
  handleMenuVisible,
  menuItems,
}) {
  const [openMenus, setOpenMenus] = useState([]);
  const [verifyVendor,setVerify] = useState(false);

  const getVendor = async()=>{
    const id = sessionStorage.getItem('sid');
    if(sessionStorage.getItem("roles") =="Vendor"){
      console.log(id);
      try{
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${id}`
        );
        console.log(response.data);
        setVerify(response.data.isVerified);
      }
      catch(error){
        console.log(error);
      }
    }
  }


  const toggleMenu = (index) => {
    setSelectedItem(index);
    setOpenMenus((prevOpenMenus) => {
      const updatedOpenMenus = [...prevOpenMenus];
      updatedOpenMenus[index] = !updatedOpenMenus[index];
      return updatedOpenMenus;
    });
  };

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(()=>{
    getVendor();
  },[]);

  return (
    <div>
      <div
        className={`${
          isMenuVisible ? "" : "hidden"
        } fixed left-0 top-0 w-64 h-full z-50 sidebar-menu transition-transform md:block overflow-y-auto bg-cyan-50 `}
      >
        <a
          href="#"
          className="flex items-center justify-center pb-4 border-b border-b-gray-800"
        >

        
          <h2 className="font-bold text-2xl mt-4">
            VENDOR
            <span className="bg-[#f84525] text-white px-2 rounded-md">PORTAL</span>
            <button
              className="float-end pt-1 ml-2 md:hidden"
              onClick={handleMenuVisible}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>   
              </svg>
            </button>
          </h2>
        </a>
        <ul className="mt-4  ">
          <span className="text-gray-400 font-bold ml-4">Menus</span>
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              className={`group menuSidebar `} 
            >
             <Link
                to={menuItem.link}
                className={`menuItems flex font-semibold items-center py-2 px-4 ${menuItem.bgColor}  text-white  sidebar-dropdown-toggle`}
                
                onClick={() => toggleMenu(index) }
                style={{
                  cursor: "pointer",
                  color: selectedItem === index ? "white" : "inherit",
                }}
              >
                <i className={menuItem.icon + " mr-3 text-lg"}></i>
                <span className="text-sm">{menuItem.text}</span>
                {menuItem.subItems && (
                  <i
                    className={`ri-arrow-right-s-line ml-auto ${
                      openMenus[index] ? "rotate-90" : ""
                    }`}
                  ></i>
                )}
              </Link>
              {menuItem.subItems && openMenus[index] && (
                <ul className="pl-7 mt-2">
                  {menuItem.subItems.map((subItem, subIndex) => (
                    (sessionStorage.getItem("roles")!="Vendor"|| (sessionStorage.getItem("roles")=="Vendor" && verifyVendor))? <>
                      <li key={subIndex} className="mb-4">
                        <Link
                          to={subItem.link}
                          className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                        >
                          {subItem.text}
                        </Link>
                      </li>
                    </>:
                    subItem.text == "Upload Documents"?
                    <>
                      <li key={subIndex} className="mb-4">
                          <Link
                            to={subItem.link}
                            className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                          >
                            {subItem.text}
                          </Link>
                        </li>                      
                    </>
                    :
                    <></>

                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${
          isMenuVisible ? "" : "hidden"
        }fixed top-0 left-0 w-full h-full bg-black/50 z-40 sidebar-overlay md:hidden`}
      ></div>
    </div>
  );
}