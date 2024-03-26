import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEdit,
    faArrowLeft,
    faArrowRight,
    faExternalLinkAlt,
    faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PoDetailsV  = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [GRNs, setGRNs] = useState([]);
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const itemsPerPage = 5;
    const sid = sessionStorage.getItem("sid");
    const [currentPage, setCurrentPage] = useState(1);

    const checkVerified = async () => {
        try {
            const sid = sessionStorage.getItem("sid");
            const vendorCatRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/Vendor/${sid}`
            );
            console.log(vendorCatRes);
            if (!vendorCatRes.data.isVerified) navigate("/vendor/upload-document");
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7254/api/PurchaseOrder/Vendor/${sid}`
                );
                setPurchaseOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching purchase orders:", error);
                toast.error("Error fetching purchase orders");
            }
        };

        checkVerified();
        fetchPurchaseOrders();
    }, [sid]);

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

    const handleView = async (id) => {
        try {
            const response = await axios.get(
                `https://localhost:7254/api/PurchaseOrder/${id}`
            );
            const responseGRNs = await axios.get(
                `https://localhost:7254/api/GRN/PurchaseOrder/${id}`
            );
            setSelectedPurchaseOrder(response.data);
            setGRNs(responseGRNs.data);
            console.log(responseGRNs.data);
            setShowDetails(true);
        } catch (error) {
            console.error("Error fetching Purchase order:", error);
            toast.error("Error fetching Purchase order");
        }
    };

    const openDocument = (url) => {
        window.open(url, "_blank");
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedPurchaseOrder(null);
    };

    const navigate = useNavigate();

    const handleEdit = (orderId) => {
        navigate(`/vendor/po-check/${orderId}`);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) =>
            Math.min(prevPage + 1, Math.ceil(purchaseOrders.length / itemsPerPage))
        );
    };

    // Function to format the timestamp to a readable date and time
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

            {showDetails && selectedPurchaseOrder && (
                <>
                    <div className="flex text-2xl font-bold text-gray-500">
                        <h2 className="text-left text-cyan-500">Purchase Order Details:</h2>
                    </div>
                    <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
                    <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
                    <div className="rounded-lg border-2 border-cyan-400 bg-white shadow-lg p-4  w-full mt-2">

                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="py-2">
                                        <span className="font-bold">Purchase Order No.:</span>
                                    </td>
                                    <td className="py-2">{selectedPurchaseOrder.orderNo}</td>
                                    <td className="py-2">
                                        <span className="font-bold">Vendor Name.:</span>
                                    </td>
                                    <td className="py-2">{selectedPurchaseOrder.vendorName}</td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <span className="font-bold">Created On:</span>
                                    </td>
                                    <td className="py-2">
                                        {selectedPurchaseOrder.createdOn
                                            ? formatDateTime(selectedPurchaseOrder.createdOn)
                                            : "-"}
                                    </td>
                                    <td className="py-2">
                                        <span className="font-bold">Expected Delivery On:</span>
                                    </td>
                                    <td className="py-2">
                                        {selectedPurchaseOrder.expectedDelivery
                                            ? formatDateTime(selectedPurchaseOrder.expectedDelivery)
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <span className="font-bold">Sent On:</span>
                                    </td>
                                    <td className="py-2">
                                        {selectedPurchaseOrder.releaseDate
                                            ? formatDateTime(selectedPurchaseOrder.releaseDate)
                                            : "-"}
                                    </td>
                                    <td className="py-2">
                                        <span className="font-bold">Po Amount:</span>
                                    </td>
                                    <td className="py-2">{selectedPurchaseOrder.orderAmount}</td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <span className="font-bold">Status:</span>
                                    </td>
                                    <td className="py-2">
                                        {selectedPurchaseOrder.isAccepted ? "Accepted" : "Rejected"}
                                    </td>
                                    <td className="py-2">
                                        <span className="font-bold">Comments:</span>
                                    </td>
                                    <td className="py-2">{selectedPurchaseOrder.comment}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleCloseDetails}
                                className="bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
                            >
                                Close
                            </button>
                            {selectedPurchaseOrder.documentPath && (
                                <button
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => openDocument(selectedPurchaseOrder.documentPath)}
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                                    View Document
                                </button>
                            )}
                        </div>
                    </div>

                    {/*  */}
                    <div className="mt-4 flex text-2xl font-bold text-gray-500">
                        <h2 className="text-left text-cyan-500">GRN's DETAILS</h2>
                    </div>
                    <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
                    <div className="w-80 bg-cyan-500 h-0.5 mb-3"></div>

                    <div className="shadow-xl">
                        <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
                            <table className="min-w-full p-4 mb-5">
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
                                        {/* <th className="px-4 py-2 text-left">ACTION</th> */}
                                    </tr>
                                    <tr className="text-gray-600">
                                        <td colSpan="8" className="px-4 py-1">
                                            <div style={{ borderTop: "2px solid gray" }}></div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        GRNs && GRNs.length > 0 ? (
                                            GRNs.map((grn, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        {grn.grnNo}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        {grn.purchaseOrder.orderNo}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        {formatDateTime(grn.sendOn)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        <button
                                                            className={`py-1 px-2 rounded ${grn.isAccepted
                                                                ? "bg-green-200 text-green-700"
                                                                : "bg-red-200 text-red-600"
                                                                }`}
                                                            style={{ minWidth: "6rem" }}
                                                        >
                                                            {grn.isAccepted ? "Accepted" : "Pending"}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        <a
                                                            href={grn.documentPath}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faFileDownload}
                                                                className="text-cyan-600 text-xl"
                                                            />
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        {grn.shipmentStatus ? (
                                                            <span className="text-green-500">Complete</span>
                                                        ) : (
                                                            <span className="text-red-500">Partial</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-center">
                                                        {grn.comment}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center">
                                                    No GRN's available.
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {!showDetails && (
                <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
                    <div className="flex text-2xl font-bold text-gray-500">
                        <h2 className="text-left text-cyan-500">Purchase Orders List</h2>
                    </div>
                    <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
                    <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
                    <div className="shadow-xl">
                        <div className="border-2 border-cyan-500 rounded-lg shadow-md p-0.5">
                            <table className="table-auto w-full rounded-lg  bg-white">
                                <thead>
                                    <tr className="bg-white text-gray-600">
                                        <th className="px-4 py-2 text-left">
                                            Sr.<p></p> No.
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Purchase <p></p>Order No.
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Vendor<p></p>Name
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Sent<p></p> On
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            PO <p></p>Amount
                                        </th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                    <tr className="bg-white text-gray-600">
                                        <td colSpan="7" className=" px-4 py-1">
                                            <div style={{ borderTop: "2px solid gray" }}></div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-4 py-2 whitespace-no-wrap text-center text-sm"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    ) : (
                                        currentItems.map((order, index) => (
                                            <tr key={order.id} className="bg-white">
                                                <td className="px-4 py-2">
                                                    {indexOfFirstItem + index + 1}
                                                </td>
                                                <td className="px-4 py-2">{order.orderNo}</td>
                                                <td className="px-4 py-2">{order.vendorName}</td>
                                                <td className="px-4 py-2">
                                                    {formatDateTime(order.releaseDate)}
                                                </td>
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
                                                <td className="px-4 py-2">
                                                    <div className="flex">
                                                        <button onClick={() => handleView(order.id)}>
                                                            <FontAwesomeIcon
                                                                icon={faEye}
                                                                className="w-6 h-6 px-2 py-1 text-cyan-600 cursor-pointer"
                                                            />
                                                        </button>
                                                        <button onClick={() => handleEdit(order.id)}>
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                className="w-6 h-6 px-2 py-1 text-cyan-600 cursor-pointer"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
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
            )}

            <ToastContainer />
        </div>
    );
};

export default PoDetailsV ;
