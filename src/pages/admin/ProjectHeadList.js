import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProjectHeadList = () => {
  const [projectHeads, setProjectHeads] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/admin/view-projecthead/${projectHeadId}`);
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <div className="relative  mb-5 bg-zinc-50">
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
        </div>
      </div>
    </div>
  );
};

export default ProjectHeadList;
