import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="w-full mx-auto text-center">
      <div className="mb-4">
        <svg
          className="e731n hd79j mx-auto r4xgm c9jt8 dark:text-neutral-200"
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
          <path d="M3 6h18"></path>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>

      <div>
        <h3 className="text-xl mb-2 font-semibold text-gray-900 dark:text-white capitalize">your cart is empty</h3>
        <p className="text-gray-300 text-sm">Add products while you shop, so they'll be ready for checkout later.</p>

        <div className="mt-6">
          <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5" to="/products">
            Start Shopping &#8594;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
