import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProfile() {
  const [profile, setProfile] = useState({
    userId: "",
    image: "",
    description: "",
    Position:"",
    IsActive:"",
  });

  const [file, setFile] = useState([]);

  const handleFile = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setProfile((prevData) => ({
      ...prevData,
      image: event.target.files[0],
    }));
  };

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profile);
      const formDataToSend = new FormData();
      formDataToSend.append("UserId", profile.userId);
      formDataToSend.append("Image", file);
      formDataToSend.append("Description", profile.description);
      formDataToSend.append("Position", profile.Position);
      formDataToSend.append("IsActive", profile.IsActive);
      console.log(formDataToSend);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ProfileCard/Add`,
        formDataToSend
      );
      if (response.status === 200) 
    alert("Profile Added");

      setProfile({
        userId: "",
        image: "",
        description: "",
        Position:"",
        IsActive:"",
      });
    } catch (error) {
      console.error("Error adding VendorCategory:", error.message);
    }
  };
  return (
    <>
      <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 appform bg-white">
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create Profile</h2>
          </div>

          <div className="mb-6 relative">
  <input
    type="text"
    id="userId"
    name="userId"
    value={profile.userId}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
  />
  <label
    htmlFor="userId"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    UserId
  </label>
</div>


          
          <div className="mb-6">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
               Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFile}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6 relative">
  <input
    type="text"
    id="Position"
    name="Position"
    value={profile.Position}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
  />
  <label
    htmlFor="Position"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Position
  </label>
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
              value={profile.IsActive}
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


          <div className="mb-6 relative">
  <textarea
    id="description"
    name="description"
    value={profile.description}
    onChange={handleChange}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
  />
  <label
    htmlFor="description"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Description
  </label>
</div>


         

          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Profile
          </button>
          </div>
        </form>
      </div>
    </>
  );
}
