import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const itemsPerPage = 5;
  const navigate = useNavigate();

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

  return (
    <div className="relative">
      <ToastContainer />
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
        {/* <h1 className="text-2xl font-bold mb-5 relative">
          GRN Listing:
          <div className="absolute bottom-0 left-0 right-0">
            <div className="border-b border-cyan-400 w-32"></div>
            <div className="border-b-2 border-cyan-400 mt-1"></div>
          </div>
        </h1> */}

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
      {/* Modal/Pop-up to display GRN Details */}
      {selectedGrnDetails && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
                      GRN Details
                    </h3>
                    <div className="mt-2">
                      <p>
                        <span className="font-bold">GRN No.:</span>{" "}
                        {selectedGrnDetails.grnNo}
                      </p>
                      <p>
                        <span className="font-bold">PO No.:</span>{" "}
                        {selectedGrnDetails.purchaseOrderId}
                      </p>
                      <p>
                        <span className="font-bold">Sent On:</span>{" "}
                        {selectedGrnDetails.sendOn}
                      </p>
                      <p>
                        <span className="font-bold">Created On:</span>{" "}
                        {selectedGrnDetails.createdOn}
                      </p>
                      {selectedGrnDetails.documentPath && (
                        <button
                          className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            openDocument(selectedGrnDetails.documentPath)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="mr-2"
                          />
                          View Document
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedGrnDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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