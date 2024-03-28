import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductCategory() {
  const [productCategories, setProductCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product category data when the component mounts
    const fetchProductCategoryData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ProductCategory/All`
        );

        setProductCategories(response.data);
        setFilteredCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product category data:", error);
        setLoading(false);
      }
    };

    fetchProductCategoryData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Handle search query change
  useEffect(() => {
    const filtered = productCategories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset current page when search query changes
  }, [searchQuery, productCategories]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">PRODUCT CATEGORY</h2>
        </div>
        <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
        <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
        <div className="align-middle inline-block min-w-full overflow-hidden bg-zinc-50 px-8 pt-3 rounded-bl-lg rounded-br-lg">
          {/* Input field for filtering */}
          <div className="mt-4 searchFilter">
            <label className="mr-2">Search by Name:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2"
            />
          </div>
          <div className="shadow-xl">
            <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
              <table className="min-w-full bg-white text-gray-600">
                <thead>
                  <tr>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Sr.No
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Name
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Description
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Parent Category ID
                    </th>
                    <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-gray-600 tracking-wider">
                      Parent Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No data for product category
                      </td>
                    </tr>
                  ) : (
                    filteredCategories
                      .slice(indexOfFirstItem, indexOfLastItem)
                      .map((cat, index) => (
                        <tr key={cat.id}>
                          <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                            <div className="text-sm leading-5 text-gray-500">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                            <div className="text-sm leading-5 text-gray-500">
                              {cat.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                            <div className="text-sm leading-5 text-gray-500">
                              {cat.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                            <div className="text-sm leading-5 text-gray-500">
                              {cat.parentCategoryId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-center text-sm">
                            <div className="text-sm leading-5 text-gray-500">
                              {/* Assuming parentCategory is an object with name property */}
                              {cat.parentCategory && cat.parentCategory.name}
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
        {Array.from({
          length: Math.ceil(filteredCategories.length / itemsPerPage),
        }).map((_, index) => (
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
        ))}
      </div>
    </>
  );
}
