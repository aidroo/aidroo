"use client";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";

export default function ThumbSlider({gallery}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 border border-primary rounded-md"
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full lg:h-96">
              <ResponsiveImage
                src={img}
                width={500}
                height={300}
                alt="slider"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={gallery.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-6 border border-primary "
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="h-24 border-r ">
              <ResponsiveImage
                src={img}
                width={500}
                height={300}
                alt="slider"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
