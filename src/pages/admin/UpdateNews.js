import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateNews() {

  const [news, setnews] = useState({
    Id:"",
    Title: "",
    Image: "",
    IsActive: "",
    Content:""
  });

  const [newss, setnewss] = useState([]);
  const [file,setFile]= useState([]);

  const getAllNews = async () => {
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
            title:"News 1",
            content:"content 1"
        },
        {
            id:2,
            isActive:true,
            createdOn:new Date(),
            modifiedOn:new Date(),
            imagePath:`${process.env.PUBLIC_URL}/Banners/2.jpg`,
            title:"News 2",
            content:"content 2"
        },
        {
            id:3,
            isActive:true,
            createdOn:new Date(),
            modifiedOn:new Date(),
            imagePath:`${process.env.PUBLIC_URL}/Banners/3.jpg`,
            title:"News 3",
            content:"content 3"
        }
    ] ;
        console.log(data);
        setnewss(data);    

    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleFile = (event)=>{
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    news.Image = event.target.files[0];
  }

  useEffect(() => {
    getAllNews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnews((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(news);
        const formDataToSend = new FormData();
        formDataToSend.append("Title",news.Title);
        formDataToSend.append("Image",file);
        formDataToSend.append("IsActive",news.IsActive);
        formDataToSend.append("Content",news.Content);
        console.log(formDataToSend);

    //   const response = await axios.put(`${process.env.REACT_APP_API_URL}/Banner/${bannerId}`,banner,{
    //     '':""
    //   });
    //   if (response.status === 200) 
        alert("News"+ news.Id+" Updated");
        getAllNews();
      setnews({
        Id:"",
        Title: "",
        Image: "",
        IsActive: "",
        Content:""
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
            <h2>Update News</h2>
          </div>

          <div class="mb-6">
            <label
              for="projectHeadId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Update News
            </label>
            <select  id="projectHeadId"   name="Id" value={news.Id}  onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose News </option>
                {
                    newss && newss.length > 0 ? 
                    newss.map((item,index)=>{
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
              value={news.Title}
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
              value={news.Content}
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
            <select  id="projectHeadId"   name="IsActive" value={news.IsActive}   onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose Status </option>
                <option  value={true}> True </option>
                <option  value={false}> False </option>                
            </select>
          </div>

          <div class="mb-6">
            <label    for="description"    class="block mb-2 text-sm font-medium text-gray-900"      >
              News Image
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

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update News
          </button>
        </form>
      </div>
    </>
  );
}