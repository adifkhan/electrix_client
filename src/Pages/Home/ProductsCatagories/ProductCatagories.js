import React from "react";
import useProductCatagories from "../../../Hooks/useProductCatagories";
import CatagoryCard from "./CatagoryCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

import "./ProductCatagories.css";

const ProductCatagories = () => {
  const [catagories] = useProductCatagories();

  return (
    <div className="bg-secondary pt-12">
      <div className="text-start border-l-2 border-primary  ml-12 p-0">
        <h2 className="uppercase text-primary text-2xl font-semibold pl-2 leading-6">
          Featured catagories
        </h2>
      </div>
      <div className="w-[90%] mx-auto">
        <Swiper
          breakpoints={{
            350: {
              slidesPerView: 1,
              centeredSlides: true,
            },
            600: {
              slidesPerView: 2,
              centeredSlides: true,
            },
            900: {
              slidesPerView: 3,
            },
            1100: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
            1250: {
              slidesPerView: 4,
              centeredSlides: true,
            },
          }}
          navigation
          loop
          modules={[Navigation]}
          className="productSwiper"
        >
          {catagories.map((catagory) => (
            <SwiperSlide key={catagory._id}>
              <CatagoryCard catagory={catagory}></CatagoryCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCatagories;
