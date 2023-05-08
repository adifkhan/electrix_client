import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingsReviews = ({ ratings }) => {
  const stars = Array.from({ length: 5 }, (elem, index) => {
    let num = index + 0.5;

    return (
      <span key={index}>
        {ratings >= index + 1 ? (
          <FaStar />
        ) : ratings >= num ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });
  return (
    <div className="flex items-center">
      <span className="font-medium">{ratings} </span>
      <span className="flex text-yellow-500 ml-1"> {stars}</span>
    </div>
  );
};

export default RatingsReviews;
