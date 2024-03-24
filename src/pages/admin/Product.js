import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getData = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/Product/All`;

      if (filterOn === "all") {
        fetchProductData();
      } else if (filterOn && filterVal) {
        url += `?filterOn=${filterOn}&filterVal=${filterVal}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Product data:", error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "filterOn") {
      setFilterOn(event.target.value);
    } else if (event.target.name === "filterVal") {
      setFilterVal(event.target.value);
    }
    getData();
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Product/All`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Product data:", error);
    }
  };

  useEffect(() => {
    // Fetch product data when the component mounts
    fetchProductData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">PRODUCTS LIST</h2>
        </div>
        <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50  px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="searchFilter">
            <select
              id="filterOn"
              name="filterOn"
              value={filterOn}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2 "
            >
              <option value="all">All</option>
              <option value="productCategory">Product Category</option>
              <option value="price">Price</option>
            </select>
            <input
              type="text"
              id="filterVal"
              name="filterVal"
              value={filterVal}
              onChange={handleChange}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2"
              placeholder="Enter filter value"
            />
          </div>

          <div className="shadow-xl">
            <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-3center leading-4 tracking-wider">
                      Sr.No
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-3center leading-4 tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Short Description
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Long Description
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Unit Type
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Specification
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Product Category
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                      Product Sub-category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="px-6 py-4 whitespace-no-wrap text-center text-sm"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((product, index) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.imagePath}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.shortDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.longDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {/* Add your unit type rendering logic here */}
                            {product.unitType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {/* Add your size rendering logic here */}
                            {product.size}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.specification}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 ">
                            {product.subCategory}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map(
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
    </>
  );
}
