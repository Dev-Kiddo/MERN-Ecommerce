import React, { useEffect, useState } from "react";
import ProductSlider from "../components/productSlider";
import { Link } from "react-router-dom";
import WriteReview from "../components/WriteReview";
import ReviewViewer from "../components/ReviewViewer";
import { useParams } from "react-router-dom";
import { getProductDetails, removeError } from "../features/product/productSlice";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, error, product } = useSelector((state) => state.product);

  const [userReview, setUserReview] = useState({});

  useEffect(
    function () {
      if (id) {
        dispatch(getProductDetails(id));
      }

      return () => {
        dispatch(removeError());
      };
    },
    [id, dispatch]
  );

  useEffect(
    function () {
      if (error) {
        toast(error);
        dispatch(removeError());
      }
    },
    [dispatch, error]
  );

  return (
    <>
      <PageTitle title={product?.name} />
      {isLoading ? (
        <div className="py-5">
          <Loader />
        </div>
      ) : (
        <>
          <section className="py-6 md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="max-w-md lg:max-w-lg mx-auto">
                  <ProductSlider />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{product?.name}</h1>
                  <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">₹{product?.price}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 ">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">({product?.ratings})</p>
                    <p className="text-sm font-medium underline leading-none text-gray-500 dark:text-gray-400">Reviews ({product?.numOfReviews})</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 ">
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">{product?.stock > 0 ? `In Stock ✅ (${product.stock})` : "Out Of Stock ❌"}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 ">
                    <form className="max-w-xs ">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select quantity:</label>
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          type="button"
                          id="decrement-button"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="quantity-input"
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:text-white"
                          defaultValue={1}
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11"
                        >
                          <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <Link to="#" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Add to cart
                    </Link>
                  </div>

                  <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                  <p className="mb-2 text-gray-300">Description:</p>
                  <p className="mb-6 text-gray-500 dark:text-gray-400">{product?.description}</p>

                  <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                  <WriteReview onReview={setUserReview} />
                </div>
              </div>

              <div className="w-full mt-6">
                {product?.reviews?.map((review) => (
                  <ReviewViewer review={review} key={review._id} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetails;
