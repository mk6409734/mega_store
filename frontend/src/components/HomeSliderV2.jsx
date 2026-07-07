import React, { useEffect } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";



// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@mui/material";
import { ProductStore } from "../Store/Product";

export const HomeSliderV2 = () => {
  const { GetProducts, product } = ProductStore();
  
    useEffect(() => {
      GetProducts();
    }, []);
  
    useEffect(() => {
      console.log("mohit", product);
    }, [product]);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="HomeSliderV2  h-[500px] border border-gray-200 rounded-2xl shadow-xl"
      >
        {product?.slice(0,3).map((p,i) => (
          <SwiperSlide key={i}>
            <div className="w-full rounded-md overflow-hidden relative ">
              <img
                className="!h-[498px]"
                src={p.images?.[0]}
              />{" "}
              <div className="info absolute top-0 -right-full opacity-0 transition-all duration-700 w-[50%] h-full z-50 p-8 flex flex-col items-center justify-center">
                <h4 className="text-xl w-full text-left mb-5 relative -right-full opacity-0">
                  Big Saving Days Sale
                </h4>
                <h2 className="text-3xl font-semibold w-full capitalize relative -right-full opacity-0">
                  {p.name}
                </h2>
                <h1 className="flex items-center gap-3 w-full text-left text-xl my-4 relative -right-full opacity-0">
                  Starting At Only{" "}
                  <span className="text-primary font-semibold ">₹{p.price}</span>
                </h1>
                <div className="w-full relative -bottom-full opacity-0 btn_">
                  <Button
                    className="!bg-primary !p-2 !px-3 !rounded !text-white !capitalize
                  "
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className="w-full rounded-md overflow-hidden relative">
            <img src="./product.png" />{" "}
            <div className="info absolute top-0 -right-full opacity-0 transition-all duration-700 w-[50%] h-full z-50 p-8 flex flex-col items-center justify-center">
              <h4 className="text-xl w-full text-left mb-5 relative -right-full opacity-0">
                Big Saving Days Sale
              </h4>
              <h2 className="text-3xl font-semibold w-full capitalize relative -right-full opacity-0">
                Premiem Massage Oils and other body Oils
              </h2>
              <h1 className="flex items-center gap-3 w-full text-left text-xl my-4 relative -right-full opacity-0">
                Starting At Only{" "}
                <span className="text-primary font-semibold ">₹499.0</span>
              </h1>
              <div className="w-full relative -bottom-full opacity-0 btn_">
                <Button
                  className="!bg-primary !p-2 !px-3 !rounded !text-white !capitalize
                "
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-md overflow-hidden relative">
            <img className="bg-auto" src="./product1.png" />{" "}
            <div className="info absolute top-0 -right-full opacity-0 transition-all duration-700 w-[50%] h-full z-50 p-8 flex flex-col items-center justify-center pb-30 text-white">
              <h4 className="text-xl w-full text-left mb-5 relative -right-full opacity-0">
                Big Saving Days Sale
              </h4>
              <h2 className="text-3xl font-semibold w-full capitalize relative -right-full opacity-0">
                Awesome Collections of Perfumes & Deo Derands
              </h2>
              <h1 className="flex items-center gap-3 w-full text-left text-xl my-4 relative -right-full opacity-0">
                Starting At Only{" "}
                <span className="text-primary font-semibold ">₹199.0</span>
              </h1>
              <div className="w-full relative -bottom-full opacity-0 btn_">
                <Button
                  className="!bg-primary !p-2 !px-3 !rounded !text-white !capitalize
                "
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}