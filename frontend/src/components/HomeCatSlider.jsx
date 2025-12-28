import React from "react";
import {Link} from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation} from "swiper/modules";

export const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider py-8">
      <div className="container mx-auto">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          // className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741660962379_fash.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Fashion</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Electronics</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Bags</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Footwear</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Groceries</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Beauty</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741661105893_well.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Wellness</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741661120743_jw.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">jewellery</h1>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-5 px-3 rounded-md bg-white text-center flex items-center justify-center flex-col">
                {" "}
                <img
                  className="w-24 hover:scale-110 transition-all duration-200"
                  src="https://serviceapi.spicezgold.com/download/1741660962379_fash.png"
                  alt="Banner"
                />
                <h1 className="font-base text-md mt-3">Fashion</h1>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
