import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function RFP() {
  const [rfps, setRFPs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRFPData = async () => {
      try {
        const sid = sessionStorage.getItem("sid");
        const vendorCatRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${sid}`
        );

        // const documentVerifiedValues = vendorCatRes.data.documentVerified.split('|');
        // const isAnyValueFalse = documentVerifiedValues.every(value => value === "True");
        // if(!isAnyValueFalse) navigate('/vendor/upload-document');

        const catId = vendorCatRes.data.vendorCategory.id;
        const rfpCatRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/RFP/VendorCategory/${catId}`
        );

        setRFPs(rfpCatRes.data);
      } catch (error) {
        console.error("Error fetching RFP data:", error);
      }
    };

    fetchRFPData();
  }, []);
  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Request for Proposal</h2>
          </div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Vendor Category
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  End On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rfps.map((rfp) => (
                <tr key={rfp.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {rfp.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      <a href={rfp.document}>Download</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {rfp.project.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {rfp.vendorCategory.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {new Date(rfp.endDate).toLocaleDateString("es-CL")}
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
