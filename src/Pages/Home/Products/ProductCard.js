import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { name, img, customColor } = product;

  /* 
  const ratings = (reviews.reduce((a, b) => a + b, 0) / reviews.length).toFixed(
    1
  ); 
  */

  return (
    <div className="product__body card  shadow-gray-500 shadow-lg ">
      <figure className="card__img bg-base-100">
        <img className="rounded-t-xl" src={img} alt={name} />
      </figure>
      <button
        className="px-5 py-3 font-semibold text-white text-[7px] sm:text-lg min-w-[80px] max-w-full uppercase rounded-b-xl bg-secondary"
        style={{ color: `${customColor}` }}
      >
        {name}
      </button>
    </div>
  );
};

export default ProductCard;
