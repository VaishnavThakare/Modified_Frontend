import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Documents() {
  const [docs, setDocs] = useState([]);

  const fetchDocumentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Document/All`
      );

      setDocs(response.data);
    } catch (error) {
      console.error("Error fetching Document data:", error);
    }
  };

  useEffect(() => {
    // Fetch project data when the component mounts
    fetchDocumentData();
  }, []);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block w-full  overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg ">
          <div className="flex text-2xl font-bold text-gray-500">
            <h2 className="text-left text-cyan-500">Documents</h2>
          </div>
          <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
          <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>

          <div className="shadow-xl">
            <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Sr.No
                    </th>
                    <th className="text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600  tracking-wider">
                      Name
                    </th>
                    <th className="text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center  leading-4 text-gray-600 tracking-wider">
                      Desc
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {docs.length > 0 ? (
                    docs.map((doc, index) => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className=" text-sm leading-5 text-gray-500">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className=" text-sm leading-5 text-gray-500">
                            {doc.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className=" text-sm  leading-5 text-gray-500">
                            {doc.description}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 whitespace-no-wrap text-center"
                      >
                        No data available here!
                      </td>
                    </tr>
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
