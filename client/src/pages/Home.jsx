import React from "react";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import "../styles/PageStyles/Home.css";
import productData from "../data/products.json";
import PageTitle from "../components/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle title="Home" />
      <section>
        <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
          <ImageSlider />
          <h2 className="text-5xl text-gray-900 text-center my-6">Trending Now</h2>

          <div className="home-product-container">
            {productData.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
