import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function RFPA() {
  const [rfps, setRFPs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorCategories, setVendorCategories] = useState([]);
  const [isShow,SetIsShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch RFP data when the component mounts
    const fetchRFPData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/RFP/All`
        );

        setRFPs(response.data);

        const uniqueCategories = Array.from(
          new Set(response.data.map((rfp) => rfp.vendorCategory.name))
        );
        setVendorCategories(["all", ...uniqueCategories]);
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
      if (filterOption === "all") return true;
      return rfp.vendorCategory.name === filterOption;
    })
    .filter((rfp) =>
      rfp.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div className="mt-4 flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">REQUEST FOR PROPOSAL</h2>
        </div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-80 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50  px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="mb-5 searchFilter">
            <div className="flex flex-row justify-end">
              {/* Select option for filtering */}

              <label className="mr-2 mt-3">Filter by Vendor Category:</label>
              <select
                value={filterOption}
                onChange={handleFilterChange}
                className="align-middle"
              >
                {vendorCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category === "all" ? "All" : category}
                  </option>
                ))}
              </select>

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
          </div>

          <div className="shadow-xl">
            <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
              <table className="min-w-full rounded-lg bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Sr.No
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Vendor Category
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      End On
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 whitespace-no-wrap text-center"
                      >
                        Loading ...
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((rfp, index) => (
                      <tr key={rfp.id}>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="text-sm leading-5">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="text-sm leading-5">{rfp.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="text-sm leading-5">
                            {rfp.project.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="text-sm leading-5">
                            {rfp.vendorCategory.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="text-sm leading-5">
                            {new Date(rfp.endDate).toLocaleDateString("es-CL")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <button
                          >
                            <a href={rfp.documentPath} target="_blank">
                              <FontAwesomeIcon
                                icon={faFileDownload}
                                className="text-cyan-600 text-xl"
                              />
                            </a>
                          </button>
                        </td>
                        <td className="flex items-center px-6 py-4 whitespace-no-wrap text-center">
                        <button 
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-cyan-600 text-xl"
                              onClick={() => {navigate(`/admin/rfp/${rfp.id}`); }}
                            />
                          </button>
                          <button className="ml-2"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="text-cyan-600 text-xl"
                              onClick={() => { navigate(`/admin/rfp/view/${rfp.id}`); }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(rfps.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${currentPage === index + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-300"
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
