import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddRFP() {
  const [rfpData, setRFPData] = useState({
    title: "",
    projectId: "",
    endDate: "",
    vendorCategoryId: "",
    documentFile: null,
  });
  const [vendorCategory, setVendorCategory] = useState([]);
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vcresponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/VendorCategory/All`
        );

        setVendorCategory(vcresponse.data);

        const presponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/Project/All`
        );

        setProject(presponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRFPData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRFPData((prevData) => ({
      ...prevData,
      documentFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", rfpData.title);
    formData.append("DocumentFile", rfpData.documentFile);
    formData.append("ProjectId", rfpData.projectId);
    formData.append("VendorCategoryId", rfpData.vendorCategoryId);
    formData.append("EndDate", rfpData.endDate);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/RFP/Add`,
        formData
      );
      if (response.status === 200){
        toast.success("RFP Added",{
          position:"top-right"
        });
      } 
      
      setRFPData({
        title: "",
        projectId: "",
        endDate: "",
        vendorCategoryId: "",
        documentFile: null,
      });
    } catch (error) {
      console.error("Error adding RFP:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-lg margin-left mt-8 appform bg-white">
          <div className="flex text-2xl font-bold text-gray-500 mb-5 justify-center">
            <h2>Create RFP/RFQ</h2>
          </div>
          <div className="mb-6 relative">
  <input
    type="text"
    id="title"
    name="title"
    placeholder=" "
    value={rfpData.title}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    required
  />
  <label
    htmlFor="title"
    className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Title
  </label>
</div>


          <div class="mb-6">
            <label
              for="vendorCategoryId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Select a Vendor Category
            </label>
            <select
              id="vendorCategoryId"
              name="vendorCategoryId"
              value={rfpData.vendorCategoryId}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {vendorCategory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div class="mb-6">
            <label
              for="projectId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Select a Project
            </label>
            <select
              id="projectId"
              name="projectId"
              value={rfpData.projectId}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {project.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div class="mb-6">
            <label
              for="endDate"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={rfpData.endDate}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900"
              for="documentFile"
            >
              Upload file
            </label>
            <input
              class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id="documentFile"
              type="file"
              name="documentFile"
              accept=".png, .jpg, .pdf"
              onChange={handleFileChange}
            />
            <p class="mt-1 text-sm text-gray-500" id="file_input_help">
              PNG, JPG or PDF.
            </p>
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add RFP
          </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}
