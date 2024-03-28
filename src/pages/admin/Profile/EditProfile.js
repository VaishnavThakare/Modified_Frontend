import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    userId: "",
    position: "",
    isActive: "",
  });

  const [file, setFile] = useState([]);
  const [description, setDescription] = useState("");

  const [users, setUsers] = useState([]);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Admin/AllUsers`
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Users data:", error);
    }
  };

  const getProfile = async (Id) => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/ProfileCard/${Id}`
      );
      let data;
      if (res.status == 200 && res.data != null) {
        data = res.data;
      }

      setProfile(data);
      setDescription(data.description);
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    getProfile(profileId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profile);
      if (description.length > 200) {
        toast.error("Message should not be more than 200 chars", {
          position: "top-right",
        });
        throw "Message should not be more than 200 chars";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("UserId", profile.userId);
      formDataToSend.append("Image", file);
      formDataToSend.append("Description", description);
      formDataToSend.append("Position", profile.position);
      formDataToSend.append("IsActive", profile.isActive);
      console.log(formDataToSend);

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/ProfileCard/${profileId}`,
        formDataToSend
      );
      if (response.status === 200) {
        toast.success("Profile Updated", {
          position: "top-right",
        });
      }

      getProfile(profileId);
    } catch (error) {
      console.error("Error updating Profile:", error.message);
    }
  };
  return (
    <>
      <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg margin-left mt-8 appform bg-white"
        >
          <div className="flex text-2xl font-bold text-gray-500 mb-2 justify-center">
            <h2 className="page-heading">Create Profile</h2>
          </div>

          <div class="mb-6">
            <select
              id="userId"
              name="userId"
              value={profile.userId}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                Choose User
              </option>
              {users.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFile}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              id="position"
              name="position"
              value={profile.position}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="position"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Position
            </label>
          </div>

          <div class="mb-6">
            <select
              id="isActive"
              name="isActive"
              value={profile.isActive}
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

          <div className="mb-6 relative">
            <ReactQuill
              id="description"
              theme="snow"
              value={description}
              onChange={setDescription}
            />
            <label
              for="description"
              class="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Description/Message
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Profile
            </button>
            <button
            type="button"
                onClick={()=>{navigate(-1)}}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Close
              </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
