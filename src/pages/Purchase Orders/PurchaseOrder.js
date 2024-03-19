import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoDetailsV = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7254/api/PurchaseOrder/All"
        );
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

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
      const response = await axios.post(
        `https://localhost:7254/api/PurchaseOrder/AcceptReject`,
        {
          id: orderId,
          isAccepted: true,
          comment: comment,
        }
      );
      console.log("Accept Response:", response.data); // Log response for debugging
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
      const response = await axios.post(
        `https://localhost:7254/api/PurchaseOrder/AcceptReject`,
        {
          id: orderId,
          isAccepted: false,
          comment: comment,
        }
      );
      console.log("Reject Response:", response.data); // Log response for debugging
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

  return (
    <div className="relative">
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border rounded border-gray-300">
        <table className="table-auto w-full rounded-md border-2 border-cyan-400 mb-5 ">
          <thead>
            <tr className="bg-gray-300 text-gray-600">
              <th className="px-4 py-2 text-left border">Sr. <p></p> No</th>
              <th className="px-4 py-2 text-left border">Purchase <p></p>Order No.</th>
              <th className="px-4 py-2 text-left border">Vendor <p></p>Name</th>
              <th className="px-4 py-2 text-left border">Release <p></p>On</th>
              <th className="px-4 py-2 text-left border">PO<p></p> Amount</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Comments</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr key={index} className="bg-gray-200">
                <td className="px-4 py-2 border">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-4 py-2 border">{order.orderNo}</td>
                <td className="px-4 py-2 border">{order.vendorId}</td>
                <td className="px-4 py-2 border">{order.releaseDate}</td>
                <td className="px-4 py-2 border">{order.orderAmount}</td>
                <td className="px-4 py-2 border">
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
        <table className="table-auto border-collapse rounded border-blue-500 mb-5">
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-2 border" colSpan="10">
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

      <ToastContainer />
    </div>
  );
};

export default PoDetailsV;
