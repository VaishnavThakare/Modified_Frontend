import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNews() {
  const [news, setnews] = useState({
    Title: "",
    Image: "",
    IsActive: "",
    Content: "",
  });

  const [file, setFile] = useState([]);

  const handleFile = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    news.Image = event.target.files[0];
  };

  useEffect(() => {}, []);

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
      formDataToSend.append("Title", news.Title);
      formDataToSend.append("Image", file);
      formDataToSend.append("IsActive", news.IsActive);
      formDataToSend.append("Content", news.Content);
      console.log(formDataToSend);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/News/Add`,
        formDataToSend
      );
      if (response.status === 200){
        toast.success("News Added",{
          position:"top-right"
        });
      }

      setnews({
        Title: "",
        Image: "",
        IsActive: "",
        Content: "",
      });
    } catch (error) {
      console.error("Error adding VendorCategory:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform">
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create News</h2>
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
              for="content"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Content
            </label>
            <textarea
              id="content"
              name="Content"
              value={news.Content}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="isActive"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              IsActive
            </label>
            <select
              id="isActive"
              name="IsActive"
              value={news.IsActive}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                {" "}
                Choose Status{" "}
              </option>
              <option value={true}> True </option>
              <option value={false}> False </option>
            </select>
          </div>

          <div class="mb-6">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
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
          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add News
          </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}
