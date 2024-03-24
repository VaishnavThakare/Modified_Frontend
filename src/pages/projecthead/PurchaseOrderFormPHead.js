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
          "https://localhost:7254/api/Vendor/All"
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
        "https://localhost:7254/api/PurchaseOrder/Add",
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
          `https://localhost:7254/api/Project/ProjectHead/${sid}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="py-10 flex justify-center items-center bg-zinc-50 font-poppins">
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="OrderNo"
                className="block text-sm font-medium text-gray-700"
              >
                Order No
              </label>
              <input
                type="text"
                name="OrderNo"
                id="OrderNo"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.OrderNo}
                onChange={handleChange}
              />
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
            <div>
              <label
                htmlFor="OrderAmount"
                className="block text-sm font-medium text-gray-700"
              >
                PO Amount
              </label>
              <input
                type="number"
                name="OrderAmount"
                id="OrderAmount"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.OrderAmount}
                onChange={handleChange}
              />
            </div>

            <div>
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
                className="peer"
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
