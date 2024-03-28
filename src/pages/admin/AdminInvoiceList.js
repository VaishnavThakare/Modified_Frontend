import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileDownload,
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const formatDateTime = (dateTime) => {
  const formattedDateTime = new Date(dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDateTime;
};
const AdminInvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Invoice/All`
        );
        console.log(response.data);
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        toast.error("Failed to fetch invoices");
      }
    };

    fetchData();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(invoices.length / itemsPerPage))
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative">
      <div className="flex text-xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">INVOICE LIST</h2>
      </div>
      <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="border-2 border-cyan-400 rounded-lg shadow-lg overflow-x-auto">
        <div className="  rounded-lg shadow-lg p-0.5 ">
          <table className="table-auto w-full rounded-lg">
            <thead>
              <tr className="text-gray-600 bg-white">
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Sr.<p></p> No
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Invoice<p></p> Number
                </th>

                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Release<p></p> Date
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  GRN<p></p> No
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  PO<p></p> No
                </th>
                {/* <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Due<p></p> Date
                </th> */}
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Amount
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Comment
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  View/Download Documents
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Payment Status
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Status
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
              <tr className=" text-gray-600 bg-white">
                <td colSpan="12" className="px-4 py-1">
                  <div style={{ borderTop: "2px solid gray " }}></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((invoice, index) => (
                  <tr key={invoice.id} className="bg-white">
                    <td className="px-4 py-2 text-center text-sm">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {invoice.invoiceNo}
                    </td>

                    <td className="px-4 py-2 text-center text-sm">
                      {formatDateTime(invoice.createdOn)}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {invoice.grn.grnNo}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {invoice.grn.purchaseOrder.orderNo}
                    </td>
                    {/* <td className="px-4 py-2 text-center text-sm">
                      {formatDateTime(invoice.dueDate)}
                    </td> */}
                    <td className="px-4 py-2 text-center text-sm">
                      {invoice.amount}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {invoice.comment}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-no-wrap">
                      <a
                        href={invoice.documentPath}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          className="text-cyan-600 text-xl"
                        />
                      </a>
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      <button
                        className={`py-1 px-2 rounded ${
                          invoice.paymentStatus
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-600"
                        }`}
                        style={{ minWidth: "6rem" }}
                      >
                        {invoice.paymentStatus ? "Paid" : "Unpaid"}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      <button
                        className={`py-1 px-2 rounded ${
                          invoice.isAccepted
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-600"
                        }`}
                        style={{ minWidth: "6rem" }}
                      >
                        {invoice.isAccepted ? "Accepted" : "Rejected"}
                      </button>
                    </td>
                    <td className="px-4 py-2 bg-white text-center">
                      <Link
                        className={`mr-2`}
                        to={`/admin/details/${invoice.id}`}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className={`text-cyan-600 text-xl`}
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-4 py-2 text-center bg-white">
                    No Invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-2 ml-2 mr-2">
        <table className="table-auto border-collapse rounded border-cyan-500 mb-5">
          <tbody>
            <tr className="bg-zinc-50">
              <td className="px-4 py-2 " colSpan="11">
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
                    currentPage === Math.ceil(invoices.length / itemsPerPage)
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

export default AdminInvoiceList;
