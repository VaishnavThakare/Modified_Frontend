import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEdit = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    ImageFile: null,
    Name: "",
    ShortDescription: "",
    LongDescription: "",
    UnitType: "",
    Size: "",
    Specification: "",
  });

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
    fetchProductById();
  }, [productId]);

  const handleFile = (event) => {
    setProductData({
      ...productData,
      ImageFile: event.target.files[0],
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Name", productData.Name);
      formDataToSend.append("ImageFile", productData.ImageFile);
      formDataToSend.append("ShortDescription", productData.ShortDescription);
      formDataToSend.append("LongDescription", productData.LongDescription);
      formDataToSend.append("UnitType", productData.UnitType);
      formDataToSend.append("Size", productData.Size);
      formDataToSend.append("Specification", productData.Specification);

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Product/${productId}`,
        formDataToSend
      );
      if (response.status === 200) {
        toast.success(`Product updated successfully!`);
        navigate(-1);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg margin-left mt-8 appform bg-white"
        >
          <div className="flex text-2xl font-bold text-gray-500 mb-5 justify-center">
            <h2 className="page-heading">Edit Product Details</h2>
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              id="Name"
              name="Name"
              value={productData.Name}
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
              id="ShortDescription"
              name="ShortDescription"
              value={productData.ShortDescription}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="ShortDescription"
              className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Short Description
            </label>
          </div>

          <div className="mb-6 relative">
            <textarea
              id="longDescription"
              name="LongDescription"
              value={productData.LongDescription}
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

          <div className="flex mb-6">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                id="unitType"
                name="UnitType"
                value={productData.UnitType}
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

            <div className="relative flex-grow">
              <input
                type="text"
                id="size"
                name="Size"
                value={productData.Size}
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

          <div className="mb-6 relative">
            <input
              type="text"
              id="specification"
              name="Specification"
              value={productData.Specification}
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

          <div className="flex justify-center">
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
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductEdit;
