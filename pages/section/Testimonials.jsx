import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TextAnimate } from "../../@/components/ui/text-animate";

const testimonials = [
  {
    name: "MR. MANOHAR",
    position: "IT Head / Vijay TV",
    logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738652938/2_zpr6br.jpg",
    quote:
      "Whether you are looking for a free domain registration along deployment or a cheap server with fast performance and professional support assistance Sixth Star will definitely benefit you in all means.",
  },
  {
    name: "MR. SETHUMURUGAN",
    position: "IT Head / Hinduja Leyland",
    logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738653151/24_ge5xtn.jpg",
    quote:
      "It’s been 3 years and we haven’t faced any server downtime. Excellent hosting features with easy upgrading facilities. You can acquire their support at any time since they maintain perfect on-time call support.",
  },
  {
    name: "MRS.BHUVANSEWARI",
    position: "Vice President / Makkal TV",
    logo: "https://res.cloudinary.com/daggx9p24/image/upload/v1738653262/4_nqbzf5.jpg",
    quote:
      "On-time support with reliable performance is what makes them best in the web hosting industry. Best suited servers for enterprise type management. I totally recommend their service to everyone.",
  },
//   {
//     name: "MR. ARUN KUMAR",
//     position: "Manager / FinCorp",
//     logo: "company-logo-url",
//     quote:
//       "Best hosting service I have used. Their support team is responsive, and their servers are fast!",
//   },
];

const Testimonials = () => {
  return (
    <div className="testimonial-section">
      <TextAnimate animation="scaleUp" by="text" as='h2'>
                Testimonials
          </TextAnimate>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="testimonial-slider"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-content">
                <p className="testimonial-quote text-wrap2">"{testimonial.quote}"</p>
                <div className="testimonial-footer">
                  <img src={testimonial.logo} alt="company logo" className="testimonial-logo" width={100} height={50} />
                  <div>
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-position">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
