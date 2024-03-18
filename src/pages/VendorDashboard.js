import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import VendorHeader from "../components/VendorHeader";
import "./Css/VendorDashboard.css";

export default function VendorDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      // icon: "ri-home-2-line",
      link: "dashboard",
      bgColor: "bg-cyan-300",
    },
    {
      text: "Request for Proposal",
      // icon: "ri ri-archive-2-line",
      link: "#",
      bgColor: "bg-cyan-400",
      subItems: [{ text: "For You", link: "rfp" }],
    },
    {
      text: "Documents",
      // icon: "ri ri-archive-2-line",
      link: "#",
      bgColor: "bg-cyan-500",
      subItems: [{ text: "Upload Documents", link: "upload-document" }],
    },
    {
      text: "Purchase Order",
      // icon: "ri ri-archive-2-line",
      link: "#",
      bgColor: "bg-cyan-600",
      subItems: [
        // { text: "Purchase Order Details", link: "purchase-order-details" },
        { text: "Purchase Order List", link: "purchase-order-list" },
        { text: "Purchase Order", link: "po-check" },
      ],
    },
  ];

  const handleMenuVisible = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <Sidebar
        isMenuVisible={isMenuVisible}
        handleMenuVisible={handleMenuVisible}
        menuItems={menuItems.map((item) => ({
          ...item,
          text: <span className="white-bold-text">{item.text}</span>,
        }))}
      />
      <main className="w-full md:w-[calc(100%-256px)] sm:ml-0 md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <VendorHeader handleMenuVisible={handleMenuVisible} />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
