import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectHeadList = () => {
  const [projectHeads, setProjectHeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  useEffect(() => {
    // Fetch vendor data when the component mounts

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

    fetchProjectHeadData();
  }, []);

  const renderSerialNumber = (index) =>
    (currentPage - 1) * itemsPerPage + index + 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePaginationButtonsProjectHead = (totalPages) => {
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

  const indexOfLastProjectHead = currentPage * itemsPerPage;
  const indexOfFirstProjectHead = indexOfLastProjectHead - itemsPerPage;
  const currentProjectHeads = projectHeads.slice(
    indexOfFirstProjectHead,
    indexOfLastProjectHead
  );

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50  px-8 pt-3 rounded-bl-lg rounded-br-lg ">
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">Project Head</h2>
        </div>
        <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="shadow-lg">
          <div className="rounded-lg shadow-xl border-2 p-0.5 border-cyan-500">
            <table className="min-w-full  bg-white ">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Sr. No.
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentProjectHeads.map((head, index) => (
                  <tr key={head.id}>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      <div className="text-sm leading-5 ">
                        {renderSerialNumber(index)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      <div className="text-sm leading-5 ">{head.name}</div>
                    </td>

                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      <div className="text-sm leading-5 ">{head.email}</div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      <div className="text-sm leading-5 ">
                        {head.phoneNumber}
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
        {generatePaginationButtonsProjectHead(
          Math.ceil(projectHeads.length / itemsPerPage)
        )}
      </div>
    </div>
  );
};

export default ProjectHeadList;
