import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faArrowLeft,
  faArrowRight,
  faExternalLinkAlt,
  faTruck,
  faPlane,
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
  const navigate = useNavigate();

  const itemsPerPage = 5;

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
    // Redirect to the editGrn-List page with the specific grnId
    navigate(`/projecthead/editGrn-List/${item.id}`);
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7254/api/GRN/${id}`);
      setSelectedGrnDetails(response.data);
      setShowDetails(true);
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
      <div className="ml-96 items-center justify-center h-screen">
        <div className="rounded-lg border-2 border-cyan-400  bg-white shadow-lg p-4 max-w-lg w-full mt-2">
          <div className="flex text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">GRN Details:</h2>
          </div>
          <div className="w-36 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-44 bg-cyan-500 h-0.5 mb-5"></div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">
                  <span className="font-bold">GRN No.:</span>
                </td>
                <td className="py-2">{grnDetails.grnNo}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">PO No.:</span>
                </td>
                <td className="py-2">{grnDetails.purchaseOrder.orderNo}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Sent On:</span>
                </td>
                <td className="py-2">{formatDateTime(grnDetails.sendOn)}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Created On:</span>
                </td>
                <td className="py-2">{formatDateTime(grnDetails.createdOn)}</td>
              </tr>

              <tr>
                <td className="py-2">
                  <span className="font-bold">Last Modified on:</span>
                </td>
                <td className="py-2">{formatDateTime(grnDetails.lastModifiedOn)}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Comment:</span>
                </td>
                <td className="py-2">{grnDetails.comment}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-bold">Shipment Status:</span>
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
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </button>
            {grnDetails.documentPath && (
              <button
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openDocument(grnDetails.documentPath)}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                View Document
              </button>
            )}
          </div>
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
        <h2 className="ml-4 text-left text-cyan-500">GRN Listing:</h2>
      </div>
      <div className="ml-4 w-36 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="ml-4 w-44 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded shadow-lg ">
        <table className="table-auto w-full rounded-s-3xl border-2 border-cyan-400 bg-white">
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
                <td className="px-4 py-2">{formatDateTime(item.sendOn)}</td>
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
                  {item.shipmentStatus ? (
                    <span className="text-green-500">Complete Shipment</span>
                  ) : (
                    <span className="text-red-500">Partial Shipment</span>
                  )}
                </td>
                <td className="px-4 py-2 bg-white">
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
