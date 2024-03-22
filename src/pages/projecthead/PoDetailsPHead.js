import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoDetailsPHead = () => {
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
      const response = await axios.get(
        "https://localhost:7254/api/PurchaseOrder/All"
      );
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
    navigate(`/projecthead/edit/${item.id}`);
  };

  const handleView = (item) => {
    // console.log(id);
    navigate(`/projecthead/po-details-phead/${item.id}`);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage))
    );
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

  return (
    <div className="relative">
      <ToastContainer />
      <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
        <div className="flex text-2xl font-bold text-gray-500 ">
          <h2 className="text-left text-cyan-400">ALL ABOUT GRN</h2>
        </div>
        <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>

        <table className="table-auto w-full rounded-md border-2 border-cyan-400 bg-white">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left ">
                Sr.<p></p> No.
              </th>
              <th className="px-4 py-2 text-left ">
                Purchase <p></p>Order No.
              </th>
              <th className="px-4 py-2 text-left ">
                Vendor <p></p>Name
              </th>
              <th className="px-4 py-2 text-left ">
                Release <p></p> On
              </th>
              <th className="px-4 py-2 text-left ">
                Accepted <p></p>On
              </th>
              <th className="px-4 py-2 text-left ">
                PO <p></p>Amount
              </th>
              <th className="px-4 py-2 text-left ">Status</th>
              <th className="px-4 py-2 text-left ">Comments</th>
              <th className="px-4 py-2 text-left ">Actions</th>
            </tr>
            <tr className=" text-gray-600">
              <td colSpan="9" className=" px-4 py-1">
                <div style={{ borderTop: "2px solid gray" }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.orderNo} className="bg-white">
                <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2">{item.orderNo}</td>
                <td className="px-4 py-2">{item.vendorName}</td>
                <td className="px-4 py-2">
                  {formatDateTime(item.releaseDate)}
                </td>
                <td className="px-4 py-2">{formatDateTime(item.acceptedOn)}</td>
                <td className="px-4 py-2">{item.orderAmount}</td>
                <td className="px-4 py-2">
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
                <td className="px-4 py-2 ">{item.comment}</td>

                <td className="px-4 py-2 bg-white">
                  <button onClick={() => handleEdit(item)} className={`mr-2`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={`text-purple-600 text-xl`}
                    />
                  </button>
                  <button onClick={() => handleView(item)} className={`mr-2`}>
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
        <table className="table-auto border-collapse rounded border-cyan-500 mb-5">
          <tbody>
            <tr>
              <td className="px-4 py-2" colSpan="10">
                <button
                  onClick={handlePrevPage}
                  className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
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
                  className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
                  disabled={
                    currentPage ===
                    Math.ceil(purchaseOrders.length / itemsPerPage)
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
export default PoDetailsPHead;
