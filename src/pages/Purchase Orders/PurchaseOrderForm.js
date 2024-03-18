import React, { useState } from "react";
import axios from "axios";

const PurchaseOrderForm = () => {
  const [formData, setFormData] = useState({
    purchaseOrderNo: "",
    vendorName: "",
    poAmount: "",
    expectedDeliveryDate: "",
    status: "Active", // Set default status
    uploadDocument: null,
  });

  const fetchVendors = () => {
    axios
      .get("https://localhost:7254/api/Vendor/All")
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor:", error);
      });
  };
  // https://localhost:7254/api/PurchaseOrder/Add   add purchase order
  // https://localhost:7254/api/Vendor/All           get all  vendors name display
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

    // Prepare form data (you can modify this based on your backend requirements)
    const formDataToSend = new FormData();
    formDataToSend.append("purchaseOrderNo", formData.purchaseOrderNo);
    formDataToSend.append("vendorName", formData.vendorName);
    formDataToSend.append("poAmount", formData.poAmount);
    formDataToSend.append(
      "expectedDeliveryDate",
      formData.expectedDeliveryDate
    );
    formDataToSend.append("status", formData.status);
    formDataToSend.append("uploadDocument", formData.uploadDocument);

    // Send the form data to your backend using fetch or axios
    try {
      const response = await fetch("/api/purchase-orders", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Purchase order created successfully!");
        // Clear the form or redirect to a success page
        setFormData({
          purchaseOrderNo: "",
          vendorName: "",
          poAmount: "",
          expectedDeliveryDate: "",
          status: "Active", // Set default status
          uploadDocument: null,
        });
      } else {
        console.error("Error creating purchase order:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  };

  return (
    <div className="py-10 flex justify-center items-center bg-gray-100 font-poppins">
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
        <formmm onSubmit={handleSubmit}>
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
            <div className="mb-4">
              <label
                htmlFor="categorySelect"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select a category:
              </label>
              <select
                required
                id="categorySelect"
                name="vendorCategoryId"
                value={formData.vendorCategoryId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an option</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
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
        </formmm>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
