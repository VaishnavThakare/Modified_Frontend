import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEdit, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectHeadView = () => {
  const { projectHeadId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [projects, setProjects] = useState([]);
  const [projectHeadData, setProjectHead] = useState({});
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Project/ProjectHead/${projectHeadId}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Projects:", error.message);
      toast.error("Failed to fetch Projects");
    }
  };

  const fetchProjectHead = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ProjectHead/${projectHeadId}`
      );
      setProjectHead(response.data);
    } catch (error) {
      console.error("Error fetching ProjectHead:", error.message);
      toast.error("Failed to fetch ProjectHead");
    }
  };

  useEffect(() => {
    fetchProjectHead();
    fetchProjects();
  }, [projectHeadId]);

  const handlePEditDetails = (projectId) => {
    navigate(`/admin/projects/${projectId}`);
  };

  const handlePViewDetails = (projectId) => {
    navigate(`/admin/view-projects/${projectId}`);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(projects.length / itemsPerPage))
    );
  };

  const formatDateTime = (dateTime) => {
    const formattedDateTime = new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDateTime;
  };

  const backButton = () => {
    navigate(-1);
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex text-2xl font-bold text-gray-500">
              <h2 className="text-left text-cyan-500">PROJECT HEAD DETAILS</h2>
            </div>
            <div className="w-52 bg-cyan-400 h-0.5 mb-1"></div>
            <div className="w-96 bg-cyan-400 h-0.5 mb-5"></div>
          </div>
          <div>
            <div className="flex justify-center">
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded"
                onClick={backButton}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
          <div className="bg-white p-6 rounded-md shadow-md" style={{ height: "fit-content" }}>
            <p className="text-gray-900">
              <span className="font-bold">SR.NO:</span> {projectHeadData.id}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Name:</span> {projectHeadData.name}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Email:</span> {projectHeadData.email}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Phone Number:</span> {projectHeadData.phoneNumber}
            </p>
          </div>
        </div>

        <div className="flex text-2xl font-bold text-gray-500 mt-14">
          <h2 className="text-left text-cyan-500">PROJECT LIST</h2>
        </div>
        <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
        <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded-lg shadow-lg">
          <table className="table-auto w-full rounded-lg bg-white">
            <thead>
              <tr className="text-gray-600">
                <th className="text-sm text-center uppercase px-4 py-2">Project Name</th>
                <th className="text-sm text-center uppercase px-4 py-2">Project Head Name</th>
                <th className="text-sm text-center uppercase px-4 py-2">Created On</th>
                <th className="text-sm text-center uppercase px-4 py-2">Comment</th>
                <th className="text-sm text-center uppercase px-4 py-2">Status</th>
                <th className="text-sm text-center uppercase px-4 py-2">Action</th>
              </tr>
              <tr className="text-gray-600">
                <td colSpan="6" className="px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((project) => (
                <tr key={project.id} className="bg-white">
                  <td className="px-4 py-2 text-center">{project.name}</td>
                  <td className="px-4 py-2 text-center">{project.projectHeadName}</td>
                  <td className="px-4 py-2 text-center">{formatDateTime(project.createdOn)}</td>
                  <td className="px-4 py-2 text-center">{project.description}</td>
                  <td className="px-4 py-2 text-center">{project.projectStatus}</td>
                  <td className="px-4 py-2 flex flex-row justify-center">
                    <button className="mr-2" onClick={() => handlePEditDetails(project.id)}>
                      <FontAwesomeIcon icon={faEdit} className="text-cyan-600 text-xl" />
                    </button>
                    <button className="mr-2" onClick={() => handlePViewDetails(project.id)}>
                      <FontAwesomeIcon icon={faEye} className="text-cyan-600 text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center bg-white">
                    No Projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-2 ml-2 mr-2">
          <button
            onClick={handlePrevPage}
            className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pagination-icon" />
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
            disabled={currentPage === Math.ceil(projects.length / itemsPerPage)}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="pagination-icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectHeadView;
