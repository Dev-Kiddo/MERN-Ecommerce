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
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763134988/banner2_jqqeo4.jpg" alt="slide 1" className="w-full h-auto" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763134987/banner3_iuqztl.jpg" alt="slide 2" className="w-full h-auto" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763134987/banner1_vnj6bo.jpg" alt="slide 3" className="w-full h-auto" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763134987/banner4_mnhfwo.jpg" alt="slide 3" className="w-full h-auto" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ImageSlider;
