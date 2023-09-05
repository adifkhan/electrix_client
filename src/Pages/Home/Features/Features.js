import React from "react";
import { FaShippingFast, FaUserAlt, FaTags } from "react-icons/fa";
import "./Features.css";
import feature1 from "../../../images/Feature/feature1.jpg";
import feature2 from "../../../images/Feature/feature2.jpg";
import feature3 from "../../../images/Feature/feature3.jpg";

const Features = () => {
  return (
    <div className="bg-secondary px-5 py-24">
      <div className="features__wrapper">
        <div
          className="feature__body flex items-center rounded-xl p-3 w-full md:w-[450px]"
          style={{
            backgroundImage: `url(${feature1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-base-100 p-7 rounded-full border-8 border-primary">
            <FaShippingFast className="shipping__icon text-primary text-5xl" />
          </div>
          <div className="m-5">
            <h2 className="text-2xl font-medium text-base-100 uppercase">
              shipping worldwide
            </h2>
            <p className="text-base-100 text-lg leading-6 mt-3">
              Pick your order anytime anywhere of the world.
            </p>
          </div>
        </div>
        <div
          className="feature__body flex items-center rounded-xl p-3 w-full md:w-[450px]"
          style={{
            backgroundImage: `url(${feature2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-base-100 p-7 rounded-full border-8 border-secondary">
            <FaUserAlt className="shipping__icon text-secondary text-5xl" />
          </div>
          <div className="m-5">
            <h2 className="text-2xl text-base-100 font-medium uppercase">
              PARTNERSHIP PROGRAM
            </h2>
            <p className="text-base-100 text-lg leading-6 mt-3">
              We hold sevaral partnership program every year.
            </p>
          </div>
        </div>
        {/* flex-1 flex flex-col sm:flex-row justify-around items-center px-5 rounded-lg */}
        <div
          className="feature__body flex items-center rounded-xl p-3 w-full md:w-[450px]"
          style={{
            backgroundImage: `url(${feature3})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-base-100 p-7 rounded-full border-8 border-primary">
            <FaTags className="shipping__icon text-primary text-5xl" />
          </div>
          <div className="m-5">
            <h2 className="text-2xl text-base-100 font-medium uppercase">
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
