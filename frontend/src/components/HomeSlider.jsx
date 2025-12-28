import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export const HomeSlider = () => {
  return (
    <div className="homeSlider">
      <div className="container mx-auto py-4">
        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="item rounded-2xl overflow-hidden">
              {" "}
              <img
                className="w-full"
                src="https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg"
                alt="Banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-2xl overflow-hidden">
              {" "}
              <img
                className="w-full"
                src="https://serviceapi.spicezgold.com/download/1741660907985_NewProject.jpg"
                alt="Banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-2xl overflow-hidden">
              {" "}
              <img
                className="w-full"
                src="https://serviceapi.spicezgold.com/download/1741660862304_NewProject(8).jpg"
                alt="Banner"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
