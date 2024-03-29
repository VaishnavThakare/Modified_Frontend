import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function VendorDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      text: "DASHBOARD",
      link: "dashboard",
      bgColor: "bg-[#09c8e2]",
      icon: "ri-home-2-line text-white",
    },
    {
      text: "REQUEST FOR PROPOSAL (RFP)",
      link: "#",
      bgColor: "bg-[#09c8e2]",
      subItems: [{ text: "RFP", link: "rfp" }],
      icon: "ri-file-copy-2-line text-white",
    },
    {
      text: "DOCUMENTS",
      link: "#",
      bgColor: "bg-[#09c8e2]",
      subItems: [{ text: "Upload Documents", link: "upload-document" }],
      icon: "ri-file-copy-2-line text-white",
    },
    {
      text: "PURCHASE ORDER",
      link: "#",
      bgColor: "bg-[#09c8e2]",
      subItems: [{ text: "Purchase Order", link: "po-check" }],
      icon: "bx bx-category text-white",
    },
    {
      text: "GRN Details",
      link: "#",
      bgColor: "bg-[#09c8e2]",
      icon: "ri ri-projector-line text-white",
      subItems: [
        { text: "GRN List", link: "vendor-grnlist" },
        { text: "GRN Form", link: "vendor-grnform" },
      ],
    },
    {
      text: "INVOICE",
      link: "#",
      bgColor: "bg-[#09c8e2]",
      icon: "bx bx-category text-white",
      subItems: [
        { text: "View", link: "view-invoice" },
        { text: "Add", link: "create-invoice" },
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
        menuItems={menuItems}
      />
      <main className="w-full md:w-[calc(100%-256px)] sm:ml-0 md:ml-64 bg-zinc-50 min-h-screen transition-all main">
        <Header handleMenuVisible={handleMenuVisible} />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
