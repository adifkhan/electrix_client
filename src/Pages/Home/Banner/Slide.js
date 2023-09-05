// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./Slide.css";

// import required modules
import { EffectCoverflow } from "swiper";

import useProductCatagories from "../../../Hooks/useProductCatagories";

export default function App() {
  const [catagories] = useProductCatagories();
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
        {catagories.map((catagory) => (
          <SwiperSlide key={catagory._id}>
            {
              <img
                src={catagory.img}
                alt={catagory.name}
                className="banner__slide__image"
              ></img>
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
