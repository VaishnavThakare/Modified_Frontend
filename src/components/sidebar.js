import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgsrc from "./sciqus1.png";

export default function Sidebar({
  isMenuVisible,
  handleMenuVisible,
  menuItems,
}) {
  const [openMenus, setOpenMenus] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = (index) => {
    setSelectedItem(index);
    setOpenMenus((prevOpenMenus) => {
      const updatedOpenMenus = [...prevOpenMenus];
      updatedOpenMenus[index] = !updatedOpenMenus[index];
      return updatedOpenMenus;
    });
  };

  const filterMenuItems = (items, term) => {
    return items.filter((item) => {
      if (typeof item.text === 'string' && item.text.toLowerCase().includes(term.toLowerCase())) {
        return true;
      }
  
      if (item.subItems) {
        return filterMenuItems(item.subItems, term).length > 0;
      }
  
      return false;
    });
  };
  
  const filteredMenuItems = filterMenuItems(menuItems, searchTerm);

  return (
    <div>
      <div
        className={`${
          isMenuVisible ? "" : "hidden"
        } fixed left-0 top-0 w-64 h-full z-50 sidebar-menu transition-transform md:block overflow-y-auto bg-cyan-200 `}
      >
        <a href="#" className="flex items-center justify-center pb-4 ">
          <img className="mt-2 h-14 w-36" src={imgsrc} alt="Your Image" />
        </a>
        <input
          type="text"
          placeholder="Search..."
          className="block w-56 p-2 my-2 border border-gray-300 rounded-full pl-8 ml-2 shadow-md"
          style={{
            backgroundImage: `url(${require("./mglass.png")})`,
            backgroundSize: "16px 16px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 8px center",
            paddingLeft: "2.5rem",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="mt-4  ">
          {filteredMenuItems.map((menuItem, index) => (
            <li key={index} className={`group menuSidebar `}>
              <Link
                to={menuItem.link}
                className={`menuItems flex font-semibold items-center py-2 px-4 ${menuItem.bgColor}  text-white  sidebar-dropdown-toggle`}
                onClick={() => toggleMenu(index)}
                style={{
                  cursor: "pointer",
                  color: selectedItem === index ? "white" : "inherit",
                }}
              >
                <i className={menuItem.icon + " mr-3 text-lg"}></i>
                <span className="text-sm text-white uppercase">
                  {menuItem.text}
                </span>
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
                    <li key={subIndex} className="mb-4">
                      <Link
                        to={subItem.link}
                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                      >
                        {subItem.text}
                      </Link>
                    </li>
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
