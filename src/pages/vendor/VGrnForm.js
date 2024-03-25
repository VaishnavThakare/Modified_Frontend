import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GRNForm = () => {
  const [formData, setFormData] = useState({
    GRNNo: "",
    PurchaseOrderId: "",
    ShipmentType: true,
    Document: null
  });
  const sid = sessionStorage.getItem("sid");
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/PurchaseOrder/All`
        );
        setPurchaseOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, [sid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, Document: file });
  };

  const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("GRNNo", formData.GRNNo);
    formDataToSend.append("PurchaseOrderId", formData.PurchaseOrderId);
    formDataToSend.append("ShipmentType", formData.ShipmentType);
    formDataToSend.append("Document", formData.Document);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/GRN/Add`, formDataToSend);
      if (response.status === 200) {
        const grnData = response.data;
        const shipmentStatus = grnData.shipmentStatus ? "Complete" : "Partial";
        toast.success(`GRN submitted successfully! Shipment status: ${shipmentStatus}`);
        setFormData({ GRNNo: "", PurchaseOrderId: "", ShipmentType: true, Document: null });
      } else {
        toast.error("Failed to submit GRN");
      }
    } catch (error) {
      toast.error("Failed to submit GRN");
      console.error("Error submitting GRN:", error);
    }
  };

  return (
    <div className="py-10 flex justify-center items-center bg-zinc-50 font-poppins">
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 gap-4">
          <div className="mb-6 relative">
  <input
    type="text" 
    id="GRNNo"
    name="GRNNo"
    value={formData.GRNNo}
    onChange={handleInputChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" " 
    required
  />
  <label
    htmlFor="GRNNo"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    GRN No.
  </label>
</div>

            <div>
              <label htmlFor="PurchaseOrderId" className="block text-sm font-medium text-gray-700">PO No.</label>
              <select
                name="PurchaseOrderId"
                id="PurchaseOrderId"
                value={formData.PurchaseOrderId}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="">Select PO No.</option>
                {purchaseOrders.map(order => (
                  <option key={order.id} value={order.id}>{order.orderNo}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ShipmentType" className="block text-sm font-medium text-gray-700">Select Shipment Type</label>
              <select
                name="ShipmentType"
                id="ShipmentType"
                value={formData.ShipmentType}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option disabled>Select Shipment Type</option>
                <option value={true}>Complete Shipment</option>
                <option value={false}>Partial Shipment</option>
              </select>
            </div>
            <div>
              <label htmlFor="Document" className="block text-sm font-medium text-gray-700">Document Upload</label>
              <input
                type="file"
                name="Document"
                id="Document"
                onChange={handleFileChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default GRNForm;













