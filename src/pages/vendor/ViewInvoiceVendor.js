import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileDownload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function ViewInvoiceVendor() {
  const [invoices, setInvoices] = useState([]);
  const [isView, setIsView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoice, setInvoice] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Invoice/All`
        );
        // Map the response data to extract the fields you want to display
        const formattedInvoices = response.data.map((invoice) => ({
          id: invoice.id,
          invoiceNo: invoice.invoiceNo,
          dateSentOn: invoice.sendOn,
          amount: invoice.amount,
          grnNumber: invoice.grn.grnNo,
          poNumber: invoice.grn.purchaseOrder.orderNo,
          s: invoice.isAccepted ? "Approved" : "Rejected", // Assuming isAccepted indicates approval status
          paymentStatus: invoice.paymentStatus ? "Paid" : "Unpaid",
          dueDate: invoice.dueDate,
          documentPath: invoice.documentPath,
          comment: invoice.comment,
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
    <>
      {isView && (
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
          <div className="flex text-2xl font-bold text-gray-500 ">
            <h2 className="text-left text-cyan-500">INVOICE LIST</h2>
          </div>
          <div className="w-52 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-96 bg-cyan-500 h-0.5 mb-5"></div>
          <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <div className="shadow-xl">
              <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        Invoice No
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        Amount
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        PO Number
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        Due Date
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        View{" "}
                      </th>

                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        Payment Status
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        Status
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentItems.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          {invoice.invoiceNo}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          {invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          {invoice.poNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          {new Date(invoice.dueDate).toLocaleDateString(
                            "es-CL"
                          )}
                        </td>
                        <td className="px-6 py-2 text-center whitespace-no-wrap text-sm">
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

                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
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
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
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
                        <td className="flex items-center px-6 py-4 whitespace-no-wrap text-center text-sm">
                          <button
                            className={`mr-2`}
                            type="submit"
                            onClick={() => handleUpdateInvoice(invoice.id)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className={`text-cyan-600 text-xl`}
                            />
                          </button>
                          <button
                            className="mr-2"
                            onClick={() => {
                              setIsView(false);
                              setInvoice(invoice);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="text-cyan-600 text-xl"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-4  py-2 ${
                  currentPage === index + 1
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      {!isView && (
        <>
          <div className="grid grid-cols-2 mt-4 text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">Invoice Details</h2>
            <button
              className="items-right mr-1 bg-cyan-500 text-white text-sm px-4 py-[1px] rounded block mx-auto h-8"
              onClick={() => {
                setIsView(true);
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
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                    Invoice No
                  </th>
                  <td className="font-semibold text-sm text-transform: uppercase text-left px-6 py-4 whitespace-no-wrap text-sm">
                    {invoice.invoiceNo}
                  </td>
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                    Date Sent On
                  </th>
                  <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                    {new Date(invoice.dateSentOn).toLocaleDateString("es-CL")}
                  </td>
                </tr>
                <tr>
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                    Amount
                  </th>
                  <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                    {invoice.amount}
                  </td>
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                    GRN Number
                  </th>
                  <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                    {invoice.grnNumber}
                  </td>
                </tr>
                <tr>
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
                    PO Number
                  </th>
                  <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                    {invoice.poNumber}
                  </td>
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3  leading-4 text-gray-600 tracking-wider">
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
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3   leading-4 text-gray-600 tracking-wider">
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
                  <th className="font-semibold text-sm text-transform: uppercase text-left px-6 py-3   leading-4 text-gray-600 tracking-wider">
                    Due Date
                  </th>
                  <td className="px-6 py-4 whitespace-no-wrap text-left  text-sm">
                    {new Date(invoice.dueDate).toLocaleDateString("es-CL")}
                  </td>
                </tr>
                <tr>
                  <th className="font-semibold  text-sm text-transform: uppercase px-6 py-3 text-left leading-4 text-gray-600 tracking-wider">
                    View
                  </th>
                  <td className="px-6 py-2 text-left  whitespace-no-wrap text-sm">
                    <a
                      href={invoice.documentPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600"
                    >
                      <FontAwesomeIcon
                        icon={faFileDownload}
                        className="text-cyan-600 text-xl mr-2"
                      />
                      View Doc
                    </a>
                  </td>
                  <th className="font-semibold  text-sm text-transform: uppercase px-6 py-3 text-left leading-4 text-gray-600 tracking-wider">
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
      )}
    </>
  );
}
