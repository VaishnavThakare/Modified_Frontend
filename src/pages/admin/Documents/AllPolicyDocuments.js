import React, { useState, useEffect } from "react";
import axios from "axios";
import pdf from './pdf.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllPolicyDocuments() {
  const [documents, setdocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [modal, setmodal] = useState();
  const [file, setFile] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  const [pdocument, setdocument] = useState({
    id: "",
    name: "",
    image: "",
    isActive: ""
  });

  const getAllDocuments = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/PolicyDocument/All`);
      console.log(res.data);
      let data = [];
      if (res.status == 200 && res.data != null) {
        data = res.data;
      }
      console.log(data);
      setdocuments(data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdocument((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    pdocument.image = event.target.files[0];
  };

  const handleDelete = async (id, index) => {
    try {
      if (window.confirm("Do you want to delete this document ? ")) {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/PolicyDocument/${id}`);
        toast.success("Document Deleted", {
          position: "top-right"
        });
      }
      getAllDocuments();
    } catch (error) {
      console.error("Error :", error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      console.log(pdocument);
      const formDataToSend = new FormData();
      formDataToSend.append("Name", pdocument.name);
      formDataToSend.append("Document", file);
      formDataToSend.append("IsActive", pdocument.isActive);
      console.log(formDataToSend);

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/PolicyDocument/${pdocument.id}`, formDataToSend);
      if (response.status === 200)
        toast.success("Document Updated", {
          position: "top-right"
        });
      getAllDocuments();
      setdocument({
        id: "",
        name: "",
        image: "",
        isActive: ""
      });

      toggleEditModal();
      setFile();
      document.getElementById('file').value = "";
    } catch (error) {
      console.error("Error :", error.message);
    }
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    // Fetch project data when the component mounts
    getAllDocuments();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="mt-4 flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL POLICY DOCUMENTS</h2>
        </div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-80 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex flex-row flex-wrap justify-between">
            {currentItems.map((document, index) => (
              <div key={document.id} className="w-full md:w-1/3 lg:w-1/4 mb-4">
                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border-2 border-cyan-500 bg-white">
                  <div className="w-full md:w-1/3 grid place-items-center">
                    <img src={pdf} alt={document.name} className="rounded-xl" />
                    <a href={document.documentPath} target="_blank">{document.name}</a>
                  </div>
                  <div className="w-full md:w-2/3 flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                      <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                        {document.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <h3 className="font-black text-gray-800 md:text-lg text-lg">{document.name}</h3>
                    <h3 className="font-black text-gray-800 md:text-sm text-md">{document.createdOn}</h3>
                    <div>
                      <button
                        onClick={() => handleDelete(document.id, index)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded p-1"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          toggleEditModal();
                          setdocument(document);
                        }}
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold rounded ml-4 p-1"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(documents.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
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
            <form onSubmit={handleEdit} className="appform">
              <div className="flex text-2xl font-bold text-gray-500 mb-2 justify-center">
                <h2 className="page-heading">Update Document</h2>
              </div>

              <div class="mb-6 relative">
            <input
              type="text"
              id="title"
              name="title"
              value={pdocument.name}
              onChange={handleChange}
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="title"
              class="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Name
            </label>
          </div>

              <div className="mb-6">
                <select
                  id="isActive"
                  name="isActive"
                  value={pdocument.isActive}
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

              <div className="mb-6">
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Document File
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={handleFile}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Document
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
      <ToastContainer />
    </>
  );
}

