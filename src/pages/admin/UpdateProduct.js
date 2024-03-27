import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateProduct({ productId }) {
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [file, setFile] = useState(null);

  const getProductDetails = async () => {
    console.log(productId);
    try {
      const res = await axios.get(
        `https://localhost:7254/api/Product/08DC4E24-67EE-4105-8E07-B28AE598D49C`
      );
      console.log(res.data);
      const productData = res.data;
      setFormData({
        Name: productData.name,
        ShortDescription: productData.shortDescription,
        LongDescription: productData.longDescription,
        UnitType: productData.unitType,
        Size: productData.size,
        Specification: productData.specification,
        ProductCategory: productData.category,
        SubCategory: productData.subCategory,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7254/api/ProductCategory/All"
      );
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
    getAllCategories();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
    
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Error updating product");
      console.log(error);
    }
  };

  return (
    <>
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-sm mx-28 mt-8 appform bg-white">
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Update Product</h2>
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
            <textarea
              id="ShortDescription"
              name="ShortDescription"
              value={formData.ShortDescription}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="ShortDescription"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Short Description
            </label>
          </div>

          <div className="mb-6 relative">
            <input
              type="file"
              id="ImageFile"
              name="ImageFile"
              onChange={(e) => setFile(e.target.files[0])}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              required
            />
            <label
              htmlFor="ImageFile"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Image
            </label>
          </div>

          <div className="flex">
            <div className="mb-6 relative">
              <input
                type="text"
                id="UnitType"
                name="UnitType"
                value={formData.UnitType}
                onChange={handleOnChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="UnitType"
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
              id="Specification"
              name="Specification"
              value={formData.Specification || ""}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

          <div className="mb-6 relative">
            <select
              id="ProductCategory"
              name="ProductCategory"
              value={formData.ProductCategory || ""}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat.Id} value={cat.Id}>
                  {cat.Name}
                </option>
              ))}
            </select>
            <label
              htmlFor="ProductCategory"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Product Category
            </label>
          </div>

          <div className="mb-6 relative">
            <select
              id="SubCategory"
              name="SubCategory"
              value={formData.SubCategory || ""}
              onChange={handleOnChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="">Select Subcategory</option>
              {subcategory.map((sub) => (
                <option key={sub.Id} value={sub.Id}>
                  {sub.Name}
                </option>
              ))}
            </select>
            <label
              htmlFor="SubCategory"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Subcategory
            </label>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default UpdateProduct;

