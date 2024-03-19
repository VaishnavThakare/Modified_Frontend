import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoDetailsA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7254/api/PurchaseOrder/All");
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error.message);
      toast.error("Failed to fetch purchase orders");
    }
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (item) => {
    setSelectedItem(item);
    navigate(`/admin/edit/${item.id}`);
  };

  const handleView = (item) => {
    console.log("Viewing item:", item);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage))
    );
  };

  return (
    <div className="relative">
      <ToastContainer />
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
              <th className="px-4 py-2 text-left border">Comments</th>
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.orderNo} className="bg-gray-200">
                <td className="px-4 py-2 border">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2 border">{item.orderNo}</td>
                <td className="px-4 py-2 border">{item.vendorId}</td>
                <td className="px-4 py-2 border">{item.releaseDate}</td>
                <td className="px-4 py-2 border">{item.acceptedOn}</td>
                <td className="px-4 py-2 border">{item.orderAmount}</td>
                <td className="px-4 py-2 border">
                  <button
                    className={`py-1 px-2 rounded ${
                      item.isAccepted
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {item.isAccepted ? "Accepted" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 border">{item.purchaseOrderHistories.length > 0 ? item.purchaseOrderHistories[0].comment : "-"}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => handleEdit(item)} className={`mr-2`}>
                    <FontAwesomeIcon icon={faEdit} className={`text-blue-500`} />
                  </button>
                  <button onClick={() => handleView(item)} className={`mr-2`}>
                    <FontAwesomeIcon icon={faEye} className={`text-blue-500`} />
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
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border" colSpan="10">
                <button onClick={handlePrevPage} className="pagination-button" disabled={currentPage === 1}>
                  <FontAwesomeIcon icon={faArrowLeft} className="pagination-icon" />
                  Previous
                </button>
                <button onClick={handleNextPage} className="pagination-button ml-2" disabled={currentPage === Math.ceil(purchaseOrders.length / itemsPerPage)}>
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="pagination-icon" />
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
