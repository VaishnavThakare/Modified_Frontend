import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
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
    fetchVendorData();
  }, []);

  const renderSerialNumber = (index) =>
    (currentPage - 1) * itemsPerPage + index + 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePaginationButtonsVendor = (totalPages) => {
    return Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        className={`mx-1 px-4 py-2 ${
          currentPage === index + 1 ? "bg-cyan-500 text-white" : "bg-gray-300"
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

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg ">
        <div className="flex text-xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">Vendors</h2>
        </div>
        <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="shadow-lg">
          <div className="rounded-lg border-2 border-cyan-500 p-0.5 shadow-xl">
            <table className="min-w-full rounded-lg bg-white">
              <thead>
                <tr>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Sr. No.
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Name
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Organization Name
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Email
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Phone Number
                  </th>

                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Address
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Pincode
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Category
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Document List
                  </th>
                  <th className="font-semibold px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentVendors.map((vendor, index) => (
                  <tr key={vendor.id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <div className="text-sm text-center leading-5">
                        {renderSerialNumber(index)}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.name}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.organizationName}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.email}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.phoneNumber}
                      </div>
                    </td>


                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {`${vendor.address}, ${vendor.city}, ${vendor.state}`}
                        
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.pincode}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.vendorCategory.name}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                      <div class="text-sm text-center leading-5">
                        {vendor.documentsUploadList.map((item, index) => (
                          <p key={index}>{item.documentName}</p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <div className="text-sm text-center leading-5">
                        <Link to={`/admin/vendor-detailsadm/${vendor.id}`}>
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-cyan-500 text-lg"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {generatePaginationButtonsVendor(
          Math.ceil(vendors.length / itemsPerPage)
        )}
      </div>
    </div>
  );
};

export default VendorList;
