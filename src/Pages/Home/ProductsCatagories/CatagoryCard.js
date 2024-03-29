import React from "react";
import "./CatagoryCard.css";
import { Link } from "react-router-dom";

const CatagoryCard = ({ catagory }) => {
  const { name, img, customColor } = catagory;

  return (
    <div className="product__body w-[250px] card shadow-gray-500 shadow-lg ">
      <figure className="card__img bg-base-100">
        <img className="rounded-t-xl" src={img} alt={name} />
      </figure>
      <Link to="/products">
        <button
          className="px-2 py-3 font-semibold text-white text-lg min-w-[80px] max-w-full uppercase rounded-b-xl bg-secondary"
          style={{ color: `${customColor}` }}
        >
          {name}
        </button>
      </Link>
    </div>
  );
};

export default CatagoryCard;
