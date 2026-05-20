import React from "react";

const NotFound = ({ statusCode = 404, queryStr }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mx-auto p-10 text-center border border-blue-800 rounded-lg">
        <p className="text-base font-semibold text-red-700">{statusCode}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-white ">No Products Found</h1>
        <p className="mt-2 text-sm text-gray-400">
          {queryStr
            ? `We couldn't find any products matching "${queryStr}". Try using different keywords or browse our complete catelog`
            : "No Products are currently available. Please check back later"}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
