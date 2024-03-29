import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import GRN from "./pages/admin/grn";
import DETAILEDGRN from "./pages/admin/detaiedgrn";
import RFPA from "./pages/admin/RFP";
import AddRFP from "./pages/admin/AddRFP";
import AdminProfile from "./pages/admin/AdminProfile";
import Product from "./pages/admin/Product";
import AdminInvoiceList from "./pages/admin/AdminInvoiceList";
import AdminDetailsView from "./pages/admin/AdminDetailsView";
import AddProduct from "./pages/admin/AddProduct";
import AddProductCategory from "./pages/admin/AddProductCategory";
import VendorVerification from "./pages/admin/VendorVerification";
import DocumentDetails from "./pages/admin/DocumentDetails";
import ProductCategory from "./pages/admin/ProductCategory";
import AddDocument from "./pages/admin/AddDocument";
import Documents from "./pages/admin/Documents";
import PoDetailsA from "./pages/Purchase Orders/PoDetailsA";
import PurchaseOrderForm from "./pages/Purchase Orders/PurchaseOrderForm";
import EditPurchaseOrderPage from "./pages/Purchase Orders/EditPurchaseOrderPage";
import ProjectEdit from "./pages/admin/ProjectEdit";
import ProjectView from "./pages/admin/ProjectView";
import VendorDetailsAdm from "./pages/admin/VendorDetailsAdm.js";

import UpdateProduct from "./pages/admin/UpdateProduct";
import ViewProduct from "./pages/admin/ViewProduct";

//Vendor
import VendorDash from "./pages/vendor/VendorDash";
import RFP from "./pages/vendor/RFP";
import VendorProfile from "./pages/vendor/VendorProfile";
import UploadDocument from "./pages/vendor/UploadDocument";
import PoDetailsV from "./pages/Purchase Orders/PoDetailsV";
import ViewInvoiceVendor from "./pages/vendor/ViewInvoiceVendor";
import CreateInvoiceVendor from "./pages/vendor/CreateInvoiceVendor";
import UpdateInvoiceVendor from "./pages/vendor/UpdateInvoiceVendor";
import VGrnForm from "./pages/vendor/VGrnForm";
import VGrnlist from "./pages/vendor/VGrnlist";
import VendorDetailsView from "./pages/vendor/VendorDetailsView";
import EditVGrnDetails from "./pages/vendor/EditVGrnDetails.js";

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
import EditNews from "./pages/admin/News/EditNews.js";
import GrnList from "./pages/projecthead/GrnList";
import InvoiceDetails from "./pages/projecthead/Invoice/InvoiceDetails.js";
import AddEvent from "./pages/admin/Event/AddEvent";
import AllEvent from "./pages/admin/Event/AllEvent";
import AddPolicyDocument from "./pages/admin/Documents/AddPolicyDocument";
import AllPolicyDocuments from "./pages/admin/Documents/AllPolicyDocuments";
import AddProfile from "./pages/admin/Profile/AddProfile";
import AllProfile from "./pages/admin/Profile/AllProfile";
import Application from "./pages/admin/Application";
import EditGrnDetails from "./pages/projecthead/EditGrnDetails";
import ChangePassword from "./pages/ChangePassword";
import PheadList from "./pages/projecthead/Invoice/PheadList";
import PoDetailsPHead from "./pages/projecthead/PoDetailsPHead";
import PurchaseOrderFormPHead from "./pages/projecthead/PurchaseOrderFormPHead";
import EditPurchaseOrderPagePHead from "./pages/projecthead/EditPurchaseOrderPagePHead";
import PODetailedView from "./pages/projecthead/PODetailedView";
import EditInvoices from "./pages/projecthead/Invoice/EditInvoices.js";

import Poactions from "./pages/Purchase Orders/Poactions.js";
import VendorList from "./pages/admin/VendorList.js";
import ProjectHeadList from "./pages/admin/ProjectHeadList.js";
import ProjectHeadView from "./pages/admin/ProjectHeadView.js";
import RFPEdit from "./pages/admin/RFPEdit.js";
import RFPView from "./pages/admin/RFPView.js";
import PoDetails from "./pages/Purchase Orders/PoDetails.js";
import PoGrnView from "./pages/Purchase Orders/PoGrnView.js";
import EditEvent from "./pages/admin/Event/EditEvent.js";
import EditProfile from "./pages/admin/Profile/EditProfile.js";
import NewsDetail from "./pages/admin/News/NewsDetail.js";

const App = () => {
  const [userRole, setuserRole] = useState(sessionStorage.getItem("roles"));
  useEffect(() => {
    console.log(userRole);
  }, []);

  return (
    <Router>
      <ToastContainer /> {/* Add ToastContainer here */}
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/test1" element={<Carousel />} /> */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminDash />} />
          <Route path="dashboard" index element={<AdminDash />} />
          <Route path="allusers" element={<Users />} />
          <Route path="vendor-list" element={<VendorList />} />
          <Route path="projectHead-list" element={<ProjectHeadList />} />
          <Route
            path="view-projecthead/:projectHeadId"
            element={<ProjectHeadView />}
          />
          <Route path="create-vendor" element={<AddVendor />} />
          <Route path="create-project-head" element={<AddProjectHead />} />
          <Route path="add-vendor-category" element={<AddVendorCategory />} />
          <Route path="vendor-category" element={<VendorCategory />} />
          <Route path="document" element={<Documents />} />
          <Route path="add-document" element={<AddDocument />} />
          <Route path="projects" element={<Project />} />
          <Route path="grn" element={<GRN />} />
          <Route path="details" element={<DETAILEDGRN />} />
          <Route path="create-project" element={<AddProject />} />
          <Route path="rfp" element={<RFPA />} />
          <Route path="rfp/:id" element={<RFPEdit />} />
          <Route path="rfp/view/:id" element={<RFPView />} />
          <Route path="create-rfp" element={<AddRFP />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="products" element={<Product />} />
          <Route path="create-product" element={<AddProduct />} />
          <Route path="add-product-category" element={<AddProductCategory />} />
          <Route path="projects/:projectId" element={<ProjectEdit />} />
          <Route path="view-projects/:projectId" element={<ProjectView />} />
          <Route path="product-category" element={<ProductCategory />} />
          <Route path="vendor-verfication" element={<VendorVerification />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route
            path="document-verification/:id"
            element={<DocumentDetails />}
          />
          <Route path="allBanners" element={<AllBanner />}></Route>
          <Route path="addBanner" element={<AddBanner />}></Route>
          <Route path="allNews" element={<AllNews />}></Route>
          <Route path="addNews" element={<AddNews />}></Route>
          <Route path="editNews/:newsId" element={<EditNews />}></Route>
          <Route path="news/view/:id" element={<NewsDetail />}></Route>

          <Route path="allEvents" element={<AllEvent />}></Route>
          <Route path="addEvent" element={<AddEvent />}></Route>
          <Route path="editEvent/:eventId" element={<EditEvent />}></Route>

          <Route path="addDocument" element={<AddPolicyDocument />}></Route>
          <Route path="allDocuments" element={<AllPolicyDocuments />}></Route>

          <Route path="addProfile" element={<AddProfile />}></Route>
          <Route path="allProfile" element={<AllProfile />}></Route>
          <Route
            path="editProfile/:profileId"
            element={<EditProfile />}
          ></Route>

          <Route path="all-application" element={<Application />}></Route>
          <Route
            path="purchase-OrderForm"
            element={<PurchaseOrderForm />}
          ></Route>
          <Route path="purchase-order-list" element={<PoDetailsA />} />
          <Route path="purchase-orders/:poId" element={<PoDetails />} />
          <Route path="purchase-order-Grn/:grnId" element={<PoGrnView />} />

          <Route path="edit/:orderNo" element={<EditPurchaseOrderPage />} />
          <Route path="view-invoice" element={<AdminInvoiceList />} />
          <Route path="details/:invoiceNo" element={<AdminDetailsView />} />
          <Route path="vendor-detailsadm/:id" element={<VendorDetailsAdm />} />
          <Route
            path="update-products/:productId"
            element={<UpdateProduct />}
          />
          <Route path="view-products/:productId" element={<ViewProduct />} />
        </Route>

        <Route path="/vendor" element={<VendorDashboard />}>
          <Route index element={<VendorDash />} />
          <Route path="dashboard" element={<VendorDash />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route path="rfp" element={<RFP />} />
          <Route path="upload-document" element={<UploadDocument />} />
          <Route path="view-invoice" element={<ViewInvoiceVendor />} />
          <Route path="create-invoice" element={<CreateInvoiceVendor />} />
          <Route
            path="update-invoice/:invoiceId"
            element={<UpdateInvoiceVendor />}
          />
          <Route path="po-check" element={<PoDetailsV />} />
          {/* Add this Route for Poactions */}
          <Route path="po-check/:orderId" element={<Poactions />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="vendor-grnform" element={<VGrnForm />} />
          <Route path="vendor-grnlist" element={<VGrnlist />} />
          <Route path="details/:invoiceNo" element={<VendorDetailsView />} />
          <Route path="vendor-grnedit/:grnId" element={<EditVGrnDetails />} />

          {/* <Route path="/purchase-order-list/:id" element={<PurchaseOrderDetails />} /> */}
        </Route>

        <Route path="/projecthead" element={<ProjectHeadDashboard />}>
          <Route index element={<ProjectHeadDash />} />
          <Route path="dashboard" element={<ProjectHeadDash />} />
          <Route path="profile" element={<ProjectHeadProfile />} />
          <Route path="assigned-project" element={<AssignedProject />} />
          <Route path="grn-list" element={<GrnList />} />
          <Route path="invoice-list" element={<PheadList />} />
          <Route path="invoice-list/:invoiceId" element={<EditInvoices />} />
          <Route path="editGrn-List/:grnId" element={<EditGrnDetails />} />
          <Route
            path="invoice-details-phead/:invoiceNo"
            element={<InvoiceDetails />}
          />
          <Route
            path="purchase-OrderForm-pHead"
            element={<PurchaseOrderFormPHead />}
          />
          <Route
            path="purchase-order-list-pHead"
            element={<PoDetailsPHead />}
          />
          <Route path="po-details-phead/:id" element={<PODetailedView />} />
          <Route
            path="edit/:orderNo"
            element={<EditPurchaseOrderPagePHead />}
          />
          <Route path="changePassword" element={<ChangePassword />} />
        </Route>

        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
