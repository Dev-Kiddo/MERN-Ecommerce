import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Layout from "../components/Layout";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  console.log("products:", products);

  useEffect(
    function () {
      dispatch(getProducts());
    },
    [dispatch]
  );

  return (
    <Layout title="All Products">
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
          {isLoading ? (
            <Loader />
          ) : (
            <div className="p-3 border-2 border-dashed rounded-lg dark:border-gray-500">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4">
                {products?.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
