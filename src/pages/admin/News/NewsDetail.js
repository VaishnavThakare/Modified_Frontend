import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setnews] = useState(0);

  


  const getNews = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/News/${id}`);
      let data;
      if (res.status == 200 && res.data != null) {
        data = res.data;
      }

      setnews(data);
    } catch (error) {
      console.error("Error fetching News data:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  

 
  return (
    <>
      <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
      <div className="p-4">
        <h2>nsdnkhnsivh</h2>
        <h2 className="text-xl font-bold">{news.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: news.content }} />
        {/* Include other details as needed */}
      </div>
    </div>
    </>
  );
}
