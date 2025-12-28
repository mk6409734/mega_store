import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { BlogItem } from "./BlogItem";
export const BlogSection = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold mb-4">From the blog</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation, Autoplay]}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        className="smlBtn"
      >
        <SwiperSlide>
          <BlogItem
            img={
              "https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg"
            }
            title={"Nullam ullamcorper ornare molestie"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            img={
              "https://serviceapi.spicezgold.com/download/1741758993155_6-4.jpg"
            }
            title={"Nullam ullamcorper ornare molestie"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            img={
              "https://serviceapi.spicezgold.com/download/1741758867669_7-6.jpg"
            }
            title={"Nullam ullamcorper ornare molestie"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            img={
              "https://serviceapi.spicezgold.com/download/1742439558879_4-4.jpg"
            }
            title={"Nullam ullamcorper ornare molestie"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            img={
              "https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg"
            }
            title={"Nullam ullamcorper ornare molestie"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            img={
              "https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg"
            }
            title={"Nullam ullamcorper ornare molestie"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
