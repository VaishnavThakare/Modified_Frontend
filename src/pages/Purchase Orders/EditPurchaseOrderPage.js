import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPurchaseOrderPage = ({ vendors }) => {
  const { orderNo } = useParams();
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    orderNo: "",
    vendorId: "", // Change state key to store vendorId instead of vendorName
    orderAmount: "",
    expectedDelivery: "",
    document: null,
    isActive: true // Assuming IsActive should default to true
  });

  useEffect(() => {
    const fetchPurchaseOrderDetails = async () => {
      try {
        
        const response = await fetch(`https://localhost:7254/api/PurchaseOrder/${orderNo}`);

        if (!response.ok) {
          throw new Error("Failed to fetch purchase order details");
        }

        const data = await response.json();
        setEditedData(data);
      } catch (error) {
        console.error("Error fetching purchase order details:", error.message);
        // Handle error, show message to user, etc.
      }
    };

    if (orderNo) {
      fetchPurchaseOrderDetails();
    }
  }, [orderNo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log(editedData);
      console.log(orderNo);

      var formData = new FormData();
      formData.append("OrderNo",editedData.orderNo);
      formData.append("VendorId",editedData.vendorId);
      formData.append("ExpectedDelivery",editedData.expectedDelivery);
      formData.append("OrderAmount",editedData.orderAmount);
      formData.append("Document",editedData.document);
      formData.append("IsActive",editedData.isActive);
      const response = await axios.put(`https://localhost:7254/api/PurchaseOrder/${orderNo}`, 
      formData);
    
     
      alert("Edited PurchaseOrder Successfully!");
      // Call a function to update state or API to save data
      console.log("Purchase Order updated successfully");
      navigate("/admin/purchase-order-list");
    } catch (error) {
      console.log("Error updating purchase order:",error);
      // Handle error, show message to user, etc.
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Purchase Order</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Order No
          </label>
          <input
            type="text"
            name="orderNo"
            value={editedData.orderNo}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
           Vendor
          </label>
          <input
          type="text"
            name="vendorId"
            value={editedData.vendorId}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expected Delivery
          </label>
          <input
            type="datetime-local"
            name="expectedDelivery"
            value={editedData.expectedDelivery}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Document
          </label>
          <input
            type="file"
            name="document"
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            PO Amount
          </label>
          <input
            type="text"
            name="orderAmount"
            value={editedData.orderAmount}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            IsActive
          </label>
          <input
            type="checkbox"
            name="isActive"
            checked={editedData.isActive}
            onChange={() =>
              setEditedData((prevData) => ({
                ...prevData,
                isActive: !prevData.isActive,
              }))
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>

  );
};

export default EditPurchaseOrderPage;
