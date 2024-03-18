import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./PoList.css";

const PoList = () => {
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
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const handleView = (poNo) => {
    console.log("Viewing details of PO:", poNo);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(dummyData.length / itemsPerPage))
    );
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border rounded border-gray-300">
        <table className="table-auto w-full rounded-md border-2 border-cyan-400 ">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border">Sr. No.</th>
              <th className="px-4 py-2 text-left border">Purchase Order No.</th>
              <th className="px-4 py-2 text-left border">Vendor Name</th>
              <th className="px-4 py-2 text-left border">Released On</th>
              <th className="px-4 py-2 text-left border">Accepted On</th>
              <th className="px-4 py-2 text-left border">PO Amount</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">
                Total GRN against PO
              </th>
              <th className="px-4 py-2 text-left border">
                Paid Invoice / Pending Invoices
              </th>
              <th className="px-4 py-2 text-left border">Actions</th>
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
                <td className="px-4 py-2 border">{item.acceptedOn}</td>
                <td className="px-4 py-2 border">{item.poAmount}</td>
                <td className="px-4 py-2 border">
                  <button
                    className={`py-1 px-2 rounded ${
                      item.status === "Active"
                        ? "bg-cyan-100 text-cyan-400"
                        : "bg-red-100 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.status === "Active" ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-2 border">{item.totalGrn}</td>
                <td className="px-4 py-2 border">{item.invoices}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => handleView(item.poNo)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="px-4 py-2 text-blue-500"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-2 ml-2 mr-2 ">
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

export default PoList;
