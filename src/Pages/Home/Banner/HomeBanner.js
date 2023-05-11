import React from "react";
import Slide from "./Slide";
import bannerBg from "../../../images/Banner/bg1.jpg";

const HomeBanner = () => {
  return (
    <div
      className="w-100% flex flex-col-reverse lg:flex-row"
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "-30px",
      }}
    >
      <div className=" flex-1 flex flex-col justify-center items-center my-5">
        <h3 className=" text-2xl text-base-100 mb-1 uppercase">
          Electrix manufacturing
        </h3>
        <h3 className="font-semibold text-5xl text-primary mb-1 uppercase">
          commited
        </h3>
        <h3 className="text-3xl text-base-100 mb-1 uppercase">
          to supper quality
        </h3>
        <h3 className="text-sm text-base-100 text-center">
          We won Many Industrial Awards and Got Many Certificates Since
          2009-Present
        </h3>
      </div>
      <div className=" flex-1 flex items-center justify-center pb-5 mt-5">
        <div className="max-w-md md:max-w-lg lg:max-w-md 2xl:max-w-3xl overflow-hidden">
          <Slide />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
