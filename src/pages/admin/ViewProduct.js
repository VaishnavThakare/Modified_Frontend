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
    <div className="bg-zinc-50">
      <div className="flex text-2xl font-bold text-gray-500">
        <h2 className="text-left text-cyan-500">PRODUCT DETAILS</h2>
      </div>
      <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
      <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
      <div className="py-10 margin-left items-center bg-zinc-50 font-poppins">
        <div className="bg-white border-2 border-cyan-500 rounded-lg shadow-xl p-8 w-full max-w-lg">
          <div className="grid grid-cols-1 gap-4">
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
                  <p className="text-lg font-bold text-gray-600">Long Description:</p>
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
                  <p className="text-gray-500">{product.specification}</p>
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
      </div>
    </div>
  );
};

export default ProductDetailsView;
