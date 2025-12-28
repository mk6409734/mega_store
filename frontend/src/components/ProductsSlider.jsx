import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Productitems } from "./Productitems";

export const ProductsSlider = (props) => {
  return (
    <div className="productSlider py-4">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Autoplay]}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        className="smlBtn"
      >
        <SwiperSlide>
          <Productitems
            brand={"CLAFOUTIS"}
            title={"Men Opaque Casual Shirt"}
            img1={
              "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
            }
            img2={
              "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Productitems
            brand={"Campus Sutra"}
            title={"Men Comfort Cuban Collar Solid Polycotton Casual Shirt"}
            img1={
              "https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg"
            }
            img2={
              "https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Productitems
            brand={"Allen Solly"}
            title={"Men Pure Cotton Striped Casual Shirt"}
            img1={
              "https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
            }
            img2={
              "https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Productitems
            brand={"CLAFOUTIS"}
            title={"Men Opaque Casual Shirt"}
            img={
              "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Productitems
            brand={"CLAFOUTIS"}
            title={"Men Opaque Casual Shirt"}
            img={
              "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Productitems
            brand={"CLAFOUTIS"}
            title={"Men Opaque Casual Shirt"}
            img={
              "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Productitems
            brand={"CLAFOUTIS"}
            title={"Men Opaque Casual Shirt"}
            img={
              "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
