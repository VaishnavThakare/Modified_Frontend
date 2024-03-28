import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AssignedProject() {
  const [projects, setProject] = useState([]);
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const sid = sessionStorage.getItem("sid");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Project/ProjectHead/${sid}`
        );

        setProject(response.data);
      } catch (error) {
        console.error("Error fetching Project data:", error);
      }
    };

    fetchProjectData();
  }, []);

  console.log(projects);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">Projects</h2>
        </div>
        <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="shadow-xl">
            <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-500 tracking-wider">
                      Name
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-500 tracking-wider">
                      Project Head Name
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-500 tracking-wider">
                      Project Status
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-500 tracking-wider">
                      Description
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-500 tracking-wider">
                      Created On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {projects.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 whitespace-no-wrap text-center text-sm"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    projects.map((proj) => (
                      <tr key={proj.id}>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          <div className="text-sm leading-5">{proj.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          <div className="text-sm leading-5">
                            {proj.projectHeadName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          <div className="text-sm leading-5">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {proj.projectStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          <div className="text-sm leading-5">
                            {proj.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                          <div className="text-sm leading-5">
                            {new Date(proj.createdOn).toLocaleDateString(
                              "es-CL"
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
