import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PoGrnView = () => {
  const { grnId } = useParams();
  const navigate = useNavigate();
  const [grnDetails, setGrnDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grnResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/GRN/${grnId}`
        );
        const invoicesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/Invoice/GRN/${grnId}`
        );

        setGrnDetails({
          grnNo: grnResponse.data.grnNo,
          purchaseOrder: grnResponse.data.purchaseOrder,
          sendOn: grnResponse.data.sendOn,
          comment: grnResponse.data.comment,
          shipmentStatus: grnResponse.data.shipmentStatus,
          invoiceStatus: grnResponse.data.invoiceStatus,
          documentPath: grnResponse.data.documentPath,
          invoices: invoicesResponse.data,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [grnId]);

  const handleCloseDetails = () => {
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

  if (loading) {
    return <div>Loading GRN details...</div>;
  }

  if (!grnDetails) {
    return <div>GRN details not found.</div>;
  }

  const currentInv = grnDetails.invoices || [];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex text-2xl font-bold text-gray-500 ">
            <h2 className="text-left text-cyan-500">GRN Details</h2>
          </div>
          <div className="w-52 bg-cyan-400 h-0.5 mb-1"></div>
          <div className="w-96 bg-cyan-400 h-0.5 mb-5"></div>
        </div>
        <div>
          <div className="flex justify-center">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseDetails}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="relative">
            <p className="text-gray-900">
              <span className="font-bold">GRN No.:</span> {grnDetails.grnNo}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">PO Amount:</span>{" "}
              {grnDetails.purchaseOrder.orderAmount}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Send On:</span>{" "}
              {formatDateTime(grnDetails.sendOn)}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Comment:</span> {grnDetails.comment}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Shipment Status:</span>{" "}
              {grnDetails.shipmentStatus ? "Shipped" : "Not Shipped"}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Invoice Status:</span>{" "}
              {grnDetails.invoiceStatus ? "Invoiced" : "Not Invoiced"}
            </p>
            <div className="mt-4">
              <a
                href={grnDetails.documentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View GRN Document
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex text-2xl font-bold text-gray-500 mt-14">
        <h2 className="text-left text-cyan-500 ">ALL INVOICES</h2>
      </div>
      <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
      <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
      <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded-lg shadow-lg">
        <table className="table-auto w-full rounded-lg  bg-white ">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-center">INVOICE NO.</th>
              <th className="px-4 py-2 text-center">AMOUNT</th>
              <th className="px-4 py-2 text-center">SENT ON (DATE)</th>
              <th className="px-4 py-2 text-center">COMMENT</th>
              <th className="px-4 py-2 text-center">STATUS</th>
              <th className="px-4 py-2 text-center">PAYMENT STATUS</th>
              <th className="px-4 py-2 text-center">ACTIONS</th>
            </tr>
            <tr className="text-gray-600">
              <td colSpan="8" className="px-4 py-1">
                <div style={{ borderTop: "2px solid gray" }}></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {currentInv.map((inv) => (
              <tr key={inv.id} className="bg-white">
                <td className="px-4 py-2 text-center text-sm">
                  {inv.invoiceNo}
                </td>
                <td className="px-4 py-2 text-center text-sm">{inv.amount}</td>
                <td className="px-4 py-2 text-center text-sm">{inv.sendOn}</td>
                <td className="px-4 py-2 text-center text-sm">{inv.comment}</td>
                <td className="px-4 py-2 text-center text-sm">
                  <button
                    className={`py-1 px-2 rounded ${
                      inv.isAccepted
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {inv.isAccepted ? "Approved" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 text-center text-sm">
                  <button
                    className={`py-1 px-2 rounded ${
                      inv.paymentStatus
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-600"
                    }`}
                    style={{ minWidth: "6rem" }}
                  >
                    {inv.paymentStatus ? "Approved" : "Rejected"}
                  </button>
                </td>
                <td className="px-4 py-2 bg-white text-center text-sm">
                  <Link className={`mr-2`} to={`/admin/details/${inv.id}`}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`text-cyan-600 text-xl`}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoGrnView;
