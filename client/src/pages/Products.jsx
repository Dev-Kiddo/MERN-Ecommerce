import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";

import Product from "../components/Product";
import Loader from "../components/Loader";

import NotFound from "../components/NotFound";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
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
  const category = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(pageFromURL);

  const categories = ["mens fashion", "womens fashion", "tv,appliances", "mobiles,computers", "movies,games", "sports", "books"];

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

      // navigate({
      //   pathname: "/products",
      //   search: `?${newSearchParams.toString()}`,
      // });
    }
  };

  const handleCategories = function (category) {
    const newSearchParams = new URLSearchParams(location.search);

    // console.log("category:", category);

    newSearchParams.set("category", category);
    newSearchParams.delete("page");

    navigate(`?${newSearchParams.toString()}`);
  };

  useEffect(
    function () {
      dispatch(getProducts({ keyword: keyword || null, page: currentPage, category }));
    },
    [dispatch, keyword, currentPage, category]
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
                {categories.map((category) => (
                  <li className="cursor-pointer" key={category} onClick={() => handleCategories(category)}>
                    <div className="flex-col flex rounded-lg ">
                      <h2 className="text-gray-200 text-sm font-medium leading-snug hover:underline capitalize">{category}</h2>
                    </div>
                  </li>
                ))}
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
