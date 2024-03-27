import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Poactions = () => {
  const [comment, setComment] = useState("");
  const { orderId } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState(null);

  const fetchPurchaseOrder = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7254/api/PurchaseOrder/${orderId}`
      );
      setPurchaseOrder(response.data);
    } catch (error) {
      console.error("Error fetching purchase order:", error);
      toast.error("Failed to fetch purchase order details.");
    }
  };

  useEffect(() => {
    fetchPurchaseOrder();
  }, [orderId]);

  const handleAccept = async () => {
    try {
      await axios.put(
        `https://localhost:7254/api/PurchaseOrder/AcceptReject/${orderId}`,
        {
          isAccepted: true,
          comment: comment,
        }
      );
      setPurchaseOrder((prevOrder) => ({
        ...prevOrder,
        isAccepted: true,
      }));
      toast.success("Purchase order accepted successfully!");
    } catch (error) {
      console.error("Error accepting purchase order:", error);
      toast.error("Failed to accept purchase order.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `https://localhost:7254/api/PurchaseOrder/AcceptReject/${orderId}`,
        {
          isAccepted: false,
          comment: comment,
        }
      );
      setPurchaseOrder((prevOrder) => ({
        ...prevOrder,
        isAccepted: false,
      }));
      toast.success("Purchase order rejected successfully!");
    } catch (error) {
      console.error("Error rejecting purchase order:", error);
      toast.error("Failed to reject purchase order.");
    }
  };

  if (!purchaseOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
      <div className="max-w-sm mx-auto mt-8 appform bg-white">
        <div className="flex text-2xl font-bold text-gray-600 mb-5">
          <h2>Edit Purchase Order:</h2>
        </div>
        <h1>Accept or Reject Purchase Order:</h1>

        <div className="mb-6 relative">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-6 mt-4">
          <button
            onClick={handleAccept}
            className="px-4 py-2 mr-2 bg-cyan-500 text-white rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
        {purchaseOrder.isAccepted !== null && (
          <>
            {purchaseOrder.comment && (
              <div className="mb-4">
                <strong>Comment:</strong> {purchaseOrder.comment}
              </div>
            )}
            {purchaseOrder.isAccepted ? (
              <div className="text-green-600 font-bold mb-4">
                Purchase order Accepted
              </div>
            ) : (
              <div className="text-red-600 font-bold mb-4">
                Purchase order Rejected
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Poactions;
