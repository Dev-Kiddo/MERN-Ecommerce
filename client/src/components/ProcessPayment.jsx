import React from "react";
import { useNavigate } from "react-router-dom";

const ProcessPayment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const handleBack = function () {
    navigate("/order/confirm");
  };

  return (
    <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
      <button
        className="rounded-lg py-4 w-full max-w-[280px]  flex items-center justify-center gap-2 px-2 font-semibold text-lg leading-8 text-white bg-gray-500  transition-all duration-500 hover:bg-gray-600"
        onClick={handleBack}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ">
          <path fill="white" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        Go Back
      </button>

      <button className="rounded-lg w-full max-w-[280px] py-4 text-center justify-center items-center bg-blue-700 font-semibold text-lg text-white flex gap-2 transition-all duration-500 hover:bg-blue-800">
        Pay ₹{orderInfo.orderTotal}
      </button>
    </div>
  );
};

export default ProcessPayment;
