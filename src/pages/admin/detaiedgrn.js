import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const GrnDetails = () => {
  const [grns, setGrns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedGrn, setSelectedGrn] = useState(null);

  useEffect(() => {
    // Simulated fetchGrns function, replace with actual API call
    const fetchGrns = async () => {
      try {
        // Dummy data
        const dummyData = [
          {
            id: 1,
            grnNo: "GRN001",
            poNo: "PO001",
            sentOn: "2024-03-20",
            isApproved: true,
            comment: "Received partial shipment",
            shipmentType: "Partial",
          },
          {
            id: 2,
            grnNo: "GRN002",
            poNo: "PO002",
            sentOn: "2024-03-22",
            isApproved: false,
            comment: "Waiting for complete shipment",
            shipmentType: "Complete",
          },
          {
            id: 3,
            grnNo: "GRN003",
            poNo: "PO003",
            sentOn: "2024-03-20",
            isApproved: true,
            comment: "Received partial shipment",
            shipmentType: "Partial",
          },
          {
            id: 4,
            grnNo: "GRN004",
            poNo: "PO004",
            sentOn: "2024-03-22",
            isApproved: false,
            comment: "Waiting for complete shipment",
            shipmentType: "Complete",
          },
        ];

        setGrns(dummyData);
      } catch (error) {
        console.error("Error fetching GRNs:", error.message);
      }
    };

    fetchGrns();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrns = grns.slice(indexOfFirstItem, indexOfLastItem);

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
        <div>
          <p className="text-gray-900">
            <span className="font-bold">GRN No.</span>: {grn.grnNo}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">PO No.</span>: {grn.poNo}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Sent on (date)</span>: {grn.sentOn}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Comment</span>: {grn.comment}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Status</span>:{" "}
            {grn.isApproved ? "Approved" : "Rejected"}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Shipment Type</span>: {grn.shipmentType}
          </p>
          
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block mx-auto"
            onClick={handleGoBack}
          >
            Close
          </button>
        </div>
      </div>
      
    </div>
    <div className="flex text-2xl font-bold text-gray-500 mt-14">
          <h2 className="text-left text-cyan-400 ">ALL PURCHASE ORDER
          </h2>
          
        </div>
        <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
          <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
    <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded shadow-lg">
    <table className="table-auto w-full rounded-lg border-2 border-cyan-400 bg-white shadow-lg">
      <thead>
        <tr className="text-gray-600">
        <th className="px-4 py-2 text-left">GRN No.</th>
              <th className="px-4 py-2 text-left">PO No.</th>
              <th className="px-4 py-2 text-left">Sent on <p></p>(date)</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">View & download <p></p>document</th>
              <th className="px-4 py-2 text-left">Shipment<p></p>Type</th>
              
              <th className="px-4 py-2 text-left">Action</th>
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

          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>

  );

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-zinc-50 shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg ">
        <div className="flex text-2xl font-bold text-gray-500 ">
          <h2 className="text-left text-cyan-400">ALL ABOUT GRN
          </h2>
          
        </div>
        <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
          <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
        <div className="relative mb-5 bg-white">
          {selectedGrn ? (
            <DetailsView grn={grns.find((grn) => grn.id === selectedGrn)} />
          ) : (
            <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded shadow-lg">
              <table className="table-auto w-full rounded-lg border-2 border-cyan-400 bg-white shadow-lg">
                <thead>
                  <tr className="text-gray-600">
                    <th className="px-4 py-2 text-left">GRN No.</th>
                    <th className="px-4 py-2 text-left">PO No.</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Shipment Type</th>
                    <th className="px-4 py-2 text-left">View</th>
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
                      <td className="px-4 py-2">{grn.grnNo}</td>
                      <td className="px-4 py-2">{grn.poNo}</td>
                      <td className="px-4 py-2">
                        <button
                          className={`py-1 px-2 rounded ${
                            grn.isApproved
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-600"
                          }`}
                          style={{ minWidth: "6rem" }}
                        >
                          {grn.isApproved ? "Approved" : "Rejected"}
                        </button>
                      </td>

                      <td className="px-4 py-2">{grn.shipmentType}</td>
                      <td className="px-4 py-2">
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
          )}
        </div>
      </div>
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
    </div>
  );
};

export default GrnDetails;
