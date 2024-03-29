import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PurchaseOrderFormPHead = () => {
  const [formData, setFormData] = useState({
    OrderNo: "",
    VendorId: "", // Change state key to store vendorId instead of vendorName
    OrderAmount: "",
    ExpectedDelivery: "",
    Document: null,
    IsActive: true,
    ProjectId: "", // Add ProjectId state
  });
  const [vendors, setVendors] = useState([]); // Rename vendorNames to vendors
  const [projects, setProjects] = useState([]); // Add state for projects

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/All`
        );
        setVendors(response.data); // Store entire vendor objects
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "Document") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("OrderNo", formData.OrderNo);
    formDataToSend.append("VendorId", formData.VendorId);
    formDataToSend.append("ProjectId", formData.ProjectId);
    formDataToSend.append("OrderAmount", formData.OrderAmount);
    formDataToSend.append("ExpectedDelivery", formData.ExpectedDelivery);
    formDataToSend.append("Document", formData.Document);
    formDataToSend.append("IsActive", formData.IsActive); // Append the Document field with the file

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/PurchaseOrder/Add`,
        formDataToSend
      );

      if (response.status === 200) {
        toast.success("Purchase order created successfully!");
        setFormData({
          OrderNo: "",
          VendorId: "", // Change state key to store vendorId instead of vendorName
          OrderAmount: "",
          ExpectedDelivery: "",
          Document: null,
          IsActive: true,
        });
      } else {
        toast.error("Error creating purchase order");
      }
    } catch (error) {
      toast.error("Error creating purchase order");
      console.error("Error creating purchase order:", error);
    }
  };
  // Fetch projects based on project head ID

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const sid = sessionStorage.getItem("sid");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Project/ProjectHead/${sid}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="py-10 margin-left items-center bg-zinc-50 font-poppins">
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-500">
          Purchase Order Form
        </h2>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 gap-4">
            <div className=" relative">
              <input
                type="text"
                id="OrderNo"
                name="OrderNo"
                value={formData.OrderNo}
                onChange={handleChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="OrderNo"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Order No
              </label>
            </div>

            <div>
              <label
                htmlFor="VendorId" // Change htmlFor to vendorId
                className="block text-sm font-medium text-gray-700"
              >
                Select Vendor
              </label>
              <select
                name="VendorId" // Change name to vendorId
                id="VendorId"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.VendorId}
                onChange={handleChange}
              >
                <option value="">-- Select Vendor --</option>
                {vendors.map((vendor, index) => (
                  <option key={index} value={vendor.id}>
                    {vendor.name}
                  </option> // Use vendor.id as value
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="ProjectId"
                className="block text-sm font-medium text-gray-700"
              >
                Select Project
              </label>
              <select
                name="ProjectId"
                id="ProjectId"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.ProjectId}
                onChange={handleChange}
              >
                <option value="">-- Select Project --</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="ExpectedDelivery"
                className="block text-sm font-medium text-gray-700"
              >
                Expected Delivery Date
              </label>
              <input
                type="datetime-local"
                name="ExpectedDelivery"
                id="ExpectedDelivery"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.ExpectedDelivery}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Document"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Document
              </label>
              <input
                type="file"
                name="Document"
                id="Document"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 relative">
              <input
                type="number"
                id="OrderAmount"
                name="OrderAmount"
                value={formData.OrderAmount}
                onChange={handleChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="OrderAmount"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                PO Amount
              </label>
            </div>

            <div className="flex flex-row">
              <label
                htmlFor="IsActive"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                IsActive
              </label>
              <input
                type="checkbox"
                name="IsActive"
                id="IsActive"
                className="peer mb-2 ml-2"
                value={formData.IsActive}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className=" text-white px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
              >
                Send Purchase Order
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PurchaseOrderFormPHead;
