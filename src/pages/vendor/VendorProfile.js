import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VendorProfile() {
  const [edit, setEdit] = useState(false);
  const [docCount, setdocCount] = useState(0);
  const [docFile, setDocFile] = useState([]);
  const [profile, setProfile] = useState({
    organizationName: "",
    name: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
    address: "",
    pincode: 0,
    vendorCategory: {
      id: "",
      name: "",
      description: "",
      documentList: "",
    },
  });
  const fetchData = async () => {
    try {
      const sid = sessionStorage.getItem("sid");
      const vendorRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/Vendor/${sid}`
      );

      setProfile(vendorRes.data);
      setdocCount(vendorRes.data.vendorCategory.documentList.split(",").length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    setDocFile((prevDocFiles) => {
      const newDocFiles = [...prevDocFiles];

      newDocFiles[index] = file;

      return newDocFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var c = 0;
    docFile.forEach((file) => {
      if (file.name) {
        c++;
      }
    });

    if (c === docCount || c === 0) {
      try {
        const formData = new FormData();
        formData.append("OrganizationName", profile.organizationName);
        formData.append("Name", profile.name);
        formData.append("PhoneNumber", profile.phoneNumber);
        formData.append("State", profile.state);
        formData.append("City", profile.city);
        formData.append("Address", profile.address);
        formData.append("Pincode", profile.pincode);

        docFile.forEach((doc) => {
          formData.append("Documents", doc);
        });

        const sid = sessionStorage.getItem("sid");

        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/Vendor/${sid}`,
          formData
        );

        fetchData();

        if (response.status === 200) {
          alert("Profile Updated");
          setEdit(false);
        }
      } catch (error) {
        console.error("Error updating vendor:", error.response.data);
        alert(error.response.data);
      }
    } else {
      alert("Select All Documents");
    }
  };
  return (
    <div className="flex flex-col px-8 items-center justify-center">
      <div class={`w-full p-8 bg-white shadow mt-24 ${edit ? "hidden" : ""}`}>
        <div class="grid grid-cols-1 mb-10">
          <div class="relative">
            <div class="w-48 h-48 mx-auto absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img
                className="object-cover w-40 h-40 rounded-full"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              />
            </div>
          </div>
        </div>
        <div class="mt-20 text-center border-b py-12">
          <h1 class="font-medium text-gray-700">
            <span class="font-medium text-4xl text-gray-500">
              {profile.name}
            </span>
            <br />
            <span class="font-light text-lg text-gray-500">
              {profile.email}
            </span>
            <br />
            <span class="font-light text-lg text-gray-500">
              {profile.phoneNumber}
            </span>
          </h1>
          <p class="font-light text-gray-600 mt-3">{`${profile.address}, ${profile.city}, ${profile.state}`}</p>
          <p class="mt-8 text-gray-500 uppercase">{profile.organizationName}</p>
          <p class="mt-2 text-gray-500 uppercase">
            {profile.vendorCategory.name}
          </p>
        </div>
        <div class="flex flex-col justify-center">
          <div class="space-x-8 flex justify-between mt-10 md:justify-center">
            <button
              class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div
        class={`w-full px-6 pb-8 mt-8 bg-white shadow-dashboard rounded-bl-lg rounded-br-lg ${
          edit ? "" : "hidden"
        }`}
      >
        <div class="grid mx-auto mt-8">
          <div class="flex flex-col items-center space-y-5">
            <img
              class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />

            <div class="flex flex-col space-y-5">
              <button
                type="button"
                class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Change picture
              </button>
            </div>
          </div>
          <div class="align-middle inline-block min-w-full overflow-hidden px-8 py-3 pb-8">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
              <div class="mb-6">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="organizationName"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={profile.organizationName}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="phoneNumber"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="city"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="state"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="pincode"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              {profile.vendorCategory.documentList
                .split(",")
                .map((doc, index) => (
                  <div class="mb-6" key={index}>
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900"
                      htmlFor={`documents_${index}`}
                    >
                      Upload {doc}
                    </label>
                    <input
                      class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                      aria-describedby={`file_input_help_${index}`}
                      id={`documents_${index}`}
                      type="file"
                      name={`documents_${index}`}
                      accept=".png, .jpg, .pdf .txt"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                    <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                      PNG, JPG or PDF.
                    </p>
                  </div>
                ))}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
