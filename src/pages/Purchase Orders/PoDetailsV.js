import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoDetailsV = () => {
  const [dummyData, setDummyData] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [documentPath, setDocumentPath] = useState("");
  const [documentName, setDocumentName] = useState("");
  const itemsPerPage = 5;
  const sid = sessionStorage.getItem("sid");
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7254/api/PurchaseOrder/Vendor/${sid}`
        );
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleView = (orderId, documentPath, documentName) => {
    setSelectedOrderId(orderId);
    setDocumentPath(documentPath);
    setDocumentName(documentName);
    setShowDetailsModal(true);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage))
    );
  };

  const handleAccept = async (orderId, comment) => {
    try {
      await axios.put(
        `https://localhost:7254/api/PurchaseOrder/AcceptReject/${orderId}`,
        {
          isAccepted: true,
          comment: comment,
        }
      );
      // Assuming the API call was successful, update the UI
      setPurchaseOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, isAccepted: true } : order
        )
      );
      toast.success("Purchase order accepted successfully!");
    } catch (error) {
      console.error("Error accepting purchase order:", error);
      toast.error("Failed to accept purchase order.");
    }
  };

  const handleReject = async (orderId, comment) => {
    try {
      await axios.put(
        `https://localhost:7254/api/PurchaseOrder/AcceptReject/${orderId}`,
        {
          isAccepted: false,
          comment: comment,
        }
      );
      // Assuming the API call was successful, update the UI
      setPurchaseOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, isAccepted: false } : order
        )
      );
      toast.success("Purchase order rejected successfully!");
    } catch (error) {
      console.error("Error rejecting purchase order:", error);
      toast.error("Failed to reject purchase order.");
    }
  };

  const handleCommentChange = (event, orderId) => {
    const { value } = event.target;
    setPurchaseOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, comment: value } : order
      )
    );
  };

  // Function to format the timestamp to a readable date and time
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust options as needed
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border rounded border-gray-300">
        <table className="table-auto w-full rounded-lg border-2 border-cyan-400 border-#FBFBFB">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-4 py-2 text-left border">
                Sr.<p></p> No.
              </th>
              <th className="px-4 py-2 text-left border">
                Purchase <p></p>Order No.
              </th>
              <th className="px-4 py-2 text-left border">
                Vendor<p></p>Name
              </th>
              <th className="px-4 py-2 text-left border">
                Release<p></p> On
              </th>
              <th className="px-4 py-2 text-left border">PO Amount</th>
              {/* <th className="px-4 py-2 text-left border">View PO</th> */}
              <th className="px-4 py-2 text-left border">
                Action<p></p>(Accept/Reject)
              </th>
              <th className="px-4 py-2 text-left border">Comments</th>
            </tr>
            <tr className="bg-gray-200 text-gray-600">
              <td colSpan="8" className="border px-4 py-1">
                <div style={{ borderTop: "1px solid black" }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr key={index} className="bg-gray-200">
                <td className="px-4 py-2 border">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-4 py-2 border">{order.orderNo}</td>
                <td className="px-4 py-2 border">{order.vendorName}</td>
                <td className="px-4 py-2 border">
                  {formatDateTime(order.releaseDate)}
                </td>
                <td className="px-4 py-2 border">{order.orderAmount}</td>
                {/* <td className="px-4 py-2 border">
                  <button
                    onClick={() =>
                      handleView(
                        order.id,
                        order.documentPath,
                        "Purchase Order Document"
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className="w-6 h-6 px-4 py-2 text-purple-600"
                    />
                  </button>
                </td> */}
                <td className="px-4 py-2 border">
                  {order.isAccepted ? (
                    <span className="text-green-500">Already Accepted</span>
                  ) : order.isAccepted === false ? (
                    <span className="text-red-500">Already Rejected</span>
                  ) : (
                    <div className="flex">
                      <button
                        onClick={() => handleAccept(order.id, order.comment)}
                        className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(order.id, order.comment)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <textarea
                    rows="2"
                    cols="25"
                    value={order.comment || ""}
                    onChange={(e) => handleCommentChange(e, order.id)}
                    className="border rounded px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Add comments..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2 ml-2 mr-2">
        <table className="table-auto border-collapse rounded border-blue-500">
          <tbody>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border" colSpan="10">
                <button
                  onClick={handlePrevPage}
                  className="pagination-button"
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
                  className="pagination-button ml-2"
                  disabled={
                    currentPage === Math.ceil(dummyData.length / itemsPerPage)
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

      <ToastContainer />

      {/* Purchase Order Details Modal */}
      {/* {showDetailsModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Purchase Order Details
                    </h3>
                    <div className="mt-2">
                      {selectedOrderId && (
                        <React.Fragment>
                          <table className="min-w-full divide-y divide-gray-200">
                            <tbody>
                              {dummyData
                                .filter((item) => item.id === selectedOrderId)
                                .map((item) => (
                                  <React.Fragment key={item.id}>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        Order No:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {item.orderNo}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        ID:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {item.id}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        Vendor ID:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {item.vendorId}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        Release Date:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {formatDateTime(item.releaseDate)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        Expected Delivery:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {formatDateTime(item.expectedDelivery)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        Order Amount:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {item.orderAmount}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                        Created On:
                                      </td>
                                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {item.createdOn}
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                ))}
                            </tbody>
                          </table>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-700">
                              View Document:
                            </div>
                            <div className="ml-2 flex items-center">
                              <span className="mr-2 text-gray-900">
                                {documentName}
                              </span>
                              <button
                                onClick={() =>
                                  window.open(documentPath, "_blank")
                                }
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default PoDetailsV;
