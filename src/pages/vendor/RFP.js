import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RFP() {
  const [rfps, setRFPs] = useState([]);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const [rfp,setRFP] = useState({
    RFPId:"",
    VendorId:"",
    Document:"",
    Comment:""
  });
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRFP((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    rfp.Document = event.target.files[0];
  };

  const applyRFP = async (e) =>{
    e.preventDefault();
    try{
      rfp.VendorId = sessionStorage.getItem("sid");
      console.log(rfp);
      const formDataToSend = new FormData();
      formDataToSend.append("RFPId", rfp.RFPId);
      formDataToSend.append("Document", file);
      formDataToSend.append("VendorId",rfp.VendorId);
      formDataToSend.append("Comment",rfp.Comment);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/RFPApplication/Add`,formDataToSend);
      if(res.status === 200){
        toast.success("Application Submitted",{
          position:"top-right"
        });
        toggleEditModal();
        setRFP({
          RFPId:"",
          VendorId:"",
          Document:"",
          Comment:""
        });
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const toggleEditModal = (e) => {
    setShowEditModal(!showEditModal);
    rfp.RFPId = e.target.getAttribute("data-key");
  };

  useEffect(() => {
    const fetchRFPData = async () => {
      try {
        const sid = sessionStorage.getItem("sid");
        const vendorCatRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${sid}`
        );

        if (!vendorCatRes.data.isVerified) navigate("/vendor/upload-document");

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
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-zinc-50 shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex text-2xl font-bold text-gray-700 mb-4 justify-center items-center">
            <h2>Request for Proposal</h2>
          </div>
          <table className="min-w-full mb-5 border-2 border-cyan-500 shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                  Vendor Category
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                  End On
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                  Action
                </th>                
              </tr>
            </thead>
            <tbody className="bg-white">
              {
                rfps && rfps.length > 0 ?
                rfps.map((rfp) => (
                <tr key={rfp.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-500">
                      {rfp.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-500">
                      <a href={rfp.document}>Download</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-500">
                      {rfp.project.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-500">
                      {rfp.vendorCategory.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-500">
                      {new Date(rfp.endDate).toLocaleDateString("es-CL")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <button onClick={toggleEditModal} data-key={rfp.id} className="text-sm leading-5 bg-green-400 py-[3px] px-[5px] text-white font-serif rounded">
                      APPLY
                    </button>
                  </td>                  
                </tr>
              ))
              :
              <tr>
                <td colSpan={6} className="px-4 py-2 whitespace-no-wrap text-center text-sm">
                  No RFP's Found For Your Category.
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>


      {
        showEditModal && <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-2 max-w-md rounded-lg shadow-md">
            <form onSubmit={applyRFP} className="appform">
              <div className="flex text-2xl font-bold text-gray-500 mb-2">
                <h2>Apply for RFP</h2>
              </div>

              <div class="mb-6">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Comment
                </label>
                <input
                  type="text"
                  id="name"
                  name="Comment"
                  value={rfp.Comment}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="file"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Document
                </label>
                <input
                  type="file"
                  id="file"
                  name="Document"
                  onChange={handleFile}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                onClick={applyRFP}
              >
                Apply For RFP
              </button>
              <button
               onClick={toggleEditModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>
        </>

      }
      <ToastContainer/>
    </>
  );
}
