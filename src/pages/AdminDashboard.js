import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AdminDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      icon: "ri-home-2-line",
      link: "dashboard",
      bgColor: "bg-cyan-100",
    },
    {
      text: "Users",
      icon: "bx bx-user",
      link: "#",
      subItems: [{ text: "All", link: "allusers" }],
      bgColor: "bg-cyan-200",
    },
    {
      text: "Vendor",
      icon: "bx bx-category",
      link: "#",
      bgColor: "bg-cyan-300",
      subItems: [
        { text: "Create Vendor", link: "create-vendor" },
        { text: "All Vendor Category", link: "vendor-category" },
        { text: "Add Vendor Category", link: "add-vendor-category" },
        { text: "Document List", link: "document" },
        { text: "Add Document", link: "add-document" },
      ],
    },
    {
      text: "Project Head",
      icon: "bx bx-user",
      link: "#",
      subItems: [{ text: "Create Project Head", link: "create-project-head" }],
      bgColor: "bg-cyan-400",
    },
    {
      text: "Project",
      icon: "ri ri-projector-line",
      link: "#",
      subItems: [
        { text: "All Project", link: "projects" },
        { text: "Create Project", link: "create-project" },
      ],
      bgColor: "bg-cyan-500",
    },

    {
      text: "Products",
      icon: "ri ri-product-hunt-line  ",
      link: "#",
      subItems: [
        { text: "Product Category", link: "product-category" },
        { text: "Create Product", link: "create-product" },
        { text: "Create Product Category", link: "add-product-category" },
      ],
      bgColor: "bg-cyan-600",
    },

    {
      text: "Request for Proposal",
      icon: "ri-file-copy-2-line",
      link: "#",
      subItems: [
        { text: "All RFP", link: "rfp" },
        { text: "Create RFP", link: "create-rfp" },
      ],
      bgColor: "bg-cyan-700",
    },
    ///////////

    {
      text: "Vendor Verification",
      icon: "ri ri-verified-badge-fill",
      link: "#",
      subItems: [{ text: "Vendor", link: "vendor-verfication" }],
      bgColor: "bg-cyan-800",
    },

    {
      text: "Banner ",
      icon: "ri-file-copy-2-line",
      link: "#",
      subItems: [
        { text: "All Banner", link: "allBanners" },
        { text: "Add Banner", link: "addBanner" },
      ],
      bgColor: "bg-cyan-900",
    },
    {
      text: "News",
      icon: "ri-file-copy-2-line",
      link: "#",
      subItems: [
        { text: "All News", link: "allNews" },
        { text: "Add News", link: "addNews" },
      ],
      bgColor: "bg-cyan-950",
    },
    {
      text: "Event",
      icon: "ri-file-copy-2-line",
      link: "#",
      subItems: [
        { text: "All Event", link: "allEvents" },
        { text: "Add Event", link: "addEvent" },
        { text: "Delete Event", link: "deleteEvent" },
        { text: "Update Event", link: "updateEvent" },
      ],
      bgColor: "bg-cyan-900",
    },
    ,
    {
      text: "Document",
      icon: "ri-file-copy-2-line",
      link: "#",
      subItems: [
        { text: "All Document", link: "allDocuments" },
        { text: "Add Document", link: "addDocument" },
        { text: "Delete Document", link: "deleteDocument" },
        { text: "Update Document", link: "updateDocument" },
      ],
      bgColor: "bg-cyan-950",
    },

    /////////////
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
