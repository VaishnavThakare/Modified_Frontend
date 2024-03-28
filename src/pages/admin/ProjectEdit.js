import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          `${process.env.REACT_APP_API_URL}/Project/${projectId}`
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
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Project/${projectId}`,
        projectData
      );
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
    navigate(-1);
  };

  return (
    <div class="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-lg margin-left mt-8 appform bg-white">
          <div className="flex text-2xl font-bold text-gray-500 mb-2 justify-center">
          <h2 className="page-heading">Edit Project Details</h2>
          </div>
            <div className="mb-6 relative">
            <input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Name
            </label>
          </div>
          <div class="mb-6">
            <div class="flex">
              <div class="flex items-center me-4">
                <input
                  id="radio-1"
                  type="radio"
                  value="Active"
                  name="projectStatus"
                  onChange={handleInputChange}
                  checked={projectData.projectStatus === "Active"}
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
                  onChange={handleInputChange}
                  checked={projectData.projectStatus === "Ongoing"}
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
                  onChange={handleInputChange}
                  checked={projectData.projectStatus === "Done"}
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
    onChange={handleInputChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
    placeholder=" "
    required
  />
  <label
    htmlFor="description"
    className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Description
  </label>
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
          </form>
          <ToastContainer />
        </div>
  );
};

export default ProjectEdit;
