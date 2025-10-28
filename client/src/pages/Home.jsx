import React from "react";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  return (
    <section>
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <ImageSlider />
        <h2 className="text-5xl text-gray-900 text-center mb-6">Trending Now</h2>
      </div>
    </section>
  );
};

export default Home;
