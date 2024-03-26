import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgsrc from "./sciqus1.png";

export default function Sidebar({ isMenuVisible, menuItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuItemClick = (index, event) => {
    if (selectedItem === index) {
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

  const filterMenuItems = (items, term) => {
    return items.filter((item) => {
      if (
        typeof item.text === "string" &&
        item.text.toLowerCase().includes(term.toLowerCase())
      ) {
        return true;
      }

      if (item.subItems) {
        return filterMenuItems(item.subItems, term).length > 0;
      }

      return false;
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
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="block w-56 p-2 my-2 border border-gray-300 rounded-full shadow-lg pl-8 ml-2"
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
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
        <ul className="mt-4">
          {filteredMenuItems.map((menuItem, index) => (
            <li key={index} className="group menuSidebar">
              <div
                className={`menuItems flex font-semibold items-center py-2 px-4 ${menuItem.bgColor}  text-white relative`}
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
                    className="w-full absolute bg-zinc-50 text-gray-600 shadow-lg shadow-gray-600 rounded-lg submenuArrow"
                    style={{
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                      zIndex: 1000,
                      transition:
                        "opacity 0.3s ease-out, transform 0.3s ease-out",
                      opacity: 1,
                      transform: "translateY(0)",
                    }}
                    onMouseEnter={() => setSelectedItem(index)}
                    onMouseLeave={() => setSelectedItem(null)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="arrow-up-left"></div>
                    <ul>
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="rounded-b-md p-3 menuItemHover"
                          style={{
                            "--hover-color": menuItem.bgColor
                              .split("[")[1]
                              .slice(0, -1),
                          }}
                        >
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
