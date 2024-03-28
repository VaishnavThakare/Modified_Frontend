import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileInput from "../FileInput";
import ImageCropper from "./ImageCropper";

export default function AddBanner() {

  const [image,setImage] = useState("");
  const [imgAfterCrop,setImgAfterCrop] = useState("");
  const [currentPage,setCurrentPage] = useState("choose-img");
  const onImageSelected = (selectedImg)=>{
    setImage(selectedImg);
    setCurrentPage("crop-img");
  }

  const onCropDone = (imgCroppedArea)=>{
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src=image;
    imageObj1.onload = function(){ 
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataURL= canvasEle.toDataURL("image/Jpeg");
      console.log(imageObj1.src);
      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    }
  }
  const onCropCancel = ()=>{
    setCurrentPage("choose-img");
    setImage("");
  }


  const [banner, setbanner] = useState({
    Title: "",
    Image: "",
    IsActive: "",
  });

  const [file, setFile] = useState([]);

  const handleFile = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    banner.Image = event.target.files[0];
  };

  useEffect(() => {}, []);

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
      formDataToSend.append("Title", banner.Title);
      formDataToSend.append("Image", imgAfterCrop);
      formDataToSend.append("IsActive", banner.IsActive);
      console.log(formDataToSend);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Banner/Add`,
        formDataToSend
      );
      if (response.status === 200){
        toast.success("Banner is added",{
          position:"top-right"
        });
      }

      setbanner({
        Title: "",
        Image: "",
        IsActive: "",
      });

      document.getElementById("file").value = "";
    } catch (error) {
      console.error("Error adding Banner:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-lg margin-left mt-8 appform bg-white">
          <div className="flex text-2xl font-bold text-gray-500 mb-2 justify-center">
            <h2 className="page-heading">Create Banner</h2>
          </div>

          <div class="mb-6 relative">
    <input
        type="text"
        id="name"
        name="Title"
        value={banner.Title}
        onChange={handleChange}
        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
    />
    <label
        for="name"
        class="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
        Title
    </label>
</div>


          <div class="mb-6">
            <select
              id="projectHeadId"
              name="IsActive"
              value={banner.IsActive}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                {" "}
                Choose Status{" "}
              </option>
              <option value={true}> Active </option>
              <option value={false}> Inactive </option>
            </select>
          </div>

          <div class="mb-6">
            {/* <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Banner Image
            </label>
            <input
              type="file"
              id="file"
              name="Image"
              onChange={handleFile}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />    */}
            <button type="button" className="w-full bg-cyan-400 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
              <FileInput onImageSelected={onImageSelected}></FileInput>
            </button>           
            {
              currentPage === "crop-img" ?
                <ImageCropper
                  image={image}
                  onCropDone={onCropDone}
                  onCropCancel={onCropCancel}
                />
                :
                <div></div>
            }
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Banner
          </button>
          </div>
        </form>
      </div>
      {
        imgAfterCrop === ""?
        <></>
        :
        <img src={imgAfterCrop} className="w-[150px] h-[150px]"></img>
      }
      <ToastContainer/>
    </>
  );
}
