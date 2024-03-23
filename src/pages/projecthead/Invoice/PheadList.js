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

const PheadList = () => {
  const [invoice, setInvoice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedItem, setEditedItem] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const getInvoices = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Invoice/All`)
      .then((response) => {
        setInvoice(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Invoice data:", error);
        toast.error("Error fetching Invoice data");
      });
  };

  useEffect(() => {
    getInvoices();
  }, []);

  const currentItems = invoice.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(invoice.length / itemsPerPage))
    );
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditedComment(item.comment || "");
  };

  const handleView = (id) => {
    // console.log(id);
    navigate(`/projecthead/invoice-details-phead/${id}`);
  };

  const handleAccept = async (id, comment) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/Invoice/AcceptReject/${id}`,
        {
          comment: comment,
          isAccepted: true,
        }
      );
      toast.success("Invoice item accepted successfully");
      setEditedItem(null);
      setEditedComment("");
      getInvoices();
    } catch (error) {
      console.error("Error accepting Invoice item:", error);
      toast.error("Error accepting Invoice item");
    }
  };

  const handleReject = async (id, comment) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/Invoice/AcceptReject/${id}`,
        {
          comment: comment,
          isAccepted: false,
        }
      );
      toast.success("Invoice item rejected successfully");
      setEditedItem(null);
      setEditedComment("");
      getInvoices();
    } catch (error) {
      console.error("Error rejecting Invoice item:", error);
      toast.error("Error rejecting Invoice item");
    }
  };

  const handleCommentChange = (e, id) => {
    setEditedComment(e.target.value);
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

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="relative">
      <ToastContainer />
      <div className="flex text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">INVOICES  LIST</h2>
          </div>
          <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
      <div className="shadow-xl">
          <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
        <table className="table-auto w-full rounded-lg  bg-white">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left">SR. NO.</th>
              <th className="px-4 py-2 text-left">Invoice No.</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">SENT ON (date)</th>
              <th className="px-4 py-2 text-left">PAYMENT STATUS</th>
              <th className="px-4 py-2 text-left">Accept/Reject</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
            <tr className="text-gray-600">
              <td colSpan="9" className="px-4 py-1">
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
                <td className="px-4 py-2">{item.invoiceNo}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{formatDateTime(item.sendOn)}</td>
                <td className="px-4 py-2">
                  <button
                    className={`py-1 px-2 rounded ${
                      item.paymentStatus
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.paymentStatus ? "Paid" : "Unpaid"}
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`py-1 px-2 rounded ${
                      item.isAccepted != null
                        ? item.isAccepted
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-600"
                        : "bg-yellow-200 text-yellow-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.isAccepted != null
                      ? item.isAccepted
                        ? "Already Accepted"
                        : "Already Rejected"
                      : "Not Accepted/Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 bg-white">
                  {item.isAccepted == null ? (
                    <button onClick={() => handleEdit(item)} className={`mr-2`}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={`text-cyan-600 text-xl`}
                      />
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={() => handleView(item.id)}
                    className={`mr-2`}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-cyan-600 text-xl`}
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
        </div>
      </div>

      <div className="flex justify-end mt-2 ml-2 mr-2">
        <table className="table-auto border-collapse rounded border-blue-500 mb-5">
          <tbody>
            <tr className="bg-gray-50">
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
                  className="pagination-button ml-2 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
                  disabled={
                    currentPage === Math.ceil(invoice.length / itemsPerPage)
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

export default PheadList;
