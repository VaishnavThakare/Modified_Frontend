import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GrnList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      grnNo: "GRN001",
      poNo: "PO001",
      sentOn: "2024-03-18",
      status: "Pending",
      isAccepted: false,
      purchaseOrderHistories: [
        {
          comment: "First comment",
        },
      ],
    },
    {
      id: 2,
      grnNo: "GRN002",
      poNo: "PO002",
      sentOn: "2024-03-19",
      status: "Accepted",
      isAccepted: true,
      purchaseOrderHistories: [
        {
          comment: "Second comment",
        },
      ],
    },
    {
      id: 3,
      grnNo: "GRN003",
      poNo: "PO003",
      sentOn: "2024-03-20",
      status: "Pending",
      isAccepted: false,
      purchaseOrderHistories: [
        {
          comment: "Third comment",
        },
      ],
    },
    {
      id: 4,
      grnNo: "GRN004",
      poNo: "PO004",
      sentOn: "2024-03-21",
      status: "Accepted",
      isAccepted: true,
      purchaseOrderHistories: [
        {
          comment: "Fourth comment",
        },
      ],
    },
    {
      id: 5,
      grnNo: "GRN005",
      poNo: "PO005",
      sentOn: "2024-03-22",
      status: "Pending",
      isAccepted: false,
      purchaseOrderHistories: [
        {
          comment: "Fifth comment",
        },
      ],
    },
    {
      id: 6,
      grnNo: "GRN006",
      poNo: "PO006",
      sentOn: "2024-03-23",
      status: "Accepted",
      isAccepted: true,
      purchaseOrderHistories: [
        {
          comment: "Sixth comment",
        },
      ],
    },
    {
      id: 7,
      grnNo: "GRN007",
      poNo: "PO007",
      sentOn: "2024-03-24",
      status: "Pending",
      isAccepted: false,
      purchaseOrderHistories: [
        {
          comment: "Seventh comment",
        },
      ],
    },
    {
      id: 8,
      grnNo: "GRN008",
      poNo: "PO008",
      sentOn: "2024-03-25",
      status: "Accepted",
      isAccepted: true,
      purchaseOrderHistories: [
        {
          comment: "Eighth comment",
        },
      ],
    },
  ]);
  const itemsPerPage = 5;

  const [editedItem, setEditedItem] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const currentItems = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(dummyData.length / itemsPerPage))
    );
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditedComment(item.comment || "");
  };
  const handleView = (id) => {
    // Handle view logic
    console.log("View item with ID:", id);
    // You can implement the view logic here, e.g., show a modal with item details
  };
  const handleAccept = (id, comment) => {
    console.log("Accept item with ID:", id, "and comment:", comment);
    setEditedItem(null);
    setEditedComment("");
  };

  const handleReject = (id, comment) => {
    console.log("Reject item with ID:", id, "and comment:", comment);
    setEditedItem(null);
    setEditedComment("");
  };

  const handleCommentChange = (e, id) => {
    setEditedComment(e.target.value);
  };

  return (
    <div className="relative">
      <ToastContainer />
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
        <h1 className="text-2xl font-bold mb-5 relative">
          GRN Listing:
          <div className="absolute bottom-0 left-0 right-0">
            <div className="border-b border-cyan-400 w-32"></div>
            <div className="border-b-2 border-cyan-400 mt-1"></div>
          </div>
        </h1>

        <table className="table-auto w-full rounded-md border-2 border-cyan-400 bg-white">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left">Sr. No.</th>
              <th className="px-4 py-2 text-left">GRN No.</th>
              <th className="px-4 py-2 text-left">PO No.</th>
              <th className="px-4 py-2 text-left">Sent On (date)</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
              <th className="px-4 py-2 text-left">Select Shipment Comment</th>
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
                <td className="px-4 py-2">{item.poNo}</td>
                <td className="px-4 py-2">{item.sentOn}</td>
                <td className="px-4 py-2">{item.status}</td>
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
                  {editedItem && editedItem.id === item.id ? (
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
                  ) : null}
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
    </div>
  );
};

export default GrnList;
