import React from "react";
import { Link } from "react-router-dom";
import "../styles/ComponentStyles/Product.css";

const Product = ({ product }) => {
  console.log(product);

  return (
    <>
      <div className="w-full max-w-sm border rounded-lg shadow-sm bg-gray-800 border-gray-700">
        <Link to={product._id}>
          {/* product.image[0].url  */}
          <img className="p-5 rounded-t-lg" src={`./images/productph.png`} alt={product.name} />
        </Link>

        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-white mb-2">{product.name}</h5>

          <p className="text-xs font-medium tracking-tight text-gray-400">{product.description}</p>

          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <span className="bg-blue-100  text-xs font-semibold px-2.5 py-0.5 rounded-sm text-blue-800 ms-3">{product.ratings}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-white">₹{product.price}</span>
            <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
