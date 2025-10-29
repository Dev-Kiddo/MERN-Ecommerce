import React from "react";
import { useState } from "react";

const Ratings = ({ numOfStars = 5, onRating }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const onClickRating = function (rating) {
    setRating((prev) => (prev === rating ? 0 : rating));
    onRating(rating);

  };

  const onHover = function (rate) {
    setHoverRating(rate);
  };

  const onHoverLeave = function () {
    setHoverRating(rating);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: numOfStars }, (_, index) => {
        const rate = hoverRating ? hoverRating >= index + 1 : rating >= index + 1;
        return rate ? (
          <span key={index} onClick={() => onClickRating(index + 1)} onMouseEnter={() => onHover(index + 1)} onMouseLeave={() => onHoverLeave()}>
            <svg className="w-4 h-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </span>
        ) : (
          <span key={index} onClick={() => onClickRating(index + 1)} onMouseEnter={() => onHover(index + 1)} onMouseLeave={() => onHoverLeave()}>
            <svg className="w-4 h-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth={2} fill="transparent" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

export default Ratings;
