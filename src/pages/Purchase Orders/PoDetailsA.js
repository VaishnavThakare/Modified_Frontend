import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const PoDetailsA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedData, setEditedData] = useState({
    poNo: "",
    vendorName: "",
    poAmount: "",
  });
  const itemsPerPage = 5;
  const dummyData = [
    {
      poNo: "PO001",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Accepted",
      comments: "Nice Deal", // Updated status to Accepted
    },
    {
      poNo: "PO002",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "-",
      poAmount: "$7000",
      status: "Rejected",
      comments: "Price is too low",
    },
    {
      poNo: "PO003",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "-",
      poAmount: "$3000",
      status: "Rejected",
      comments: "Not Good Deal",
    },
    {
      poNo: "PO004",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Accepted",
    },
    {
      poNo: "PO005",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "-",
      poAmount: "$7000",
      status: "Rejected",
    },
    {
      poNo: "PO006",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "2024-01-20",
      poAmount: "$3000",
      status: "Accepted",
    },
    {
      poNo: "PO007",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Accepted",
    },
    {
      poNo: "PO008",
      vendorName: "Vendor B",
      releasedOn: "2024-02-10",
      acceptedOn: "-",
      poAmount: "$7000",
      status: "Rejected",
    },
    {
      poNo: "PO009",
      vendorName: "Vendor C",
      releasedOn: "2024-03-05",
      acceptedOn: "2024-01-20",
      poAmount: "$3000",
      status: "Accepted",
    },
    {
      poNo: "PO010",
      vendorName: "Vendor A",
      releasedOn: "2024-01-15",
      acceptedOn: "2024-01-20",
      poAmount: "$5000",
      status: "Accepted",
    },
  ];

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditedData({
      poNo: item.poNo,
      vendorName: item.vendorName,
      poAmount: item.poAmount,
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Save edited data here
    console.log("Saving edited data:", editedData);
    setEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(dummyData.length / itemsPerPage))
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative">
      {editModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-300 p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Purchase Order</h2>
            <formm>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Purchase Order No.
                </label>
                <input
                  type="text"
                  name="poNo"
                  value={editedData.poNo}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendorName"
                  value={editedData.vendorName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  PO Amount
                </label>
                <input
                  type="text"
                  name="poAmount"
                  value={editedData.poAmount}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </formm>
          </div>
        </div>
      )}
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border rounded border-gray-300">
        <table className="table-auto w-full rounded-md border-2 border-cyan-400 shadow-md">
          <thead>
            <tr className="bg-gray-300 text-gray-600">
              <th className="px-4 py-2 text-left border">Sr. No.</th>
              <th className="px-4 py-2 text-left border">Purchase Order No.</th>
              <th className="px-4 py-2 text-left border">Vendor Name</th>
              <th className="px-4 py-2 text-left border">Released On</th>
              <th className="px-4 py-2 text-left border">Accepted On</th>
              <th className="px-4 py-2 text-left border">PO Amount</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Comments</th>{" "}
              {/* New column */}
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={indexOfFirstItem + index + 1} className="bg-gray-200">
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
                      item.status === "Accepted"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="px-4 py-2 border">{item.comments}</td>{" "}
                {/* Display comments */}
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(item)}
                    className={`mr-2 ${
                      item.status === "Accepted" ? "disabled-button" : ""
                    }`}
                    disabled={item.status === "Accepted"}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={`text-blue-500 ${
                        item.status === "Accepted" ? "text-gray-500" : ""
                      }`}
                    />
                  </button>
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

export default PoDetailsA;
