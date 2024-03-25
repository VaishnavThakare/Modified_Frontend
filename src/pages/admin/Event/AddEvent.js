import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEvent() {

  const [event, setevent] = useState({
    Title: "",
    Image: "",
    IsActive: "",
    Content : "",
    EventDateTime:""
  });

  const [file,setFile]= useState([]);

  const handleFile = (event)=>{
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    event.Image = event.target.files[0];
  }

  useEffect(() => {

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setevent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(event);
        const formDataToSend = new FormData();
        formDataToSend.append("Title",event.Title);
        formDataToSend.append("Image",file);
        formDataToSend.append("IsActive",event.IsActive);
        formDataToSend.append("Content",event.Content);
        formDataToSend.append("EventDateTime",event.EventDateTime);
        console.log(formDataToSend);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/Event/Add`,formDataToSend);
      
      if (response.status === 200) 
        toast.success("Event Added",{
          position:"top-right"
        });

      setevent({
        Title: "",
        Image: "",
        IsActive: "",
        Content:"",
        EventDateTime:""
      });
    } catch (error) {
      console.error("Error adding VendorCategory:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform bg-white">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create Event</h2>
          </div>
          
          <div class="mb-6 relative">
    <input
        type="text"
        id="name"
        name="name"
        value={event.name}
        onChange={handleChange}
        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
    />
    <label
        for="name"
        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
        Title
    </label>
</div>


<div className="mb-6 relative">
  <input
    type="text"
    id="content"
    name="Content"
    placeholder=" "
    value={event.Content}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
    required
  />
  <label
    htmlFor="content"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Content
  </label>
</div>


          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Date
            </label>
            <input
              type="date"
              id="name"
              name="EventDateTime"
              value={event.EventDateTime}
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
            <select  id="projectHeadId"   name="IsActive" value={event.IsActive}   onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose Status </option>
                <option  value={true}> True </option>
                <option  value={false}> False </option>                
            </select>
          </div>

          <div class="mb-6">
            <label    for="description"    class="block mb-2 text-sm font-medium text-gray-900"      >
              Event Image
            </label>
            <input
              type="file"
              id="description"
              name="Image"
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
            Add Event
          </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}
