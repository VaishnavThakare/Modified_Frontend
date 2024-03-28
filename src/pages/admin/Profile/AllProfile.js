import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AllProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getAllProfile = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/ProfileCard/All`
      );
      console.log(res.data);
      let data = [];
      if (res.status == 200 && res.data != null) {
        data = res.data;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/ProfileCard/${id}`);
      toast.success("Profile Deleted", {
        position: "top-right",
      });
      getAllProfile();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getAllProfile();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profile.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="mt-4 flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL PROFILES</h2>
        </div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-80 bg-cyan-500 h-0.5 "></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
          {currentItems.map((profileItem, index) => (
            <div
              key={profileItem.id}
              className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-xl mx-auto border-2 border-cyan-500 bg-white mb-4"
            >
              <div className="w-full md:w-1/3 grid place-items-center">
                <img
                  src={profileItem.imagePath}
                  alt={profileItem.name}
                  className="rounded-xl h-[150px] w-[150px]"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col space-y-2 p-3">
                <h3 className="font-black text-gray-800 md:text-lg text-lg">
                  {profileItem.name + " (" + profileItem.position + ")"}
                </h3>
                <div className="line-clamp-4">
                  <p
                    className="md:text-sm text-gray-500 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: profileItem.description,
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(profileItem.id, index)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/admin/editProfile/${profileItem.id}`);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold rounded ml-4 p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(profile.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <ToastContainer />
    </>
  );
}
