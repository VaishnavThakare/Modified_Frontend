import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllBanner() {
  const [banners, setbanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getAllBanners = async () => {
    try {
    //   let res = `${process.env.REACT_APP_API_URL}/Banner/All`;
    //   console.log(res.data);
        let data = [
            {
                id:1,
                isActive:true,
                createdOn:new Date(),
                modifiedOn:new Date(),
                imagePath:`${process.env.PUBLIC_URL}/Banners/1.jpg`,
                title:"Banner 1"
            },
            {
                id:2,
                isActive:true,
                createdOn:new Date(),
                modifiedOn:new Date(),
                imagePath:`${process.env.PUBLIC_URL}/Banners/2.jpg`,
                title:"Banner 2"
            },
            {
                id:3,
                isActive:true,
                createdOn:new Date(),
                modifiedOn:new Date(),
                imagePath:`${process.env.PUBLIC_URL}/Banners/3.jpg`,
                title:"Banner 3"
            }
        ] ;
        console.log(data);
        setbanners(data);    

    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };


  useEffect(() => {
    // Fetch project data when the component mounts
    getAllBanners();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = banners.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Banners</h2>
          </div>
          <table className="min-w-full mb-5">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Banner Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Is_Active
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Created On
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Modified On
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
                      {proj.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      <a href={proj.imagePath} target="_blank">View Banner</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                            {proj.isActive?"True":"False"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                    {new Date(proj.createdOn).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {new Date(proj.modifiedOn).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(banners.length / itemsPerPage) }).map(
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