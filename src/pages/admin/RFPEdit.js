import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RFPEdit = () => {
  const { id } = useParams();
  const [Rfp, setRfp] = useState({
    Document: null,
    EndDate: ""
  });
  const [RfpData, setRfpData] = useState(
    {
      title: "",
      vendorCategory: {
        name: ""
      },
      project: {
        name: ""
      }
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRFPById = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7254/api/RFP/${id}`
        );
        setRfpData(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchRFPById();

  }, [id]);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    Rfp.Document = e.target.files[0];
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRfp((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Rfp);
    console.log(id);
    try {
    var formData = new FormData();
    formData.append("Document",Rfp.Document);
    formData.append("EndDate",Rfp.EndDate);
      const response = await axios.put(`https://localhost:7254/api/RFP/${id}`, formData);
      if (response.status === 200) {
        toast.success(`RFP Updated successfully!`);        
      } else {
        toast.error("Failed to update RFP");
      }
    } catch (error) {
      toast.error("Failed to update RFP");
      console.error("Error updating RFP", error);
    }
  };

  const back = () => {
    navigate(`/admin/rfp`);
  };

  return (
    <div className="bg-zinc-50">


      <div className="py-10 flex justify-center items-center bg-zinc-50 font-poppins">
        <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg mt">
          <div className="flex items center text-xl font-bold text-gray-500">
            <h2 className="text-center text-gray-500">EDIT RFP</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-10">
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4 relative">
                <input
                  type="text"
                  name="name"
                  id="title"
                  value={RfpData.title}
                  placeholder=" "
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Title
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="text"
                  name="ProjectName"
                  id="ProjectName"
                  value={RfpData.project.name}
                  placeholder=" "
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
                <label
                  htmlFor="ProjectName"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Project Name
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="text"
                  name="Category"
                  id="Category"
                  value={RfpData.vendorCategory.name}
                  placeholder=" "
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
                <label
                  htmlFor="Category"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Category
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="file"
                  name="Document"
                  id="Document"
                  onChange={handleFile}
                  placeholder=" "
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="Document"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Document
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="date"
                  name="EndDate"
                  id="EndDate"
                  onChange={handleInputChange}
                  placeholder=" "
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="EndDate"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  End Date
                </label>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                >
                  Submit
                </button>
                <button
                  onClick={back}
                  type="button"
                  className="text-white px-4 py-2 ml-5 rounded-md bg-gray-500 hover:bg-gray-700 focus:outline-none focus:bg-cyan-700"
                >
                  Back
                </button>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default RFPEdit;

