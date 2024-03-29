import React, { useState, useEffect } from "react";
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

  const handleEdit = (invoiceId) => {
    navigate(`/projecthead/invoice-list/${invoiceId}`);
  };

  const handleView = (id) => {
    navigate(`/projecthead/invoice-details-phead/${id}`);
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

  return (
    <div className="relative">
      <ToastContainer />
      <div className="flex text-xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">INVOICES LIST</h2>
      </div>
      <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
        <div className="shadow-xl">
          <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
            <table className="table-auto w-full rounded-lg  bg-white">
              <thead>
                <tr className="text-gray-600">
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    SR. NO.
                  </th>
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    Invoice No.
                  </th>
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    Amount
                  </th>
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    SENT ON (date)
                  </th>
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    PAYMENT STATUS
                  </th>
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    Accept/Reject
                  </th>
                  <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                    ACTIONS
                  </th>
                </tr>
                <tr className="text-gray-600">
                  <td colSpan="9" className="px-4 py-1">
                    <div style={{ borderTop: "2px solid gray" }}></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-2 whitespace-no-wrap text-center text-sm"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr className="bg-white" key={item.id}>
                      <td className="px-4 py-2">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2">{item.invoiceNo}</td>
                      <td className="px-4 py-2">{item.amount}</td>
                      <td className="px-4 py-2">
                        {formatDateTime(item.sendOn)}
                      </td>
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
                      <td className="px-4 py-2 bg-white">
                        {item.isAccepted == false || item.isAccepted == null ? (
                          <button
                            onClick={() => handleEdit(item.id)}
                            className={`mr-2`}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className={`text-cyan-600 text-xl`}
                            />
                          </button>
                        ) : null}
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
                )}
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
