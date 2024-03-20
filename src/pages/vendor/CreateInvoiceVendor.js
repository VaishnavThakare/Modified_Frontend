import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateInvoiceVendor() {
    const [formData, setFormData] = useState({
        InvoiceNumber: "",
        Amount: "",
        GRNNumber: "",
        PaymentStatus: false, // Adjusted to use boolean value
        DueDateTime: "", // Combine date and time into a single field
        Document: null
    });

    const [grnNumbers, setGRNNumbers] = useState([]);

    const getAllGRNNumbers = async () => {
        try {
            // Fetch GRN numbers from backend API
            const grnRes = await axios.get(`${process.env.REACT_APP_API_URL}/GRN/All`);
            setGRNNumbers(grnRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllGRNNumbers();
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
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/Invoice/Add`, formData);
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
                    <label htmlFor="grnNumber" className="block mb-2 text-sm font-medium text-gray-900">
                        GRN Number:
                    </label>
                    <select
                        id="grnNumber"
                        name="GRNNumber"
                        value={formData.GRNNumber}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                        <option value="">Select GRN Number</option>
                        {grnNumbers.map((grn) => (
                            <option key={grn.id} value={grn.id}>
                                {grn.id}
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
                        <option value={true}>Paid</option>
                        <option value={false}>Unpaid</option>
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
