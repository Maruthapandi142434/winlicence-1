"use client";
import { motion } from "framer-motion";

const products = [
  {
    title: "Data Encryption",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738575241/team-member-1_wus51o.jpg", // Update with correct paths
  },
  {
    title: "100% Uptime SLA",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738575240/team-member-2_ejzabj.jpg",
  },
  {
    title: "Server Technology",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738575240/team-member-3_s8rtjt.jpg",
  },
  {
    title: "cPanel control",
    image: "https://res.cloudinary.com/daggx9p24/image/upload/v1738575240/team-member-4_jcukx7.jpg",
  },
];

const ProductFeatures = () => {
  return (
    <section className="">
      <div className="text-center mb-10">
       
        
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.2 },
          },
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="text-lg font-semibold text-center mt-4">
              {product.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductFeatures;
