import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const clientLogos = [
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654104/client5_wjimnm.webp",
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654104/client6_tvoea8.webp",
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654103/client24_ayu8pb.webp",
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654102/client22_mqjfr6.webp",
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654102/client20_k5jbkc.webp",
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654101/client1_jmfkgj.webp",
  "https://res.cloudinary.com/daggx9p24/image/upload/v1738654102/client23_fijyhl.webp",
];

const Client = () => {
  return (
    <div className="client-logo-section">
      <h2 className="client-logo-title">Our Trusted Clients</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 2000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="client-logo-slider"
      >
        {clientLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt={`Client ${index + 1}`} className="client-logo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Client;
