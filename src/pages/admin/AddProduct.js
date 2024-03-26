import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Test() {
  const [formData, setFormData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [file, setFile] = useState(null);

  const getAll = async () => {
    try {
      const res_categories = await axios.get(
        "https://localhost:7254/api/ProductCategory/All"
      );
      console.log(res_categories.data);
      setCategory(res_categories.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (event) => {
    const { name, value } = event.target;
    if (name === "FormFile") {
      setFile(event.target.files[0]);
    } else {
      setFormData((preFormData) => ({
        ...preFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("ImageFile", file);
    formDataToSend.append("Name", formData.Name);
    formDataToSend.append("ShortDescription", formData.ShortDescription);
    formDataToSend.append("LongDescription", formData.LongDescription);
    formDataToSend.append("UnitType", formData.UnitType);
    formDataToSend.append("Size", formData.Size);
    formDataToSend.append("Specification", formData.Specification);
    formDataToSend.append("ProductCategoryId", formData.ProductCategory);
    formDataToSend.append("SubCategoryId", formData.SubCategory);

    console.log(formDataToSend);

    try {
      const res = await axios.post(
        "https://localhost:7254/api/Product/Add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      toast.success("New Product added");
      if (res.status === 200);
    } catch (error) {
      toast.error("Error adding product :(");
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto mt-8 appform bg-white"
        >
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create Product</h2>
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Product Name
            </label>
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="ImageFile"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Image
            </label>
            <input
              type="file"
              id="ImageFile"
              name="FormFile"
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              required
            />
          </div>

          <div className="flex">
            <div className="mb-6 relative">
              <input
                type="text"
                id="unitType"
                name="UnitType"
                value={formData.UnitType}
                onChange={handleOnChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="unitType"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Unit Type
              </label>
            </div>

            <div className="mb-6 relative">
              <input
                type="text"
                id="Size"
                name="Size"
                value={formData.Size}
                onChange={handleOnChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="Size"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Size
              </label>
            </div>
          </div>

          <div className="mb-6 relative">
            <textarea
              id="LongDescription"
              name="LongDescription"
              value={formData.LongDescription}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="LongDescription"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              LongDescription
            </label>
          </div>

          <div className="mb-6">
            <label
              htmlFor="ProductCategory"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Category
            </label>
            <select
              id="ProductCategory"
              name="ProductCategory"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose -- </option>
              {category && category.length > 0 ? (
                category.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option>Can not load</option>
              )}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="SubCategory"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sub Category
            </label>
            <select
              id="SubCategory"
              name="SubCategory"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose -- </option>
              {category && category.length > 0 ? (
                category.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option>Can not load</option>
              )}
            </select>
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              id="Specification"
              name="Specification"
              value={formData.Specification}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Specification"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Specification
            </label>
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

export default Test;
