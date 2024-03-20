

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faFileDownload,
  faArrowLeft,
  faArrowRight,
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
    setSelectedGrn(grnId);
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

 
const DetailsView = ({ onCancel }) => {
    const { id } = useParams();
    const [grnDetails, setGrnDetails] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchGrnDetails = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7254/api/GRN/${id}`
          );
          setGrnDetails(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching GRN details:", error.message);
          setLoading(false);
          toast.error("Failed to fetch GRN details");
        }
      };
  
      fetchGrnDetails();
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container mx-auto mt-8 bg-zinc-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-600">GRN Details</h2>
        <div className="bg-white p-6 rounded-md shadow-md border-2 border-cyan-500">
          <div>
            <p><b>GRN No:</b> {grnDetails.grnNo}</p>
            <p><b>PO No:</b> {grnDetails.purchaseOrderId}</p>
            <p><b>Sent on (date):</b> {grnDetails.sendOn}</p>
            <p><b>Status:</b> {grnDetails.isAccepted ? "Accepted" : "Pending"}</p>
            <p><b>Shipment Type:</b> {grnDetails.shipmentStatus ? "Complete" : "Partial"}</p>
            <p><b>Comment:</b> {grnDetails.comment}</p>
            {/* Add more details as needed */}
          </div>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md mt-4"
          >
            Cancel
          </button>
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
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      try {
        await axios.post(
          `https://localhost:7254/api/GRN/${id}/document`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        toast.success("Document uploaded successfully");
      } catch (error) {
        console.error("Error uploading document:", error.message);
        toast.error("Failed to upload document");
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="w-1/2 container mx-auto mt-8 bg-zinc-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Edit GRN Details</h2>
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
                htmlFor="PurchaseOrderId"
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
                htmlFor="ShipmentType"
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
            <div className="mb-6">
              <label className="mr-4 block text-lg font-semibold text-lg text-gray-700">
                Document
              </label>
              <input type="file" name="file" onChange={handleFileChange} />
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
        <>
          <DetailsView grn={grns.find((grn) => grn.id === selectedGrn)}  onCancel={handleCancelEdit}/>
          {/* Hide next and previous buttons on DetailsView page */}
        </>
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
                <th className="px-4 py-2 text-center">Sent on (date)</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">
                  View & download document
                </th>
                <th className="px-4 py-2 text-center">Shipment Type</th>
                <th className="px-4 py-2 text-center">Comment</th>
                <th className="px-4 py-2 text-center">Action</th>
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
      <td className="px-4 py-2 text-center">{grn.purchaseOrderId}</td>
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
        <a href={grn.documentPath} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faFileDownload}
            className="text-purple-600 text-xl"
          />
        </a>
      </td>
      <td className="px-4 py-2 text-center">{grn.shipmentStatus ? "Complete" : "Partial"}</td>
      <td className="px-4 py-2 text-center">{grn.comment}</td>
      <td className="px-4 py-2 text-center">
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









