import React, { useState } from 'react';

const UpdateInvoiceVendor = () => {
  // Define state variables to hold the updated invoice details
  const [invoiceNo, setInvoiceNo] = useState('');
  const [amount, setAmount] = useState(0);
  const [grnId, setGrnId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [document, setDocument] = useState(null);

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the updated invoice details to the server or perform any other necessary actions
    console.log('Updated invoice details:', {
      invoiceNo,
      amount,
      grnId,
      paymentStatus,
      dueDate,
      document
    });
  };

  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform">
        <div className="flex text-2xl font-bold text-gray-500 mb-5">
          <h2>Update Invoice</h2>
        </div>
        <div className="mb-6 relative">
          <label htmlFor="invoiceNo" className="block mb-2 text-sm font-medium text-gray-900">
            Invoice No:
          </label>
          <input
            type="text"
            id="invoiceNo"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="grnId" className="block mb-2 text-sm font-medium text-gray-900">
            GRN Id:
          </label>
          <input
            type="text"
            id="grnId"
            value={grnId}
            onChange={(e) => setGrnId(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="paymentStatus" className="block mb-2 text-sm font-medium text-gray-900">
            Payment Status:
          </label>
          <select
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value === 'true')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value={true}>Paid</option>
            <option value={false}>Unpaid</option>
          </select>
        </div>
        <div className="mb-6 relative">
          <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">
            Due Date:
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            onChange={(e) => setDocument(e.target.files[0])}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Invoice
        </button>
      </form>
    </div>
  );
};

export default UpdateInvoiceVendor;
