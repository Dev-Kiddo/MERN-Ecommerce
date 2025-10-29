import React from "react";
import { Link } from "react-router-dom";
import "../styles/ComponentStyles/Product.css";
import Ratings from "./Ratings";
import { useState } from "react";

const Product = ({ product }) => {
  const [rating, setRating] = useState(0);

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

          <div className="my-2.5">
            <div className="flex items-center space-x-1">
              <Ratings onRating={setRating} />
              <span className="bg-blue-100  text-xs font-semibold px-2.5 py-0.5 rounded-sm text-blue-800 ms-3">{rating}</span>
            </div>
            <span className="text-xs font-semibold rounded-sm text-gray-400">{`( ${product.ratings} reviews )`}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-white">₹{product.price}</span>
            <Link to="#" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
