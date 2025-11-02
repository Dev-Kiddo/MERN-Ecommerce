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
import Layout from "../components/Layout";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, error, product } = useSelector((state) => state.product);

  const [userReview, setUserReview] = useState({});
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantity = function (e) {
    // console.log(e.target);

    if (e.target.id === "decrement-button") {
      // console.log("decrement");
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }
    if (e.target.id === "increment-button") {
      // console.log("increment");

      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="py-5">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-10 items-stretch md:grid-cols-2">
            <div className="w-full">
              <ProductSlider />
            </div>

            <div className="w-full flex flex-col justify-between">
              <h1 className="text-xl font-semibold lg:text-md dark:text-white">{product?.name}</h1>
              <div className="mt-2">
                <p className="text-2xl font-extrabold text-gray-900 lg:text-md dark:text-white">₹{product?.price}</p>
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

              <div className="mt-2 flex items-center gap-2 ">
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">{product?.stock > 0 ? `In Stock ✅ (${product.stock})` : "Out Of Stock 🔴"}</p>
              </div>

              <div className="mt-4 flex items-center gap-2 ">
                <form className="maxw-full ">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select quantity:</label>
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      onClick={(e) => handleQuantity(e)}
                      type="button"
                      id="decrement-button"
                      className={`bg-gray-100 ${
                        product?.stock > 1 ? "dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 border" : "dark:bg-gray-400 cursor-not-allowed"
                      }  dark:border-gray-600 border-gray-300 rounded-s-lg p-3 h-11`}
                    >
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="quantity-input"
                      value={quantity}
                      readOnly
                      className={`bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5 ${
                        product?.stock ? "dark:bg-gray-700" : "dark:bg-gray-400"
                      } dark:text-white`}
                    />
                    <button
                      onClick={(e) => handleQuantity(e)}
                      type="button"
                      id="increment-button"
                      disabled={product?.stock > 1 ? false : true}
                      className={`bg-gray-100 ${
                        product?.stock > 1 ? "dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 border" : "dark:bg-gray-400 cursor-not-allowed"
                      }  dark:border-gray-600  border-gray-300 rounded-e-lg p-3 h-11`}
                    >
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-4">
                {product?.stock > 0 ? (
                  <Link to="#">
                    <button className="bg-blue-700 hover:bg-blue-800 font-sm text-white px-5 py-2 rounded-lg">Add to cart</button>
                  </Link>
                ) : (
                  <button disabled className="bg-gray-400 font-sm cursor-not-allowed text-white px-5 py-2 rounded-lg">
                    Add to cart
                  </button>
                )}
              </div>

              <hr className="my-4  dark:border-gray-600" />

              <p className="mb-2 text-gray-300">Description:</p>
              <p className="mb-4 text-gray-500 dark:text-gray-400">{product?.description}</p>

              <hr className="my-4  dark:border-gray-600" />

              <WriteReview onReview={setUserReview} />
            </div>
          </div>

          <hr className="my-10  dark:border-gray-600" />

          <div className="w-full">
            <h3 className="text-lg mb-2 font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
            {product?.reviews.length > 0 ? (
              product?.reviews.map((review) => <ReviewViewer review={review} key={review._id} />)
            ) : (
              <>
                <h3 className="text-lg mb-2 font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
                <p className="text-xs mb-2 font-sm text-gray-900 dark:text-white">No reviews yet. Be the first to review this product</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
