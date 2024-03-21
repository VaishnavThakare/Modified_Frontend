import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AdminInvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7254/api/Invoice/All" 
        );
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

  

  const indexOfLastItem = (currentPage-1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative">
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border rounded border-gray-300">
        <table className="table-auto w-full rounded-lg border-2 border-cyan-400 border-#FBFBFB mb-5">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left ">Sr.<p></p> No.</th>
              <th className="px-4 py-2 text-left ">Invoice<p></p> No.</th>
              <th className="px-4 py-2 text-left ">GRN<p></p> No.</th>
              <th className="px-4 py-2 text-left ">PO<p></p> No.</th>
              <th className="px-4 py-2 text-left ">Release<p></p> Date</th>
              <th className="px-4 py-2 text-left ">Due<p></p> Date</th>
              <th className="px-4 py-2 text-left ">Amount</th>
              <th className="px-4 py-2 text-left ">Status</th>
              <th className="px-4 py-2 text-left ">Payment<p></p> Status</th>
              <th className="px-4 py-2 text-left ">View/Download<p></p> Documents</th>
              <th className="px-4 py-2 text-left ">Actions</th>
              <th className="px-4 py-2 text-left ">Comment</th>
            </tr>
            <tr className=" text-gray-600">
              <td colSpan="9" className=" px-4 py-1">
                <div style={{ borderTop: "2px solid gray " }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((invoice, index) => (
              <tr key={invoice.id} className="bg-white">
                <td className="px-4 py-2 ">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2 ">{invoice.invoiceNo}</td>
                <td className="px-4 py-2 ">{invoice.grnNo}</td>
                <td className="px-4 py-2 ">{invoice.poNo}</td>
                <td className="px-4 py-2 ">{invoice.releaseDate}</td>
                <td className="px-4 py-2 ">{invoice.dueDate}</td>
                <td className="px-4 py-2 ">{invoice.amount}</td>
                <td className="px-4 py-2 ">
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
                <td className="px-4 py-2">{invoice.paymentStatus}</td>
                <td className="px-4 py-2">
                  <a href={invoice.documents}>View/Download</a>
                </td>
                <td className="px-4 py-2 bg-zinc-50">
                  <Link className={`mr-2`} to ={`invoice/${invoice.id}`}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-purple-600 text-xl`}
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 border">
                 {invoice.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2 ml-2 mr-2">
        <table className="table-auto border-collapse rounded border-cyan-500 mb-5">
          <tbody>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border" colSpan="11">
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