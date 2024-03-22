import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PoDetailsA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  

  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7254/api/PurchaseOrder/All"
      );
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error.message);
      toast.error("Failed to fetch purchase orders");
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7254/api/PurchaseOrder/${id}`
      );
      setSelectedPurchaseOrder(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching Purchase order:", error);
      toast.error("Error fetching Purchase order");
    }
  };

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPurchaseOrder(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage))
    );
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

  const currentItems = purchaseOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative">
      <ToastContainer />
      {showDetails && selectedPurchaseOrder && (
        <div className=" ml-96 rounded-lg border-2 border-cyan-400 bg-white shadow-lg p-4 max-w-lg w-full mt-2">
          <div className="flex text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">Purchase Order Details:</h2>
          </div>
          <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Purchase Order No.:</span>
                </td>
                <td className="py-2">{selectedPurchaseOrder.orderNo}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Vendor Name.:</span>
                </td>
                <td className="py-2">{selectedPurchaseOrder.vendorName}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Created On:</span>
                </td>
                <td className="py-2">
                  {selectedPurchaseOrder.createdOn
                    ? formatDateTime(selectedPurchaseOrder.createdOn)
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Expected Delivery On:</span>
                </td>
                <td className="py-2">
                  {selectedPurchaseOrder.expectedDelivery
                    ? formatDateTime(selectedPurchaseOrder.expectedDelivery)
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="py-2">
                  <span className="font-bold">Sent On:</span>
                </td>
                <td className="py-2">
                  {selectedPurchaseOrder.releaseDate
                    ? formatDateTime(selectedPurchaseOrder.releaseDate)
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Po Amount:</span>
                </td>
                <td className="py-2">{selectedPurchaseOrder.orderAmount}</td>
              </tr>

              <tr>
                <td className="py-2">
                  <span className="font-bold">Status:</span>
                </td>
                <td className="py-2">
                  {selectedPurchaseOrder.isAccepted ? "Accepted" : "Rejected"}
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Comments:</span>
                </td>
                <td className="py-2">{selectedPurchaseOrder.comment}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCloseDetails}
              className="bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            {selectedPurchaseOrder.documentPath && (
              <button
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openDocument(selectedPurchaseOrder.documentPath)}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                View Document
              </button>
            )}
          </div>
        </div>
      )}

      {!showDetails && (
        <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
          <table className="table-auto w-full rounded-md border-2 border-cyan-400 bg-white">
            {/* Table Header */}
            <thead>
              <tr className="text-gray-600">
                <th className="px-4 py-2 text-left">Sr. No.</th>
                <th className="px-4 py-2 text-left">Purchase Order No.</th>
                <th className="px-4 py-2 text-left">Vendor Name</th>
                <th className="px-4 py-2 text-left">Release On</th>
                <th className="px-4 py-2 text-left">Accepted On</th>
                <th className="px-4 py-2 text-left">PO Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Comments</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
              <tr className="text-gray-600">
                <td colSpan="9" className="px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id} className="bg-white">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2">{item.orderNo}</td>
                  <td className="px-4 py-2">{item.vendorName}</td>
                  <td className="px-4 py-2">
                    {formatDateTime(item.releaseDate)}
                  </td>
                  <td className="px-4 py-2">
                    {item.acceptedOn ? formatDateTime(item.acceptedOn) : "-"}
                  </td>
                  <td className="px-4 py-2">{item.orderAmount}</td>
                  <td className="px-4 py-2">
                    <button
                      className={`py-1 px-2 rounded ${
                        item.isAccepted
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-600"
                      }`}
                      style={{ minWidth: "6rem" }}
                    >
                      {item.isAccepted ? "Accepted" : "Rejected"}
                    </button>
                  </td>
                  <td className="px-4 py-2">{item.comment}</td>
                  <td className="px-4 py-2 bg-white">
                    <button
                      onClick={() => handleView(item.id)}
                      className={`mr-2`}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className={`text-purple-600 text-xl`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-2 ml-2 mr-2">
            <table className="table-auto border-collapse rounded border-cyan-500 mb-5">
              <tbody>
                <tr>
                  <td className="px-4 py-2" colSpan="10">
                    <button
                      onClick={handlePrevPage}
                      className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="pagination-icon"
                      />
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
                      disabled={
                        currentPage ===
                        Math.ceil(purchaseOrders.length / itemsPerPage)
                      }
                    >
                      Next
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="pagination-icon"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
    </div>
  );
};

export default PoDetailsA;
