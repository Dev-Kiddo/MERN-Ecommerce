import React from "react";

const CheckOutPath = ({ currentStep }) => {
  const steps = ["Shipping Details", "Order Confirmation", "Make Payment"];

  return (
    <div className="w-full px-12 py-8 bg-gray-800 border border-gray-600 rounded-xl mb-8 mx-auto">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-400 -translate-y-1/2 rounded"></div>

        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100 >= 100 ? 100 : (currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 mb-6 flex items-center justify-center rounded-full font-semibold text-xs
                ${index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}
              `}
            >
              {/* {index + 1} */}
              {currentStep > index ? (
                <div className="w-4 h-4">
                  <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="maw mbr">
                    <path
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              ) : (
                index + 1
              )}
            </div>
            <p className={`mt-2 text-xs sm:text-sm ${index <= currentStep ? "text-blue-400" : "text-gray-400"}`}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckOutPath;
