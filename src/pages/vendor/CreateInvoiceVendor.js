import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateInvoiceVendor() {
    const [formData, setFormData] = useState({
        InvoiceNo: "",
        Amount: "",
        GRNId: "",
        PaymentStatus: false,
        DueDate: "",
        Document: null
    });

    const [grnNumbers, setGRNNumbers] = useState([]);

    const getAllGRNNumbers = async () => {
        try {
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

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("InvoiceNo", formData.InvoiceNo);
            formDataToSend.append("Amount", parseInt(formData.Amount));
            formDataToSend.append("GRNId", formData.GRNId);
            formDataToSend.append("PaymentStatus", formData.PaymentStatus);
            formDataToSend.append("DueDate", formData.DueDate);
            formDataToSend.append("Document", formData.Document);

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/Invoice/Add`, formDataToSend);
            console.log("Response:", res.data);
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
                    <label htmlFor="invoiceNo" className="block mb-2 text-sm font-medium text-gray-900">
                        Invoice No:
                    </label>
                    <input
                        type="text"
                        id="invoiceNo"
                        name="InvoiceNo"
                        value={formData.InvoiceNo}
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
                    <label htmlFor="grnId" className="block mb-2 text-sm font-medium text-gray-900">
                        GRN ID:
                    </label>
                    <select
                        id="grnId"
                        name="GRNId"
                        value={formData.GRNId}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                        <option value="">Select GRN ID</option>
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
                    <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">
                        Due Date & Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        name="DueDate"
                        value={formData.DueDate}
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
