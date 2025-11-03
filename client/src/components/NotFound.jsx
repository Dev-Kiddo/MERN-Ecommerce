import React from "react";

const NotFound = ({ statusCode = 404, queryStr }) => {
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-red-700">{statusCode}</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white ">No Products Found</h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
        {`We couldn't find any products matching "${queryStr}". Try using different keywords or browse our complete catelog`}
      </p>
    </div>
  );
};

export default NotFound;
