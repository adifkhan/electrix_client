import React from "react";
import { FaShippingFast, FaUserAlt, FaTags } from "react-icons/fa";
import "./Features.css";
import feature1 from "../../../images/Feature/feature1.jpg";
import feature2 from "../../../images/Feature/feature2.jpg";
import feature3 from "../../../images/Feature/feature3.jpg";

const Features = () => {
  return (
    <div className="bg-secondary px-10 py-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="feature__body flex-1 flex flex-col sm:flex-row justify-around items-center px-5 rounded-lg"
          style={{
            backgroundImage: `url(${feature1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-base-100 p-7 m-4 rounded-full border-8 border-primary">
            <FaShippingFast className="shipping__icon text-primary text-5xl" />
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
        <div
          className="feature__body flex-1 flex flex-col sm:flex-row justify-around items-center px-5 rounded-lg"
          style={{
            backgroundImage: `url(${feature2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-base-100 p-7 m-4 rounded-full border-8 border-[#002632]">
            <FaUserAlt className="shipping__icon text-[#002632] text-5xl" />
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
        <div
          className="feature__body flex-1 flex flex-col sm:flex-row justify-around items-center px-5 rounded-lg"
          style={{
            backgroundImage: `url(${feature3})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-base-100 p-7 m-4 rounded-full border-8 border-primary">
            <FaTags className="shipping__icon text-primary text-5xl" />
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
