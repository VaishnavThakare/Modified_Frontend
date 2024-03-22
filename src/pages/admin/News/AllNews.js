import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllNews() {
  const [news, setnews] = useState([]);
  const [modal, setmodal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [file, setFile] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const getAllNews = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/News/All`);
      console.log(res.data);
      let data = [];
      if (res.status == 200 && res.data != null) {
        data = res.data;
        toast.success("All News Loaded",{
          position:"top-right"
        });
      }

      setnews(data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };
  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDelete = async (id, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/News/${id}`);
      toast.success("News Deleted",{
        position:"top-right"
      });
      getAllNews();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmodal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", modal.title);
      formDataToSend.append("Content", modal.content);
      formDataToSend.append("Image", file);
      formDataToSend.append("IsActive", modal.isActive);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/News/${modal.id}`,
        formDataToSend
      );
      if (response.status === 200){
        toast.success("News Updated",{
          position:"top-right"
        });
      }

      toggleEditModal();
      getAllNews();
      setFile();
      document.getElementById("file").value = "";
    } catch (error) {
      console.error("Error update Banner:", error.message);
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
        <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
          

          {currentItems.map((news, index) => (
            <div
              key={news.id}
              class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-xl mx-auto border-2 border-cyan-500 bg-white mb-4"
            >
              <div class="w-full md:w-1/3 grid place-items-center">
                <img src={news.imagePath} alt={news.title} class="rounded-xl" />
              </div>
              <div class="w-full md:w-2/3 flex flex-col space-y-2 p-3">
                <div class="flex justify-between item-center">
                  <div class="bg-green-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                    {news.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
                <h3 class="font-black text-gray-800 md:text-lg text-lg">
                  {news.title}
                </h3>
                <div className="line-clamp-4">
                  <p class="md:text-sm text-gray-500 text-sm">{news.content}</p>
                </div>
                <div>
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
                      setmodal(news);
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

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-2 max-w-md rounded-lg shadow-md appform">
            <form onSubmit={handleEdit}>
              <div className="flex text-2xl font-bold text-gray-500 mb-2">
                <h2>Update News</h2>
              </div>

              <div class="mb-6">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="title"
                  value={modal.title}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="content"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Content
                </label>
                <textarea
                  type="text"
                  id="name"
                  name="content"
                  value={modal.content}
                  onChange={handleChange}
                  class="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  rows="4"
                  placeholder="Enter your text here..."
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="isActive"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  IsActive
                </label>
                <select
                  id="isActive"
                  name="isActive"
                  value={modal.isActive}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" disabled>
                    Choose Status
                  </option>
                  <option value={true}> True </option>
                  <option value={false}> False </option>
                </select>
              </div>

              <div class="mb-6">
                <label
                  for="file"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  News Image
                </label>
                <input
                  type="file"
                  id="file"
                  name="Image"
                  onChange={handleFile}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Update News
              </button>
              <button
                onClick={toggleEditModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer/>
    </>
  );
}
