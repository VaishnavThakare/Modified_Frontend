// AdminGrnDetailsView.js
import React from "react";

const AdminGrnDetailsView = ({ selectedGrn, formatDateTime, openDocument }) => {
  return (
    <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
      <div className="bg-white p-6 rounded-md shadow-md" style={{ height: "fit-content" }}>
        <div className="relative">
          <p className="text-gray-900">
            <span className="font-bold">GRN No.:</span>: {selectedGrn.grnNo}
          </p>
          <p></p>
          <p className="text-gray-900">
            <span className="font-bold">PO Amount:</span>: {selectedGrn.purchaseOrder.orderAmount}
          </p>
          <p></p>
          <p className="text-gray-900">
            <span className="font-bold">Send On: </span>: {formatDateTime(selectedGrn.sendOn)}
          </p>
          <p></p>
          <p className="text-gray-900">
            <span className="font-bold">Comments:</span>: {selectedGrn.comment}
          </p>
          <p></p>
          <p className="text-gray-900">
            <span className="font-bold">Is Accepted:</span>: {selectedGrn.isAccepted ? "Yes" : "No"}
          </p>
          <p></p>
          <p className="text-gray-900">
            <span className="font-bold">Payment Status:</span>: {selectedGrn.paymentStatus ? "Paid" : "Unpaid"}
          </p>
          <p></p>
          <p className="text-gray-900">
            {selectedGrn.documentPath && (
              <button
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openDocument(selectedGrn.documentPath)}
              >
                View Document
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminGrnDetailsView;
