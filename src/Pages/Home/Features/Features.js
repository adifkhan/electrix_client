import React from "react";
import { FaShippingFast, FaUserAlt, FaTags } from "react-icons/fa";
import "./Features.css";

const Features = () => {
  return (
    <div className="bg-secondary">
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        <div className="feature__body bg-[aqua] flex-1 flex flex-col sm:flex-row justify-around items-center px-5">
          <div className="bg-base-100 p-7 m-4 rounded-full border-8 border-[#04D4F0]">
            <FaShippingFast className="shipping__icon text-[#04D4F0] text-5xl" />
          </div>
          <div className="m-5">
            <h2 className="text-2xl text-base-100 font-bold uppercase">
              shipping worldwide
            </h2>
            <p className="text-base-100 text-lg leading-6 mt-3">
              Pick your order anytime anywhere of the world.
            </p>
          </div>
        </div>
        <div className="feature__body bg-[#F8D210] flex-1 flex flex-col sm:flex-row justify-around items-center px-5">
          <div className="bg-base-100 p-7 m-4 rounded-full border-8 border-[#d6b71d]">
            <FaUserAlt className="shipping__icon text-[#F8D210] text-5xl" />
          </div>
          <div className="m-5">
            <h2 className="text-2xl text-base-100 font-bold uppercase">
              PARTNERSHIP PROGRAM
            </h2>
            <p className="text-base-100 text-lg leading-6 mt-3">
              We hold sevaral partnership program every year.
            </p>
          </div>
        </div>
        <div className="feature__body bg-[#FA26A0] flex-1 flex flex-col sm:flex-row justify-around items-center px-5">
          <div className="bg-base-100 p-7 m-4 rounded-full border-8 border-[#d6238c]">
            <FaTags className="shipping__icon text-[#FA26A0] text-5xl" />
          </div>
          <div className="m-5">
            <h2 className="text-2xl text-base-100 font-bold uppercase">
              DISCOUNTS & SALE
            </h2>
            <p className="text-base-100 text-lg leading-6 mt-3">
              We offer discounts on sales and progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
