import React from "react";
import { Link } from "react-router-dom";

import Ratings from "./Ratings";
import { useState } from "react";

const Product = ({ product }) => {
  const [rating, setRating] = useState(0);
  // console.log("rating:", rating);

  return (
    <>
      <div className="w-full max-w-xs border rounded-lg shadow-sm bg-gray-800 border-gray-700">
        <Link to={`/product/${product._id}`}>
          {/* product.image[0].url  */}
          <img className="p-3 rounded-t-lg" src={`./images/productph.png`} alt={product.name} />
        </Link>

        <div className="px-3 pb-3">
          <h5 className="text-xl font-semibold tracking-tight text-white mb-2">{product.name}</h5>

          <p className="text-xs font-medium tracking-tight text-gray-400">{product.description}</p>

          <div className="my-2.5">
            <div className="flex items-center space-x-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-xs font-semibold rounded-sm text-gray-400">{`( ${product.reviews.length} reviews )`}</span>
          </div>

          <div className="sm:flex justify-between items-center">
            <span className="text-lg font-bold text-white mb-2 block sm:text-sm sm:mb-0 lg:text-lg">₹{product.price}</span>
            <Link
              to={`/product/${product._id}`}
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-xs px-2 py-2 text-center sm:text-xs sm:px-2 sm:py-2"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
