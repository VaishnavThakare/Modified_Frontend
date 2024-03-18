import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const PoDetailsA = () => {
  // Dummy data (9 rows)
  const dummyData = [
    {
      poNo: 'PO001',
      vendorName: 'Vendor A',
      releasedOn: '2024-01-15',
      acceptedOn: '2024-01-20',
      poAmount: '$5000',
      status: 'Active',
      totalGrn: 3,
      invoices: '2 Paid / 1 Pending',
    },
    {
      poNo: 'PO002',
      vendorName: 'Vendor B',
      releasedOn: '2024-02-10',
      acceptedOn: '2024-02-15',
      poAmount: '$7000',
      status: 'Inactive',
      totalGrn: 1,
      invoices: '0 Paid / 1 Pending',
    },
    {
      poNo: 'PO003',
      vendorName: 'Vendor C',
      releasedOn: '2024-03-05',
      acceptedOn: '-',
      poAmount: '$3000',
      status: 'Active',
      totalGrn: 0,
      invoices: '0 Paid / 0 Pending',
    },
    {
        poNo: 'PO001',
        vendorName: 'Vendor A',
        releasedOn: '2024-01-15',
        acceptedOn: '2024-01-20',
        poAmount: '$5000',
        status: 'Active',
        totalGrn: 3,
        invoices: '2 Paid / 1 Pending',
      },
      {
        poNo: 'PO002',
        vendorName: 'Vendor B',
        releasedOn: '2024-02-10',
        acceptedOn: '2024-02-15',
        poAmount: '$7000',
        status: 'Inactive',
        totalGrn: 1,
        invoices: '0 Paid / 1 Pending',
      },
      {
        poNo: 'PO003',
        vendorName: 'Vendor C',
        releasedOn: '2024-03-05',
        acceptedOn: '-',
        poAmount: '$3000',
        status: 'Active',
        totalGrn: 0,
        invoices: '0 Paid / 0 Pending',
      },{
        poNo: 'PO001',
        vendorName: 'Vendor A',
        releasedOn: '2024-01-15',
        acceptedOn: '2024-01-20',
        poAmount: '$5000',
        status: 'Active',
        totalGrn: 3,
        invoices: '2 Paid / 1 Pending',
      },
      {
        poNo: 'PO002',
        vendorName: 'Vendor B',
        releasedOn: '2024-02-10',
        acceptedOn: '2024-02-15',
        poAmount: '$7000',
        status: 'Inactive',
        totalGrn: 1,
        invoices: '0 Paid / 1 Pending',
      },
      {
        poNo: 'PO003',
        vendorName: 'Vendor C',
        releasedOn: '2024-03-05',
        acceptedOn: '-',
        poAmount: '$3000',
        status: 'Active',
        totalGrn: 0,
        invoices: '0 Paid / 0 Pending',
      },{
        poNo: 'PO001',
        vendorName: 'Vendor A',
        releasedOn: '2024-01-15',
        acceptedOn: '2024-01-20',
        poAmount: '$5000',
        status: 'Active',
        totalGrn: 3,
        invoices: '2 Paid / 1 Pending',
      },
      {
        poNo: 'PO002',
        vendorName: 'Vendor B',
        releasedOn: '2024-02-10',
        acceptedOn: '2024-02-15',
        poAmount: '$7000',
        status: 'Inactive',
        totalGrn: 1,
        invoices: '0 Paid / 1 Pending',
      },
      {
        poNo: 'PO003',
        vendorName: 'Vendor C',
        releasedOn: '2024-03-05',
        acceptedOn: '-',
        poAmount: '$3000',
        status: 'Active',
        totalGrn: 0,
        invoices: '0 Paid / 0 Pending',
      },{
        poNo: 'PO001',
        vendorName: 'Vendor A',
        releasedOn: '2024-01-15',
        acceptedOn: '2024-01-20',
        poAmount: '$5000',
        status: 'Active',
        totalGrn: 3,
        invoices: '2 Paid / 1 Pending',
      },
      {
        poNo: 'PO002',
        vendorName: 'Vendor B',
        releasedOn: '2024-02-10',
        acceptedOn: '2024-02-15',
        poAmount: '$7000',
        status: 'Inactive',
        totalGrn: 1,
        invoices: '0 Paid / 1 Pending',
      },
      {
        poNo: 'PO003',
        vendorName: 'Vendor C',
        releasedOn: '2024-03-05',
        acceptedOn: '-',
        poAmount: '$3000',
        status: 'Active',
        totalGrn: 0,
        invoices: '0 Paid / 0 Pending',
      },
  ];

  
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;
  
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
 
  const indexOfLastItem = currentPage * itemsPerPage;
  
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  
  const handleEdit = (poNo) => {
    
    console.log('Editing PO:', poNo);
  };

  const handleView = (poNo) => {
    
    console.log('Viewing details of PO:', poNo);
  };

 
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(dummyData.length / itemsPerPage)));
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto mt-40 ml-60 mr-10 border rounded border-gray-300">
        <table className="table-auto w-full border-collapse rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Sr. No.</th>
              <th className="px-4 py-2 text-left">Purchase Order No.</th>
              <th className="px-4 py-2 text-left">Vendor Name</th>
              <th className="px-4 py-2 text-left">Released On</th>
              <th className="px-4 py-2 text-left">Accepted On</th>
              <th className="px-4 py-2 text-left">PO Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total GRN against PO</th>
              <th className="px-4 py-2 text-left">Paid Invoice / Pending Invoices</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <React.Fragment key={indexOfFirstItem + index + 1}>
                <tr>
                  <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-2">{item.poNo}</td>
                  <td className="px-4 py-2">{item.vendorName}</td>
                  <td className="px-4 py-2">{item.releasedOn}</td>
                  <td className="px-4 py-2">{item.acceptedOn}</td>
                  <td className="px-4 py-2">{item.poAmount}</td>
                  <td className="px-4 py-2">
                    <button
                      className={`py-1 px-2 rounded ${
                        item.status === 'Active' ? 'bg-cyan-100 text-cyan-400' : 'bg-red-100 text-red-600'
                      }`}
                      style={{ minWidth: '6rem' }} 
                    >
                      {item.status === 'Active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-2">{item.totalGrn}</td>
                  <td className="px-4 py-2">{item.invoices}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleEdit(item.poNo)} className="mr-2">
                      <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                    </button>
                    <button onClick={() => handleView(item.poNo)}>
                      <FontAwesomeIcon icon={faEye} className="text-blue-500" />
                    </button>
                  </td>
                </tr>
                {(index + 1) % 10 === 0 && (
                  <tr key={`pagination-${index}`} className="bg-gray-200">
                    <td colSpan="10" className="text-center py-2">
                      Pagination Here
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute right-0 top-20 mt-60 mr-10 ml-500 flex"> 
        <button onClick={handlePrevPage} className="bg-gray-200 rounded-md px-3 py-1 mr-3">
          <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600 mr-1" />
          Previous
        </button>
        <button onClick={handleNextPage} className="bg-gray-200 rounded-md px-3 py-1">
          Next
          <FontAwesomeIcon icon={faArrowRight} className="text-gray-600 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PoDetailsA