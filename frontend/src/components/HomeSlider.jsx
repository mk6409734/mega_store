import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { HomeSliderApi } from "../Utils/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export const HomeSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await HomeSliderApi.getAll();
        const allSlides = res.data.data || [];
        const activeSlide = allSlides.find((s) => s.isActive);
        setSlides(activeSlide ? [activeSlide] : []);
      } catch (err) {
        console.error("Failed to load home slider", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  

  if (loading) {
    return <div className="homeSlider">Loading slider...</div>;
  }

  if (!slides.length) {
    return <div className="homeSlider">No slides available</div>;
  }

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
          {slides.flatMap((slide) => slide.images || []).map((imageUrl, index) => (
            <SwiperSlide key={`${index}-${imageUrl}`}>
              <div className="item rounded-2xl overflow-hidden">
                <img className="w-full" src={imageUrl} alt={`Banner ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
