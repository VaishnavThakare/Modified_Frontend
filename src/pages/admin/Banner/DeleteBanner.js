import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeleteBanner() {
  const [banner, setbanner] = useState([]);
  const [bannerId, setbannerId] = useState([]);
  const [disable,setDisable] = useState(false);

  const getAllBanners = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/Banner/All`);
      console.log(res.data);
      let data = [];
        if(res.status == 200){
            data = res.data;
        }
        else
        {
            data = [
              {
                  id:1,
                  isActive:true,
                  createdOn:new Date(),
                  lastModifiedOn:new Date(),
                  imagePath:`${process.env.PUBLIC_URL}/Banners/1.jpg`,
                  title:"Banner 1"
              },
              {
                  id:2,
                  isActive:true,
                  createdOn:new Date(),
                  lastModifiedOn:new Date(),
                  imagePath:`${process.env.PUBLIC_URL}/Banners/2.jpg`,
                  title:"Banner 2"
              },
              {
                  id:3,
                  isActive:true,
                  createdOn:new Date(),
                  lastModifiedOn:new Date(),
                  imagePath:`${process.env.PUBLIC_URL}/Banners/3.jpg`,
                  title:"Banner 3"
              }
          ] ;
        }
      console.log(data);
      setbanner(data);    
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleChange = (e) => {
    const v = e.target.value;
    console.log("Banner Id : "+v);
    setbannerId(v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        console.log(banner);
        console.log(bannerId);
        
       const response = await axios.delete(`${process.env.REACT_APP_API_URL}/Banner/${bannerId}`);
        if (response.status === 200) 
            alert("Banner Deleted");
        alert("Banner"+bannerId+" Deleted !!");
        getAllBanners();
        setDisable(true);

    } catch (error) {
      console.error("Error :", error.message);
    }
  };


  useEffect(() => {
    // Fetch project data when the component mounts
    getAllBanners();
  }, []);


  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Delete Banner</h2>
          </div>
          
          <div class="mb-6">
            <label
              for="bannerId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Banner
            </label>
            <select  id="bannerId"   name="id" onclick={(e)=>{setDisable(true)}} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled={disable}> Choose Banner </option>   
                {
                    banner && banner.length ? 
                    banner.map((item,index)=>{
                        return(
                            <>
                                <option value={item.id}>{item.title}</option>
                            </>
                        );
                    })
                    :
                    <></>
                }            
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Banner
          </button>
        </form>
      </div>
    </>
  );
}
