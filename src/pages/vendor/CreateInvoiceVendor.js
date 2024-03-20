import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateInvoiceVendor() {
    const [formData, setFormData] = useState({
        InvoiceNumber: "",
        // Date: "",
        Amount: "",
        // GRNNumber: "",
        PONumber: "",
        // S: "",
        PaymentStatus: "",
        DueDateTime: "", // Combine date and time into a single field
        Document: null
    });

    const [poNumbers, setPoNumbers] = useState([]);

    const getAllPoNumbers = async () => {
        try {
            // Fetch PO numbers from backend API
            const poRes = await axios.get("https://backend-api-url/poNumbers");
            setPoNumbers(poRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPoNumbers();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setFormData({ ...formData, Document: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted:", formData);

        // Add your form submission logic here, e.g., sending data to backend API
        try {
            // Example: Submitting data to backend API
            const formDataToSend = new FormData();
            formDataToSend.append('InvoiceNumber', formData.InvoiceNumber);
            formDataToSend.append('Amount', formData.Amount);
            formDataToSend.append('PONumber', formData.PONumber);
            formDataToSend.append('PaymentStatus', formData.PaymentStatus);
            formDataToSend.append("DueDateTime", formData.DueDateTime); // Use combined field
            formDataToSend.append('Document', formData.Document);

            const res = await axios.post("https://backend-api-url/invoices", formDataToSend);
            console.log("Response:", res.data);
            // Add further actions based on response if needed
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform">
                <div className="flex text-2xl font-bold text-gray-500 mb-5">
                    <h2>Create Invoice</h2>
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="invoiceNumber" className="block mb-2 text-sm font-medium text-gray-900">
                        Invoice Number:
                    </label>
                    <input
                        type="text"
                        id="invoiceNumber"
                        name="InvoiceNumber"
                        value={formData.InvoiceNumber}
                        onChange={handleInputChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
                        Amount:
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="Amount"
                        value={formData.Amount}
                        onChange={handleInputChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="poNumber" className="block mb-2 text-sm font-medium text-gray-900">
                        PO Number:
                    </label>
                    <select
                        id="poNumber"
                        name="PONumber"
                        value={formData.PONumber}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                        <option value="">Select PO Number</option>
                        {poNumbers.map((po) => (
                            <option key={po.id} value={po.number}>
                                {po.number}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="paymentStatus" className="block mb-2 text-sm font-medium text-gray-900">
                        Payment Status:
                    </label>
                    <select
                        id="paymentStatus"
                        name="PaymentStatus"
                        value={formData.PaymentStatus}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                        <option value="">Select Payment Status</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="dueDateTime" className="block mb-2 text-sm font-medium text-gray-900">
                        Due Date & Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="dueDateTime"
                        name="DueDateTime"
                        value={formData.DueDateTime}
                        onChange={handleInputChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="document" className="block mb-2 text-sm font-medium text-gray-900">
                        Document:
                    </label>
                    <input
                        type="file"
                        id="document"
                        name="Document"
                        onChange={handleFileChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateInvoiceVendor;
