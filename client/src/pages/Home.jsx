import React, { useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";

import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeError } from "../features/product/productSlice";

import { toast } from "react-toastify";
import Layout from "../components/Layout";

const Home = () => {
  const { error, isLoading, products } = useSelector((state) => state.product);

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
      <Layout title="Home">
        <div className="mb-10">
          <ImageSlider />
        </div>
        
        <h2 className="text-5xl text-white text-center my-6">Trending Now</h2>

        {isLoading && <Loader />}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {products?.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
