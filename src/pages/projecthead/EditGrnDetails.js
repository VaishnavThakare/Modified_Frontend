import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditGrnDetails = ({ id }) => {
  const [comment, setComment] = useState("");

  const handleAccept = async () => {
    try {
      await axios.put(`https://localhost:7254/api/GRN/AcceptReject/${id}`, {
        comment: comment,
        status: "Accept",
      });
      toast.success("GRN item accepted successfully");
      setComment("");
    } catch (error) {
      console.error("Error accepting GRN item:", error);
      toast.error("Error accepting GRN item");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`https://localhost:7254/api/GRN/AcceptReject/${id}`, {
        comment: comment,
        status: "Reject",
      });
      toast.success("GRN item rejected successfully");
      setComment("");
    } catch (error) {
      console.error("Error rejecting GRN item:", error);
      toast.error("Error rejecting GRN item");
    }
  };

  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
      <div className="max-w-sm mx-auto mt-8 appform">
        <div className="flex text-2xl font-bold text-gray-600 mb-5">
          <h2>Edit GRN Details</h2>
        </div>
        <p></p>
        <div className="flex text-2xl font-bold text-gray-500 mb-5">
          <h2>Edit for GRN No:</h2>
        </div>
        <div className="mb-6">
          <button
            onClick={handleAccept}
            className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default EditGrnDetails;
