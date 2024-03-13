import React, { useState, useEffect } from "react";
import axios from "axios";



export default function RFPA() {
  const [rfps, setRFPs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filterOption, setFilterOption] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vendorCategories, setVendorCategories] = useState([]);

  useEffect(() => {
    // Fetch RFP data when the component mounts
    const fetchRFPData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/RFP/All`
        );

        setRFPs(response.data);

        const uniqueCategories = Array.from(new Set(response.data.map((rfp) => rfp.vendorCategory.name)));
        setVendorCategories(['all', ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching RFP data:", error);
      }
    };

    fetchRFPData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = rfps
    .filter((rfp) => {
      if (filterOption === 'all') return true;
      return rfp.vendorCategory.name === filterOption;
    })
    .filter((rfp) => rfp.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Request for Proposal</h2>
          </div>

          <div className="mb-5 searchFilter">
          <div>
            {/* Select option for filtering */}
            <div className="mt-4 align-content: flex-end;">
              <label className="mr-2">Filter by Vendor Category:</label>
              <select value={filterOption} onChange={handleFilterChange}>
                {vendorCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category === 'all' ? 'All' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input field for additional filtering */}
          <div className="mt-2">
            <label className="mr-2 ml-10">Filter by Title:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2"
            />
          </div>

          </div>

          
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Vendor Category
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  End On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentItems.map((rfp, index) => (
                <tr key={rfp.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {rfp.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      <a href={rfp.document}>Download</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {rfp.project.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {rfp.vendorCategory.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {new Date(rfp.endDate).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(rfps.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
}
