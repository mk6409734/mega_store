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
import { BannerBoxV2 } from "./BannerBoxV2";

export const AdsBannerSliderV2 = (props) => {
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
          <BannerBoxV2
            info="left"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            title={"Buy Men's Footwear with low price"}
            price={"₹1,500.0"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png"
            }
            title={"Buy Men's Bags with low price"}
            price={"₹900.0"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="left"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            title={"Buy Men's Footwear with low price"}
            price={"₹1,500.0"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="left"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            title={"Buy Men's Footwear with low price"}
            price={"₹1,500.0"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="left"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
