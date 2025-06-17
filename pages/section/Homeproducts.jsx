import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../styles/ProductSlider.module.css";

const products = [
  { 
    name: "Windows OS for PC",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738584822/windows-pc_rxyqxt.png",
    link: "/products/windows-os"
  },
  { 
    name: "Windows Server OS",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738584821/windows-server_xn2dku.png",
    link: "/products/windows-server"
  },
  { 
    name: "RDP Windows License",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738584821/rdp-license_vuj018.png",
    link: "/products/rdp-windows-license"
  },
  { 
    name: "SQL License",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738584821/sql-license_cwz8vi.png",
    link: "/products/sql-license"
  },
  { 
    name: "Mail License",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738584821/mail-license_jtlld6.png",
    link: "/products/mail-license"
  }
];

const Homeproducts = () => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 }, // 1 column for mobile
          768: { slidesPerView: 2 }, // 2 columns for tablets
          1024: { slidesPerView: 3 } // 3 columns for larger screens
        }}
        className={styles.swiper}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className={styles.productCard}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <h3>{product.name}</h3>
              <a href={product.link} className={styles.exploreButton}>
                Explore
              </a>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Homeproducts;
