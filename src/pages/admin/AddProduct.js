import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    ImageFile: null,
    Name:"",
    ShortDescription: "",
    LongDescription: "",
    UnitType: "",
    Size: "",
    Specification: "",
    ProductCategoryId: "",
    SubCategoryId: ""
  });

  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ProductCategory/Parent`
      );

      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching ProductCategory data:", error);
    }
  };

  const fetchSubCategory = async (id) => {
    try {
      if(id===""){
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ProductCategory/Category/${id}`
      );

      setSubCategory(response.data);
    } catch (error) {
      console.error("Error fetching ProductSubCategory data:", error);
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchSubCategory(formData.ProductCategoryId);
  }, [formData.ProductCategoryId]);


  const handleFile = (event) => {
    setFormData({
      ...formData,
      ImageFile: event.target.files[0]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("ImageFile", formData.ImageFile);
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("ShortDescription", formData.ShortDescription);
      formDataToSend.append("LongDescription", formData.LongDescription);
      formDataToSend.append("UnitType", formData.UnitType);
      formDataToSend.append("Size", formData.Size);
      formDataToSend.append("Specification", formData.Specification);
      formDataToSend.append("ProductCategoryId", formData.ProductCategoryId);
      formDataToSend.append("SubCategoryId", formData.SubCategoryId);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Product/Add`,
        formDataToSend
      );

      if (response.status === 200)
        toast.success("Product Added", {
          position: "top-right",
        });

      setFormData({
        ImageFile: null,
        Name:"",
        ShortDescription: "",
        LongDescription: "",
        UnitType: "",
        Size: "",
        Specification: "",
        ProductCategoryId: "",
        SubCategoryId: ""
      });
    } catch (error) {
      console.error("Error adding Product:", error.message);
    }
  };

  return (
    <>
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg margin-left mt-8 appform bg-white"
        >
          <div className="flex text-2xl font-bold text-gray-500 mb-5 justify-center">
            <h2 className="page-heading">Create Product</h2>
          </div>
          
          <div className="mb-6 relative">
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Name"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Name
            </label>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="ImageFile"
              onChange={handleFile}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              id="shortDescription"
              name="ShortDescription"
              value={formData.ShortDescription}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="shortDescription"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Short Description
            </label>
          </div>

          {/* Long Description */}
          <div className="mb-6 relative">
            <textarea
              id="longDescription"
              name="LongDescription"
              value={formData.LongDescription}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer h-20"
              placeholder=" "
              required
            ></textarea>
            <label
              htmlFor="longDescription"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Long Description
            </label>
          </div>

          {/* Unit Type */}
          <div className="flex mb-6">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                id="unitType"
                name="UnitType"
                value={formData.UnitType}
                onChange={handleChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="unitType"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Unit Type
              </label>
            </div>

            {/* Size */}
            <div className="relative flex-grow">
              <input
                type="text"
                id="size"
                name="Size"
                value={formData.Size}
                onChange={handleChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="size"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Size
              </label>
            </div>
          </div>


          {/* Specification */}
          <div className="mb-6 relative">
            <input
              type="text"
              id="specification"
              name="Specification"
              value={formData.Specification}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="specification"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Specification
            </label>
          </div>

          <div className="mb-6 relative">
          <select
           id="productCategoryId"
           name="ProductCategoryId"
           value={formData.ProductCategoryId}
           onChange={handleChange}
           required
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 relative">
          <select
           id="subCategoryId"
           name="SubCategoryId"
           value={formData.SubCategoryId}
           onChange={handleChange}
           required
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="" disabled>
              Choose a Sub-Category
            </option>
            {subcategory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
