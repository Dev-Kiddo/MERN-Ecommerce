import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ImageSlider = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg shadow-md mb-6"
      >
        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763437719/bannerv21_vrp18g.jpg" alt="slide 1" className="w-full h-auto" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763446225/bannerv23_xu9nms.jpg" alt="slide 2" className="w-full h-auto" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763445593/bannerv22_lki3il.jpg" alt="slide 3" className="w-full h-auto" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763447329/bannerv24_qacind.jpg" alt="slide 3" className="w-full h-auto" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ImageSlider;
