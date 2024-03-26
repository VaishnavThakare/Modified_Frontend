import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgsrc from "./sciqus1.png";

export default function Sidebar({ isMenuVisible, menuItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleMenuItemClick = (index, event) => {
    if (selectedItem === index) {
      // Close submenu if clicking on the same menu item
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
      const rect = event.currentTarget.getBoundingClientRect();
      setPopupPosition({
        top: rect.height,
        left: rect.left,
      });
    }
  };

  const handleMenuItemHover = (index, event) => {
    setSelectedItem(index);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.height,
      left: rect.left,
    });
  };

  const closeSubMenu = () => {
    setSelectedItem(null);
  };

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
        <ul className="mt-4">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="group menuSidebar">
              <div
                className={`menuItems flex font-semibold items-center py-2 px-4 ${
                  menuItem.bgColor
                }  text-white relative`}
                onClick={(e) => handleMenuItemClick(index, e)}
                onMouseEnter={(e) => handleMenuItemHover(index, e)}
                onMouseLeave={closeSubMenu}
                style={{
                  cursor: "pointer",
                  color: selectedItem === index ? "white" : "inherit",
                }}
              >
                <i className={menuItem.icon + " mr-3 text-lg"}></i>
                <span className="text-sm text-white uppercase">
                  {menuItem.text}
                </span>
                {selectedItem === index && menuItem.subItems && (
                  <div
                    className="ml-5 absolute bg-white text-gray-700 p-4 shadow-lg rounded-lg submenuArrow"
                    style={{
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                      zIndex: 1000, // Set a higher z-index value
                    }}
                    onMouseEnter={() => setSelectedItem(index)}
                    onMouseLeave={() => setSelectedItem(null)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="arrow-up-left"></div>
                    <ul>
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="hover:bg-cyan-300 rounded-md">
                          <Link to={subItem.link}>{subItem.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${
          isMenuVisible ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black/50 z-40 sidebar-overlay md:hidden`}
        onClick={closeSubMenu}
      ></div>
    </div>
  );
}
