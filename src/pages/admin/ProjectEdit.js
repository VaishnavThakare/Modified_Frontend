import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectEdit = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({
    name: "",
    projectStatus: "",
    description: "",
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7254/api/Project/${projectId}`
        );
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
  
    if (projectId) {
      fetchProjectById();
    }
  }, [projectId]);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7254/api/Project/${projectId}`, projectData);
      if (response.status === 200) {
        toast.success(`Project Updated successfully!`);
        navigate(`/admin/projects`); // Redirect to projects list after successful update
      } else {
        toast.error("Failed to update project");
      }
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Error updating project:", error);
    }
  };

  const back = () => {
    navigate(`/admin/projects`);
  };

  return (
    <div className="bg-zinc-50">
    <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">EDIT PROJECT</h2>
        </div>
        <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
    <div className="py-10 flex justify-center items-center bg-zinc-50 font-poppins">
      <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={projectData.name}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div>
              <label htmlFor="projectStatus" className="block text-sm font-medium text-gray-700">Project Status</label>
              <input
                type="text"
                name="projectStatus"
                id="projectStatus"
                value={projectData.projectStatus}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                value={projectData.description}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
              >
                Submit
              </button>
              <button
                onClick={back}
                type="button"
                className="text-white px-4 py-2 ml-5 rounded-md bg-gray-500 hover:bg-gray-700 focus:outline-none focus:bg-cyan-700"
              >
                Back
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
    </div>
  );
};

export default ProjectEdit;

