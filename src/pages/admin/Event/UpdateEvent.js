import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateEvents() {

  const [event, setevent] = useState({
    Id:"",
    Title: "",
    Image: "",
    IsActive: "",
    Content:"",
    EventDateTime:""
  });

  const [events, setevents] = useState([]);
  const [file,setFile]= useState([]);

  const getAllEvents = async () => {
    try {
    //   let res = `${process.env.REACT_APP_API_URL}/Banner/All`;
    //   console.log(res.data);
    let data = [
        {
            id:1,
            isActive:true,
            createdOn:new Date(),
            modifiedOn:new Date(),
            imagePath:`${process.env.PUBLIC_URL}/Banners/1.jpg`,
            title:"Event 1",
            content:"content 1"
        },
        {
            id:2,
            isActive:true,
            createdOn:new Date(),
            modifiedOn:new Date(),
            imagePath:`${process.env.PUBLIC_URL}/Banners/2.jpg`,
            title:"Event 2",
            content:"content 2"
        },
        {
            id:3,
            isActive:true,
            createdOn:new Date(),
            modifiedOn:new Date(),
            imagePath:`${process.env.PUBLIC_URL}/Banners/3.jpg`,
            title:"Event 3",
            content:"content 3"
        }
    ] ;
        console.log(data);
        setevents(data);    

    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleFile = (e)=>{
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    event.Image = e.target.files[0];
  }

  useEffect(() => {
    getAllEvents();
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

    //   const response = await axios.put(`${process.env.REACT_APP_API_URL}/Banner/${bannerId}`,banner,{
    //     '':""
    //   });
    //   if (response.status === 200) 
        alert("Event "+ event.Id+" Updated");
        getAllEvents();
      setevent({
        Id:"",
        Title: "",
        Image: "",
        IsActive: "",
        Content:"",
        EventDateTime:""
      });
      document.getElementById('file').value="";
    } catch (error) {
      console.error("Error :", error.message);
    }
  };


  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Update Event</h2>
          </div>

          <div class="mb-6">
            <label
              for="projectHeadId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Update Event
            </label>
            <select  id="projectHeadId"   name="Id" value={event.Id}  onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose Event </option>
                {
                    events && events.length > 0 ? 
                    events.map((item,index)=>{
                        return(
                            <>
                                <option value={item.id}>{item.title}</option>
                            </>
                        )
                    })
                    :
                    <></>
                }               
            </select>
          </div>
          
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="name"
              name="Title"
              value={event.Title}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Content
            </label>
            <textarea
              id="name"
              name="Content"
              value={event.Content}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Event DateTime
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
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900"      >
              Event Image
            </label>
            <input
              type="file"
              id="file"
              name="Image"
              onChange={handleFile}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Event
          </button>
        </form>
      </div>
    </>
  );
}
