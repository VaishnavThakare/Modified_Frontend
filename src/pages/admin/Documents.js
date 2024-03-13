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
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Documents</h2>
          </div>
          
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Desc
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white">
              {docs.map((doc, index) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {doc.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {doc.description}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
