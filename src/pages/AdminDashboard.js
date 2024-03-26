import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AdminDashboard() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      icon: "ri-home-2-line text-white",
      link: "dashboard",
      bgColor: "bg-[#7fecfa]",
    },
    {
      text: "Users",
      icon: "bx bx-user text-white",
      link: "#",
      subItems: [
        { text: "All", link: "allusers" },
        { text: "Vendor List", link: "vendor-list" },
        { text: "Project Head List", link: "projectHead-list" },
      ],
      bgColor: "bg-[#6ce9f9]",
    },
    {
      text: "Vendor",
      icon: "bx bx-category text-white",
      link: "#",
      bgColor: "bg-[#58e6f8]",
      subItems: [
        { text: "Create Vendor", link: "create-vendor" },
        { text: "All Vendor Category", link: "vendor-category" },
        { text: "Add Vendor Category", link: "add-vendor-category" },
        { text: "Document List", link: "document" },
        { text: "Add Document", link: "add-document" },
      ],
    },
    {
      text: "Purchase Order",
      icon: "bx bx-category text-white",
      link: "#",
      bgColor: "bg-[#45e3f8]",
      subItems: [
        // { text: "Purchase Order Form", link: "purchase-OrderForm" },
        { text: "Purchase Order View", link: "purchase-order-list" },
      ],
    },
    {
      text: "GRN",
      icon: "bx bx-category text-white",
      link: "#",
      bgColor: "bg-[#31e0f7]",
      subItems: [{ text: "View", link: "grn" }],
    },
    {
      text: "INVOICE",
      icon: "bx bx-category text-white",
      link: "#",
      bgColor: "bg-[#1dddf6]",
      subItems: [{ text: "View", link: "view-invoice" }],
    },

    {
      text: "Project Head",
      icon: "bx bx-user text-white",
      link: "#",
      subItems: [{ text: "Create Project Head", link: "create-project-head" }],
      bgColor: "bg-[#0adaf5]",
    },
    {
      text: "Project",
      icon: "ri ri-projector-line text-white",
      link: "#",
      subItems: [
        { text: "All Project", link: "projects" },
        { text: "Create Project", link: "create-project" },
      ],
      bgColor: "bg-[#09c8e2]",
    },

    {
      text: "Products",
      icon: "ri ri-product-hunt-line text-white ",
      link: "#",
      subItems: [
        { text: "Product Category", link: "product-category" },
        { text: "Create Product", link: "create-product" },
        { text: "Create Product Category", link: "add-product-category" },
      ],
      bgColor: "bg-[#08b7ce]",
    },

    {
      text: "Request for Proposal",
      icon: "ri-file-copy-2-line text-white",
      link: "#",
      subItems: [
        { text: "All RFP", link: "rfp" },
        { text: "Create RFP", link: "create-rfp" },
        { text: "Application ", link: "all-application" },
      ],
      bgColor: "bg-[#07a6ba]",
    },

    {
      text: "Vendor Verification",
      icon: "ri ri-verified-badge-fill text-white",
      link: "#",
      subItems: [{ text: "Vendor", link: "vendor-verfication" }],
      bgColor: "bg-[#0794a7]",
    },

    {
      text: "Banner ",
      icon: "ri-file-copy-2-line text-white",
      link: "#",
      subItems: [
        { text: "All Banner", link: "allBanners" },
        { text: "Add Banner", link: "addBanner" },
      ],
      bgColor: "bg-[#068393]",
    },
    {
      text: "News",
      icon: "ri-file-copy-2-line text-white",
      link: "#",
      subItems: [
        { text: "All News", link: "allNews" },
        { text: "Add News", link: "addNews" },
      ],
      bgColor: "bg-[#057180]",
    },
    {
      text: "Event",
      icon: "ri-file-copy-2-line text-white",
      link: "#",
      subItems: [
        { text: "All Event", link: "allEvents" },
        { text: "Add Event", link: "addEvent" },
      ],
      bgColor: "bg-[#04606c]",
    },

    {
      text: "Document",
      icon: "ri-file-copy-2-line text-white",
      link: "#",
      subItems: [
        { text: "All Document", link: "allDocuments" },
        { text: "Add Document", link: "addDocument" },
      ],
      bgColor: "bg-[#034e58]",
    },
    {
      text: "Profile",
      icon: "ri-file-copy-2-line text-white",
      link: "#",
      subItems: [
        { text: "All Profile", link: "allProfile" },
        { text: "Add Profile", link: "addProfile" },
      ],
      bgColor: "bg-[#033d45]",
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
