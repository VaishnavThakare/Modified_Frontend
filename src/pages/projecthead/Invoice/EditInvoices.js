import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const EditInvoices = () => {
  const { invoiceId } = useParams();
  const [comment, setComment] = useState("");
  const [isAccepted, setIsAccepted] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Invoice/${invoiceId}`
        );
        const invoiceData = response.data;
        setIsAccepted(invoiceData.isAccepted);
        setComment(invoiceData.comment || "");
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching Invoice details:", error);
        toast.error("Failed to fetch Invoice details.");
        setLoading(false); // Set loading to false on error
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  const handleAccept = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/Invoice/AcceptReject/${invoiceId}`,
        {
          comment: comment,
          isAccepted: true,
        }
      );
      setIsAccepted(true);
      toast.success("Invoice item accepted successfully");
    } catch (error) {
      console.error("Error accepting Invoice item:", error);
      toast.error("Error accepting Invoice item");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/Invoice/AcceptReject/${invoiceId}`,
        {
          comment: comment,
          isAccepted: false,
        }
      );
      setIsAccepted(false);
      toast.success("Invoice item rejected successfully");
    } catch (error) {
      console.error("Error rejecting Invoice item:", error);
      toast.error("Error rejecting Invoice item");
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
      <div className="max-w-sm mx-auto mt-8 appform bg-white">
        <div className="flex text-2xl font-bold text-gray-600 mb-5">
          <h2>Edit Invoice Details</h2>
        </div>
        <h1>Accept or Reject Invoice's:</h1>
        <div className="mb-6">
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
              onChange={handleCommentChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            onClick={handleAccept}
            className="px-4 py-2 mr-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reject
          </button>

          {isAccepted !== null && ( // Adjusted the condition to render even when isAccepted is null
            <>
              {comment && (
                <div className="mb-4">
                  <strong>Comment:</strong> {comment}
                </div>
              )}
              {isAccepted ? (
                <div className="text-green-600 font-bold mb-4">
                  Invoice Accepted
                </div>
              ) : (
                <div className="text-red-600 font-bold mb-4">
                  Invoice Rejected
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInvoices;
