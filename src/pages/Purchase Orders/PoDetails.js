import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const PoDetails = () => {
  const { id } = useParams();
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [grn, setGrn] = useState([]);

  useEffect(() => {
    fetchPurchaseOrder(id);
  }, [id]);

  const fetchPurchaseOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/PurchaseOrder/${orderId}`
      );
      setSelectedPurchaseOrder(response.data);
      fetchGrns(orderId);
    } catch (error) {
      console.error("Error fetching Purchase order:", error);
    }
  };

  const fetchGrns = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GRN/PurchaseOrder/${orderId}`
      );
      setGrn(response.data);
    } catch (error) {
      console.error("Error fetching GRNs:", error.message);
    }
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

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  if (!selectedPurchaseOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Purchase Order Details</h1>
      <p>Order No: {selectedPurchaseOrder.orderNo}</p>
      <p>Vendor Name: {selectedPurchaseOrder.vendorName}</p>
      <p>Created On: {formatDateTime(selectedPurchaseOrder.createdOn)}</p>
      {/* Add other details as needed */}
      
      {selectedPurchaseOrder.documentPath && (
        <button
          onClick={() => openDocument(selectedPurchaseOrder.documentPath)}
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
          View Document
        </button>
      )}

      <h2>GRN List</h2>
      <ul>
        {grn.map((grnItem) => (
          <li key={grnItem.id}>
            <Link to={`/grns/${grnItem.id}`}>
              GRN No: {grnItem.grnNo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoDetails;
