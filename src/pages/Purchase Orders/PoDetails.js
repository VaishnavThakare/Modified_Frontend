import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faEye } from "@fortawesome/free-solid-svg-icons";

const PoDetails = () => {
  const { poId } = useParams();
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [grn, setGrn] = useState([]);
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPurchaseOrder(poId);
  }, [poId]);

  const fetchPurchaseOrder = async (poId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/PurchaseOrder/${poId}`
      );
      setSelectedPurchaseOrder(response.data);
      fetchGrns(response.data.id);
    } catch (error) {
      console.error("Error fetching Purchase order:", error);
    }
  };

  const fetchGrns = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GRN/PurchaseOrder/${orderId}`
      );
      setGrn(response.data);
    } catch (error) {
      console.error("Error fetching GRNs:", error.message);
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

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  const handleViewGrn = (grnId) => {
    navigate(`/admin/purchase-order-Grn/${grnId}`);
  };

  const handleCloseDetails = () => {
    navigate("/admin/purchase-order-list");
  };

  // Pagination Functions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrns = grn.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(grn.length / itemsPerPage))
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex text-2xl font-bold text-gray-500 ">
            <h2 className="text-left text-cyan-500">Purchase Order Details</h2>
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
        <div
          className="bg-white p-6 rounded-md shadow-md"
          style={{ height: "fit-content" }}
        >
          <div className="relative">
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Purchase Order No.:
              </span>
              : {selectedPurchaseOrder?.orderNo}
            </p>
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Vendor Name.:
              </span>
              : {selectedPurchaseOrder?.vendorName}
            </p>
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Created On:{" "}
              </span>
              : {formatDateTime(selectedPurchaseOrder?.createdOn)}
            </p>
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Expected Delivery On:
              </span>
              : {formatDateTime(selectedPurchaseOrder?.expectedDelivery)}
            </p>
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Sent On:
              </span>
              : {formatDateTime(selectedPurchaseOrder?.releaseDate)}
            </p>
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Po Amount:
              </span>
              : {selectedPurchaseOrder?.orderAmount}
            </p>
            <p className="text-gray-900">
              <span className="text-sm text-transform: uppercase font-semibold">
                Comments:
              </span>
              : {selectedPurchaseOrder?.comment}
            </p>
            <p className="text-gray-900">
              {selectedPurchaseOrder?.documentPath && (
                <button
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    openDocument(selectedPurchaseOrder?.documentPath)
                  }
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                  View Document
                </button>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex text-2xl font-bold text-gray-500 mt-14">
        <h2 className="text-left text-cyan-500 ">GRN List</h2>
      </div>
      <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
      <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded-lg shadow-lg">
        <table className="table-auto w-full rounded-lg bg-white ">
          <thead>
            <tr className="text-gray-600">
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                GRN NO.
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                PO Amount
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                Send On
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                Comments
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                Acceptance
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                Payment Status
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                Actions
              </th>
            </tr>
            <tr className="text-gray-600">
              <td colSpan="7" className="px-4 py-1">
                <div style={{ borderTop: "2px solid gray" }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentGrns.map((grnItem) => (
              <tr key={grnItem.id} className="bg-white">
                <td className="px-4 py-2 text-center">{grnItem.grnNo}</td>
                <td className="px-4 py-2 text-center">
                  {grnItem.purchaseOrder?.orderAmount}
                </td>
                <td className="px-4 py-2 text-center">
                  {formatDateTime(grnItem.sendOn)}
                </td>
                <td className="px-4 py-2 text-center">{grnItem.comment}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className={`py-1 px-2 rounded ${
                      grnItem.isAccepted
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {grnItem.isAccepted ? "Approved" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className={`py-1 px-2 rounded ${
                      grnItem.paymentStatus
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {grnItem.paymentStatus ? "Approved" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewGrn(grnItem.id)}
                    className={`mr-2`}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-cyan-600 text-xl`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-end mt-2 ml-2 mr-2">
        <button
          onClick={handlePrevPage}
          className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
          disabled={currentPage === Math.ceil(grn.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PoDetails;
