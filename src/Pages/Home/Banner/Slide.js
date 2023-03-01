// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./Slide.css";

// import required modules
import { EffectCoverflow } from "swiper";

import useProducts from "../../../Hooks/UseProducts";

export default function App() {
  const { products } = useProducts();
  return (
    <div className="banner__slide">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {" "}
            {
              <img
                src={product.img}
                alt={product.name}
                className="banner__slide__image"
              ></img>
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
