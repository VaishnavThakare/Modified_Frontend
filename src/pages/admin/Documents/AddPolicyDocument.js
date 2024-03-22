import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPolicyDocument() {

  const [document, setdocument] = useState({
    Name: "",
    Document: "",
    IsActive: ""
  });

  const [file,setFile]= useState([]);

  const handleFile = (event)=>{
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    document.Document = event.target.files[0];
  }

  useEffect(() => {

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdocument((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(document);
        const formDataToSend = new FormData();
        formDataToSend.append("Name",document.Name);
        formDataToSend.append("Document",file);
        formDataToSend.append("IsActive",document.IsActive);

        console.log(formDataToSend);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/PolicyDocument/Add`,formDataToSend);
      if (response.status === 200) 
      toast.success("Document Added",{
        position:"top-right"
      });
      setdocument({
        Name: "",
        Document: "",
        IsActive: ""
      });
    } catch (error) {
      console.error("Error :", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create Document</h2>
          </div>
          
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Document Name
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={document.Name}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="projectHeadId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              IsActive
            </label>
            <select  id="projectHeadId"   name="IsActive" value={document.IsActive}   onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose Status </option>
                <option  value={true}> True </option>
                <option  value={false}> False </option>                
            </select>
          </div>

          <div class="mb-6">
            <label    for="description"    class="block mb-2 text-sm font-medium text-gray-900"      >
              Document File
            </label>
            <input
              type="file"
              id="file"
              name="Document"
              onChange={handleFile}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Document
          </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}
