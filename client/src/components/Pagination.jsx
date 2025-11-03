import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, onPageChange, nextPageText = "Next", prevPageText = "Prev", firstPageText = "1st", lastPageText = "Last" }) => {
  const { totalPages, products } = useSelector((state) => state.product);

  if (products.length === 0 || totalPages <= 1) return null;

  // Generate Page Numbers
  const getPageNumbers = function () {
    const PageNumbers = [];
    const pageWindow = 2;

    for (let i = Math.max(1, currentPage - pageWindow); i <= Math.min(totalPages, currentPage + pageWindow); i++) {
      PageNumbers.push(i);
    }

    return PageNumbers;
  };

  // 1. page na - next last
  // 2. page na 1st, prev
  //

  return (
    <>
      <nav className="text-center">
        <ul className="inline-flex text-sm">
          {/* Previous and First Buttons */}
          {currentPage > 1 && (
            <>
              <li>
                <Link
                  onClick={() => onPageChange(1)}
                  to="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {firstPageText}
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => onPageChange(currentPage - 1)}
                  to="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {prevPageText}
                </Link>
              </li>
            </>
          )}

          {/* Display Number */}
          {getPageNumbers().map((number) => (
            <li key={number}>
              <Link
                onClick={() => onPageChange(number)}
                to="#"
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700 ${
                  currentPage === number ? `dark:bg-gray-500` : "dark:bg-gray-800"
                }`}
              >
                {number}
              </Link>
            </li>
          ))}

          {/* Last and Next Buttons */}
          {currentPage < totalPages && (
            <>
              <li>
                <Link
                  onClick={() => onPageChange(currentPage + 1)}
                  to="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {nextPageText}
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => onPageChange(totalPages)}
                  to="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {lastPageText}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
