import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const ProjectView = () => {
  const { projectId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [projectData, setProject] = useState([]);
  const navigate = useNavigate();

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/PurchaseOrder/Project/${projectId}`,
      );
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error.message);
      toast.error("Failed to fetch purchase orders");
    }
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Project/${projectId}`,
      );
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error.message);
      toast.error("Failed to fetch Project");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchPurchaseOrders();
  }, [projectId]);

  const handleViewDetails = (Id) => {
    navigate(`/admin/purchase-orders/${Id}`);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage)),
    );
  };

  const currentItems = purchaseOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const backButton = () => {
    navigate(-1);
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
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex text-2xl font-bold text-gray-500 ">
              <h2 className="text-left text-cyan-500">PROJECT DETAILS</h2>
            </div>
            <div className="w-52 bg-cyan-500 h-0.5 mb-1"></div>
            <div className="w-96 bg-cyan-500 h-0.5 mb-5"></div>
          </div>
          <div>
            <div className="flex justify-center">
              <button
                className=" bg-cyan-500 text-white px-4 py-2 rounded"
                onClick={backButton}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
          <div
            className="bg-white p-6 rounded-md shadow-md "
            style={{ height: "fit-content" }}
          >
            <p className="text-gray-900 mb-3">
              <span className="font-bold">Name</span>: {projectData.name}
            </p>
            <p className="text-gray-900 mb-3">
              <span className="font-bold">Project Head Name</span>:{" "}
              {projectData.projectHeadName}
            </p>
            <p className="text-gray-900 mb-3">
              <span className="font-bold">Created On</span>:{" "}
              {formatDateTime(projectData.createdOn)}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Description</span>:{" "}
              {projectData.description}
            </p>
          </div>
        </div>

        <br></br>
        <br></br>

        <br></br>

        {/* Purchase Order table code starts */}
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL PURCHASE ORDERS</h2>
        </div>
        <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
        <div className=" overflow-x-auto border-2 border-cyan-500 mb-5 shadow-lg rounded-lg p-1">
          <table className="table-auto w-full 0 bg-white">
            <thead>
              <tr className="text-gray-600">
                <th className="px-4 py-2 text-center ">
                  Sr.<p></p> No.
                </th>
                <th className="px-4 py-2 text-center ">
                  Purchase <p></p>Order No.
                </th>
                <th className="px-4 py-2 text-center ">
                  Vendor <p></p>Organization Name
                </th>
                <th className="px-4 py-2 text-center ">
                  Release <p></p> On
                </th>
                <th className="px-4 py-2 text-center ">
                  Accepted <p></p>On
                </th>
                <th className="px-4 py-2 text-center ">
                  PO <p></p>Amount
                </th>
                <th className="px-4 py-2 text-center ">Comments</th>
                <th className="px-4 py-2 text-center ">Status</th>
                <th className="px-4 py-2 text-center ">Actions</th>
              </tr>
              <tr className=" text-gray-600">
                <td colSpan="9" className=" px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-4 py-2 text-center text-sm">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.orderNo}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.vendorName}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {formatDateTime(item.releaseDate)}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.acceptedOn ? formatDateTime(item.acceptedOn) : "-"}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.orderAmount}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
                      {item.comment}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className={`py-1 px-2 text-center text-sm rounded ${
                          item.isAccepted === null
                            ? "bg-yellow-200 text-yellow-600"
                            : item.isAccepted
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-600"
                        }`}
                        style={{ minWidth: "6rem" }}
                      >
                        {item.isAccepted === null
                          ? "Pending"
                          : item.isAccepted
                            ? "Accepted"
                            : "Rejected"}
                      </button>
                    </td>

                    <td className="px-4 py-2 text-center bg-white">
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className={`mr-2`}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className={`text-cyan-600 text-xl`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-2 text-center bg-white">
                    No purchase orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
            disabled={
              currentPage === Math.ceil(purchaseOrders.length / itemsPerPage)
            }
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="pagination-icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
