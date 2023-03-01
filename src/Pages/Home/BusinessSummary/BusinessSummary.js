import React from "react";
import Button from "../../../Shared/Components/Button";
import "./BusinessSummary.css";

const BusinessSummary = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-primary">
      <div className=" flex-1 flex flex-col justify-center items-center text-center">
        <div className=" my-12">
          <h2 className="text-3xl text-base-100 font-semibold">
            Quick order gets upto 25% off
          </h2>
          <p className="text-base-100 text-lg font-medium my-3">
            Contact us for more info ?
          </p>
          <Button>contact us</Button>
        </div>
      </div>
      <div className="bussiness__summary__banner flex-1 flex flex-col justify-center items-center rounded-tl-full py-12">
        <h2 className="text-2xl md:text-3xl text-primary font-semibold">
          It’s The Best Solution
        </h2>
        <p className="text-base-100 text-sm md:text-lg">
          For your home, office and work station
        </p>
      </div>
    </div>
  );
};

export default BusinessSummary;
