import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

const VendorDetailsView = () => {
  const { invoiceNo } = useParams();
  const [invoice, setInvoice] = useState(null);

  

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/api/invoice?invoiceNo=${invoiceNo}`);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        
       
      }
    };

    fetchInvoice();
  }, [invoiceNo]);

  if (!invoice) {
   
    return <div>Loading...</div>; 
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 ">
      <h1 className="text-cyan-500 text-2xl font-bold mb-4 ">
      <span className="border-b-2 border-cyan-500 inline-block">VENDOR INVOICE DETAILS</span>
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 border-2 border-cyan-500">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold  text-gray-600">Invoice No.</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.invoiceNo}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold  text-gray-600">GRN No.</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.grnNo}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold text-gray-600">Amount</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.amount}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold  text-gray-600">Status</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.isAccepted ? 'Accepted' : 'Rejected'}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold  text-gray-600">Payment Status</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.paymentStatus ? 'Paid' : 'Unpaid'}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-1/4">
              <p className="text-lg font-bold  text-gray-600">Release Date</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.releaseDate.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-1/4">
              <p className="text-lg font-bold  text-gray-600">Due Date</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.dueDate.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold text-gray-600">Comment</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{invoice.comment}</p>
            </div>
          </div>
        
        </form>
      </div>
    </div>
  );
};

export default VendorDetailsView;