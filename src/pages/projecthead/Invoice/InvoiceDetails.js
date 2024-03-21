import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExternalLinkAlt, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoiceDetails, setInvoiceDetails] = useState(null);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/Invoice/${id}`);
                setInvoiceDetails(response.data);
            } catch (error) {
                console.error("Error fetching Invoice details:", error);
                toast.error("Error fetching Invoice details");
            }
        };
        fetchInvoiceDetails();
    }, [id]);

    const openDocument = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="ml-96 items-center justify-center h-screen">
            <div className="rounded-lg border-2 border-cyan-400 bg-white shadow-lg p-4 max-w-lg w-full mt-2">
                <h3 className="text-lg font-medium mb-2">Invoice Details</h3>
                {invoiceDetails ? (
                    <div className="space-y-4">
                        <div>
                            <span className="font-bold">Invoice No.:</span> {invoiceDetails.invoiceNo}
                        </div>
                        <div>
                            <span className="font-bold">Amount:</span> {invoiceDetails.amount}
                        </div>
                        <div>
                            <span className="font-bold">Sent On:</span> {new Date(invoiceDetails.sendOn).toLocaleString()}
                        </div>
                        <div>
                            <span className="font-bold">Due Date:</span> {new Date(invoiceDetails.dueDate).toLocaleString()}
                        </div>
                        <div>
                            <span className="font-bold">Payment Status:</span> {invoiceDetails.paymentStatus ? "Paid" : "Unpaid"}
                        </div>
                        <div>
                            <span className="font-bold">Document:</span>{" "}
                            {invoiceDetails.documentPath && (
                                <button
                                    className="text-blue-500"
                                    onClick={() => openDocument(invoiceDetails.documentPath)}
                                >
                                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                                    View Document
                                </button>
                            )}
                        </div>
                        <div>
                            <span className="font-bold">Comment:</span> {invoiceDetails.comment}
                        </div>
                        <div>
                            <span className="font-bold">Created On:</span>{" "}
                            {new Date(invoiceDetails.createdOn).toLocaleString()}
                        </div>
                        <div>
                            <span className="font-bold">Last Modified On:</span>{" "}
                            {new Date(invoiceDetails.lastModifiedOn).toLocaleString()}
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

export default InvoiceDetails;
