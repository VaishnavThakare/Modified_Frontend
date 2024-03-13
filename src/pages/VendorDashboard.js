import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function VendorDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      icon: "ri-home-2-line",
      link: "dashboard",
      bgColor: "bg-cyan-300",
    },
    {
      text: "Request for Proposal",
      icon: "ri ri-archive-2-line",
      link: "#",
      bgColor: "bg-cyan-400",
      subItems: [{ text: "For You", link: "rfp" }],
    },
    {
      text: "Documents",
      icon: "ri ri-archive-2-line",
      link: "#",
      bgColor: "bg-cyan-500",
      subItems: [{ text: "Upload Documents", link: "upload-document" }],
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
        menuItems={menuItems}
      />
      <main class="w-full md:w-[calc(100%-256px)] sm:ml-0 md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <Header handleMenuVisible={handleMenuVisible} />
        <div class="p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
