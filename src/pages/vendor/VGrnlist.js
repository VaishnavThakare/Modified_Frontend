

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faFileDownload,
  faArrowLeft,
  faArrowRight,
  faPlane,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GrnDetails = () => {
  const [grns, setGrns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedGrn, setSelectedGrn] = useState(null);
  const [editingGrn, setEditingGrn] = useState(null);
  const [pos, setpos] = useState([]);
  const [invoices, setInvoices] = useState([]);
  

  useEffect(() => {
    const fetchGrns = async () => {
      try {
        const response = await axios.get("https://localhost:7254/api/GRN/All");
        setGrns(response.data);
      } catch (error) {
        console.error("Error fetching GRNs:", error.message);
        toast.error("Failed to fetch GRNs");
      }
    };

    fetchGrns();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrns = grns.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(grns.length / itemsPerPage))
    );
  };

  const handleViewDetails = (grnId) => {
    const selectedGrn = grns.find((grn) => grn.id === grnId);
    setSelectedGrn(selectedGrn);
  };
  const navigate = useNavigate();
  const { grnId } = useParams();

  const handleEditDetails = (grnId) => {
    // Redirect to EditVGrnDetails page with the grnId as a parameter
    navigate(`/vendor/vendor-grnedit/${grnId}`);
  };
  
  


// View
const DetailsView = ({ grnDetails, onCancel }) => {
  
  
    return (
      <div>
        <div className="flex text-2xl font-bold text-gray-500 ">
          <h2 className="text-left text-cyan-500">ALL ABOUT GRN</h2>
        </div>
        <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
        <div
          className="bg-white p-6 rounded-md shadow-md "
          style={{ height: "fit-content" }}
        >

      <p className="text-gray-900 mb-3">
        <span className="font-bold">GRN No.</span>: {grnDetails.grnNo}
      </p>
      <p className="text-gray-900 mb-3">
        <span className="font-bold">PO No.</span>: {grnDetails.purchaseOrder.orderNo}
      </p>
      <p className="text-gray-900 mb-3">
        <span className="font-bold">Sent on (date)</span>: {grnDetails.sendOn}
      </p>
      <p className="text-gray-900">
        <span className="font-bold">Status</span>: {grnDetails.isApproved ? "Approved" : "Rejected"}
      </p>
      <p>
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
              </p>
      <p className="text-gray-900">
        <span className="font-bold">Comment</span>: {grnDetails.comment}
      </p>
      
    </div>
    </div>
    <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block mx-auto"
        onClick={onCancel}
      >
        Close
      </button>
    <br></br>
      <br></br>

      <br></br>
    
      
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL ABOUT GRN</h2>
        </div>
        <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="border-2 border-cyan-500 mb-5 shadow-lg rounded-lg">
        <table className="min-w-full  rounded-lg bg-white">
          <thead> 
            <tr>
              <th className="px-6 py-3  text-left leading-4 text-gray-600 tracking-wider">Invoice No</th>
              <th className="px-6 py-3  text-left leading-4 text-gray-600 tracking-wider">Date Sent On</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">Amount</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">GRN Number</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">PO Number</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">S (Approved/Rejected)</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">Payment Status</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">Due Date</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">View/Download Documents</th>
              <th className="px-6 py-3  text-left text-sm leading-4 text-gray-600 tracking-wider">Comment</th>
              
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
                
              </tr>
            ))}
          </tbody>
        </table>
    </div>
      </div>
      );
    
    
  };
  
  

  return (
    <div className="relative bg-zinc-50">
      {selectedGrn ? (
        <DetailsView grnDetails={selectedGrn} onCancel={() => setSelectedGrn(null)} />
      ) 
      // : editingGrn ? (
      //   <EditDetailsView
      //     grn={grns.find((grn) => grn.id === editingGrn)}
      //     onSave={handleSaveEdit}
      //     onCancel={handleCancelEdit}
      //   />
      // )
      : (
        <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded shadow-lg">
          <div className="rounded-lg border-2 border-cyan-400 shadow-lg">
          <table className="table-auto w-full bg-white rounded-lg">
          <thead>
                <tr className="text-gray-600">
                  <th className="px-4 py-2 text-center">GRN No.</th>
                  <th className="px-4 py-2 text-center">PO No.</th>
                  <th className="px-4 py-2 text-center">SENT ON (DATE)</th>
                  <th className="px-4 py-2 text-center">STATUS</th>
                  <th className="px-4 py-2 text-center">
                    VIEW & DOWNLOAD DOCUMENT
                  </th>
                  <th className="px-4 py-2 text-center">SHIPMENT TYPE</th>
                  <th className="px-4 py-2 text-center">COMMENT</th>
                  <th className="px-4 py-2 text-left">ACTION</th>
                </tr>
                <tr className="text-gray-600">
                  <td colSpan="8" className="px-4 py-1">
                    <div style={{ borderTop: "2px solid gray" }}></div>
                  </td>
                </tr>
              </thead>
              <tbody>
    {currentGrns.map((grn) => (
      <tr key={grn.id} className="bg-white">
        <td className="px-4 py-2 text-center">{grn.grnNo}</td>
        <td className="px-4 py-2 text-center">{grn.purchaseOrderId}</td>
        <td className="px-4 py-2 text-center">{grn.sendOn}</td>
        <td className="px-4 py-2 text-center">
          <button
            className={`py-1 px-2 rounded ${
              grn.isAccepted
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-600"
            }`}
            style={{ minWidth: "6rem" }}
          >
            {grn.isAccepted ? "Accepted" : "Pending"}
          </button>
        </td>
        <td className="px-4 py-2 text-center">
          <a href={grn.documentPath} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faFileDownload}
              className="text-purple-600 text-xl"
            />
          </a>
        </td>
        <td className="px-4 py-2 text-center">{grn.shipmentStatus ? "Complete" : "Partial"}</td>
        <td className="px-4 py-2 text-center">{grn.comment}</td>
        <td className="px-4 py-2 text-left flex flex-row ">
          <button
            className="mr-2"
            onClick={() => handleEditDetails(grn.id)}
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="text-purple-600 text-xl"
            />
          </button>
          <button
            className="mr-2"
            onClick={() => handleViewDetails(grn.id)}
          >
            <FontAwesomeIcon
              icon={faEye}
              className="text-purple-600 text-xl"
            />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
          </table>
          </div>
        </div>
      )}
      {!selectedGrn && !editingGrn && (
        <div className="flex justify-end mt-2 ml-2 mr-2">
          <button
              onClick={handlePrevPage}
              className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="pagination-icon" />
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
              disabled={currentPage === Math.ceil(grns.length / itemsPerPage)}
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="pagination-icon" />
            </button>
        </div>
      )}
      
    </div>
  );
};

export default GrnDetails;













