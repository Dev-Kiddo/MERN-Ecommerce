import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";

const WriteReview = ({ onReview }) => {
  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  useEffect(
    function () {
      onReview({
        rating,
        userReview,
      });
    },
    [rating, userReview]
  );

  return (
    <>
      <h3 className="text-lg mb-2 font-semibold text-gray-900 dark:text-white">Write a Review 📝</h3>
      <div className="my-3 flex items-center gap-3">
        <Ratings onRating={setRating} />
        <p className=" text-sm font-medium text-gray-300">out of 5</p>
      </div>

      <form>
        <label className="block mb-2 text-sm font-medium text-gray-300">Your review</label>
        <textarea
          rows="4"
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          className="block p-2.5 mb-3 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 "
          placeholder="Write your review here..."
        ></textarea>

        <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Review</button>
      </form>
    </>
  );
};

export default WriteReview;
