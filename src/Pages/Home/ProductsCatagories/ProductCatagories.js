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
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides
          navigation
          loop
          modules={[Navigation]}
          className="productSwiper"
        >
          {catagories.map((catagory) => (
            <SwiperSlide key={catagory.id}>
              <CatagoryCard catagory={catagory}></CatagoryCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCatagories;
