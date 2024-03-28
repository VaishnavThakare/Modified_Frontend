import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AllEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getAllEvents = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Event/All`);
      let data = [];
      if (res.status === 200 && res.data !== null) {
        data = res.data;
      }
      setEvents(data);
    } catch (error) {
      console.error("Error fetching Event data:", error);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/Event/${id}`);
      toast.success("Event Deleted", {
        position: "top-right",
      });
      getAllEvents();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="mt-4 flex text-xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL EVENTS</h2>
        </div>
        <div className="w-36 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-52 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50  px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentItems.map((event, index) => {
              const dateTime = new Date(event.eventDateTime);
              return (
                <div
                  key={event.id}
                  class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-xl mx-auto border-2 border-cyan-500 bg-white mb-4"
                >
                  {/* Display event details */}
                  <div class="w-full md:w-1/3 grid place-items-center">
                    <img
                      src={event.imagePath}
                      alt={event.title}
                      class="rounded-xl"
                    />
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
                      {dateTime.toLocaleString()}
                    </h3>
                    <div className="line-clamp-4">
                      <p
                        class="md:text-sm text-gray-500 text-sm"
                        dangerouslySetInnerHTML={{ __html: event.content }}
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete(event.id, index)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/admin/editEvent/${event.id}`);
                        }}
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold rounded ml-4 p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(events.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <ToastContainer />
    </>
  );
}
