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

const GrnDetails = () => {
  const [grns, setGrns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedGrn, setSelectedGrn] = useState(null);
  const [editingGrn, setEditingGrn] = useState(null);
  const [pos, setpos] = useState([]);

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

  const handleEditDetails = (grnId) => {
    setEditingGrn(grnId);
  };

  const handleSaveEdit = (editedGrn) => {
    const updatedGrns = grns.map((grn) =>
      grn.id === editedGrn.id ? editedGrn : grn
    );
    setGrns(updatedGrns);
    setEditingGrn(null);
  };

  const handleCancelEdit = () => {
    setEditingGrn(null);
  };

  const handleGoBack = () => {
    setSelectedGrn(null);
  };
  const currentPos = pos.slice(indexOfFirstItem, indexOfLastItem);

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
            className="bg-white p-6 rounded-md shadow-md"
            style={{ height: "fit-content" }}
          >
            {/* Display the details of the selected GRN */}
            <p className="text-gray-900">
              <span className="font-bold">GRN No.</span>: {grnDetails.grnNo}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">PO No.</span>:{" "}
              {grnDetails.purchaseOrder.orderNo}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Sent on (date)</span>:{" "}
              {grnDetails.sendOn}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Status</span>:{" "}
              {grnDetails.isApproved ? "Approved" : "Rejected"}
            </p>
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
            <p className="text-gray-900">
              <span className="font-bold">Comment</span>: {grnDetails.comment}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block mx-auto"
              onClick={onCancel}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditDetailsView = ({ onSave, onCancel }) => {
    const { id } = useParams();
    const [editedGrn, setEditedGrn] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    useEffect(() => {
      const fetchGrn = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7254/api/GRN/${id}`
          );
          setEditedGrn(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching GRN:", error.message);
          setLoading(false);
          toast.error("Failed to fetch GRN");
        }
      };

      fetchGrn();
    }, [id]);

    useEffect(() => {
      const fetchPurchaseOrders = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7254/api/PurchaseOrder/All`
          );
          setPurchaseOrders(response.data);
        } catch (error) {
          console.error("Error fetching purchase orders:", error);
          toast.error("Failed to fetch purchase orders");
        }
      };

      fetchPurchaseOrders();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedGrn({ ...editedGrn, [name]: value });
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleSave = async () => {
      try {
        await axios.put(`https://localhost:7254/api/GRN/${id}`, editedGrn);
        toast.success("GRN details updated successfully");
        onSave(editedGrn);
      } catch (error) {
        console.error("Error updating GRN:", error.message);
        toast.error("Failed to update GRN details");
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="w-1/2 container mx-auto mt-8 bg-zinc-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Edit GRN Details
        </h2>
        <div className="bg-white p-10 rounded-md shadow-md border-2 border-cyan-500">
          <div>
            <div className="mb-6">
              <label className="mr-4 block text-lg font-semibold text-gray-700">
                Grn No
              </label>
              <input
                type="text"
                name="grnNo"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={editedGrn.grnNo || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="purchaseOrderId"
                className="block text-sm font-medium text-gray-700"
              >
                PO No.
              </label>
              <select
                name="purchaseOrderId"
                id="purchaseOrderId"
                value={editedGrn.purchaseOrderId}
                onChange={handleChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="">Select PO No.</option>
                {purchaseOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.orderNo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="shipmentStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Select Shipment Type
              </label>
              <select
                name="shipmentStatus"
                id="shipmentStatus"
                value={editedGrn.shipmentStatus}
                onChange={handleChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option disabled>Select Shipment Type</option>
                <option value={true}>Complete Shipment</option>
                <option value={false}>Partial Shipment</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="mr-4 block text-lg font-semibold text-lg text-gray-700">
                Comment
              </label>
              <input
                type="text"
                name="comment"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={editedGrn.comment || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="text-white px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 mr-4"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="text-white px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-700 focus:outline-none focus:bg-cyan-700"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-zinc-50">
      {selectedGrn ? (
        <DetailsView
          grnDetails={selectedGrn}
          onCancel={() => setSelectedGrn(null)}
        />
      ) : editingGrn ? (
        <EditDetailsView
          grn={grns.find((grn) => grn.id === editingGrn)}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded shadow-lg">
          <table className="table-auto w-full rounded-lg border-2 border-cyan-400 bg-white shadow-lg">
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
                  <td className="px-4 py-2 text-center">
                    {grn.purchaseOrder.orderNo}
                  </td>
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
                    <a
                      href={grn.documentPath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFileDownload}
                        className="text-purple-600 text-xl"
                      />
                    </a>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {grn.shipmentStatus ? "Complete" : "Partial"}
                  </td>
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
