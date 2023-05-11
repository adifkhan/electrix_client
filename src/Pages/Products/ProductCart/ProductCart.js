import React from "react";
import RatingsReviews from "../Ratings/RatingsReviews";

const ProductCart = ({ product, handleAddToCart }) => {
  const { _id, name, description, img, price, category, ratings, customColor } =
    product;

  const stars = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(
    1
  );

  return (
    <div className="card rounded max-w-[350px] card-compact bg-base-100 shadow-xl relative">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div
        className="flex justify-center items-center w-16  h-16 text-white font-semibold text-lg absolute"
        style={{ background: `${customColor}` }}
      >
        <p>$ {price}</p>
      </div>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{category}</h2>
          <div className="flex">
            <RatingsReviews key={_id} ratings={stars} />
            <small className="pl-2">({ratings.length} reviews)</small>
          </div>
        </div>
        <h2 className="card-title justify-center">{name}</h2>
        <p className="text-center">{description}</p>

        <div className="">
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-outline btn-secondary w-full"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
