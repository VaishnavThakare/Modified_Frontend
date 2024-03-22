import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PoDetailsA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7254/api/PurchaseOrder/All");
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error.message);
      toast.error("Failed to fetch purchase orders");
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7254/api/PurchaseOrder/${id}`);
      setSelectedPurchaseOrder(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching purchase order details:", error.message);
      toast.error("Failed to fetch purchase order details");
    }
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
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

  const currentItems = purchaseOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="relative">
      <ToastContainer />
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
                <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2">{item.orderNo}</td>
                <td className="px-4 py-2">{item.vendorName}</td>
                <td className="px-4 py-2">{formatDateTime(item.releaseDate)}</td>
                <td className="px-4 py-2">{item.acceptedOn ? formatDateTime(item.acceptedOn) : "-"}</td>
                <td className="px-4 py-2">{item.orderAmount}</td>
                <td className="px-4 py-2">
                  <button
                    className={`py-1 px-2 rounded ${
                      item.isAccepted ? "bg-green-200 text-green-700" : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.isAccepted ? "Accepted" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2">{item.comment}</td>
                <td className="px-4 py-2 bg-white">
                  <button onClick={() => handleView(item.id)} className={`mr-2`}>
                    <FontAwesomeIcon icon={faEye} className={`text-purple-600 text-xl`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
                  <FontAwesomeIcon icon={faArrowLeft} className="pagination-icon" />
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
                  disabled={currentPage === Math.ceil(purchaseOrders.length / itemsPerPage)}
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="pagination-icon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Purchase Order Details Modal */}
      {showDetailsModal && selectedPurchaseOrder && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
                Purchase Order Details
              </h2>
              <div>
                <p>
                  <strong>Purchase Order No:</strong>{" "}
                  {selectedPurchaseOrder.orderNo}
                </p>
                <p>
                  <strong>Vendor Name:</strong>{" "}
                  {selectedPurchaseOrder.vendorName}
                </p>
                <p>
                  <strong>Release Date:</strong>{" "}
                  {formatDateTime(selectedPurchaseOrder.releaseDate)}
                </p>
                <p>
                  <strong>Accepted On:</strong>{" "}
                  {selectedPurchaseOrder.acceptedOn
                    ? formatDateTime(selectedPurchaseOrder.acceptedOn)
                    : "-"}
                </p>
                <p>
                  <strong>PO Amount:</strong>{" "}
                  {selectedPurchaseOrder.orderAmount}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedPurchaseOrder.isAccepted ? "Accepted" : "Rejected"}
                </p>
                <p>
                  <strong>Comments:</strong>{" "}
                  {selectedPurchaseOrder.comment}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleCloseDetails}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PoDetailsA;
