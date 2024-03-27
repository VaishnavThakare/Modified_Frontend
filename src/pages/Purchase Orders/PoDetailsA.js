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
  const [showDetails, setShowDetails] = useState(false);
  const [grn, setGrn] = useState([]);
  const [selectedGrn, setSelectedGrn] = useState(null);
  const [showGrnDetails, setShowGrnDetails] = useState(false);

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
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7254/api/PurchaseOrder/${id}`
      );
      setSelectedPurchaseOrder(response.data);
      setShowDetails(true);
      fetchGrns(id);
    } catch (error) {
      console.error("Error fetching Purchase order:", error);
    }
  };

  const fetchGrns = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7254/api/GRN/PurchaseOrder/${id}`
      );
      setGrn(response.data);
    } catch (error) {
      console.error("Error fetching GRNs:", error.message);
    }
  };

  const handleViewGrn = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7254/api/GRN/${id}`);
      setSelectedGrn(response.data);
      setShowGrnDetails(true);
    } catch (error) {
      console.error("Error fetching GRN:", error);
    }
  };

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPurchaseOrder(null);
    setGrn([]);
  };

  const handleCloseGrnDetails = () => {
    setShowGrnDetails(false);
    setSelectedGrn(null);
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

  const currentGrns = grn.slice(0, itemsPerPage);

  return (
    <div className="relative">
      <ToastContainer />
      {showDetails && selectedPurchaseOrder && (
        <>
          <div>
            <div className="flex justify-between">
              <div>
                <div className="flex text-2xl font-bold text-gray-500 ">
                  <h2 className="text-left text-cyan-500">
                    Purchase Order Details
                  </h2>
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
                    <span className="font-bold">Purchase Order No.:</span>:{" "}
                    {selectedPurchaseOrder.orderNo}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Vendor Name.:</span>:{" "}
                    {selectedPurchaseOrder.vendorName}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Created On: </span>:{" "}
                    {formatDateTime(selectedPurchaseOrder.createdOn)}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Expected Delivery On:</span>:{" "}
                    {formatDateTime(selectedPurchaseOrder.expectedDelivery)}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Sent On:</span>:{" "}
                    {formatDateTime(selectedPurchaseOrder.releaseDate)}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Po Amount:</span>:{" "}
                    {selectedPurchaseOrder.orderAmount}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Comments:</span>:{" "}
                    {selectedPurchaseOrder.comment}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    {selectedPurchaseOrder.documentPath && (
                      <button
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          openDocument(selectedPurchaseOrder.documentPath)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="mr-2"
                        />
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
                    <th className="px-4 py-2 text-center">GRN NO.</th>
                    <th className="px-4 py-2 text-center">PO Amount</th>
                    <th className="px-4 py-2 text-center">Send On</th>
                    <th className="px-4 py-2 text-center">Comments</th>
                    <th className="px-4 py-2 text-center">Acceptance</th>
                    <th className="px-4 py-2 text-center">Payment Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                  <tr className="text-gray-600">
                    <td colSpan="7" className="px-4 py-1">
                      <div style={{ borderTop: "2px solid gray" }}></div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {grn.map((grnItem) => (
                    <tr key={grnItem.id} className="bg-white">
                      <td className="px-4 py-2 text-center text-sm">
                        {grnItem.grnNo}
                      </td>
                      <td className="px-4 py-2 text-center text-sm">
                        {grnItem.purchaseOrder.orderAmount}
                      </td>
                      <td className="px-4 py-2 text-center text-sm">
                        {formatDateTime(grnItem.sendOn)}
                      </td>
                      <td className="px-4 py-2 text-center text-sm">
                        {grnItem.comment}
                      </td>
                      <td className="px-4 py-2 text-center text-sm">
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
                      <td className="px-4 py-2 text-center text-sm">
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
                      <td className="px-4 py-2 text-center text-sm">
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
          </div>
        </>
      )}

      {!showDetails && (
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
                    <th className="px-4 py-2 text-center">Sr. No.</th>
                    <th className="px-4 py-2 text-center">
                      Purchase Order No.
                    </th>
                    <th className="px-4 py-2 text-center">Vendor Name</th>
                    <th className="px-4 py-2 text-center">Release On</th>
                    <th className="px-4 py-2 text-center">Accepted On</th>
                    <th className="px-4 py-2 text-center">PO Amount</th>
                    <th className="px-4 py-2 text-center">Comments</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
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
                          {item.acceptedOn
                            ? formatDateTime(item.acceptedOn)
                            : "-"}
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
                            onClick={() => handleView(item.id)}
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
                      <td
                        colSpan="9"
                        className="px-4 py-2 text-center bg-white"
                      >
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
      )}

      {/* GRN Details */}
      {showGrnDetails && selectedGrn && (
        <>
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
                    onClick={handleCloseGrnDetails}
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
                    <span className="font-bold">GRN No.:</span>:{" "}
                    {selectedGrn.grnNo}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">PO Amount:</span>:{" "}
                    {selectedGrn.purchaseOrder.orderAmount}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Send On: </span>:{" "}
                    {formatDateTime(selectedGrn.sendOn)}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Comments:</span>:{" "}
                    {selectedGrn.comment}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Is Accepted:</span>:{" "}
                    {selectedGrn.isAccepted ? "Yes" : "No"}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    <span className="font-bold">Payment Status:</span>:{" "}
                    {selectedGrn.paymentStatus ? "Paid" : "Unpaid"}
                  </p>
                  <p></p>
                  <p className="text-gray-900">
                    {selectedGrn.documentPath && (
                      <button
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openDocument(selectedGrn.documentPath)}
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="mr-2"
                        />
                        View Document
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PoDetailsA;
