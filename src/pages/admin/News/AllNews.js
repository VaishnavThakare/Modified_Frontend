import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function AllNews() {
  const navigate = useNavigate();
  const [news, setnews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [showEditModal, setShowEditModal] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const getAllNews = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/News/All`);
      let data = [];
      if (res.status == 200 && res.data != null) {
        data = res.data;
      }

      setnews(data);
    } catch (error) {
      console.error("Error fetching News data:", error);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/News/${id}`);
      toast.success("News Deleted", {
        position: "top-right",
      });
      getAllNews();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="mt-4 flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL NEWS</h2>
        </div>
        <div className="bg-cyan-500 w-32 h-0.5 mb-1"></div>
        <div className="w-52 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentItems.map((news, index) => (
              <div
                key={news.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow my-6"
              >
                <img
                  className="rounded-t-lg"
                  src={news.imagePath}
                  alt={news.title}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-lg font-bold tracking-tight">
                    {news.title}
                  </h5>
                  <p
                    className="mb-2 truncate"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                  <p className="mb-2">
                    Status: {news.isActive ? "Active" : "Inactive"}
                  </p>
                  <button
                    onClick={() => handleDelete(news.id, index)}
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
                      navigate(`/admin/editNews/${news.id}`);
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
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(news.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${
                currentPage === index + 1
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

      <ToastContainer />
    </>
  );
}
