import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

export default function DetailNews() {
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
<div className="flex justify-between">
        <div>
          <div className="flex text-2xl font-bold text-gray-500 ">
            <h2 className="text-left text-cyan-500">NEWS DETAIL</h2>
          </div>
          <div className="w-52 bg-cyan-400 h-0.5 mb-1"></div>
          <div className="w-96 bg-cyan-400 h-0.5 mb-5"></div>
        </div>
        <div>
          <div className="flex justify-center">

          <a
            href="/admin/allNews"
            class="text-cyan-500 font-medium text-sm hover:text-cyan-700 "
          >
            <button
              className=" bg-cyan-500 text-white px-4 py-2 rounded mr-28"
            >
              Back
            </button>
          </a>
          </div>
        </div>
      </div>
      <div className="w-3/4 border-2 border-cyan-500 rounded-lg mb-5 bg-white justify-center ml-28">
        <div className="p-6">
        <img
                  className="rounded-t-lg w-3/4 mb-7 h-3/4" style={{marginLeft:"12%"}}
                  src={news.imagePath}
                  alt={news.title}
                />
          <p className="text-gray-900 ">
            <span className="text-m text-transform: uppercase font-bold">
            NEWS TITLE
            </span>
            : {news.title}
          </p>
          <p className="text-gray-900 ">
          <span className="text-m text-transform: uppercase font-bold">
            STATUS
            </span>
            : {news.isActive ? "Active" : "Inactive"}
                  </p>
          <p className="text-gray-900">
            <span className="text-m text-transform: uppercase font-bold">
            NEWS CONENT:
            </span>
             <p dangerouslySetInnerHTML={{ __html: news.content }}  style={{ maxHeight: "300px", overflowY: "auto" }}/>
          </p>
          
        </div>
      </div>
    </>
  );
}
