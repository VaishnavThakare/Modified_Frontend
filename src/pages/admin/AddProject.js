import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProject() {
  const [projectData, setProjectData] = useState({
    name: "",
    projectHeadId: "",
    projectStatus: "",
    description: "",
  });
  const [projectHead, setProjectHead] = useState([]);

  useEffect(() => {
    const fetchProjectHead = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ProjectHead/All`
        );

        setProjectHead(response.data);
      } catch (error) {
        console.error("Error fetching ProjectHead data:", error);
      }
    };

    fetchProjectHead();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Project/Create`,
        projectData
      );
      if (response.status === 200){
        toast.success("Project Added",{
          position:"top-right"
        });
      } 
      setProjectData({
        name: "",
        projectHeadId: "",
        projectStatus: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding VendorCategory:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create Project</h2>
          </div>
          
          <div className="mb-6 relative">
            <input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Name
            </label>
          </div>

          <div className="mb-6 relative">
  <label
    htmlFor="projectHeadId"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Select an option
  </label>
  <select
    id="projectHeadId"
    name="projectHeadId"
    value={projectData.projectHeadId}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  >
    <option value="" disabled>
      Choose a Project Head
    </option>
    {projectHead.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>
</div>

          <div class="mb-6">
            <div class="flex">
              <div class="flex items-center me-4">
                <input
                  id="radio-1"
                  type="radio"
                  value="Active"
                  name="projectStatus"
                  onChange={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  for="radio-1"
                  class="ms-2 text-sm font-medium text-gray-900"
                >
                  Active
                </label>
              </div>
              <div class="flex items-center me-4">
                <input
                  id="radio-2"
                  type="radio"
                  value="Ongoing"
                  name="projectStatus"
                  onChange={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label
                  for="radio-2"
                  class="ms-2 text-sm font-medium text-gray-900"
                >
                  Ongoing
                </label>
              </div>
              <div class="flex items-center me-4">
                <input
                  id="radio-3"
                  type="radio"
                  value="Done"
                  name="projectStatus"
                  onChange={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label
                  for="radio-3"
                  class="ms-2 text-sm font-medium text-gray-900"
                >
                  Done
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6 relative">
  <input
    type="text"
    id="description"
    name="description"
    value={projectData.description}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
    placeholder=" "
    required
  />
  <label
    htmlFor="description"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Description
  </label>
</div>


          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Project
          </button>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}
