import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , Route, Router, Routes} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowLeft,
  faArrowRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function VendorVerification() {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    // Fetch Vendors data when the component mounts
    fetchVendorsData();
  }, []);

  const fetchVendorsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Vendor/All`);
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching Vendor data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vendors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="mt-4 flex text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">VENDOR VERIFICATION</h2>
          </div>
          <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-80 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50  px-8 pt-3 rounded-bl-lg rounded-br-lg">
          
        <div className="shadow-xl">
        <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
      <table className="min-w-full  bg-white">
        <thead>
          <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                  Sr. No
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                Vendor Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                Document Comment
                </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentItems.map((vendor, index) => (
            <tr key={vendor.id}>
              <td className="px-6 py-4 whitespace-no-wrap text-center">
                    <div className="text-sm leading-5">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center">
                    <div className="text-sm leading-5">
                      {vendor.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center">
                    <div className="text-sm leading-5">
                    {vendor.isVerified ? "Verified":"Not Verified"} 
                    </div>
                  </td>
              <td className="px-6 py-4 whitespace-no-wrap text-center">
                <div className="text-sm leading-5">
                    
                  <Link to={`/admin/document-verification/${vendor.id}`}>
                    <button
                      
                      className={`mr-2`}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className={`text-purple-600 text-xl`}
                      />
                    </button></Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(vendors.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${
                currentPage === index + 1 ? "bg-cyan-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      <ToastContainer/>
    </>
  );
}