import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddNews() {
  const [news, setnews] = useState({
    title: "",
    isActive: "",
  });

  const [file, setFile] = useState([]);
  const [content, setContent] = useState("");

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

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
      formDataToSend.append("Title", news.title);
      formDataToSend.append("Image", file);
      formDataToSend.append("IsActive", news.isActive);
      formDataToSend.append("Content", content);
      console.log(formDataToSend);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/News/Add`,
        formDataToSend
      );
      if (response.status === 200) {
        toast.success("News Added", {
          position: "top-right",
        });
      }

      setnews({
        title: "",
        isActive: "",
      });
      setContent("");
      setFile([]);
    } catch (error) {
      console.error("Error adding News:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg margin-left mt-8 appform bg-white"
        >
          <div className="flex text-2xl font-bold text-gray-500 mb-2 justify-center">
            <h2 className="page-heading">Add News</h2>
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              id="title"
              name="title"
              value={news.title}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Title
            </label>
          </div>

          <div class="mb-6 relative">
            <ReactQuill
              id="content"
              theme="snow"
              value={content}
              onChange={setContent}
            />
            <label
              for="content"
              class="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Content
            </label>
          </div>

          <div class="mb-6">
            <select
              id="isActive"
              name="isActive"
              value={news.isActive}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                Choose Status
              </option>
              <option value={true}> Active </option>
              <option value={false}> InActive </option>
            </select>
          </div>

          <div class="mb-6 relative">
            <label
              for="image"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              News Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
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
      <ToastContainer />
    </>
  );
}
