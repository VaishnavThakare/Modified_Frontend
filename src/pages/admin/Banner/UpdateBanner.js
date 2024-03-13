import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateBanner() {

  const [banner, setbanner] = useState({
    Id:"",
    Title: "",
    Image: "",
    IsActive: "",
  });

  const [banners, setbanners] = useState([]);
  const [file,setFile]= useState([]);

  const getAllBanners = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Banner/All`);
      console.log(res.data);
      let data = [];
        if(res.status == 200 && res.data != null){
            data = res.data;
        }
        // else{
        //     data = [
        //       {
        //           id:1,
        //           isActive:true,
        //           createdOn:new Date(),
        //           lastModifiedOn:new Date(),
        //           imagePath:`${process.env.PUBLIC_URL}/Banners/1.jpg`,
        //           title:"Banner 1"
        //       },
        //       {
        //           id:2,
        //           isActive:true,
        //           createdOn:new Date(),
        //           lastModifiedOn:new Date(),
        //           imagePath:`${process.env.PUBLIC_URL}/Banners/2.jpg`,
        //           title:"Banner 2"
        //       },
        //       {
        //           id:3,
        //           isActive:true,
        //           createdOn:new Date(),
        //           lastModifiedOn:new Date(),
        //           imagePath:`${process.env.PUBLIC_URL}/Banners/3.jpg`,
        //           title:"Banner 3"
        //       }
        //   ] ;
        // }
        console.log(data);
        setbanners(data);    

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFile = (event)=>{
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    banner.Image = event.target.files[0];
  }

  useEffect(() => {
    getAllBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbanner((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(banner);
        const formDataToSend = new FormData();
        formDataToSend.append("Title",banner.Title);
        formDataToSend.append("Image",file);
        formDataToSend.append("IsActive",banner.IsActive);
        console.log(formDataToSend);

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/Banner/${banner.Id}`,formDataToSend);
      if (response.status === 200) 
        alert("Banner Updated");
        getAllBanners();
      setbanner({
        Id:"",
        Title: "",
        Image: "",
        IsActive: "",
      });
    } catch (error) {
      console.error("Error :", error.message);
    }
  };


  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Update Banner</h2>
          </div>

          <div class="mb-6">
            <label
              for="projectHeadId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Update Banner
            </label>
            <select  id="projectHeadId"   name="Id" value={banner.Id}  onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose Banner </option>
                {
                    banners && banners.length > 0 ? 
                    banners.map((item,index)=>{
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
              value={banner.Title}
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
            <select  id="projectHeadId"   name="IsActive" value={banner.IsActive}   onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose Status </option>
                <option  value={true}> True </option>
                <option  value={false}> False </option>                
            </select>
          </div>

          <div class="mb-6">
            <label    for="description"    class="block mb-2 text-sm font-medium text-gray-900"      >
              Banner Image
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
            Add Banner
          </button>
        </form>
      </div>
    </>
  );
}
