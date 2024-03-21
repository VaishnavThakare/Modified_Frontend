import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faArrowLeft,
  faArrowRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GrnList = () => {
  const [grnData, setGrnData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedItem, setEditedItem] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [selectedGrnDetails, setSelectedGrnDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://localhost:7254/api/GRN/All")
      .then((response) => {
        setGrnData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching GRN data:", error);
        toast.error("Error fetching GRN data");
      });
  }, []);

  const currentItems = grnData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(grnData.length / itemsPerPage))
    );
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditedComment(item.comment || "");
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7254/api/GRN/${id}`);
      setSelectedGrnDetails(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching GRN details:", error);
      toast.error("Error fetching GRN details");
    }
  };

  const handleAccept = async (id, comment) => {
    try {
      await axios.put(`https://localhost:7254/api/GRN/AcceptReject/${id}`, {
        comment: comment,
        status: "Accept",
      });
      toast.success("GRN item accepted successfully");
      setEditedItem(null);
      setEditedComment("");
    } catch (error) {
      console.error("Error accepting GRN item:", error);
      toast.error("Error accepting GRN item");
    }
  };

  const handleReject = async (id, comment) => {
    try {
      await axios.put(`https://localhost:7254/api/GRN/AcceptReject/${id}`, {
        comment: comment,
        status: "Reject",
      });
      toast.success("GRN item rejected successfully");
      setEditedItem(null);
      setEditedComment("");
    } catch (error) {
      console.error("Error rejecting GRN item:", error);
      toast.error("Error rejecting GRN item");
    }
  };

  const handleCommentChange = (e, id) => {
    setEditedComment(e.target.value);
  };

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  const DetailsView = ({ grnDetails }) => {
    const handleBack = () => {
      setShowDetails(false);
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-medium mb-2">GRN Details</h3>
        <p>
          <span className="font-bold">GRN No.:</span> {grnDetails.grnNo}
        </p>
        <p>
          <span className="font-bold">PO No.:</span>{" "}
          {grnDetails.purchaseOrder.orderNo}
        </p>
        <p>
          <span className="font-bold">Sent On:</span> {grnDetails.sendOn}
        </p>
        <p>
          <span className="font-bold">Created On:</span> {grnDetails.createdOn}
        </p>
        <button
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 " />
          Back
        </button>
        {grnDetails.documentPath && (
          <button
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => openDocument(grnDetails.documentPath)}
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
            View Document
          </button>
        )}
      </div>
    );
  };

  if (showDetails) {
    return <DetailsView grnDetails={selectedGrnDetails} />;
  }

  return (
    <div className="relative">
      <ToastContainer />
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
        <table className="table-auto w-full rounded-md border-2 border-cyan-400 bg-white">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left">SR. NO.</th>
              <th className="px-4 py-2 text-left">GRN No.</th>
              <th className="px-4 py-2 text-left">PO No.</th>
              <th className="px-4 py-2 text-left">SENT ON (date)</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">SHIPMENT STATUS</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
            <tr className=" text-gray-600">
              <td colSpan="9" className=" px-4 py-1">
                <div style={{ borderTop: "2px solid gray" }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr className="bg-white" key={item.id}>
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2">{item.grnNo}</td>
                <td className="px-4 py-2">{item.purchaseOrder.orderNo}</td>
                <td className="px-4 py-2">{item.sendOn}</td>
                <td className="px-4 py-2">
                  <button
                    className={`py-1 px-2 rounded ${
                      item.purchaseOrder.isAccepted
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.purchaseOrder.isAccepted ? "Accepted" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 bg-white">
                  {item.shipmentStatus ? (
                    <span className="text-green-500">Complete Shipment</span>
                  ) : (
                    <span className="text-red-500">Partial Shipment</span>
                  )}
                </td>
                <td className="px-4 py-2 bg-zinc-50">
                  <button onClick={() => handleEdit(item)} className={`mr-2`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={`text-purple-600 text-xl`}
                    />
                  </button>
                  <button
                    onClick={() => handleView(item.id)}
                    className={`mr-2`}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-purple-600 text-xl`}
                    />
                  </button>
                  {editedItem && editedItem.id === item.id && (
                    <>
                      <button
                        onClick={() => handleAccept(item.id, editedComment)}
                        className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(item.id, editedComment)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                      <textarea
                        rows="2"
                        cols="25"
                        value={editedComment}
                        onChange={(e) => handleCommentChange(e, item.id)}
                        className="border rounded px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Add comments..."
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2 ml-2 mr-2">
        <table className="table-auto border-collapse rounded border-blue-500 mb-5">
          <tbody>
            <tr className="bg-zinc-50">
              <td className="px-4 py-2" colSpan="10">
                <button
                  onClick={handlePrevPage}
                  className="pagination-button  bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
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
                  className="pagination-button ml-2  bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
                  disabled={
                    currentPage === Math.ceil(grnData.length / itemsPerPage)
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

export default GrnList;
