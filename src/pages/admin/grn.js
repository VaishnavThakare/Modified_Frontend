import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileDownload,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const GrnDetails = () => {
  const [grns, setGrns] = useState([]);
  const [inv, setinv] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedGrn, setSelectedGrn] = useState(null);

  useEffect(() => {
    // Simulated fetchGrns function, replace with actual API call
    const fetchGrns = async () => {
      try {
        // Dummy data

        let url = `${process.env.REACT_APP_API_URL}/GRN/All`;

        const response = await axios.get(url);
        setGrns(response.data);
      } catch (error) {
        console.error("Error fetching GRNs:", error.message);
      }
    };
    fetchGrns();
  }, []);
  const fetchinvices = async (grnId) => {
    try {
      // Dummy data

      let url = `${process.env.REACT_APP_API_URL}/Invoice/GRN/${grnId}`;

      const response = await axios.get(url);
      setinv(response.data);
    } catch (error) {
      console.error("Error fetching GRNs:", error.message);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrns = grns.slice(indexOfFirstItem, indexOfLastItem);
  const currentInv = inv.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(grns.length / itemsPerPage))
    );
  };

  const handleViewDetails = (grnId) => {
    setSelectedGrn(grnId);
  };
  const handleGoBack = () => {
    setSelectedGrn(null);
  };

  const DetailsView = ({ grn }) => (
    <div>
      <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
        <div
          className="bg-white p-6 rounded-md shadow-md"
          style={{ height: "fit-content" }}
        >
          <div className="relative">
           

            <p className="text-gray-900">
              <span className="font-bold">GRN No.</span>: {grn.grnNo}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">PO No.</span>:{" "}
              {grn.purchaseOrder.orderNo}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Sent on (date)</span>: {grn.sendOn}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Shipment Type</span>:{" "}
              {grn.shipmentStatus ? "Complete Shipment" : "Partial Shipment"}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Status</span>:{" "}
              {grn.isAccepted ? "Accepted" : "Rejected"}
            </p>
            
            <p className="text-gray-900">
              <span className="font-bold">Comment</span>: {grn.comment}
            </p>
          </div>
          
        </div>
        
      </div>
      <div className="flex justify-center">
      <button
              className=" bg-cyan-500 text-white px-4 py-2 rounded"
              onClick={handleGoBack}
            >
              Close
            </button>
            </div>
      <div className="flex text-2xl font-bold text-gray-500 mt-14">
        <h2 className="text-left text-cyan-500 ">ALL INVOICES</h2>
      </div>
      <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
      <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded-lg shadow-lg">
        <table className="table-auto w-full rounded-lg  bg-white ">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left">INVOICE NO.</th>
              <th className="px-4 py-2 text-left">AMOUNT</th>
              <th className="px-4 py-2 text-left">SENT ON (DATE)</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">PAYMENT STATUS</th>
              <th className="px-4 py-2 text-left">COMMENT</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
            <tr className="text-gray-600">
              <td colSpan="8" className="px-4 py-1">
                <div style={{ borderTop: "2px solid gray" }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentInv.map((inv) => (
              <tr key={inv.id} className="bg-white">
                <td className="px-4 py-2">{inv.invoiceNo}</td>
                <td className="px-4 py-2">{inv.amount}</td>
                <td className="px-4 py-2">{inv.sendOn}</td>
                <td className="px-4 py-2">
                  <button
                    className={`py-1 px-2 rounded ${
                      inv.isAccepted
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {inv.isAccepted ? "Approved" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`py-1 px-2 rounded ${
                      inv.paymentStatus
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {inv.paymentStatus ? "Approved" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2">{inv.comment}</td>
                <td className="px-4 py-2 bg-zinc-50">
                  <Link className={`mr-2`} to ={`/admin/details/${inv.id}`}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-purple-600 text-xl`}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg ">
        <div className="flex text-2xl font-bold text-gray-500 ">
          <h2 className="text-left text-cyan-500">GRN LIST</h2>
        </div>
        <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
        <div className="relative  mb-5 bg-zinc-50">
          {selectedGrn ? (
            <DetailsView grn={grns.find((grn) => grn.grnNo === selectedGrn)} />
          ) : (
            <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded shadow-lg">
              <table className="table-auto w-full rounded-lg  bg-white shadow-lg">
                <thead>
                  <tr className="text-gray-600">
                    <th className="px-4 py-2 text-center">GRN NO.</th>
                    <th className="px-4 py-2 text-center">PO NO.</th>
                    <th className="px-4 py-2 text-center">SHIPMENT TYPE</th>
                    <th className="px-4 py-2 text-center">STATUS</th>
                    <th className="px-4 py-2 text-center">VIEW</th>
                  </tr>
                  <tr className="text-gray-600">
                    <td colSpan="8" className="px-4 py-1">
                      <div style={{ borderTop: "2px solid gray" }}></div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {currentGrns.map((grn) => (
                    <tr key={grn.grnNo} className="bg-white">
                      <td className="px-4 py-2 text-center text-sm">{grn.grnNo}</td>
                      <td className="px-4 py-2 text-center text-sm">{grn.purchaseOrder.orderNo}</td>
                      <td className="px-4 py-2 text-center text-sm">
                        <button
                          className={`py-1 px-2 rounded ${
                            grn.shipmentStatus ? "text-black" : "text-black"
                          }`}
                          style={{ minWidth: "6rem" }}
                        >
                          {grn.shipmentStatus
                            ? "Complete Shipment"
                            : "Partial Shipment"}
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center text-sm">
                        {grn.isAccepted === true && (
                        <button
                         className="py-1 px-2 rounded bg-green-200 text-green-700"
                         style={{ minWidth: "6rem" }}
                        >
                         Accepted
                        </button>
                        )}
                        {grn.isAccepted === false && (
                        <button
                         className="py-1 px-2 rounded bg-red-200 text-red-600"
                         style={{ minWidth: "6rem" }}
                        >
                         Rejected
                        </button>
                        )}
                        {grn.isAccepted === null && (
                        <button
                          className="py-1 px-2 rounded bg-yellow-200 text-yellow-700"
                          style={{ minWidth: "6rem" }}
                        >
                         Pending
                        </button>
                        )}
                      </td>
                      
                      <td className="px-4 py-2 text-center text-sm">
                        <button
                          className="mr-2"
                          onClick={() => {
                            handleViewDetails(grn.grnNo);
                            fetchinvices(grn.id);
                          }}
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
          )}
        </div>
      </div>
      <div className="flex justify-end mt-5 ml-2 mr-2">
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
    </div>
  );
};

export default GrnDetails;
