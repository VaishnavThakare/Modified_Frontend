import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeleteNews() {
  const [news, setnews] = useState([]);
  const [newsId, setnewsId] = useState([]);

  const getAllNews= async () => {
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
        setnews(data);   
        //setbanners(res.data); 

    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const handleChange = (e) => {
    const v = e.target.value;
    console.log("Banner Id : "+v);
    setnewsId(v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        console.log(news);
        console.log(newsId);
        
        // const response = await axios.post(`${process.env.REACT_APP_API_URL}/Banner/Delete`,{'id':bannerId});
        // if (response.status === 200) 
        //     alert("Banner Deleted");
        alert("News"+newsId+" Deleted !!");
        getAllNews();

    } catch (error) {
      console.error("Error :", error.message);
    }
  };


  useEffect(() => {
    // Fetch project data when the component mounts
    getAllNews();
  }, []);


  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
  
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Delete News</h2>
          </div>
          
          <div class="mb-6">
            <label
              for="bannerId"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Select News
            </label>
            <select  id="bannerId"   name="id"  onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   >
                <option value="" disabled> Choose News </option>   
                {
                    news && news.length ? 
                    news.map((item,index)=>{
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
            Delete News
          </button>
        </form>
      </div>
    </>
  );
}