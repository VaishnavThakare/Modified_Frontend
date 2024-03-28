import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEdit = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    unitType: "",
    size: "",
    specification: "",
    productCategoryId: "", // Changed from productCategory
    subCategoryId: "", // Changed from subCategory
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Product/${productId}`
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7254/api/ProductCategory/All"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (productId) {
      fetchProductById();
    }

    fetchCategories();
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Product/${productId}`,
        productData
      );
      if (response.status === 200) {
        toast.success(`Product updated successfully!`);
        navigate(`/admin/products`);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  const back = () => {
    navigate(`/admin/products`);
  };

  return (
    <div className="bg-zinc-50">
      <div className="flex text-2xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">EDIT PRODUCT</h2>
      </div>
      <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="py-10 margin-left items-center bg-zinc-50 font-poppins">
        <div className="bg-white border-2 border-cyan-400 rounded-lg shadow-lg p-8 w-full max-w-lg ">
          <form onSubmit={handleSubmit} className="p-1 px-10">
            <div className="flex text-2xl font-bold text-gray-500 mb-7 justify-center items-center">
              <h2>Edit Product Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2"
                >
                  Name
                </label>
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="imageFile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="shortDescription"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2"
                >
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  id="shortDescription"
                  value={productData.shortDescription}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="longDescription"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2"
                >
                  Long Description
                </label>
                <textarea
                  name="longDescription"
                  id="longDescription"
                  value={productData.longDescription}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="unitType"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2"
                >
                  Unit Type
                </label>
                <input
                  type="text"
                  name="unitType"
                  id="unitType"
                  value={productData.unitType}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="size"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2"
                >
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={productData.size}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
              </div>
              <div>
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Category
                </label>
                <select
                  name="productCategoryId"
                  id="productCategory"
                  value={productData.productCategoryId}
                  onChange={handleInputChange}
                  className="block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-5 rounded-md"
                >
                  <option value="">Select Product Category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subcategory
                </label>
                <select
                  name="subCategoryId"
                  id="subCategory"
                  value={productData.subCategoryId}
                  onChange={handleInputChange}
                  className="block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-5 rounded-md"
                >
                  <option value="">Select Subcategory</option>
                  {productData.productCategoryId &&
                    categories
                      .find(
                        (category) =>
                          category.id === productData.productCategoryId
                      )
                      ?.subcategories?.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))}
                </select>
              </div>

              <div className="relative">
                <label
                  htmlFor="specification"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2"
                >
                  Specification
                </label>
                <textarea
                  name="specification"
                  id="specification"
                  value={productData.specification}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
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

export default ProductEdit;
