import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

const ProductDetailsView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Product/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (product === null || product === undefined) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="overflow-x-auto mt-8 ml-2 mr-2 rounded">
      <div className="flex text-xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">PRODUCT DETAILS</h2>
      </div>

      <div className="w-64 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-72 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="border-2 border-cyan-500 rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 gap-4">
          <form className="flex flex-col">
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Product Name:</p>
              <p className="text-base text-gray-500">{product.name}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Short Description:</p>
              <p className="text-base text-gray-500">{product.shortDescription}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Long Description:</p>
              <p className="text-base text-gray-500">{product.longDescription}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Unit Type:</p>
              <p className="text-base text-gray-500">{product.unitType}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Size:</p>
              <p className="text-base text-gray-500">{product.size}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Specification:</p>
              <p className="text-base text-gray-500">{product.specification}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Product Category:</p>
              <p className="text-base text-gray-500">{product.category}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Product SubCategory:</p>
              <p className="text-base text-gray-500">{product.subCategory}</p>
            </div>
            <div className="flex flex-row mb-2">
              <p className="text-base font-bold text-gray-600 mr-2">Product Image:</p>
              <img src={product.imagePath} alt="Product Thumbnail" className="w-20 h-20" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
