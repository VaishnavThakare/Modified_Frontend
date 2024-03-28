import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const PoDetailsA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [grn, setGrn] = useState([]);

  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/PurchaseOrder/All`
      );
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error.message);
    }
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
    });
    return formattedDateTime;
  };

  const currentItems = purchaseOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (poId) => {
    navigate(`/admin/purchase-orders/${poId}`);
  };

  return (
    <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
      <div className="flex text-2xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">Purchase Orders List</h2>
      </div>
      <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="shadow-xl">
        <div className="border-2 border-cyan-500 rounded-lg shadow-md p-0.5">
          <table className="table-auto w-full rounded-lg bg-white">
            {/* Table Header */}
            <thead>
              <tr className="text-gray-600">
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Sr. No.
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  PO Number.
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Vendor Name
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Date
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Accepted On
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  PO AmountS
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Comments
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  PO Status
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
              <tr className="text-gray-600">
                <td colSpan="9" className="px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-4 py-2 text-center text-sm">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.orderNo}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.vendorName}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {formatDateTime(item.releaseDate)}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.acceptedOn ? formatDateTime(item.acceptedOn) : "-"}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.orderAmount}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.comment}
                    </td>
                    <td className="px-4 py-2">
                      {item.isAccepted === true && (
                        <button
                          className="py-1 px-2 rounded bg-green-200 text-green-700"
                          style={{ minWidth: "6rem" }}
                        >
                          Accepted
                        </button>
                      )}
                      {item.isAccepted === false && (
                        <button
                          className="py-1 px-2 rounded bg-red-200 text-red-600"
                          style={{ minWidth: "6rem" }}
                        >
                          Rejected
                        </button>
                      )}
                      {item.isAccepted === null && (
                        <button
                          className="py-1 px-2 rounded bg-yellow-200 text-yellow-700"
                          style={{ minWidth: "6rem" }}
                        >
                          Pending
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-2 text-center bg-white">
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className={`mr-2`}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className={`text-cyan-600 text-xl`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-2 text-center bg-white">
                    No purchase orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
  );
};
export default PoDetailsA;
