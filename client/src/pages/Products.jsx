import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error, resultsPerPage, totalPage } = useSelector((state) => state.product);
  // console.log("products:", products);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;

  const [currentPage, setCurrentPage] = useState(pageFromURL);

  const handlePageChange = function (page) {
    if (page !== currentPage) {
      setCurrentPage(page);

      const newSearchParams = new URLSearchParams(location.search);

      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  useEffect(
    function () {
      dispatch(getProducts({ keyword: keyword || null, page: currentPage }));
    },
    [dispatch, keyword, currentPage]
  );

  return (
    <>
      <PageTitle title="Products" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <div className="w-60 p-4 flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-full rounded-lg bg-gray-700 p-4">
              <div className="mb-5">
                <h6 className="text-white text-sm font-semibold leading-4 underline">CATEGORIES</h6>
              </div>

              <ul className="flex-col gap-3 flex">
                <li>
                  <Link to="#">
                    <div className="flex-col flex rounded-lg ">
                      <h2 className="text-gray-200 text-sm font-medium leading-snug hover:underline ">All Products</h2>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="#">
                    <div className="flex-col flex rounded-lg">
                      <h2 className="text-gray-200 text-sm font-medium leading-snug hover:underline">Men's Fashion</h2>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="#">
                    <div className="flex-col flex rounded-lg ">
                      <h2 className="text-gray-200 text-sm font-medium leading-snug hover:underline">Women's fashion</h2>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 w-full h-auto">
            <div className="p-3 border-2 border-dashed rounded-lg dark:border-gray-500">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4">
                  {products?.map((product) => (
                    <Product product={product} key={product._id} />
                  ))}
                </div>
              ) : (
                <NotFound queryStr={keyword} />
              )}
            </div>

            <div className="my-3">
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
