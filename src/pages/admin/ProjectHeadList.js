import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProjectHeadList = () => {
  const [projectHeads, setProjectHeads] = useState([]);
  const [selectedProjectHead, setSelectedProjectHead] = useState(null);

  useEffect(() => {
    const fetchProjectHeads = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/ProjectHead/All`;
        const response = await axios.get(url);
        setProjectHeads(response.data);
      } catch (error) {
        console.error("Error fetching Project Heads:", error.message);
      }
    };
    fetchProjectHeads();
  }, []);

  const handleViewDetails = (projectHeadId) => {
    setSelectedProjectHead(projectHeadId);
  };

  const ProjectHeadDetailView = ({ projectHead }) => {
    const [projects, setProjects] = useState([]);

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

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const url = `${process.env.REACT_APP_API_URL}/Project/ProjectHead/${projectHead.id}`;
          const response = await axios.get(url);
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching Projects:", error.message);
        }
      };
      fetchProjects();
    }, [projectHead.id]);

    const navigate = useNavigate();
    const handlePEditDetails = (projectId) => {
      navigate(`/admin/projects/${projectId}`);
    };

    const handlePViewDetails = (projectId) => {
      navigate(`/admin/projects-view/${projectId}`);
    };

    return (
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex text-2xl font-bold text-gray-500 ">
              <h2 className="text-left text-cyan-500">PROJECT HEAD DETAILS</h2>
            </div>
            <div className="w-52 bg-cyan-400 h-0.5 mb-1"></div>
            <div className="w-96 bg-cyan-400 h-0.5 mb-5"></div>
          </div>
          <div>
            <div className="flex justify-center">
              <button
                className=" bg-cyan-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedProjectHead(null)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
          <div
            className="bg-white p-6 rounded-md shadow-md"
            style={{ height: "fit-content" }}
          >
            <p className="text-gray-900">
              <span className="font-bold">SR.NO:</span> {projectHead.id}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Name:</span> {projectHead.name}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Email:</span> {projectHead.email}
            </p>
            <p className="text-gray-900">
              <span className="font-bold">Phone Number:</span>{" "}
              {projectHead.phoneNumber}
            </p>
          </div>
        </div>

        <div className="flex text-2xl font-bold text-gray-500 mt-14">
          <h2 className="text-left text-cyan-500 ">PROJECT LIST</h2>
        </div>
        <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
        <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 p-0.5 rounded-lg shadow-lg">
          <table className="table-auto w-full rounded-lg  bg-white ">
            <thead>
              <tr className="text-gray-600">
                <th className="px-4 py-2 text-center">Project Name</th>
                <th className="px-4 py-2 text-center">Project Head Name</th>
                <th className="px-4 py-2 text-center">Created On</th>
                <th className="px-4 py-2 text-center">Comment</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
              <tr className="text-gray-600">
                <td colSpan="6" className="px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="bg-white">
                  <td className="px-4 py-2 text-center">{project.name}</td>
                  <td className="px-4 py-2 text-center">
                    {project.projectHeadName}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {formatDateTime(project.createdOn)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {project.description}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {project.projectStatus}
                  </td>
                  <td className="px-4 py-2 flex flex-row justify-center ">
                    <button
                      className="mr-2"
                      onClick={() => handlePEditDetails(project.id)}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-cyan-600 text-xl"
                      />
                    </button>
                    <button
                      className="mr-2"
                      onClick={() => handlePViewDetails(project.id)}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-cyan-600 text-xl"
                      />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center bg-white">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <div className="relative  mb-5 bg-zinc-50">
          {selectedProjectHead ? (
            <ProjectHeadDetailView
              projectHead={projectHeads.find(
                (ph) => ph.id === selectedProjectHead
              )}
            />
          ) : (
            <>
              <div className="flex text-2xl font-bold text-gray-500 ">
                <p className="text-left text-cyan-500 page-heading">
                  PROJECT HEADS LIST
                </p>
              </div>
              <div className="w-1/5 bg-cyan-400 h-0.5 mb-1"></div>
              <div className="w-1/3 bg-cyan-400 h-0.5 mb-5"></div>
              <div className="overflow-x-auto mt-8 ml-2 mr-2 border-2 border-cyan-500 rounded-lg shadow-lg">
                <table className="table-auto w-full rounded-lg bg-white shadow-lg">
                  <thead>
                    <tr className="text-gray-600">
                      <th className="px-4 py-2 text-center">SR.NO</th>
                      <th className="px-4 py-2 text-center">Name</th>
                      <th className="px-4 py-2 text-center">Email</th>
                      <th className="px-4 py-2 text-center">Phone Number</th>
                      <th className="px-4 py-2 text-center">
                        Actions<p></p>(View)
                      </th>
                    </tr>
                    <tr className="text-gray-600">
                      <td colSpan="5" className="px-4 py-1">
                        <div style={{ borderTop: "2px solid gray" }}></div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {projectHeads.length > 0 ? (
                      projectHeads.map((projectHead, index) => (
                        <tr key={projectHead.id} className="bg-white">
                          <td className="px-4 py-2 text-center">{index + 1}</td>
                          <td className="px-4 py-2 text-center">
                            {projectHead.name}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {projectHead.email}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {projectHead.phoneNumber}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleViewDetails(projectHead.id)}
                              className="mr-2"
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="text-cyan-600 text-xl"
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-2 text-center bg-white"
                        >
                          No Project Heads found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeadList;
