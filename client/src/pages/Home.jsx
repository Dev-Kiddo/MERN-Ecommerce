import React, { useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import "../styles/PageStyles/Home.css";
import PageTitle from "../components/PageTitle";

import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeError } from "../features/product/productSlice";

import { toast } from "react-toastify";

const Home = () => {
  const { error, isLoading, numOfProduct, product } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getProducts());
    },
    [dispatch]
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
      <PageTitle title="Home" />

      <section>
        <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
          <ImageSlider />
          <h2 className="text-5xl text-gray-900 text-center my-6">Trending Now</h2>

          {isLoading && <Loader />}
          <div className="home-product-container">
            {product?.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
