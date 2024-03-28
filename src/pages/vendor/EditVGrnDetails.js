import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditVGrnDetails = () => {
  const { grnId } = useParams();
  const [grnData, setgrnData] = useState({
  grnNo: "",
  purchaseOrderId: "",
  shipmentStatus: true,
  Document:null,
  });
  
  const navigate = useNavigate();
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

    const fetchGrnbyId = async () => {
      console.log(grnId);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GRN/${grnId}`
        );
        

        setgrnData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
  };

  fetchPurchaseOrders();
  fetchGrnbyId();
  }, [sid,grnId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setgrnData({ ...grnData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setgrnData({ ...grnData, Document: file });
  };

  /* "id": "08dc48c4-46fb-4ec8-8ea4-91db67616d92",
  "grnNo": "12",
  "purchaseOrderId": "08dc48c2-c02b-4eb3-88c0-1502df8920cc",
  "sendOn": "2024-03-20T15:28:22.138873",
  "isAccepted": null,
  "acceptedOn": null,
  "shipmentStatus": true,
  "documentPath": "https://localhost:7254/Files/GRNs/596dc1ff-7a00-4850-a1d5-421b920caed9.pdf",
  "comment": "Update",
  "createdOn": "2024-03-20T15:28:22.139144",
  "lastModifiedOn": "2024-03-20T22:57:27.260286",*/

  const handleSubmit = async (event) => {
    console.log(grnData);
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("grnNo", grnData.grnNo);
    formDataToSend.append("purchaseOrderId", grnData.purchaseOrderId);
    formDataToSend.append("shipmentStatus", grnData.shipmentStatus);
    formDataToSend.append("Document", grnData.Document);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/GRN/${grnId}`, formDataToSend);
      if (response.status === 200) {
        
        toast.success(`GRN Updated successfully!`);
        
        
      } else {
        toast.error("Failed to submit GRN");
      }
    } catch (error) {
      toast.error("Failed to submit GRN");
      console.error("Error submitting GRN:", error);
    }
  };
  const back = () => {
    // Redirect to EditVGrnDetails page with the grnId as a parameter
    navigate(`/vendor/vendor-grnlist`);
  };

  return (
    <div className="py-10 flex justify-center items-center bg-zinc-50 font-poppins">
      
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
      <div className="flex text-xl font-bold text-gray-500 mb-5 justify-center">
          <h2>Edit Grn Details</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-10">
        
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="grnNo" className="block text-sm font-medium text-gray-700">GRN No.</label>
              <input
                type="text"
                name="grnNo"
                id="grnNo"
                value={grnData.grnNo}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="purchaseOrderId" className="block text-sm font-medium text-gray-700">PO No.</label>
              <select
                name="purchaseOrderId"
                id="purchaseOrderId"
                value={grnData.purchaseOrderId}
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
              <label htmlFor="shipmentStatus" className="block text-sm font-medium text-gray-700">Select Shipment Type</label>
              <select
                name="shipmentStatus"
                id="shipmentStatus"
                value={grnData.shipmentStatus}
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
                className="text-white px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
              >
                Submit
              </button>
              <button
                onClick={back}
                type="back"
                className="text-white px-4 py-2 ml-5 rounded-md bg-gray-500 hover:bg-gray-700 focus:outline-none focus:bg-cyan-700"
              >
                Back
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditVGrnDetails;
