import React from "react";
import { Link, useLocation } from "react-router-dom";
import CheckOutPath from "../components/CheckOutPath";

const PaymentSuccess = () => {
  const location = useLocation();
  console.log(location);
  console.log(location.search);

  const orderId = location?.state;

  const search = new URLSearchParams(location.search).get("reference");
  console.log(search);

  return (
    <>
      <CheckOutPath currentStep={3} />
      <hr className="my-10  dark:border-gray-600" />

      <div className="text-center w-1/2 mx-auto">
        <div className="w-16 h-16 mx-auto flex justify-center items-center bg-green-700 rounded-full mb-2">
          <svg class="w-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="#84e1bc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
          </svg>
        </div>
        <h2 className="text-white font-bold text-lg mb-2"> Your order is confirmed!</h2>
        <p className="text-gray-400">{`Your ${orderId} will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.`}</p>

        <hr className="my-6  dark:border-gray-600" />

        <Link
          className="text-white bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-4 md:text-sm"
          to="/products"
        >
          Return to shopping
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;
