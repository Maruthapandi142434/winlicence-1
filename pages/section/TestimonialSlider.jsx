"use client"; // Required for Swiper.js in Next.js (if using Next.js 13+)
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738652938/2_zpr6br.jpg",
    name: "MR. MANOHAR",
    designation: "IT Head / Vijay TV",
    review:
      "Whether you are looking for a free domain registration along deployment or a cheap server with fast performance and professional support assistance Sixth Star will definitely benefit you in all means.",
  },
  {
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738653151/24_ge5xtn.jpg",
    name: "MR. SETHUMURUGAN",
    designation: "IT Head / Hinduja Leyland",
    review:
      "It’s been 3 years and we haven’t faced any server downtime. Excellent hosting features with easy upgrading facilities. You can acquire their support at any time since they maintain perfect on-time call support.",
  },
  {
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738653262/4_nqbzf5.jpg",
    name: "Mrs. Bhuvaneswari",
    designation: "Vice President / Makkal TV",
    review:
      "On-time support with reliable performance is what makes them best in the web hosting industry. Best suited servers for enterprise type management. I totally recommend their service to everyone.",
  },
  {
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738759593/5_nafkva.jpg",
    name: "DR.SYED AKTHAR SHAH",
    designation: "Jamal Mohamed College",
    review:
      "We always wanted to have our dream website onsite matching our exact imagination and Sixth Star helped us to shape them on cheap costs. ",
  },
  
];

const TestimonialSlider = () => {
  return (
    <div className="testimonial-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: ".testimonial-prev",
          nextEl: ".testimonial-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="testimonial-slide">
            <div className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} />
              <h3 className="text-left">{testimonial.name}</h3>
              <p className="designation ">{testimonial.designation}</p>
              <p className="review text-wrap5">"{testimonial.review}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="testimonial-nav testimonial-prev">
        <FaArrowLeft />
      </div>
      <div className="testimonial-nav testimonial-next">
        <FaArrowRight />
      </div>
    </div>
  );
};

export default TestimonialSlider;
