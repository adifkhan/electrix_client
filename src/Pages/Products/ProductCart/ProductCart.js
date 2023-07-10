import React from 'react';
import RatingsReviews from '../Ratings/RatingsReviews';

const ProductCart = ({ product, setMarkedProduct }) => {
  const { _id, name, description, img, price, category, ratings, customColor } =
    product;

  const stars = (
    ratings.reduce((a, b) => parseInt(a) + parseInt(b), 0) / ratings.length
  ).toFixed(1);

  return (
    <div className='card rounded max-w-[350px] card-compact bg-base-100 shadow-xl relative mx-auto'>
      <figure>
        <img src={img} alt='products' />
      </figure>
      <div
        className='flex justify-center items-center w-16  h-16 text-white font-semibold text-lg absolute'
        style={{ background: `${customColor}` }}
      >
        <p>$ {price}</p>
      </div>
      <div className='card-body'>
        <h2 className='text-md font-semibold'>{category}</h2>
        <h2 className='card-title justify-center'>{name}</h2>
        <p className='text-center'>{description.slice(0, 75)}...</p>
        <div className='flex justify-between items-center w-full'>
          <RatingsReviews key={_id} ratings={stars} />
          <small className='pl-2'>({ratings.length} reviews)</small>
        </div>
        <div>
          <label
            htmlFor='product-modal'
            className='btn btn-outline btn-secondary w-full'
            onClick={() => setMarkedProduct(product)}
          >
            add to cart
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
