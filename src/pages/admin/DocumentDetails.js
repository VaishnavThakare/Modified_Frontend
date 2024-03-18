import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocumentDetails = () => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [rejectId,setRejectId] = useState("");
  const [display,setDisplay] = useState("none");
  const [rComment,setComment] = useState("");
  const { id } = useParams();

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Vendor/${id}`
      );
      setVendorDetails(response.data);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
    setDisplay("none");
  }, [id]);


  const handleApprove = async (event)=>{
    const id = event.target.getAttribute('data-key');
    // alert(id)
;    
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Vendor/DocVerify`,{
        'id':id,
        documentVerified:true,
        comment:'Approved'
      });
      fetchVendorDetails();
      if(res.status == 200){
        toast.success("Document Approved",{
          position:"top-right"
        });
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleReject = (event)=>{
    const id = event.target.getAttribute('data-key');
    // alert(id)
    setRejectId(id);
    setDisplay("grid");
  }

  const rejectCancel = ()=>{
    setDisplay("none");
  }

  const rejectComment = async (event)=>{ 
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Vendor/DocVerify`,{
        'id':rejectId,
        documentVerified:false,
        comment:rComment
      });
      fetchVendorDetails();
      if(res.status == 200){
        toast.error("Document Rejected",{
          position:"top-right"
        });
      }
    }
    catch(error){
      console.log(error);
    }
    
    setDisplay("none");
  }

  const openDocument = (path) => {
    window.open(path, "_blank");
  };

  return (
    <>
    <div className="container mx-auto my-8">
      {vendorDetails ? (
        <>
      
          <h1 className="text-2xl font-bold mb-4 underline text-cyan-600">Vendor Details</h1>
          <p className="border-2 border-blue-500 p-4 w-1/2">
          <p>
            <strong>Vendor ID:</strong> {vendorDetails.id}
          </p>
          <p>
            <strong>Organization Name:</strong> {vendorDetails.organizationName}
          </p>
          <p>
            <strong>Name:</strong> {vendorDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {vendorDetails.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {vendorDetails.phoneNumber}
          </p>
          </p>

        
          <h2 className="text-2xl font-bold mt-8 mb-4 underline text-cyan-600 ">Document Details</h2>
          <table className="min-w-full border-2 border-blue-500 p-4 ">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  View
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {

              vendorDetails.documentsUploadList ? (
                vendorDetails.documentsUploadList 
                  .map((document, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {document.documentName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {
                          document.documentPath==null ?
                          "not uploaded the document"
                          :
                          <a href={document.documentPath} target="_blank">{document.documentName}</a>
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {document.isVerified ? "True":"False"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <button data-key={document.id} onClick={handleApprove} className="bg-cyan-400 py-[3px] px-[5px]  rounded-[10px] border border-solid border-black p-2">Approve</button>
                        <button data-key={document.id} onClick={handleReject} className="ml-[10px] bg-red-400 py-[3px] px-[5px]  rounded-[10px] border border-solid border-black p-2">Reject</button>
                      </td>                      
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    No documents available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading vendor details...</p>
      )}
    </div>

      <div style={{'display':display}} className="absolute top-[110px] right-[60px] grid grid-rows-2 bg-gray-500 w-[400px] h-[120px] p-[20px]">
        <input type="text" onClick={(event)=>{setComment(event.target.value)}} placeholder="Add comment here" className="w-full h-[30px] border border-solid border-black border-2 pl-2"/>
        <div className="flex items-center justify-center">
        <button onClick={rejectComment} className=" bg-red-400 w-[180px] h-[30px] rounded-[10px] border border-solid border-black">Reject</button>
        <button onClick={rejectCancel} className=" bg-red-400 w-[180px] h-[30px] ml-[5px] rounded-[10px] border border-solid border-black">Cancel</button>
        </div>
      </div>
      <ToastContainer/>
    </>

  );
};

export default DocumentDetails;