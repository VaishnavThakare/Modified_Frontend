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
    id:"",
    name: "",
    image: "",
    isActive: ""
  });

  const getAllDocuments = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/PolicyDocument/All`);
      console.log(res.data);
      let data = [];
      if(res.status == 200 && res.data!=null){
        data = res.data;
        toast.success("All Document Loaded",{
          position:"top-right"
        });
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
        if(window.confirm("Do you want to delete this document ? ")){
          const response = await axios.delete(`${process.env.REACT_APP_API_URL}/PolicyDocument/${id}`);
          toast.success("Document Deleted",{
            position:"top-right"
          });
        }

        getAllDocuments();

    } catch (error) {
      console.error("Error :", error.message);
    }
  };

  const handleEdit =async (e)=>{
    e.preventDefault();
    try {
        console.log(pdocument);
        const formDataToSend = new FormData();
        formDataToSend.append("Name",pdocument.name);
        formDataToSend.append("Document",file);
        formDataToSend.append("IsActive",pdocument.isActive);
        console.log(formDataToSend);

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/PolicyDocument/${pdocument.id}`,formDataToSend);
      if (response.status === 200) 
        toast.success("Document Updated",{
          position:"top-right"
        });
        getAllDocuments();
        setdocument({
          id:"",
          name: "",
          image: "",
          isActive: ""
        });

      toggleEditModal();
      setFile();
      document.getElementById('file').value="";
    } catch (error) {
      console.error("Error :", error.message);
    }
  };
  
  const toggleEditModal =()=>{
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
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Policy Documents </h2>
          </div>

          {currentItems.map((event, index) => (
            <div
              key={event.id}
              class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-xl mx-auto border border-gray-400 bg-white mb-4"
            >
              <div class="w-full md:w-1/3 grid place-items-center">
                <img src={pdf} alt={event.name} class="rounded-xl"/>
                <a href={event.documentPath} target="_blank">{event.name}</a>
              </div>
              <div class="w-full md:w-2/3 flex flex-col space-y-2 p-3">
                <div class="flex justify-between item-center">
                  <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                    {event.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
                <h3 class="font-black text-gray-800 md:text-lg text-lg">
                  {event.name}
                </h3>
                <h3 class="font-black text-gray-800 md:text-sm text-md">
                  {event.createdOn}
                </h3>
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
                      setdocument(event);
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
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(documents.length / itemsPerPage) }).map(
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

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-2 max-w-md rounded-lg shadow-md">
            <form onSubmit={handleEdit}>
              <div className="flex text-2xl font-bold text-gray-500 mb-2">
                <h2>Update Document</h2>
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
                  name="name"
                  value={pdocument.title}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                  value={pdocument.isActive}
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
                  Document File
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={handleFile}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      <ToastContainer/>
    </>
  );
}
