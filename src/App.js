import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Login from "./pages/Login";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectHeadDashboard from "./pages/ProjectHeadDashboard";

//Admin
import AdminDash from "./pages/admin/AdminDash";
import Users from "./pages/admin/Users";
import AddVendor from "./pages/admin/AddVendor";
import AddProjectHead from "./pages/admin/AddProjectHead";
import AddVendorCategory from "./pages/admin/AddVendorCategory";
import VendorCategory from "./pages/admin/VendorCategory";
import AddProject from "./pages/admin/AddProject";
import Project from "./pages/admin/Project";
import RFPA from "./pages/admin/RFP";
import AddRFP from "./pages/admin/AddRFP";
import AdminProfile from "./pages/admin/AdminProfile";
import Product from "./pages/admin/Product";
import AddProduct from "./pages/admin/AddProduct";
import AddProductCategory from "./pages/admin/AddProductCategory";
import VendorVerification from "./pages/admin/VendorVerification";
import DocumentDetails from "./pages/admin/DocumentDetails";
import ProductCategory from "./pages/admin/ProductCategory";
import AddDocument from "./pages/admin/AddDocument";
import Documents from "./pages/admin/Documents";

//Vendor
import VendorDash from "./pages/vendor/VendorDash";
import RFP from "./pages/vendor/RFP";
import VendorProfile from "./pages/vendor/VendorProfile";
import UploadDocument from "./pages/vendor/UploadDocument";

//ProjectHead
import ProjectHeadDash from "./pages/projecthead/ProjectHeadDash";
import ProjectHeadProfile from "./pages/projecthead/ProjectHeadProfile";
import AssignedProject from "./pages/projecthead/AssignedProject";
import Carousel from "./components/Carousel";
import LandingPage from "./components/LandingPage";
import AllBanner from "./pages/admin/Banner/AllBanner";
import AddBanner from "./pages/admin/Banner/AddBanner";
import AddNews from "./pages/admin/News/AddNews";
import AllNews from "./pages/admin/News/AllNews";

import AddEvent from "./pages/admin/Event/AddEvent";
import AllEvent from "./pages/admin/Event/AllEvent";
import AddPolicyDocument from "./pages/admin/Documents/AddPolicyDocument";
import AllPolicyDocuments from "./pages/admin/Documents/AllPolicyDocuments";


const App = () => {
  const [userRole, setuserRole] = useState(sessionStorage.getItem("roles"));
  useEffect(() => {
    console.log(userRole);
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/test1" element={<Carousel />} /> */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminDash />} />
          <Route path="dashboard" index element={<AdminDash />} />
          <Route path="allusers" element={<Users />} />
          <Route path="create-vendor" element={<AddVendor />} />
          <Route path="create-project-head" element={<AddProjectHead />} />
          <Route path="add-vendor-category" element={<AddVendorCategory />} />
          <Route path="vendor-category" element={<VendorCategory />} />
          <Route path="document" element={<Documents />} />
          <Route path="add-document" element={<AddDocument />} />
          <Route path="projects" element={<Project />} />
          <Route path="create-project" element={<AddProject />} />
          <Route path="rfp" element={<RFPA />} />
          <Route path="create-rfp" element={<AddRFP />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="products" element={<Product />} />
          <Route path="create-product" element={<AddProduct />} />
          <Route path="add-product-category" element={<AddProductCategory />} />
          <Route path="product-category" element={<ProductCategory />} />
          <Route path="vendor-verfication" element={<VendorVerification />} />
          <Route
            path="document-verification/:id"
            element={<DocumentDetails />}
          />
          <Route path="allBanners" element={<AllBanner />}></Route>
          <Route path="addBanner" element={<AddBanner />}></Route>
          <Route path="allNews" element={<AllNews />}></Route>
          <Route path="addNews" element={<AddNews />}></Route>

          <Route path="allEvents" element={<AllEvent />}></Route>
          <Route path="addEvent" element={<AddEvent />}></Route>
          <Route path="addDocument" element={<AddPolicyDocument />}></Route>
          <Route path="allDocuments" element={<AllPolicyDocuments />}></Route>
        </Route>

        <Route path="/vendor" element={<VendorDashboard />}>
          <Route index element={<VendorDash />} />
          <Route path="dashboard" element={<VendorDash />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route path="rfp" element={<RFP />} />
          <Route path="upload-document" element={<UploadDocument />} />
        </Route>

        <Route path="/projecthead" element={<ProjectHeadDashboard />}>
          <Route index element={<ProjectHeadDash />} />
          <Route path="dashboard" element={<ProjectHeadDash />} />
          <Route path="profile" element={<ProjectHeadProfile />} />
          <Route path="assigned-project" element={<AssignedProject />} />
        </Route>

        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
