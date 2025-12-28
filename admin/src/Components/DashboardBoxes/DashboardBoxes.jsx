import React from "react";
import { FiGift } from "react-icons/fi";
import { IoPieChartOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";

import { Navigation} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { UIBoxes } from "../UIBoxes/UIBoxes";
import { IoStatsChartSharp } from "react-icons/io5";

export const DashboardBoxes = () => {
  return (
    <div>
      <Swiper
        spaceBetween={5}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        <SwiperSlide>
          <UIBoxes
            title={"New Orders"}
            amount={"1,390"}
            icon={<FiGift className="text-[30px] text-teal-400" />}
            icon2={
              <IoStatsChartSharp className="text-cyan-500 text-center text-[50px]" />
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <UIBoxes
            title={"Sales"}
            amount={"51,390"}
            icon={
              <IoPieChartOutline className="text-[30px] text-emerald-400" />
            }
            icon2={
              <IoStatsChartSharp className="text-emerald-400 text-center text-[50px]" />
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <UIBoxes
            title={"Revenue"}
            amount={"12,390"}
            icon={<BsBank className="text-[30px] text-purple-600" />}
            icon2={
              <IoStatsChartSharp className="text-purple-600 text-center text-[50px]" />
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <UIBoxes
            title={"Total Products"}
            amount={"1,390"}
            icon={<RiProductHuntLine className="text-[30px] text-blue-600" />}
            icon2={
              <IoStatsChartSharp className="text-blue-600 text-center text-[50px]" />
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <UIBoxes
            title={"Sales"}
            amount={"51,390"}
            icon={
              <IoPieChartOutline className="text-[30px] text-emerald-400" />
            }
            icon2={
              <IoStatsChartSharp className="text-emerald-400 text-center text-[50px]" />
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
