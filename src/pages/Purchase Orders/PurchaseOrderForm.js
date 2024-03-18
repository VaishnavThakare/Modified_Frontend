import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseOrderForm = () => {
  const [formData, setFormData] = useState({
    purchaseOrderNo: "",
    vendorId: "", // Change state key to store vendorId instead of vendorName
    poAmount: "",
    expectedDeliveryDate: "",
    uploadDocument: null,
  });
  const [vendors, setVendors] = useState([]); // Rename vendorNames to vendors

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("https://localhost:7254/api/Vendor/All");
        setVendors(response.data); // Store entire vendor objects
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "uploadDocument") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("purchaseOrderNo", formData.purchaseOrderNo);
    formDataToSend.append("vendorId", formData.vendorId);
    formDataToSend.append("poAmount", formData.poAmount);
    formDataToSend.append("expectedDeliveryDate", formData.expectedDeliveryDate);
    formDataToSend.append("Document", formData.uploadDocument); // Append the Document field with the file
  
    try {
      const response = await axios.post("https://localhost:7254/api/PurchaseOrder/Add", formDataToSend);
      
      if (response.status === 200) {
        toast.success("Purchase order created successfully!");
        setFormData({
          purchaseOrderNo: "",
          vendorId: "",
          poAmount: "",
          expectedDeliveryDate: "",
          uploadDocument: null,
        });
      } else {
        toast.error("Error creating purchase order");
      }
    } catch (error) {
      toast.error("Error creating purchase order");
      console.error("Error creating purchase order:", error);
    }
  };
  
  return (
    <div className="py-10 flex justify-center items-center bg-gray-100 font-poppins">
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
        <form  onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="purchaseOrderNo"
                className="block text-sm font-medium text-gray-700"
              >
                Purchase Order No
              </label>
              <input
                type="text"
                name="purchaseOrderNo"
                id="purchaseOrderNo"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.purchaseOrderNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="vendorId" // Change htmlFor to vendorId
                className="block text-sm font-medium text-gray-700"
              >
                Select Vendor
              </label>
              <select
                name="vendorId" // Change name to vendorId
                id="vendorId"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.vendorId}
                onChange={handleChange}
              >
                <option value="">-- Select Vendor --</option>
                {vendors.map((vendor, index) => (
                  <option key={index} value={vendor.id}>{vendor.name}</option> // Use vendor.id as value
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="expectedDeliveryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expected Delivery Date
              </label>
              <input
                type="datetime-local"
                name="expectedDeliveryDate"
                id="expectedDeliveryDate"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.expectedDeliveryDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="uploadDocument"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Document
              </label>
              <input
                type="file"
                name="uploadDocument"
                id="uploadDocument"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="poAmount"
                className="block text-sm font-medium text-gray-700"
              >
                PO Amount
              </label>
              <input
                type="number"
                name="poAmount"
                id="poAmount"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.poAmount}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
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

export default PurchaseOrderForm;
