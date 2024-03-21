import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ViewInvoiceVendor() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Invoice/All`);
        // Map the response data to extract the fields you want to display
        const formattedInvoices = response.data.map(invoice => ({
          id: invoice.id,
          invoiceNo: invoice.invoiceNo,
          dateSentOn: invoice.sendOn,
          amount: invoice.amount,
          grnNumber: invoice.grnId,
          poNumber: invoice.grn.purchaseOrder.orderNo,
          s: invoice.isAccepted ? "Approved" : "Rejected", // Assuming isAccepted indicates approval status
          paymentStatus: invoice.paymentStatus ? "Paid" : "Unpaid",
          dueDate: invoice.dueDate,
          documentPath: invoice.documentPath,
          comment: invoice.comment
        }));
        setInvoices(formattedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdateInvoice = (invoiceId) => {
    navigate(`/vendor/update-invoice/${invoiceId}`); // Navigate to the "update-invoice" route with the invoice ID
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
          <h2>All Invoices</h2>
        </div>
        <table className="min-w-full border-2 border-cyan-600 mb-5 bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Invoice No</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Date Sent On</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Amount</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">GRN Number</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">PO Number</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">S (Approved/Rejected)</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Payment Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Due Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">View/Download Documents</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Comment</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.invoiceNo}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.dateSentOn}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.amount}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.grnNumber}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.poNumber}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.s}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.paymentStatus}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.dueDate}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <a href={invoice.documentPath}>View/Download</a>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{invoice.comment}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUpdateInvoice(invoice.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-4  py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

