import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getData = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/Project/All`;

      if (filterOn === "all") {
        fetchProjectData();
      } else if (filterOn && filterVal) {
        url += `?filterOn=${filterOn}&filterVal=${filterVal}`;
      }

      const response = await axios.get(url);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "filterOn") {
      setFilterOn(event.target.value);
    } else if (event.target.name === "filterVal") {
      setFilterVal(event.target.value);
    }   getData();
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Project/All`
      );

      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  useEffect(() => {
    // Fetch project data when the component mounts
    fetchProjectData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Projects</h2>
          </div>
          <div className="searchFilter">
            <select
              id="filterOn"
              name="filterOn"
              value={filterOn}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2 "
            >
              <option value="all">All</option>
              <option value="projectStatus">Project Status</option>
              <option value="projectHead">Project Head</option>
            </select>
            <input
              type="text"
              id="filterVal"
              name="filterVal"
              value={filterVal}
              onChange={handleChange}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2"
              placeholder="Enter filter value"
            />
          </div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Project Head Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Project Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Created On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentItems.map((proj, index) => (
                <tr key={proj.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {proj.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {proj.projectHeadName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                        {proj.projectStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {proj.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {new Date(proj.createdOn).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }).map(
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
