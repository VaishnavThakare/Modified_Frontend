import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const InvoiceDetails = () => {
  const { invoiceNo } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Invoice/${invoiceNo}`
        );
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [invoiceNo]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 mt-4 text-2xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">Invoice Details</h2>
        <button
          className="items-right mr-1 bg-cyan-500 text-white text-sm px-4 py-[1px] rounded block mx-auto h-8"
          onClick={() => {
            window.history.back();
          }}
        >
          Close
        </button>
      </div>
      <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-80 bg-cyan-500 h-0.5 "></div>
      <div className="bg-white mt-3 border-2 border-cyan-500 p-4 w-[70%] rounded-lg shadow-lg">
        <table className="w-[100%] bg-white">
          <tbody>
            <tr>
              <th className="text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                Invoice No
              </th>
              <td className="text-left px-6 py-4 whitespace-no-wrap text-sm">
                {invoice.invoiceNo}
              </td>
              <th className="text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                Date Sent On
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {new Date(invoice.dateSentOn).toLocaleDateString("es-CL")}
              </td>
            </tr>
            <tr>
              <th className="text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                Amount
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {invoice.amount}
              </td>
              <th className="text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                GRN Number
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {invoice.grn.grnNo}
              </td>
            </tr>
            <tr>
              <th className="text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                PO Number
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {invoice.grn.purchaseOrder.orderNo}
              </td>
              <th className="text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                Status
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {invoice.s == "Rejected" ? (
                  <span className="bg-red-300 py-1 px-3 rounded text-red-700">
                    Rejected
                  </span>
                ) : (
                  <span className="bg-green-400 py-1 px-3 rounded text-green-700">
                    Approved
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th className="text-left px-6 py-3   leading-4 text-gray-600 tracking-wider">
                Payment Status
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {invoice.paymentStatus == "Unpaid" ? (
                  <span className="bg-yellow-300 py-1 px-3 rounded text-yellow-700">
                    UnPaid
                  </span>
                ) : (
                  <span className="bg-green-400 py-1 px-3 rounded text-green-700">
                    PAID
                  </span>
                )}
              </td>
              <th className="text-left px-6 py-3   leading-4 text-gray-600 tracking-wider">
                Due Date
              </th>
              <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                {new Date(invoice.dueDate).toLocaleDateString("es-CL")}
              </td>
            </tr>
            <tr>
              <th className="px-6 py-3 text-left leading-4 text-gray-600 tracking-wider">
                View
              </th>
              <td className="px-6 py-2 text-left  whitespace-no-wrap text-sm">
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
              <th className="px-6 py-3 text-left leading-4 text-gray-600 tracking-wider">
                Comment
              </th>
              <td className="px-6 py-2 text-left  whitespace-no-wrap text-sm">
                {invoice.comment}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoiceDetails;