import React from "react";
import { HomeSlider } from "../components/HomeSlider";
import { HomeCatSlider } from "../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AdsBannerSlider } from "../components/AdsBannerSlider";

import HorizontalScroll from "../components/HorizontalScroll";
import { ProductsSlider } from "../components/ProductsSlider";
import { BlogSection } from "../components/BlogSection";
import { HomeSliderV2 } from "../components/HomeSliderV2";
import { BannerBoxV2 } from "../components/BannerBoxV2";
import { AdsBannerSliderV2 } from "../components/AdsBannerSliderV2";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-w-screen">
      <HomeSlider />
      <section className="py-6">
        <div className="flex container gap-5 mx-auto">
          <div className="w-[70%]">
            <HomeSliderV2 />
          </div>
          <div className="w-[30%] flex items-center justify-between gap-5 flex-col">
            <BannerBoxV2
              info="left"
              image={
                "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
              }
              title={"Buy Men's Footwear with low price"}
              price={"₹1,500.0"}
            />
            <BannerBoxV2
              info="right"
              image={
                "https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
              }
              title={"Apple Iphone 13 128Gb, Pink"}
              price={"₹35,500.0"}
            />
          </div>
        </div>
      </section>
      <HomeCatSlider />

      <section className="bg-white py-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Popular Products</h2>
              <p>Do not miss the current offers until the end of March. </p>
            </div>
            <HorizontalScroll />
          </div>
          <ProductsSlider items={5} />
        </div>
      </section>
      <section className="bg-white">
        <div className="flex justify-between items-center px-4  bg-white border border-[#ff5252] w-[80%] h-18 container mx-auto p-2 rounded-md">
          <div className="flex items-center justify-center gap-4">
            <LiaShippingFastSolid className="text-3xl" />
            <span className="font-bold uppercase text-2xl">Free Delivery</span>
          </div>
          <div className="flex items-center justify-center">
            <p>Free Delivery Now On Your First Order and over $200</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-bold uppercase text-2xl">- Only $200*</p>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AdsBannerSliderV2 items={4} />
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold">Latest Products</h2>
          <ProductsSlider items={5} />
          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold">Featured Products</h2>
          <ProductsSlider items={5} />
        </div>
      </section>

      <section className="bg-white py-5 pb-8">
        <div>
          <BlogSection />
        </div>
        {/* <Footer/> */}
      </section>
    </div>
  );
};
