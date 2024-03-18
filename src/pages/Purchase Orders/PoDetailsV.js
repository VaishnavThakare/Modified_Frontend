import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const PoDetailsV = () => {
  // Dummy data (9 rows)
  const dummyData = [
    {
      poNo: "PO001",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Active",
      totalGrn: 3,
      invoices: "2 Paid / 1 Pending",
    },
    {
      poNo: "PO002",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "2024-02-15",
      poAmount: "$7000",
      status: "Inactive",
      totalGrn: 1,
      invoices: "0 Paid / 1 Pending",
    },
    {
      poNo: "PO003",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "-",
      poAmount: "$3000",
      status: "Active",
      totalGrn: 0,
      invoices: "0 Paid / 0 Pending",
    },
    {
      poNo: "PO001",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Active",
      totalGrn: 3,
      invoices: "2 Paid / 1 Pending",
    },
    {
      poNo: "PO002",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "2024-02-15",
      poAmount: "$7000",
      status: "Inactive",
      totalGrn: 1,
      invoices: "0 Paid / 1 Pending",
    },
    {
      poNo: "PO003",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "-",
      poAmount: "$3000",
      status: "Active",
      totalGrn: 0,
      invoices: "0 Paid / 0 Pending",
    },
    {
      poNo: "PO001",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Active",
      totalGrn: 3,
      invoices: "2 Paid / 1 Pending",
    },
    {
      poNo: "PO002",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "2024-02-15",
      poAmount: "$7000",
      status: "Inactive",
      totalGrn: 1,
      invoices: "0 Paid / 1 Pending",
    },
    {
      poNo: "PO003",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "-",
      poAmount: "$3000",
      status: "Active",
      totalGrn: 0,
      invoices: "0 Paid / 0 Pending",
    },
    {
      poNo: "PO001",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Active",
      totalGrn: 3,
      invoices: "2 Paid / 1 Pending",
    },
    {
      poNo: "PO002",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "2024-02-15",
      poAmount: "$7000",
      status: "Inactive",
      totalGrn: 1,
      invoices: "0 Paid / 1 Pending",
    },
    {
      poNo: "PO003",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "-",
      poAmount: "$3000",
      status: "Active",
      totalGrn: 0,
      invoices: "0 Paid / 0 Pending",
    },
    {
      poNo: "PO001",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Active",
      totalGrn: 3,
      invoices: "2 Paid / 1 Pending",
    },
    {
      poNo: "PO002",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "2024-02-15",
      poAmount: "$7000",
      status: "Inactive",
      totalGrn: 1,
      invoices: "0 Paid / 1 Pending",
    },
    {
      poNo: "PO003",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "-",
      poAmount: "$3000",
      status: "Active",
      totalGrn: 0,
      invoices: "0 Paid / 0 Pending",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(dummyData.length / itemsPerPage))
    );
  };

  const handleAccept = (poNo) => {
    console.log("Accepting PO:", poNo);
    // Add logic here to handle acceptance
  };

  const handleReject = (poNo) => {
    console.log("Rejecting PO:", poNo);
    // Add logic here to handle rejection
  };

  const [comments, setComments] = useState({});

  const handleCommentChange = (event, poNo) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [poNo]: value,
    }));
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border rounded border-gray-300">
        <table className="table-auto w-full rounded-md border-2 border-cyan-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border">Sr. No.</th>
              <th className="px-4 py-2 text-left border">Purchase Order No.</th>
              <th className="px-4 py-2 text-left border">Vendor Name</th>
              <th className="px-4 py-2 text-left border">Released On</th>
              <th className="px-4 py-2 text-left border">PO Amount</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Comments</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={indexOfFirstItem + index + 1} className="bg-white">
                <td className="px-4 py-2 border">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-4 py-2 border">{item.poNo}</td>
                <td className="px-4 py-2 border">{item.vendorName}</td>
                <td className="px-4 py-2 border">{item.releasedOn}</td>
                <td className="px-4 py-2 border">{item.poAmount}</td>
                <td className="px-4 py-2 border">
                  <div className="flex">
                    <button
                      onClick={() => handleAccept(item.poNo)}
                      className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(item.poNo)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <textarea
                    rows="2"
                    cols="25"
                    value={comments[item.poNo] || ""}
                    onChange={(e) => handleCommentChange(e, item.poNo)}
                    className="border rounded px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Add comments..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-2 ml-2 mr-2">
        <table className="table-auto border-collapse rounded border-blue-500">
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-2 border" colSpan="10">
                <button
                  onClick={handlePrevPage}
                  className="pagination-button"
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
                  className="pagination-button ml-2"
                  disabled={
                    currentPage === Math.ceil(dummyData.length / itemsPerPage)
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

export default PoDetailsV;
