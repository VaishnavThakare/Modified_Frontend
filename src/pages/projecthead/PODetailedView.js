import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExternalLinkAlt, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';

const PODetailedView = () => {
    const { id } = useParams();
    const [poDetails, setPoDetails] = useState(null);

    useEffect(() => {
        const fetchPoDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/PurchaseOrder/${id}`);
                setPoDetails(response.data);
            } catch (error) {
                console.error("Error fetching PO details:", error);
                toast.error("Error fetching PO details");
            }
        };
        fetchPoDetails();
    }, [id]);

    const openDocument = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="ml-96 items-center justify-center h-screen">
            <div className="rounded-lg border-2 border-cyan-400 bg-white shadow-lg p-4 max-w-lg w-full mt-2">
                <h3 className="text-lg font-medium mb-2">PO Details</h3>
                {poDetails ? (
                    <div className="space-y-4">
                        <div>
                            <span className="font-bold">Order No.:</span> {poDetails.orderNo}
                        </div>
                        <div>
                            <span className="font-bold">Vendor Id:</span> {poDetails.vendorId}
                        </div>
                        <div>
                            <span className="font-bold">Vendor Name:</span> {poDetails.vendorName}
                        </div>
                        <div>
                            <span className="font-bold">Release Date:</span> {new Date(poDetails.releaseDate).toLocaleString()}
                        </div>
                        <div>
                            <span className="font-bold">Expected Delivery:</span> {new Date(poDetails.expectedDelivery).toLocaleString()}
                        </div>
                        <div>
                            <span className="font-bold">Order Amount:</span> {poDetails.orderAmount}
                        </div>
                        <div>
                            <span className="font-bold">Document:</span>{" "}
                            {poDetails.documentPath && (
                                <button
                                    className="text-blue-500"
                                    onClick={() => openDocument(poDetails.documentPath)}
                                >
                                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                                    View Document
                                </button>
                            )}
                        </div>
                        <div>
                            <span className="font-bold">Comment:</span> {poDetails.comment}
                        </div>
                        <div>
                            <span className="font-bold">Created On:</span>{" "}
                            {new Date(poDetails.createdOn).toLocaleString()}
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-cyan-600 hover:bg-cyan-700 mr-4 text-white font-bold py-2 px-4 rounded"
                        onClick={() => window.history.back()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PODetailedView;
