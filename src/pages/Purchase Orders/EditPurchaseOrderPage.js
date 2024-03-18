


// EditPurchaseOrderPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPurchaseOrderPage = ({ items }) => {
  const { poNo } = useParams();
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    poNo: "",
    vendorName: "",
    expectedDeliveryDate: "",
    uploadDocument: "",
    poAmount: "",
  });

  useEffect(() => {
    if (poNo && items) {
      const selectedItem = items.find((item) => item.poNo === poNo);
      if (selectedItem) {
        setEditedData(selectedItem);
      } else {
        // Handle item not found
      }
    }
  }, [poNo, items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedItems = items.map((item) =>
      item.poNo === poNo ? editedData : item
    );
    // Call a function to update state or API to save data
    console.log("Updated items:", updatedItems);
    navigate("/admin");
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
            Purchase Order No.
          </label>
          <input
            type="text"
            name="poNo"
            value={editedData.poNo}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vendor Name
          </label>
          <input
            type="text"
            name="vendorName"
            value={editedData.vendorName}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expected Delivery Date
          </label>
          <input
            type="date"
            name="expectedDeliveryDate"
            value={editedData.expectedDeliveryDate}
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
            name="uploadDocument"
            value={editedData.uploadDocument}
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
            name="poAmount"
            value={editedData.poAmount}
            onChange={handleInputChange}
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
    </div>
  );
};

export default EditPurchaseOrderPage;
