import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function ProjectHeadDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      icon: "ri-home-2-line text-white font-",
      link: "dashboard",
      bgColor: "bg-cyan-300",
      textStyle: "font-bold",
    },
    {
      text: "Users",
      icon: "bx bx-user text-white",
      link: "#",
      bgColor: "bg-cyan-400",
      subItems: [{ text: "Assigned Project ", link: "assigned-project " }],
    },
    {
      text: "GRN",
      icon: "bx bx-user text-white font-",
      link: "#",
      bgColor: "bg-cyan-400",
      subItems: [{ text: "GRN Listing", link: "grn-List" }],
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
      <main class="w-full md:w-[calc(100%-256px)] sm:ml-0 md:ml-64 bg-zinc-50 min-h-screen transition-all main">
        <Header handleMenuVisible={handleMenuVisible} />
        <div class="p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
