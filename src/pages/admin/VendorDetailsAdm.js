import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const VendorDetailsAdm = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const vendorResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${vendorId}`
        );
        setVendor(vendorResponse.data);

        const purchaseOrdersResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/PurchaseOrders?vendorId=${vendorId}`
        );
        setPurchaseOrders(purchaseOrdersResponse.data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, [vendorId]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage))
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = purchaseOrders.slice(startIndex, endIndex);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Vendor Details */}
      <div className="flex justify-between">
        <div>
          <div className="flex text-2xl font-bold text-gray-500 ">
            <h2 className="text-left text-cyan-500">VENDOR DETAILS</h2>
          </div>
          <div className="w-52 bg-cyan-400 h-0.5 mb-1"></div>
          <div className="w-96 bg-cyan-400 h-0.5 mb-5"></div>
        </div>
      </div>
      
      {/* Vendor Details Content */}
      <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
        <div
          className="bg-white p-6 rounded-md shadow-md"
          style={{ height: "fit-content" }}
        >
          <p className="text-gray-900">
            <span className="font-bold">Vendor ID</span> {vendor.id}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Name </span> {vendor.name}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Email </span> {vendor.email}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Phone Number </span>{" "}
            {vendor.phoneNumber}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">State </span> {vendor.state}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">City </span> {vendor.city}
          </p>
          <p className="text-gray-900">
            <span className="font-bold">Address</span> {vendor.address}
          </p>
        </div>
      </div>
      
      {/* Purchase Orders */}
      <div className="flex text-2xl font-bold text-gray-500 mt-14">
        <h2 className="text-left text-cyan-500 ">PURCHASE ORDER LIST</h2>
      </div>
      <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
      <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded-lg shadow-lg">
        <table className="table-auto w-full rounded-lg  bg-white ">
          <thead>
            <tr className="bg-white text-gray-600">
              <th className="px-4 py-2 text-left">Sr. No.</th>
              <th className="px-4 py-2 text-left">Purchase Order No.</th>
              <th className="px-4 py-2 text-left">Vendor Name</th>
              <th className="px-4 py-2 text-left">Sent On</th>
              <th className="px-4 py-2 text-left">PO Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-2 whitespace-no-wrap text-center text-sm"
                >
                  No data available
                </td>
              </tr>
            ) : (
              currentOrders.map((order, index) => (
                <tr key={order.id} className="bg-white">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order.orderNo}</td>
                  <td className="px-4 py-2">{order.vendorName}</td>
                  <td className="px-4 py-2">{order.sentOn}</td>
                  <td className="px-4 py-2">{order.orderAmount}</td>
                  <td className="px-4 py-2">
                    {order.isAccepted === true && (
                      <button
                        className="py-1 px-2 rounded bg-green-200 text-green-700"
                        style={{ minWidth: "6rem" }}
                      >
                        Accepted
                      </button>
                    )}
                    {order.isAccepted === false && (
                      <button
                        className="py-1 px-2 rounded bg-red-200 text-red-600"
                        style={{ minWidth: "6rem" }}
                      >
                        Rejected
                      </button>
                    )}
                    {order.isAccepted === null && (
                      <button
                        className="py-1 px-2 rounded bg-yellow-200 text-yellow-700"
                        style={{ minWidth: "6rem" }}
                      >
                        Pending
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
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

export default VendorDetailsAdm;
