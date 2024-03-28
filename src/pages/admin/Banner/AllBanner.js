import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllBanner() {
  const [banners, setbanners] = useState([]);
  const [modal, setmodal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [file, setFile] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const getAllBanners = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Banner/All`);
      let data = [];
      if (res.status == 200 && res.data != null) {
        data = res.data; 
      }
      setbanners(data); 
     
    } catch (error) {
      toast.error("Error to load Banners",{
        position:"top-right"
      }); 
      console.error("Error fetching Banner data:", error);
    }
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDelete = async (id, index) => {
    try {
      if(window.confirm("Are you sure, that you want to delete this Banner ? ")){
        await axios.delete(`${process.env.REACT_APP_API_URL}/Banner/${id}`);
        toast.success("Banner is Deleted",{
          position:"top-right"
        });
        getAllBanners();
      }
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
      formDataToSend.append("Image", file);
      formDataToSend.append("IsActive", modal.isActive);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Banner/${modal.id}`,
        formDataToSend
      );
      if (response.status === 200) {
        toast.success("Banner is updated",{
          position:"top-right"
        });
      }
      toggleEditModal();
      getAllBanners();
      setFile();
    } catch (error) {
      console.error("Error update Banner:", error.message);
    }
  };

  useEffect(() => {
    getAllBanners();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = banners.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="mt-4 flex text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">ALL BANNERS</h2>
          </div>
          <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-80 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg ">
          
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4   ">
            {currentItems.map((banner, index) => (
              <div
                key={banner.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow my-6"
              >
                <img className="rounded-t-lg" src={banner.imagePath} alt="" />
                <div className="p-5">
                  <h5 className="mb-2 text-lg font-bold tracking-tight">
                    {banner.title}
                  </h5>
                  <p className="mb-2">
                    Status: {banner.isActive ? "Active" : "Inactive"}
                  </p>
                  <button
                    onClick={() => handleDelete(banner.id, index)}
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
                      setmodal(banner);
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
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(banners.length / itemsPerPage) }).map(
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
          <div className="bg-white p-2 max-w-md rounded-lg shadow-md">
            <form className="appform" onSubmit={handleEdit}>
              <div className="flex text-2xl font-bold text-gray-500 mb-2 justify-center">
                <h2 className="page-heading">Update Banner</h2>
              </div>

              <div class="mb-6 relative">
            <input
              type="text"
              id="title"
              name="title"
              value={modal.title}
              onChange={handleChange}
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="title"
              class="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Title
            </label>
          </div>

              <div class="mb-6">
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
                  <option value={true}> Active </option>
                  <option value={false}> InActive </option>
                </select>
              </div>

              <div class="mb-6">
                <label
                  for="file"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Banner Image
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
                Update Banner
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
