import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PoGrnView = () => {
  const { grnId } = useParams();
  const navigate = useNavigate();
  const [grnDetails, setGrnDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrnDetails(grnId);
  }, [grnId]);

  const fetchGrnDetails = async (grnId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GRN/${grnId}`
      );
      setGrnDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GRN details:", error);
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    const formattedDateTime = new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDateTime;
  };

  if (loading) {
    return <div>Loading GRN details...</div>;
  }

  if (!grnDetails) {
    return <div>GRN details not found.</div>;
  }

  const handleCloseDetails = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex text-2xl font-bold text-gray-500 ">
            <h2 className="text-left text-cyan-500">GRN Details</h2>
          </div>
          <div className="w-52 bg-cyan-400 h-0.5 mb-1"></div>
          <div className="w-96 bg-cyan-400 h-0.5 mb-5"></div>
        </div>
        <div>
          <div className="flex justify-center">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseDetails}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="relative">
            <p className="text-gray-900">
              <span className="font-bold">GRN No.:</span> {grnDetails.grnNo}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">PO Amount:</span>{" "}
              {grnDetails.purchaseOrder.orderAmount}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Send On:</span>{" "}
              {formatDateTime(grnDetails.sendOn)}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Comment:</span> {grnDetails.comment}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Shipment Status:</span>{" "}
              {grnDetails.shipmentStatus ? "Shipped" : "Not Shipped"}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Invoice Status:</span>{" "}
              {grnDetails.invoiceStatus ? "Invoiced" : "Not Invoiced"}
            </p>
            <div className="mt-4">
              <a
                href={grnDetails.documentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View GRN Document
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoGrnView;
