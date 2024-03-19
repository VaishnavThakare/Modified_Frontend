import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [vendors, setVendors] = useState([]);
  const [projectHeads, setProjectHeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  useEffect(() => {
    // Fetch vendor data when the component mounts
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/All`
        );

        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    const fetchProjectHeadData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ProjectHead/All`
        );

        setProjectHeads(response.data);
      } catch (error) {
        console.error("Error fetching project head data:", error);
      }
    };

    fetchVendorData();
    fetchProjectHeadData();
  }, []);

  const renderSerialNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePaginationButtonsVendor = (totalPages) => {
    return Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        className={`mx-1 px-4 py-2 ${
          currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => paginate(index + 1)}
      >
        {index + 1}
      </button>
    ));
  };

  const generatePaginationButtonsProjectHead = (totalPages) => {
    return Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        className={`mx-1 px-4 py-2 ${
          currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => paginate(index + 1)}
      >
        {index + 1}
      </button>
    ));
  };

  const indexOfLastVendor = currentPage * itemsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const indexOfLastProjectHead = currentPage * itemsPerPage;
  const indexOfFirstProjectHead = indexOfLastProjectHead - itemsPerPage;
  const currentProjectHeads = projectHeads.slice(indexOfFirstProjectHead, indexOfLastProjectHead);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg ">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center ">
            <h2>Vendors</h2>
          </div>

          <table className="min-w-full border-2 border-cyan-600 mb-5">
          <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Sr. No.
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Organization Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Pincode
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Document List
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentVendors.map((vendor, index) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5 text-blue-900">
                  {renderSerialNumber(index)}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.name}
                    </div>
                  </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.organizationName}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.email}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.phoneNumber}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.state}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.city}
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.address}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.pincode}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.vendorCategory.name}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">
                      {vendor.documentsUploadList
                        .map((item, index) =>
                            <p key={index}>
                              {item.documentName}
                            </p>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {generatePaginationButtonsVendor(Math.ceil(vendors.length / itemsPerPage))}
        </div>
      </div>

     
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg ">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Project Head</h2>
          </div>

          <table className="min-w-full  border-2 border-cyan-600 mb-5">
          <thead>
              <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Sr. No.
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentProjectHeads.map((head, index) => (
                <tr key={head.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5 text-blue-900">
                  {renderSerialNumber(index)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {head.name}
                    </div>
                  </td>
              
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {head.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {head.phoneNumber}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {generatePaginationButtonsProjectHead(Math.ceil(projectHeads.length / itemsPerPage))}
        </div>
      </div>
    </>
  );
}