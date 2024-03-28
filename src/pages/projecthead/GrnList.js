import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faArrowLeft,
  faArrowRight,
  faFilePdf,
  faTruck,
  faPlane,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import EditGrnDetails from "./EditGrnDetails"; // Import the EditGrnDetails component

const GrnList = () => {
  const [grnData, setGrnData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedItem, setEditedItem] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [selectedGrnDetails, setSelectedGrnDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  useEffect(() => {
    const sid = sessionStorage.getItem("sid");
    axios
      .get(`${process.env.REACT_APP_API_URL}/GRN/ProjectHead/${sid}`)
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
    // Redirect to the editGrn-List page with the specific grnId
    navigate(`/projecthead/editGrn-List/${item.id}`);
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GRN/${id}`
      );
      setSelectedGrnDetails(response.data);
      setShowDetails(true);

      // Fetch associated invoices for the GRN
      const invoiceResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/Invoice/GRN/${id}`
      );
      setSelectedInvoiceData(invoiceResponse.data);
    } catch (error) {
      console.error("Error fetching GRN details:", error);
      toast.error("Error fetching GRN details");
    }
  };

  const openDocument = (url) => {
    window.open(url, "_blank");
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

  const DetailsView = ({ grnDetails }) => {
    const handleBack = () => {
      setShowDetails(false);
    };

    return (
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex text-2xl font-bold text-gray-500 ">
              <h2 className="text-left text-cyan-500">ALL ABOUT GRN</h2>
            </div>
            <div className="w-52 bg-cyan-500 h-0.5 mb-1"></div>
            <div className="w-96 bg-cyan-500 h-0.5 mb-5"></div>
          </div>
          <div>
            <button
              className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded block mx-auto"
              onClick={handleBack}
            >
              Close
            </button>
          </div>
        </div>

        <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
          <div
            className="bg-white p-6 rounded-md shadow-md "
            style={{ height: "fit-content" }}
          >
            <p className="text-gray-900 mb-3">
              <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                GRN Nos.
              </span>
              : {grnDetails.grnNo}
            </p>
            <p className="text-gray-900 mb-3">
              <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                PO No.
              </span>
              : {grnDetails.purchaseOrder.orderNo}
            </p>
            <p className="text-gray-900 mb-3">
              <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                Sent on (date)
              </span>
              : {formatDateTime(grnDetails.sendOn)}
            </p>
            <p className="text-gray-900">
              <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                Status
              </span>
              : {grnDetails.isAccepted ? "Accepted" : "Rejected"}
            </p>
            <p>
              <td className="py-2">
                <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                  Shipment Status:
                </span>
              </td>
              <td className="py-2">
                {grnDetails.shipmentStatus ? (
                  <span className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-xl">
                      Shipment Complete
                      <FontAwesomeIcon
                        icon={faPlane}
                        className="ml-2 text-blue-500"
                      />
                    </div>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded-xl">
                      Partial Shipment
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="ml-2 text-red-500"
                      />
                    </div>
                  </span>
                )}
              </td>
            </p>
            <p className="text-gray-900">
              <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                Comment
              </span>
              : {grnDetails.comment}
            </p>
            <div>
              <span className="text-gray-600 text-sm text-transform: uppercase font-semibold">
                Document:
              </span>{" "}
              {grnDetails.documentPath && (
                <button
                  className="text-blue-500"
                  onClick={() => openDocument(grnDetails.documentPath)}
                >
                  <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                  View Document
                </button>
              )}
            </div>
          </div>
        </div>
        <br></br>
        <br></br>

        <br></br>

        {/* Invoice Table */}
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL INVOICES</h2>
        </div>
        <div className="ml-4 w-36 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="ml-4 w-44 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-400 rounded-lg shadow-lg ">
          <table className="table-auto w-full rounded-lg  bg-white">
            <thead>
              <tr>
                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  Invoice No.
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  Sent On.
                </th>

                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  Amount
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  Grn NO
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  Payment Status.
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  Status
                </th>
                <th className="font-semibold text-sm text-transform: uppercase px-6 py-3  text-center text-sm leading-4 text-gray-600 tracking-wider">
                  View Document
                </th>
              </tr>

              <tr className=" text-gray-600">
                <td colSpan="9" className=" px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {selectedInvoiceData.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-300">
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
                    {invoice.invoiceNo}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
                    {formatDateTime(invoice.sendOn)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
                    {invoice.grn.grnNo}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
                    {" "}
                    {invoice.paymentStatus ? "Paid" : "Unpaid"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
                    <button
                      className={`py-1 px-2 rounded ${
                        invoice.isAccepted
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-600"
                      }`}
                      style={{ minWidth: "6rem" }}
                    >
                      {invoice.isAccepted ? "Accepted" : "Pending"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center ">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (showDetails) {
    return <DetailsView grnDetails={selectedGrnDetails} />;
  }

  return (
    <div className="relative">
      <ToastContainer />
      <div className="flex text-2xl font-bold text-gray-500">
        <h2 className="ml-4 text-left text-cyan-500">GRN LIST</h2>
      </div>
      <div className="ml-4 w-36 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="ml-4 w-44 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-400 rounded-lg shadow-lg ">
        <table className="table-auto w-full rounded-lg  bg-white">
          <thead>
            <tr className="text-gray-600">
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                SR. NO.
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                GRN No.
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                PO No.
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                SENT ON (date)
              </th>

              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                SHIPMENT STATUS
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                STATUS
              </th>
              <th className="font-semibold text-sm text-transform: uppercase px-4 py-2 text-left">
                ACTIONS
              </th>
            </tr>
            <tr className=" text-gray-600">
              <td colSpan="9" className=" px-4 py-1">
                <div style={{ borderTop: "2px solid gray" }}></div>
              </td>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 whitespace-no-wrap text-center text-sm"
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
                  <td className="px-4 py-2">{item.grnNo}</td>
                  <td className="px-4 py-2">{item.purchaseOrder.orderNo}</td>
                  <td className="px-4 py-2">{formatDateTime(item.sendOn)}</td>

                  <td className="px-4 py-2 bg-white">
                    {item.shipmentStatus ? (
                      <span className="text-green-500">Complete Shipment</span>
                    ) : (
                      <span className="text-red-500">Partial Shipment</span>
                    )}
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
                        onClick={() => handleEdit(item)}
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
