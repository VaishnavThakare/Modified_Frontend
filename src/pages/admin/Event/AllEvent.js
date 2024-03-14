import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllEvent() {
  const [events, setevents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [modal, setmodal] = useState();

  const getAllEvents = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Event/All`);
      console.log(res.data);
      let data = [];
      if(res.status == 200 && res.data!=null){
        data = res.data;
      }
      console.log(data);
      setevents(data);    

    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleChange =()=>{};

  const handleDelete = async (id, index) => {
    
    try {
        // console.log(events);
        // console.log(eventId);
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/Event/${id}`);
        if (response.status === 200) 
            alert("Banner Deleted");
        getAllEvents();

    } catch (error) {
      console.error("Error :", error.message);
    }
  };

  const handleEdit =()=>{};
  
  const toggleEditModal =()=>{};


  useEffect(() => {
    // Fetch project data when the component mounts
    getAllEvents();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>

<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Events </h2>
          </div>

          {currentItems.map((event, index) => (
            <div
              key={event.id}
              class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-xl mx-auto border border-gray-400 bg-white mb-4"
            >
              <div class="w-full md:w-1/3 grid place-items-center">
                <img src={event.imagePath} alt={event.title} class="rounded-xl" />
              </div>
              <div class="w-full md:w-2/3 flex flex-col space-y-2 p-3">
                <div class="flex justify-between item-center">
                  <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                    {event.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
                <h3 class="font-black text-gray-800 md:text-lg text-lg">
                  {event.title}
                </h3>
                <h3 class="font-black text-gray-800 md:text-sm text-md">
                  {event.eventDateTime}
                </h3>
                <div className="line-clamp-4">
                  <p class="md:text-sm text-gray-500 text-sm">{event.content}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(event.id, index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      toggleEditModal();
                      setmodal(event);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ml-4 p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/*  */}
      {/* <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Events</h2>
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
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Content
                </th>                
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Event Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Is_Active
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Event Date
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
                      {proj.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      <a href={proj.imagePath} target="_blank">View Event</a>
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
                        {new Date(proj.eventDateTime).toLocaleDateString("es-CL")}
                    </div>
                  </td>                  
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                    {new Date(proj.createdOn).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {new Date(proj.lastModifiedOn).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(events.length / itemsPerPage) }).map(
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
