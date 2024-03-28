import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

const ProductDetailsView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  console.log(productId);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Product/${productId}`);
      setProduct(response.data);
      console.log(response.data);
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
    <div className="w-full max-w-2xl mx-auto p-8">
      <h1 className="text-cyan-500 text-2xl font-bold mb-4">
        <span className="border-b-2 border-cyan-500 inline-block">PRODUCT DETAILS</span>
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 border-2 border-cyan-500">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/4">
              <p className="text-lg font-bold text-gray-600">Product Name:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.name}</p>
            </div>
          </div>
          
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/4">
              <p className="text-lg font-bold text-gray-600">Short Description:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.shortDescription}</p>
            </div>
          </div> 

          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/4">
              <p className="text-lg font-bold text-gray-600">long Description:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.longDescription}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/4">
              <p className="text-lg font-bold text-gray-600">Unit Type:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.unitType}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold text-gray-600">Size:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.size}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between mb-4">
            <div className="w-1/4">
              <p className="text-lg font-bold text-gray-600">Specification:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.specification}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/4">
              <p className="text-lg font-bold text-gray-600">Product Category:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.category}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/4">
              <p className="text-lg font-bold text-gray-600">Product SubCategory:</p>
            </div>
            <div className="w-2/4">
              <p className="text-gray-500">{product.subCategory}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsView;
