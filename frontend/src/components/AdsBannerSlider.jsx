import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { BannerBox } from "./BannerBox";

export const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBox
            img={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1743011536_HPMC-1.jpg?im=Resize=(768,448)"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1743269073_HPMC_3.jpg?im=Resize=(768,448)"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1743358983_HPMC-2.jpg?im=Resize=(768,448)"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1743359404_car.jpg?im=Resize=(768,448)"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1743359435_HPMC-4.jpg?im=Resize=(768,448)"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1743359362_HPMC-1.jpg?im=Resize=(768,448)"
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
